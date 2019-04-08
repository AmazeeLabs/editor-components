import { html, svg } from "lit-element";
import styles from "./placeholder.css";

import closeIcon from "./icons/close.svg";
import carouselIcon from "./icons/carousel.svg";
import formattedTextIcon from "./icons/formatted-text.svg";
import imageIcon from "./icons/image.svg";
import miscIcon from "./icons/misc.svg";
import textIcon from "./icons/text.svg";
import textMediaIcon from "./icons/text-media.svg";
import videoIcon from "./icons/video.svg";
import EditorElement from "../editor-element/editor-element";

const icons = {
  close: closeIcon,
  formatted_text: formattedTextIcon,
  carousel: carouselIcon,
  image: imageIcon,
  misc: miscIcon,
  text: textIcon,
  text_media: textMediaIcon,
  video: videoIcon
};

function icon(section) {
  if (section.svgIcon) {
    return svg([section.svgIcon]);
  }
  if (icons[section.icon]) {
    return svg([icons[section.icon]]);
  }
  return svg([icons.misc]);
}

export default class Placeholder extends EditorElement {
  static get properties() {
    return {
      collapsed: { type: Boolean },
      closed: { type: Boolean },
      isOpen: { type: Boolean },
      isExpanded: { type: Boolean },
      sections: { type: String },
      labelOpen: { type: String },
      labelExpand: { type: String }
    };
  }

  constructor() {
    super();
    this.closed = false;
    this.collapsed = false;
    this.labelOpen = "Add";
    this.labelExpand = "Insert";
    this.sections = [];
    this.isOpen = false;
    this.isExpanded = false;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  getSections() {
    return Placeholder.availableSections.filter(section =>
      this.sections.split(" ").includes(section.id)
    );
  }

  render() {
    return html`
      <style>
        ${styles}
      </style>
      ${!this.collapsed || this.isExpanded
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
                      ${this.getSections().map(
                        section => html`
                          <li class="ck-placeholder__section-item">
                            <button
                              @click="${event =>
                                this.clickSectionHandler(event, section.id)}"
                              type="button"
                              class="normalize-button ck-placeholder__section-button"
                            >
                              <div class="ck-placeholder__icon-wrapper">
                                ${icon(section)}
                              </div>
                              ${section.label}
                            </button>
                          </li>
                        `
                      )}
                    </ul>
                    ${this.isOpen
                      ? html`
                          <button
                            @click="${this.clickCloseHandler}"
                            type="button"
                            class="normalize-button ck-placeholder__close-button"
                          >
                            <div class="ck-placeholder__icon-wrapper">
                              ${icon({ icon: "close" })}
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
    this.isOpen = !this.isOpen;
  }

  clickExpandHandler() {
    this.isExpanded = !this.isExpanded;
  }

  clickCloseHandler() {
    this.isOpen = false;
  }

  clickSectionHandler(event, sectionId) {
    this.editor.replace(sectionId, this);
    this.isExpanded = false;
  }
}
