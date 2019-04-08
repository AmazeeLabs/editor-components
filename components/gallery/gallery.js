import { html, svg } from "lit-element";
import styles from "./gallery.css";

import leftIcon from "./icons/leftArrow.svg";
import rightIcon from "./icons/rightArrow.svg";
import trashIcon from "./icons/trash.svg";
import EditorElement from "../base/editor-element/editor-element";

export default class Gallery extends EditorElement {
  static get properties() {
    return {
      items: Array,
      currentItem: { type: Number, attribute: "ck-current-item" },
      numberOfChildren: { type: Number },
      maxItems: { type: Number, attribute: "ck-max" },
      sections: { type: String, attribute: "ck-contains" }
    };
  }

  constructor() {
    super();
    this.items = [];
    this.currentItem = 0;
  }

  connectedCallback() {
    super.connectedCallback();

    const slots = this.shadowRoot;
    slots.addEventListener("slotchange", () => {
      this.numberOfChildren = this.children.length;
      this.items = Array.from(this.children).map((child, index) => ({
        title: index + 1,
        index
      }));
    });

    this.numberOfChildren = this.children.length;
    this.maxItems = this.maxItems || 0;
    this.items = Array.from(this.children).map((child, index) => ({
      title: index + 1,
      index
    }));
    this.setGalleryItem(this.currentItem);
  }

  render() {
    return html`
      <style>
        ${styles}
      </style>

      <div class="ck-gallery">
        <div
          class="ck-gallery__rail"
          style="transform: translateX(${this.currentItem * -100}%)"
        >
          <slot></slot>
          ${this.numberOfChildren < this.maxItems || this.maxItems === 0
            ? html`
                <ck-placeholder
                  @ckEditorOperation="${this.appendHandler}"
                  sections=${this.sections}
                ></ck-placeholder>
              `
            : null}
        </div>

        <div class="ck-gallery__controls">
          <div class="ck-gallery__pager">
            <div class="ck-gallery__dots">
              ${this.items.map(item => this.button(item))}
              ${this.numberOfChildren < this.maxItems || this.maxItems === 0
                ? html`
                    <span
                      @click="${() => this.addItem()}"
                      class="ck-gallery__add ${this.currentItem ===
                      this.numberOfChildren
                        ? "active"
                        : "inactive"}"
                    >
                      +
                    </span>
                  `
                : null}
            </div>
          </div>
          <div class="ck-gallery__actions">
            <span>Edit active element</span>
            <div class="ck-gallery__icons">
              <div
                @click="${() => this.moveItem("left")}"
                data-tooltip="Move element to the left"
                class="ck-gallery__icon ck-gallery__icon--arrow-left ${this
                  .currentItem === 0 || this.currentItem === this.items.length
                  ? "disabled"
                  : ""}"
              >
                ${svg([leftIcon])}
              </div>
              <div
                @click="${() => this.moveItem("right")}"
                data-tooltip="Move element to the right"
                class="ck-gallery__icon ck-gallery__icon--arrow-right ${this
                  .currentItem >=
                this.items.length - 1
                  ? "disabled"
                  : ""}"
              >
                ${svg([rightIcon])}
              </div>
              <div
                @click="${() => this.deleteItem()}"
                data-tooltip="Delete slide"
                class="ck-gallery__icon ck-gallery__icon--arrow-trash ${this
                  .items.length === 0 ||
                this.currentItem === this.numberOfChildren
                  ? "disabled"
                  : ""}"
              >
                ${svg([trashIcon])}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  appendHandler(event) {
    this.editor.insert(event.detail.section, this, "end");
  }

  addItem() {
    this.currentItem = this.items.length;
  }

  deleteItem() {
    if (this.currentItem !== this.numberOfChildren) {
      this.editor.remove(this.children[this.currentItem]);
    }
  }

  moveItem(position) {
    if (
      position === "left" &&
      this.currentItem > 0 &&
      this.currentItem < this.numberOfChildren
    ) {
      this.editor.move(this, "before", this.currentItem, this.currentItem - 1);
      this.currentItem -= 1;
    }
    if (
      position === "right" &&
      this.currentItem !== this.numberOfChildren - 1
    ) {
      if (this.currentItem < this.numberOfChildren - 1) {
        this.editor.move(
          this,
          "before",
          this.currentItem,
          this.currentItem + 2
        );
      } else {
        this.editor.move(this, "end", this.currentItem);
      }
      this.currentItem += 1;
    }
  }

  button(item) {
    return html`
      <span
        @click="${() => this.setGalleryItem(item.index)}"
        class="ck-gallery__dot-item ${this.currentItem === item.index
          ? "active"
          : ""}"
        >${item.title}</span
      >
    `;
  }

  setGalleryItem(index) {
    if (this.children.length <= index || !this.children[index]) {
      return;
    }

    // Update image slide
    this.currentItem = index;
  }
}

