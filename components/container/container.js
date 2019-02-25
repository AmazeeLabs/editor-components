import { LitElement, html, svg, customElement, css } from "lit-element";
import DiffElement from "../diffelement/diffelement";
import * as Operations from "../editor/operations";
import iconUp from "./icons/up.svg";
import iconDown from "./icons/down.svg";
import iconDelete from "./icons/delete.svg";
import itemStyles from "./container-item.css";

class ContainerItem extends DiffElement {
  static get properties() {
    return {
      inContainer: { type: Boolean },
      containerIndex: { type: Number },
      containerItems: { type: Number },
      containerSections: { type: String }
    };
  }

  constructor() {
    super();
    this.inContainer = false;
    this.containerIndex = 0;
    this.containerItems = 0;
    this.containerSections = false;
  }

  get containerFirst() {
    return this.containerIndex === 0;
  }

  get containerLast() {
    return this.containerIndex === this.containerItems - 1;
  }

  render() {
    const upButton = html`
      <button
        class="up${this.containerFirst ? " disabled" : ""}"
        @click="${() => this.upHandler()}"
      >
        ${svg([iconUp])}
      </button>
    `;

    const downButton = html`
      <button
        class="up${this.containerLast ? " disabled" : ""}"
        @click="${() => this.downHandler()}"
      >
        ${svg([iconDown])}
      </button>
    `;

    return super.render(html`
      <div class="item">
        ${this.inContainer
          ? html`
              <ck-placeholder
                collapsed="true"
                @ckEditorOperation="${event => this.insertHandler(event)}"
                sections="${this.containerSections}"
              ></ck-placeholder>
              <div class="controls">
                ${upButton} ${downButton}
                <button class="remove" @click="${() => this.removeHandler()}">
                  ${svg([iconDelete])}
                </button>
              </div>
            `
          : null}
        <slot></slot>
      </div>
    `);
  }

  upHandler() {
    if (!this.containerFirst) {
      const diff =
        global.window.scrollY +
        this.parentElement.children[this.containerIndex - 1].offsetTop -
        this.offsetTop;
      window.scrollTo(0, diff);
      this.dispatchEvent(
        Operations.move(
          this.parentElement,
          "before",
          this.containerIndex,
          this.containerIndex - 1
        )
      );
    }
  }

  downHandler() {
    if (!this.containerLast) {
      const diff =
        global.window.scrollY +
        (this.containerIndex < this.containerItems - 2
          ? this.parentElement.children[this.containerIndex + 2].offsetTop -
            this.parentElement.children[this.containerIndex + 1].offsetTop
          : this.parentElement.children[this.containerIndex + 1].offsetHeight);
      window.scrollTo(0, diff);
      this.dispatchEvent(
        Operations.move(
          this.parentElement,
          "after",
          this.containerIndex,
          this.containerIndex + 1
        )
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
        this.containerIndex
      )
    );
  }
}

ContainerItem.styles = css([itemStyles]);

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
    this.observer.observe(this, {
      attributes: false,
      childList: true,
      subtree: false
    });
    this.processChildren();
  }

  processChildren() {
    Array.from(this.children).forEach((child, index) => {
      child.setAttribute("inContainer", true);
      child.setAttribute("containerSections", this.sections);
      child.setAttribute("containerIndex", index);
      child.setAttribute("containerItems", this.children.length);
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
    this.dispatchEvent(Operations.insert(event.detail.element, this, "end"));
  }
}

customElement("ck-container")(Container);
customElement("ck-container-item")(ContainerItem);
