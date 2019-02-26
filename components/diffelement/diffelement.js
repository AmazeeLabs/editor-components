import { LitElement, html, css } from "lit-element";
import * as Operations from "../editor/operations";
import styles from "./diffelement.css";

export default class DiffElement extends LitElement {
  static get properties() {
    return {
      added: { type: Boolean },
      removed: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.added = false;
    this.removed = false;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  handleAccept() {
    if (this.added) {
      this.removeAttribute("added");
    } else {
      this.dispatchEvent(Operations.remove(this));
    }
  }

  handleDecline() {
    if (this.removed) {
      this.removeAttribute("removed");
    } else {
      this.dispatchEvent(Operations.remove(this));
    }
  }

  render(children) {
    if (this.added || this.removed) {
      return html`
        <style>
          ${styles}
        </style>
        <div class="overlay ${this.added ? "added" : "removed"}">
          ${children}
          <div class="overlay__background">
            <div class="actions">
              <button class="accept" @click=${this.handleAccept.bind(this)}>
                Accept
              </button>
              <button class="decline" @click=${this.handleDecline.bind(this)}>
                Decline
              </button>
            </div>
          </div>
        </div>
      `;
    }
    return children;
  }
}

DiffElement.styles = css([styles]);
