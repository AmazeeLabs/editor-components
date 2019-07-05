import { html, svg, css } from "lit-element";
import Button from "./button";
import "./button-conflict-option/button_conflict_option";

const iconLink = svg`
<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
    <path d="M7.8 24c0-3.42 2.78-6.2 6.2-6.2h8V14h-8C8.48 14 4 18.48 4 24s4.48 10 10 10h8v-3.8h-8c-3.42 0-6.2-2.78-6.2-6.2zm8.2 2h16v-4H16v4zm18-12h-8v3.8h8c3.42 0 6.2 2.78 6.2 6.2s-2.78 6.2-6.2 6.2h-8V34h8c5.52 0 10-4.48 10-10s-4.48-10-10-10z"/>
</svg>
`;

export default class ButtonConflict extends Button {
  static get properties() {
    return {
      target: { type: String, attribute: "link-target" },
      error: Boolean,
      optionsElements: { type: String },
      isResolving: { type: Boolean }
    };
  }

  connectedCallback() {
    super.connectedCallback();

    // Click outside handler.
    document.addEventListener("click", e => {
      if (!this.contains(e.target) && this.isResolving) {
        this.isResolving = false;
      }
    });
  }

  resolveConflict() {
    this.isResolving = true;
    const left = JSON.parse(this.getAttribute("left"));
    const right = JSON.parse(this.getAttribute("right"));
    const source = JSON.parse(this.getAttribute("source"));
    const options = [];
    if (left) {
      options.push(ButtonConflict.getItemInfo(left, "left"));
    }
    if (right) {
      options.push(ButtonConflict.getItemInfo(right, "right"));
    }
    if (source) {
      options.push(ButtonConflict.getItemInfo(source, "source"));
    }

    this.optionsElements = options;
  }

  static getItemInfo(item, label) {
    return {
      label,
      href: item["link-target"],
      title: item.title,
      target: item.target,
      links: item["data-cta-type"]
    };
  }

  hasConflict() {
    return (
      this.hasAttribute("left") ||
      this.hasAttribute("source") ||
      this.hasAttribute("right")
    );
  }

  render() {
    const selectFunction = this.hasConflict()
      ? this.resolveConflict
      : this.selectLink;

    return html`
      <div
        class="button ${this.target ? "linked" : "not-linked"} ${this.error
          ? "error"
          : ""} ${this.hasConflict() ? "test" : ""}"
      >
        <div class="button__content">
          <slot></slot>
        </div>
        <button
          @click="${this.inEditor ? selectFunction : () => {}}"
          class="icon ${this.hasConflict() ? "red" : ""}"
        >
          ${iconLink}
        </button>
        ${this.hasConflict() && this.isResolving
          ? html`
              <div class="conflict-options">
                ${this.optionsElements.map(
                  item => html`
                    <ck-button-option
                      from=${item.label}
                      @click=${() => this.resolved(item.label)}
                    >
                      <div class="option__info"><b>URL:</b> ${item.href}</div>
                      <div class="option__info">
                        <b>Title:</b> ${item.title}
                      </div>
                      <div class="option__info">
                        <b>Target:</b> ${item.target}
                      </div>
                      <div class="option__info">
                        <b>Links to section:</b> ${item.links}
                      </div>
                    </ck-button-option>
                  `
                )}
              </div>
            `
          : null}
      </div>
    `;
  }

  resolved(label) {
    const result = JSON.parse(this.getAttribute(label));
    this.modifyDocument(editor => {
      editor.attributes(this, {
        "link-target": result["link-target"]
      });
      editor.removeAttribute(this, "left");
      editor.removeAttribute(this, "right");
      editor.removeAttribute(this, "source");
    });
    this.isResolving = false;
    this.optionsElements = [];
  }
}

ButtonConflict.styles = css`
  ${Button.styles}
  .button {
    position: relative;
  }
  .conflict-options {
    top: 0;
    position: absolute;
    max-width: 400px;
    background: white;
    box-shadow: 0px 0px 5px var(--color-grey-light);
  }
  .conflict-options {
    display: grid;
  }
  .option_info {
    paddin: 10px;
  }
  .icon.red svg path {
    fill: red;
  }
`;
