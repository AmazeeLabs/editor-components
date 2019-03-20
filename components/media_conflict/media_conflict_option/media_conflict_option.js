import { LitElement, html } from "lit-element";
import styles from "./media_conflict_option.css";

class MediaConflictOption extends LitElement {
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
        <button class="${this.position}" @click=${this.optionSelected}>${this.from}</button>
        <slot></slot>
      </div>
    `;
  }

  firstUpdated() {
    this.children.item(0).style.width = this.offsetWidth + 'px';
    if (this.position == 'left') {
      this.style.width = '50%';
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

MediaConflictOption.labels = {
  left: "Left version",
  right: "Right version",
  source: "Source version",
  empty: "Clear"
};

customElements.define("ck-conflict-media-option", MediaConflictOption);