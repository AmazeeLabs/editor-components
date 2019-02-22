import { LitElement, html } from "lit-element";
import { eventType } from "./operations";
import Placeholder from "../placeholder/placeholder";

export default class Editor extends LitElement {
  static createElement(name, attributes = {}) {
    const el = document.createElement("div");
    el.classList.add(name);
    if (Editor.templates[name]) {
      el.innerHTML =
        Editor.templates[name] instanceof Function
          ? Editor.templates[name]()
          : Editor.templates[name];
    }
    const element = el.children[0];
    Object.keys(attributes).forEach(key =>
      element.setAttribute(key, attributes[key])
    );
    return element;
  }

  render() {
    return html`
      <slot></slot>
    `;
  }

  static batch({ detail: { operations } }) {
    operations.forEach(Editor.dispatchOperation);
  }

  static insertElement({
    detail: { element, parent, position, reference, attributes }
  }) {
    ({
      end: () => parent.appendChild(Editor.createElement(element, attributes)),
      before: () =>
        parent.insertBefore(
          Editor.createElement(element),
          parent.children[reference]
        )
    }[position]());
  }

  static moveElement({ detail: { parent, position, target, reference } }) {
    ({
      before: () =>
        parent.insertBefore(
          parent.children[target],
          parent.children[reference]
        ),
      after: () =>
        reference < parent.children.length
          ? parent.insertBefore(
              parent.children[target],
              parent.children[reference + 1]
            )
          : parent.appendChild(parent.children[reference])
    }[position]());
  }

  static replaceElement({ detail: { element, target } }) {
    target.parentElement.insertBefore(Editor.createElement(element), target);
    target.parentElement.removeChild(target);
  }

  static removeElement({ detail: { target } }) {
    target.parentElement.removeChild(target);
  }

  static setAttributes({ detail: { target, attr } }) {
    Object.keys(attr).forEach(key => target.setAttribute(key, attr[key]));
  }

  static dispatchOperation(event) {
    ({
      batch: () => Editor.batch(event),
      insert: () => Editor.insertElement(event),
      move: () => Editor.moveElement(event),
      replace: () => Editor.replaceElement(event),
      remove: () => Editor.removeElement(event),
      attributes: () => Editor.setAttributes(event)
    }[event.detail.operation]());
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener(eventType, Editor.dispatchOperation, {
      capture: true
    });
  }
}

Editor.templates = {};

Editor.decorator = story => `<ck-editor>${story()}</ck-editor>`;

Editor.dummySetup = story => {
  Editor.templates = {
    text:
      "<ck-container-item><p>The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee.</p></ck-container-item>",
    image: () =>
      `<ck-container-item><img src="https://placekitten.com/800/${Math.ceil(
        300 + Math.random() * 200
      )}" style="width: 100%; height: auto"/></ck-container-item>`
  };
  Placeholder.availableSections = [
    { id: "text", label: "Text", icon: "text" },
    { id: "image", label: "Image", icon: "stage-image" }
  ];
  return story();
};

customElements.define("ck-editor", Editor);
