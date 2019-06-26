import { html, svg } from "lit-element";
import styles from "!raw-loader!./gallery.css";

import leftIcon from "!raw-loader!./icons/leftArrow.svg";
import rightIcon from "!raw-loader!./icons/rightArrow.svg";
import trashIcon from "!raw-loader!./icons/trash.svg";
import EditorElement from "../base/editor-element/editor-element";

export default class Gallery extends EditorElement {
  static get properties() {
    return {
      items: Array,
      currentItem: { type: Number, attribute: "ck-current-item" },
      numberOfChildren: { type: Number },
      maxItems: { type: Number, attribute: "ck-max" },
      sections: { type: String, attribute: "ck-contains" },
      controlsPosition: { type: String, attribute: "ck-controls-position" }
    };
  }

  constructor() {
    super();
    this.items = [];
    this.currentItem = 0;
  }

  validate() {
    Array.from(this.children).forEach(element => {
      if (element instanceof EditorElement) {
        element.validate();
      }
    });
  }

  hasError() {
    return (
      this.items.filter(item => {
        return item.error;
      }).length > 0
    );
  }

  getItems() {
    return Array.from(this.children)
      .filter(child => child.nodeName !== "BR")
      .map((child, index) => ({
        element: child,
        error: child instanceof EditorElement && child.hasError(),
        title: index + 1,
        index
      }));
  }

  connectedCallback() {
    super.connectedCallback();
    const slots = this.shadowRoot;
    slots.addEventListener("slotchange", () => {
      this.items = this.getItems();
      this.numberOfChildren = this.items.length;
    });

    this.maxItems = this.maxItems || 0;
    this.items = this.getItems();
    this.numberOfChildren = this.items.length;
    this.setGalleryItem(this.currentItem);

    // Listen to validation errors and error resolution.
    this.addEventListener("ck-editor:element-validation-error", () => {
      // Update the items.
      this.items = this.getItems();
      // @todo: _stop_ propagating the error event and encapsulate it a "group element error event"?
    });

    this.addEventListener("ck-editor:element-validation-error-resolved", () => {
      // Update the items.
      this.items = this.getItems();
      // @todo: _stop_ propagating the error event and encapsulate it a "group element error event"?
    });
  }

  render() {
    return html`
      <style>
        ${styles}
      </style>

      <div class="ck-gallery ${this.hasError() ? "error" : ""} ${this.controlsPosition}">
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

        <div class="ck-gallery__controls ${this.controlsPosition}">
          <div class="ck-gallery__pager">
            <div class="ck-gallery__dots">
              ${this.items.map(item => this.button(item))}
              ${this.inEditor &&
              (this.numberOfChildren < this.maxItems || this.maxItems === 0)
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
          ${this.inEditor
            ? html`
                <div class="ck-gallery__actions">
                  <span>Edit active element</span>
                  <div class="ck-gallery__icons">
                    <div
                      @click="${() => this.moveItem("left")}"
                      data-tooltip="Move element to the left"
                      class="ck-gallery__icon ck-gallery__icon--arrow-left ${this
                        .currentItem === 0 ||
                      this.currentItem === this.items.length
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
              `
            : null}
        </div>
      </div>
    `;
  }

  appendHandler(event) {
    this.modifyDocument(editor =>
      editor.insert(event.detail.section, this, "end")
    );
  }

  addItem() {
    this.currentItem = this.items.length;
  }

  deleteItem() {
    if (this.currentItem !== this.numberOfChildren) {
      this.modifyDocument(editor =>
        editor.remove(this.children[this.currentItem])
      );
    }
  }

  moveItem(position) {
    if (
      position === "left" &&
      this.currentItem > 0 &&
      this.currentItem < this.numberOfChildren
    ) {
      this.modifyDocument(editor =>
        editor.move(this, "before", this.currentItem, this.currentItem - 1)
      );
      this.currentItem -= 1;
    }
    if (position === "right" && this.currentItem < this.numberOfChildren - 1) {
      if (this.currentItem < this.numberOfChildren - 2) {
        this.modifyDocument(editor =>
          editor.move(this, "before", this.currentItem, this.currentItem + 2)
        );
      } else {
        this.modifyDocument(editor =>
          editor.move(this, "end", this.currentItem)
        );
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
          : ""} ${item.error ? "error" : ""}"
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
