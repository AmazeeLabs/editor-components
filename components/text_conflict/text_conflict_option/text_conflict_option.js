import { LitElement, html } from "lit-element";
import styles from "./text_conflict_option.css";

class TextConflictOption extends LitElement {
  static get properties() {
    return {
      label: { type: String }
    };
  }

  constructor() {
    super();
    this.label = "Empty";
  }

  render() {
    return html`
      <style>
        ${styles}
      </style>
      <div class="option" @click="${this.optionSelected}">
        <span class="option__label">${this.label}</span>
        <span class="option__content"><slot></slot></span>
      </div>
    `;
  }

  optionSelected() {
    this.dispatchEvent(
      new CustomEvent("optionSelected", {
        detail: this.children.item(0)
      })
    );
  }
}

customElements.define("ck-conflict-option", TextConflictOption);
