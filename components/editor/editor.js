import { LitElement, html } from "lit-element";
import { eventType } from "./operations";
import Placeholder from "../placeholder/placeholder";
import text from "!raw-loader!./templates/text.html";
import added from "!raw-loader!./templates/added.html";
import removed from "!raw-loader!./templates/removed.html";
import gallery from "!raw-loader!./templates/gallery.html";
import image from "!raw-loader!./templates/image.html";
import columns from "!raw-loader!./templates/columns.html";

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

  static removeAttributeKey({ detail: { target, key } }) {
    target.removeAttribute(key);
  }

  static swap({ detail: { source, target } }) {
    target.parentElement.insertBefore(source, target);
    target.parentElement.removeChild(target);
  }

  static dispatchOperation(event) {
    ({
      batch: () => Editor.batch(event),
      insert: () => Editor.insertElement(event),
      move: () => Editor.moveElement(event),
      replace: () => Editor.replaceElement(event),
      swap: () => Editor.swap(event),
      remove: () => Editor.removeElement(event),
      attributes: () => Editor.setAttributes(event),
      removeAttribute: () => Editor.removeAttributeKey(event)
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
    text,
    image: () =>
      image
        .replace("%width", 800)
        .replace("%height", Math.ceil(200 + Math.random() * 200)),
    gallery: () => gallery.replace("%content", Editor.templates.image()),
    columns: () => columns,
    added: () => added,
    removed: () => removed
  };
  Placeholder.availableSections = [
    { id: "text", label: "Text", icon: "text" },
    { id: "image", label: "Image", icon: "image" },
    { id: "gallery", label: "Gallery", icon: "carousel" },
    { id: "columns", label: "Columns", icon: "misc" }
  ];
  return story();
};

customElements.define("ck-editor", Editor);
