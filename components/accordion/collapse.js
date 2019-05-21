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
      },
      collapseIndex: {
        type: Number,
        attribute: "ck-collapse-index",
        reflect: true
      },
      arrowUpIsActive: {
        type: Boolean,
        attribute: "ck-collapse-arrow-up",
        reflect: true
      },
      arrowDownIsActive: {
        type: Boolean,
        attribute: "ck-collapse-arrow-down",
        reflect: true
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.collapseIsOpen == null) {
      this.collapseIsOpen = false;
    }
    if (this.arrowUpIsActive == null) {
      this.arrowUpIsActive = false;
    }
    if (this.arrowDownIsActive == null) {
      this.arrowDownIsActive = false;
    }
  }

  toggleCollapse() {
    this.collapseIsOpen = !this.collapseIsOpen;
  }

  moveItem(position) {
    if (position === "up" && this.arrowUpIsActive) {
      this.modifyDocument(editor =>
        editor.move(this, "before", this.collapseIndex, this.collapseIndex - 1)
      );
    }
    if (position === "down" && this.arrowDownIsActive) {
      this.modifyDocument(editor =>
        editor.move(this, "before", this.collapseIndex, this.collapseIndex + 1)
      );
    }
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
            <div
              @click=${() => this.moveItem("up")}
              class="ck-collapse__icon ck-collapse__icon--arrow-up
                ${this.arrowUpIsActive ? "" : "disabled"}"
            >
              ${svg([arrowIcon])}
            </div>
            <div
              @click=${() => this.moveItem("down")}
              class="ck-collapse__icon ck-collapse__icon--arrow-down
                ${this.arrowDownIsActive ? "" : "disabled"}"
            >
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
