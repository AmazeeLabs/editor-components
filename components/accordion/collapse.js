import { html, svg } from "lit-element";
import styles from "!raw-loader!./collapse.css";
import EditorElement from "../base/editor-element/editor-element";

import arrowIcon from "!raw-loader!./icons/leftArrow.svg";
import trashIcon from "!raw-loader!./icons/trash.svg";

export default class Collapse extends EditorElement {
  static get properties() {
    return {
      collapseIsOpen: {
        type: Boolean,
        attribute: "ck-collapse-open",
        reflect: true
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.collapseIsOpen == null) {
      this.collapseIsOpen = false;
    }
  }

  toggleCollapse() {
    this.collapseIsOpen = !this.collapseIsOpen;
  }

  render() {
    return html`
      <style>
        ${styles}
      </style>

      <div class="ck-collapse ${this.collapseIsOpen ? "open" : ""}">
        <div class="ck-collapse__header">
          <div class="ck-collapse__title">
            <slot name="title"></slot>
          </div>

          <div class="ck-collapse__action" @click=${this.toggleCollapse}></div>

          <div class="ck-collapse__icons">
            <div class="ck-collapse__icon ck-collapse__icon--arrow-up">
              ${svg([arrowIcon])}
            </div>
            <div class="ck-collapse__icon ck-collapse__icon--arrow-down">
              ${svg([arrowIcon])}
            </div>
            <div class="ck-collapse__icon ck-collapse__icon--trash">
              ${svg([trashIcon])}
            </div>
          </div>
        </div>
        <div class="ck-collapse__body">
          <slot></slot>
        </div>
      </div>
    `;
  }
}
