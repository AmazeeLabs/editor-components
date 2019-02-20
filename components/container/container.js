import { LitElement, html, svg, customElement } from "lit-element";
import * as Operations from "../editor/operations";
import iconUp from "./icons/up.svg";
import iconDown from "./icons/down.svg";
import iconDelete from "./icons/delete.svg";
import itemStyles from "./container-item.css";

class ContainerItem extends LitElement {
  static get properties() {
    return {
      index: { type: Number },
      items: { type: Number },
      sections: { type: String }
    };
  }

  get isFirst() {
    return this.index === 0;
  }

  get isLast() {
    return this.index === this.items - 1;
  }

  render() {
    const upButton = html`
      <button
        class="up${this.isFirst ? " disabled" : ""}"
        @click="${() => this.upHandler()}"
      >
        ${svg([iconUp])}
      </button>
    `;

    const downButton = html`
      <button
        class="up${this.isLast ? " disabled" : ""}"
        @click="${() => this.downHandler()}"
      >
        ${svg([iconDown])}
      </button>
    `;

    return html`
      <style>${itemStyles}</style>
      <div class="item">
        <ck-placeholder
          collapsed="true"
          @ckEditorOperation="${event => this.insertHandler(event)}"
          sections="${this.sections}"
        ></ck-placeholder>
        <div class="controls">
          ${upButton} ${downButton}
          <button class="remove" @click="${() => this.removeHandler()}">
            ${svg([iconDelete])}
          </button>
        </div>
        <slot></slot>
      </div>
    `;
  }

  upHandler() {
    if (!this.isFirst) {
      this.dispatchEvent(
        Operations.move(
          this.parentElement,
          "before",
          this.index,
          this.index - 1
        )
      );
    }
  }

  downHandler() {
    if (!this.isLast) {
      this.dispatchEvent(
        Operations.move(this.parentElement, "after", this.index, this.index + 1)
      );
    }
  }

  removeHandler() {
    this.dispatchEvent(Operations.remove(this));
  }

  insertHandler(event) {
    this.dispatchEvent(
      Operations.insert(
        event.detail.element,
        this.parentElement,
        "before",
        this.index
      )
    );
  }
}

export default class Container extends LitElement {
  static get properties() {
    return {
      sections: { type: String }
    };
  }

  constructor() {
    super();
    this.observer = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.observer = new MutationObserver(() => this.processChildren());
    this.processChildren();
  }

  processChildren() {
    this.observer.disconnect();

    Array.from(this.children).forEach(child => {
      if (child.nodeName.toLowerCase() !== "ck-container-item") {
        const wrapper = document.createElement("ck-container-item");
        wrapper.setAttribute("sections", this.sections);
        this.insertBefore(wrapper, child);
        wrapper.appendChild(child);
      } else if (child.childNodes.length === 0) {
        this.removeChild(child);
      }
    });

    Array.from(this.children).forEach((child, index) => {
      child.setAttribute("index", index);
      child.setAttribute("items", this.children.length);
    });

    this.observer.observe(this, {
      attributes: false,
      childList: true,
      subtree: false
    });
  }

  render() {
    return html`
      <div class="container"><slot></slot></div>
      <ck-placeholder
        @ckEditorOperation="${this.appendHandler}"
        closed="true"
        sections="${this.sections}"
      >
      </ck-placeholder>
    `;
  }

  appendHandler(event) {
    console.log(event);
    this.dispatchEvent(Operations.insert(event.detail.element, this, "end"));
  }
}

customElement("ck-container")(Container);
customElements.define("ck-container-item", ContainerItem);
