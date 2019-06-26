import { LitElement, html } from "lit-element";
import styles from "./media_conflict_option.css";

export default class MediaConflictOption extends LitElement {
  static get properties() {
    return {
      from: { type: String },
      position: { type: String }
    };
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html`
      <style>
        ${styles}
      </style>
      <div class="media-conflict-option">
        <button class="${this.position}" @click=${this.optionSelected}>
          ${this.from}
        </button>
        <slot></slot>
      </div>
    `;
  }

  firstUpdated() {
    if (this.position === "left") {
      this.style.width = "50%";
      setTimeout(() => {
        this.shadowRoot.querySelector(
          ".media-conflict-option"
        ).style.minWidth = `${this.offsetWidth * 2}px`;
      }, 100);
    }
  }

  optionSelected() {
    this.dispatchEvent(
      new CustomEvent("optionSelected", {
        detail: this.children.item(0)
      })
    );
  }
}
