import { LitElement, html } from "lit-element";
import * as Operations from "../editor/operations";
import styles from "./text_conflict.css";

class TextConflict extends LitElement {
  static get properties() {
    return {
      label: { type: String },
      resolved: { type: Boolean },
      isResolving: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.label = TextConflict.label;
    this.resolved = false;
    this.isResolving = false;
  }

  connectedCallback() {
    super.connectedCallback();
    const children = Array.from(this.children);

    children.forEach(item =>
      item.addEventListener(
        "optionSelected",
        this.selectOptionHandler.bind(this)
      )
    );

    // Click outside handler.
    document.addEventListener("click", e => {
      if (!this.contains(e.target) && this.isResolving) {
        this.isResolving = false;
      }
    });
  }

  render() {
    return html`
      <style>
        ${styles}
      </style>
      <div class="text-conflict">
        <span
          class="text-conflict__label ${!this.resolved ? "resolve" : ""}"
          @click=${this.clickResolvingHandler}
          >${this.label}</span
        >
        <div
          class="text-conflict__options ${this.isResolving ? "visible" : ""}"
        >
          <slot></slot>
        </div>
      </div>
    `;
  }

  clickResolvingHandler() {
    this.isResolving = true;
  }

  selectOptionHandler(event) {
    this.resolved = true;
    this.isResolving = false;
    console.log(this, event.detail);
    this.dispatchEvent(Operations.swap(event.detail, this));
  }
}

TextConflict.label = "Conflict needs resolving";

customElements.define("ck-conflict-text", TextConflict);
