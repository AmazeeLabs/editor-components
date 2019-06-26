import { LitElement, html } from "lit-element";
import styles from "./text_conflict_option.css";

export default class TextConflictOption extends LitElement {
  static get properties() {
    return {
      from: { type: String },
      content: { type: String }
    };
  }

  render() {
    return html`
      <style>
        ${styles}
      </style>
      <div class="option" @click="${this.optionSelected}">
        <span class="option__label">${this.from}</span>
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
