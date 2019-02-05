import { LitElement, html } from "lit-element";
import styles from "./placeholder.css";
import "./icon/icon";

class Placeholder extends LitElement {
  static get properties() {
    return {
      addSectionActive: { type: Boolean },
      showSections: { type: Boolean },
      sections: { type: Array },
      addSectionCallback: { type: Function }
    };
  }

  constructor() {
    super();
    this.addSectionActive = false;
    this.showSections = false;
    this.sections = [];
  }

  render() {
    return html`
      <style>
        ${styles}
      </style>
      ${this.addSectionActive
        ? html`
            <div class="ck-placeholder__add-wrapper">
              <button
                @click="${this.clickAddHandler}"
                type="button"
                class="normalize-button ck-placeholder__add-button"
              >
                Add
              </button>
              ${this.showSections
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
                : ""}
            </div>
          `
        : html`
            <div class="ck-placeholder__insert-wrapper">
              <button
                @click="${this.clickInsertHandler}"
                type="button"
                class="normalize-button ck-placeholder__insert-button"
              >
                Insert Section
              </button>
            </div>
          `}
    `;
  }

  clickAddHandler() {
    this.showSections = !this.showSections;
  }

  clickInsertHandler() {
    this.addSectionActive = true;
    this.showSections = true;
  }

  clickCloseHandler() {
    this.addSectionActive = false;
  }

  clickSectionHandler(event, sectionId) {
    this.dispatchEvent(new CustomEvent("addSection", { detail: sectionId }));
  }
}

customElements.define("ck-placeholder", Placeholder);
