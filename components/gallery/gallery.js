import { LitElement, html, svg } from "lit-element";
import * as Operations from "../editor/operations";
import styles from "./gallery.css";

import leftIcon from "./icons/leftArrow.svg";
import rightIcon from "./icons/rightArrow.svg";
import trashIcon from "./icons/trash.svg";

class Gallery extends LitElement {
  static get properties() {
    return {
      items: Array,
      currentGallery: Number,
      section: String
    };
  }

  constructor() {
    super();
    this.items = [];
    this.currentGallery = 0;
  }

  connectedCallback() {
    super.connectedCallback();

    const slots = this.shadowRoot;
    slots.addEventListener("slotchange", e => {
      this.items = Array.from(this.children).map((child, index) => ({
        title: index + 1,
        index
      }));
    });

    this.items = Array.from(this.children).map((child, index) => ({
      title: index + 1,
      index
    }));
    this.setGalleryItem(this.currentGallery);
  }

  render() {
    return html`
      <style>
        ${styles}
      </style>

      <div class="ck-gallery">
        <div
          class="ck-gallery__rail"
          style="transform: translateX(${this.currentGallery * -100}%)"
        >
          <slot></slot>
        </div>

        <div class="ck-gallery__controls">
          <div class="ck-gallery__pager">
            <div class="ck-gallery__dots">
              ${this.items.map(item => this.button(item))}
            </div>
            <div class="ck-gallery__add">
              <span
                @click="${() => this.addItem()}"
                class="ck-gallery__add-slide"
              >
                +
              </span>
            </div>
          </div>
          <div class="ck-gallery__actions">
            <span>Edit active element</span>
            <div class="ck-gallery__icons">
              <div
                @click="${() => this.moveItem("left")}"
                data-tooltip="Move element to the left"
                class="ck-gallery__icon ck-gallery__icon--arrow-left ${this
                  .currentGallery === 0
                  ? "disabled"
                  : ""}"
              >
                ${svg([leftIcon])}
              </div>
              <div
                @click="${() => this.moveItem("right")}"
                data-tooltip="Move element to the right"
                class="ck-gallery__icon ck-gallery__icon--arrow-right ${this
                  .currentGallery ===
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
                  .items.length < 2
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

  addItem() {
    this.dispatchEvent(Operations.insert(this.section, this, "end"));
    this.currentGallery = this.items.length;
  }

  deleteItem() {
    if (this.items.length >= 2) {
      this.dispatchEvent(Operations.remove(this.children[this.currentGallery]));
      if (this.currentGallery === this.items.length - 1) {
        this.currentGallery -= 1;
      }
    }
  }

  moveItem(position) {
    if (position === "left" && this.currentGallery !== 0) {
      this.dispatchEvent(
        Operations.move(
          this,
          "before",
          this.currentGallery,
          this.currentGallery - 1
        )
      );
      this.currentGallery -= 1;
    }
    if (position === "right" && this.currentGallery !== this.items.length - 1) {
      this.dispatchEvent(
        Operations.move(
          this,
          "before",
          this.currentGallery,
          this.currentGallery + 2
        )
      );
      this.currentGallery += 1;
    }
  }

  button(item) {
    return html`
      <span
        @click="${() => this.setGalleryItem(item.index)}"
        class="ck-gallery__dot-item ${this.currentGallery === item.index
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
    this.currentGallery = index;
  }
}

customElements.define("ck-gallery", Gallery);
