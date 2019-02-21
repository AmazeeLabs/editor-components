import { LitElement, html, svg } from "lit-element";
import * as Operations from "../editor/operations";
import styles from "./element-removed.css";

class ElementRemoved extends LitElement {
  render() {
    return html`
      <style>
        ${styles}
      </style>
      <div class="overlay">
        <slot></slot>
        <div class="overlay__background">
          <div class="actions">
            <button class="accept" @click=${this.acceptChanges.bind(this)}>
              Accept
            </button>
            <button class="decline" @click=${this.declineChanges.bind(this)}>
              Decline
            </button>
          </div>
        </div>
      </div>
    `;
  }

  acceptChanges() {
    this.dispatchEvent(Operations.remove(this));
  }

  declineChanges() {
    this.dispatchEvent(Operations.replaceWithHtml(this.children.item(0), this));
  }
}

customElements.define("ck-removed", ElementRemoved);
