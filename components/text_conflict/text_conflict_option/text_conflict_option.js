import { LitElement, html } from "lit-element";
import styles from "./text_conflict_option.css";

class TextConflictOption extends LitElement {
  static get properties() {
    return {
      from: { type: String }
    };
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <style>
        ${styles}
      </style>
      <div class="option" @click="${this.optionSelected}">
        <span class="option__label"
          >${TextConflictOption.labels[this.from]}</span
        >
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

TextConflictOption.labels = {
  left: "Left version",
  right: "Right version",
  source: "Source version",
  empty: "Clear"
};

customElements.define("ck-conflict-option", TextConflictOption);
