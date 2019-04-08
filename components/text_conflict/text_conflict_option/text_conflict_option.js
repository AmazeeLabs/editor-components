import { LitElement, html } from "lit-element";
import styles from "./text_conflict_option.css";

export default class TextConflictOption extends LitElement {
  static get properties() {
    return {
      from: { type: String },
      content: { type: String }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    // TODO: Keep span markup, but drop block elements.
    this.content = this.innerText;
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
        <span class="option__content">${this.content}</span>
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

