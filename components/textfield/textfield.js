import { LitElement, html, css } from "lit-element";
import styles from "./textfield.css";

export default class TextField extends LitElement {
  static get properties() {
    return {
      pattern: { attribute: "ck-pattern", type: String },
      hasPatternError: { type: Boolean },
      errorMessage: { attribute: "ck-error-message", type: String },
      minLength: { attribute: "ck-min", type: Number },
      maxLength: { attribute: "ck-max", type: Number },
      hasLengthError: { type: Boolean },
      hasHelper: { type: Boolean },
      helper: { attribute: "ck-message-helper", type: String }
    };
  }

  connectedCallback() {
    super.connectedCallback();

    new MutationObserver(this.validate).observe(this, {
      childList: true,
      subtree: true
    });

    this.addEventListener("focus", this.setHelper);

    this.addEventListener("blur", () => {
      this.validate();
      this.hasHelper = false;
    });

    if (this.maxLength && !this.minLength) {
      this.addEventListener("input", this.handleMax);
    }

    // textfield errors immediately highlighted
    if (TextField.initializeWithErrors) this.validate();
  }

  handleMax() {
    this.helper = `${this.maxLength - this.innerText.length} letters remaining.`;
    this.setHelper();
    this.maxValidation();
  }

  validate() {
    if (!this.innerText) return;
    // MAX
    if (this.hasAttribute("ck-max")) this.maxValidation();
    // MIN
    if (this.hasAttribute("ck-min")) this.minValidation();
    // Range
    if (this.hasAttribute("ck-max") && this.hasAttribute("ck-min")) this.rangeValidation();
    // Pattern
    if (this.hasAttribute("ck-pattern")) this.patternValidation();
  }

  maxValidation() {
    if (this.innerText.length > this.maxLength && !this.minLength) {
      if (!this.errorMessage) {
        this.errorMessage = `Please enter no more than 
          ${this.maxLength} letters.`;
      }
      this.hasLengthError = true;
    } else {
      this.hasLengthError = false;
    }
    this.setHelper();
  }

  minValidation() {
    if (this.innerText.length < this.minLength) {
      if (!this.errorMessage) {
        this.errorMessage = `Please enter at least 
          ${this.minLength} letters.`;
      }
      this.hasLengthError = true;
    } else {
      this.hasLengthError = false;
    }
  }

  rangeValidation() {
    if (
      this.innerText.length > this.minLength &&
      this.innerText.length < this.maxLength
    ) {
      this.hasLengthError = false;
    } else {
      if (!this.errorMessage) {
        this.errorMessage = `Please enter ${this.minLength} to ${
          this.maxLength
        } letters.`;
      }
      this.hasLengthError = true;
    }
  }

  patternValidation() {
    console.log(this.errorMessage)
    const pattern = new RegExp(this.pattern);
    if (pattern.test(this.innerText)) {
      this.hasPatternError = false;
    } else {
      this.hasPatternError = true;
    }
  }

  setHelper() {
    if (this.helper) {
      if (!this.hasPatternError && !this.hasLengthError) {
        this.hasHelper = true;
      } else {
        this.hasHelper = false;
      }
    }
  }

  render() {
    return html`
      <style>
        ${styles}
      </style>

      <div
        class="ck-textfield ${this.hasPatternError || this.hasLengthError
          ? "error"
          : ""}"
      >
        ${this.hasHelper
          ? html`
              <div class="ck-tooltip ck-tooltip--helper">${this.helper}</div>
            `
          : null}
        ${this.hasLengthError
          ? html`
              <div class="ck-tooltip ck-tooltip--error">
                ${this.errorMessage ? this.errorMessage : "Length error"}
              </div>
            `
          : null}
        ${this.hasPatternError
          ? html`
              <div class="ck-tooltip ck-tooltip--error">
                ${this.errorMessage ? this.errorMessage : "Pattern error"}
              </div>
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

// Static flag if textfield errors should be highlighted immediately.
// If set to false, errors are highlighted after focus is lost for the first time.
TextField.initializeWithErrors = false;

window.customElements.define("ck-textfield", TextField);
