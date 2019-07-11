import { css } from "lit-element";
import { html } from "lit-html";
import EditorElement from "../base/editor-element/editor-element";

export default class Select extends EditorElement {
  static get properties() {
    return {
      options: { type: String, attribute: "ck-options" },
      defaultValue: { type: String },
      selected: { type: String, attribute: "data-selected" },
      isOpen: { type: Boolean },
      label: { type: String, attribute: "ck-label" }
    };
  }

  constructor() {
    super();
    this.isOpen = false;
    this.options = "";
  }

  connectedCallback() {
    super.connectedCallback();

    // Click outside handler.
    document.addEventListener("click", e => {
      if (!this.contains(e.target) && this.isOpen) {
        this.isOpen = false;
      }
    });
  }

  handleClick() {
    if (this.isOpen) {
      this.isOpen = false;
    } else {
      this.isOpen = true;
    }
  }

  selectItem(e) {
    this.modifyDocument(editor => {
      editor.attributes(this, {
        "data-selected": e.target.innerText
      });
    });
    this.isOpen = false;
  }

  render() {
    const options = this.options.split(",").map(
      item => html`
        <li @click=${this.selectItem}>${item}</li>
      `
    );
    return html`
      <div class="select-wrapper">
        <div class="label">${this.label}</div>
        <div class="selected" @click=${this.handleClick}>
          ${this.selected ? this.selected : "- Select -"}
        </div>
        <ul class="options ${this.isOpen ? "open" : "closed"}">
          ${options}
        </ul>
      </div>
    `;
  }

  static get styles() {
    return css`
      :host {
        font-family: "Smart", "Arial", sans-serif;
        display: inline-block;
      }
      .selected {
        display: block;
        padding: 10px 20px;
        border: 1px solid gray;
      }
      .open {
        display: block;
      }
      .closed {
        display: none;
      }
      .options li {
        list-style: none;
        display: block;
        padding: 10px 20px;
        border-botton: 1px solid gray;
      }
    `;
  }
}
