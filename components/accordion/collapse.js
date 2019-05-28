import { html, svg } from "lit-element";
import styles from "!raw-loader!./collapse.css";
import Section from "../section/section";

export default class Collapse extends Section {
  static get properties() {
    return {
      collapseIsOpen: {
        type: Boolean
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
        </div>

        <div class="ck-collapse__body">
          <slot></slot>
        </div>
      </div>
    `;
  }
}
