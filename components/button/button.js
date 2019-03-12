import { LitElement, html, svg } from "lit-element";
import styles from "./button.css";

const iconLink = svg`
<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
    <path d="M7.8 24c0-3.42 2.78-6.2 6.2-6.2h8V14h-8C8.48 14 4 18.48 4 24s4.48 10 10 10h8v-3.8h-8c-3.42 0-6.2-2.78-6.2-6.2zm8.2 2h16v-4H16v4zm18-12h-8v3.8h8c3.42 0 6.2 2.78 6.2 6.2s-2.78 6.2-6.2 6.2h-8V34h8c5.52 0 10-4.48 10-10s-4.48-10-10-10z"/>
</svg>
`;

const iconLinkOff = svg`
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <path fill="none" d="M0 0h24v24H0V0z"/><path d="M17 7h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1 0 1.43-.98 2.63-2.31 2.98l1.46 1.46C20.88 15.61 22 13.95 22 12c0-2.76-2.24-5-5-5zm-1 4h-2.19l2 2H16zM2 4.27l3.11 3.11C3.29 8.12 2 9.91 2 12c0 2.76 2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1 0-1.59 1.21-2.9 2.76-3.07L8.73 11H8v2h2.73L13 15.27V17h1.73l4.01 4L20 19.74 3.27 3 2 4.27z"/><path fill="none" d="M0 24V0"/>
</svg>
`;

class Button extends LitElement {
  static get properties() {
    return {
      target: { type: String, attribute: "link-target" },
      attributes: { type: Object, attribute: "link-attributes" }
    };
  }

  constructor() {
    super();
    this.target = null;
    this.attributes = {};
  }

  render() {
    return html`
      <style>
        ${styles}
      </style>
      <div class="button">
        <div class="button__content">
          <slot></slot>
        </div>
        <button @click="${this.selectLink}">
          ${this.target ? iconLink : iconLinkOff}
        </button>
      </div>
    `;
  }

  selectLink() {
    this.dispatchEvent(new CustomEvent("selectLink", { detail: this.target }));
  }
}

customElements.define("ck-button", Button);
