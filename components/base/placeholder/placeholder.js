import { html, svg } from "lit-element";
import styles from "!raw-loader!./placeholder.css";

import closeIcon from "!raw-loader!./icons/close.svg";
import carouselIcon from "!raw-loader!./icons/carousel.svg";
import formattedTextIcon from "!raw-loader!./icons/formatted-text.svg";
import imageIcon from "!raw-loader!./icons/image.svg";
import miscIcon from "!raw-loader!./icons/misc.svg";
import textIcon from "!raw-loader!./icons/text.svg";
import textMediaIcon from "!raw-loader!./icons/text-media.svg";
import twoColumnsIcon from "!raw-loader!./icons/two-columns.svg";
import videoIcon from "!raw-loader!./icons/video.svg";
import AccordionIcon from "!raw-loader!./icons/accordion.svg";
import ButtonListIcon from "!raw-loader!./icons/button-list.svg";
import EditorElement from "../editor-element/editor-element";

const icons = {
  close: closeIcon,
  formatted_text: formattedTextIcon,
  carousel: carouselIcon,
  media: imageIcon,
  image: imageIcon,
  misc: miscIcon,
  text: textIcon,
  text_media: textMediaIcon,
  accordion: AccordionIcon,
  button_list: ButtonListIcon,
  two_columns: twoColumnsIcon,
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
      availableSections: { type: Array },
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
    this.availableSections = [];
    this.isOpen = false;
    this.isExpanded = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.requestInformation("available-sections", {}, sections => {
      this.availableSections = sections;
    });
  }

  getSections() {
    return this.availableSections.filter(section =>
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
    this.modifyDocument(editor => editor.replace(sectionId, this));
    this.isExpanded = false;
  }
}
