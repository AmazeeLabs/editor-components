import { LitElement, html, css } from "lit-element";
import styles from "./textfield.css";

export default class TextField extends LitElement {
  static get properties() {
    return {
      pattern: { attribute: "ck-pattern", type: String },
      hasPatternError: { type: Boolean },
      patternErrorMessage: { attribute: "ck-message-error", type: String },
      minLength: { attribute: "ck-min", type: Number },
      maxLength: { attribute: "ck-max", type: Number },
      hasLengthError: { type: Boolean },
      helper: { attribute: "ck-message-helper", type: String }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    new MutationObserver(this.validate).observe(this, {
      childList: true,
      subtree: true
    });
    this.addEventListener("input", this.validate);
  }

  validate() {
    if (this.hasAttribute("ck-max")) {
      this.helper = true;
    }
    console.log(this.getAttribute('ck-max'), this.innerText);
  }

  render() {
    // language=HTML
    return html`
      <style>
        ${styles}
      </style>

      <div
        class="ck-textfield ${this.hasPatternError || this.hasLengthError
          ? "error"
          : null}"
      >
        ${this.helper
          ? html`
              <div class="ck-tooltip ck-tooltip--helper">${this.helper}</div>
            `
          : null}
        ${this.hasLengthError
          ? html`
              <div class="ck-tooltip ck-tooltip--error">${"Length error"}</div>
            `
          : null}
        ${this.hasPatternError
          ? html`
              <div class="ck-tooltip ck-tooltip--error">${"Pattern error"}</div>
            `
          : null}
        <div
          class="${this.hasPatternError || this.hasLengthError
            ? "is-valid"
            : "is-invalid"}"
        >
          <slot></slot>
        </div>
      </div>
    `;
  }
}

TextField.styles = css`
  :host {
    display: block;
  }
`;

// Static flag if textfield errors should be highlighted immediately.
// If set to false, errors are highlighted after focus is lost for the first time.
TextField.initializeWithErrors = false;

window.customElements.define("ck-textfield", TextField);
