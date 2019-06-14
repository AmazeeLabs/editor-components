import global from "global";
import { LitElement, html } from "lit-element";
import styles from "./button_conflict_option.css";

export default class ButtonConflictOption extends LitElement {
  static get properties() {
    return {
      from: { type: String },
      content: { type: String }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    // TODO: Keep span markup, but drop block elements.
    this.content = this.innerHTML;
  }

  render() {
    return html`
      <style>
        ${styles}
      </style>
      <div class="option" @click="${this.optionSelected}">
        <span class="option__label"
          >${ButtonConflictOption.labels[this.from]}</span
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

ButtonConflictOption.labels = {
  left: "Left version",
  right: "Right version",
  source: "Source version",
  empty: "Clear"
};

global.customElements.define("ck-button-option", ButtonConflictOption);
