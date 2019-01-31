import { LitElement, html } from "lit-element";

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
    this.addSectionActive = true;
    this.showSections = true;
    this.sections = [];
  }

  render() {
    return html`
      <style>
        button {
          background: rgba(0, 0, 0, 0);
          border: none;
          cursor: pointer;
          font-family: inherit;
          font-size: inherit;
          padding: 0;
        }
        ul {
          list-style-type: none;
        }
        ul,
        li {
          margin: 0;
          padding: 0;
        }

        .ck-placeholder__insert-wrapper {
          border-bottom: 1px dashed var(--color-black, #222330);
          margin-bottom: 1em;
          text-align: center;
        }
        .ck-placeholder__insert-button {
          background: #fff;
          color: var(--color-blue, #004adc);
          display: inline-block;
          font-size: 12px;
          font-weight: bold;
          letter-spacing: 0.03em;
          margin: 0;
          padding: 0 1em;
          position: relative;
          top: 0.7em;
        }
        .ck-placeholder__insert-button:hover,
        .ck-placeholder__insert-button:focus {
          color: var(--color-black, #222330);
        }
        .ck-placeholder__add-wrapper {
          align-items: center;
          border: 1px dotted var(--color-black, #222330);
          display: flex;
          flex-flow: row wrap;
          font-size: 14px;
          padding: 1.9em 1.8em 2em;
        }
        .ck-placeholder__add-button {
          color: var(--color-black, #222330);
          font-weight: bold;
          margin-right: 40px;
          text-transform: uppercase;
        }
        .ck-placeholder__add-button:hover,
        .ck-placeholder__add-button:focus {
          color: var(--color-blue, #004adc);
        }
        .ck-placeholder__section-item {
          color: var(--color-black, #222330);
          display: inline-block;
          font-size: 12px;
          margin-right: 20px;
          text-transform: uppercase;
        }
        .ck-placeholder__section-button:hover,
        .ck-placeholder__section-button:focus {
          color: var(--color-blue, #004adc);
        }
        .ck-placeholder__close-button {
          margin-left: auto;
        }
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
                      Close
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
  }

  clickCloseHandler() {
    this.addSectionActive = false;
  }

  clickSectionHandler(event, sectionId) {
    // @TODO: Implement real callback.
    // eslint-disable-next-line no-undef
    console.log(sectionId);
    // this.addSectionCallback(sectionId);
  }
}

customElements.define("ck-placeholder", Placeholder);
