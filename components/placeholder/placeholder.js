import { LitElement, html } from "lit-element";
import styles from "./placeholder.css";
import "./icon/icon";

class Placeholder extends LitElement {
  static get properties() {
    return {
      collapsed: { type: Boolean },
      closed: { type: Boolean },
      isOpen: { type: Boolean },
      sections: { type: Array },
      labelOpen: { type: String },
      labelExpand: { type: String }
    };
  }

  constructor() {
    super();
    this.closed = false;
    this.collapsed = false;
    this.isOpen = false;
    this.labelOpen = "Add";
    this.labelExpand = "Insert";
    this.sections = [];
  }

  render() {
    return html`
      <style>
        ${styles}
      </style>
      ${!this.collapsed
        ? html`
            <div class="ck-placeholder__add-wrapper">
              ${this.closed
                ? html`
                    <button
                      @click="${this.clickOpenHandler}"
                      type="button"
                      class="normalize-button ck-placeholder__add-button"
                    >
                      ${this.labelOpen}
                    </button>
                  `
                : null}
              ${!this.closed || this.isOpen
                ? html`
                    <ul class="normalize-list ck-placeholder__sections-list">
                      ${this.sections.map(
                        section => html`
                          <li class="ck-placeholder__section-item">
                            <button
                              @click="${event =>
                                this.clickSectionHandler(event, section.id)}"
                              type="button"
                              class="normalize-button ck-placeholder__section-button"
                            >
                              <div class="ck-placeholder__icon-wrapper">
                                <ck-placeholder-icon
                                  iconId="${section.icon}"
                                ></ck-placeholder-icon>
                              </div>
                              ${section.label}
                            </button>
                          </li>
                        `
                      )}
                    </ul>
                    ${this.closed
                      ? html`
                          <button
                            @click="${this.clickCloseHandler}"
                            type="button"
                            class="normalize-button ck-placeholder__close-button"
                          >
                            <div class="ck-placeholder__icon-wrapper">
                              <ck-placeholder-icon
                                iconId="close"
                              ></ck-placeholder-icon>
                            </div>
                            <span class="ck-placeholder__close-button-label"
                              >Close</span
                            >
                          </button>
                        `
                      : null}
                  `
                : ""}
            </div>
          `
        : html`
            <div class="ck-placeholder__insert-wrapper">
              <button
                @click="${this.clickExpandHandler}"
                type="button"
                class="normalize-button ck-placeholder__insert-button"
              >
                ${this.labelExpand}
              </button>
            </div>
          `}
    `;
  }

  clickOpenHandler() {
    if (this.sections.length === 1) {
      this.clickSectionHandler(null, this.sections[0].id);
    } else {
      this.isOpen = !this.isOpen;
    }
  }

  clickExpandHandler() {
    if (this.sections.length === 1) {
      this.clickSectionHandler(null, this.sections[0].id);
    } else {
      this.collapsed = false;
    }
  }

  clickCloseHandler() {
    this.isOpen = false;
  }

  clickSectionHandler(event, sectionId) {
    this.dispatchEvent(new CustomEvent("addSection", { detail: sectionId }));
  }
}

customElements.define("ck-placeholder", Placeholder);
