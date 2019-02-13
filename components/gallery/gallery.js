import { LitElement, html } from "lit-element";
import styles from "./gallery.css";
import "./icon/icon";

class Gallery extends LitElement {
  static get properties() {
    return {
      items: Array,
      currentGallery: Number
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
    slots.addEventListener("slotchange", () => {
      this.items = Array.from(this.children).map((child, index) => ({
        title: index + 1,
        index
      }));
      this.setGalleryItem(this.items.length - 1);
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
                class="ck-gallery__icon ck-gallery__icon--arrow-left"
              >
                <ck-gallery-icon iconId="iconLeftArrow"></ck-gallery-icon>
              </div>
              <div
                @click="${() => this.moveItem("right")}"
                data-tooltip="Move element to the right"
                class="ck-gallery__icon ck-gallery__icon--arrow-right"
              >
                <ck-gallery-icon iconId="iconRightArrow"></ck-gallery-icon>
              </div>
              <div
                @click="${() => this.deleteItem()}"
                data-tooltip="Delete slide"
                class="ck-gallery__icon ck-gallery__icon--arrow-trash"
              >
                <ck-gallery-icon iconId="iconTrash"></ck-gallery-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  moveItem(position) {
    this.dispatchEvent(new CustomEvent("moveItem", { detail: position }));
  }

  addItem() {
    this.dispatchEvent(new Event("addItem"));
  }

  deleteItem() {
    if (this.items.length >= 2) {
      this.dispatchEvent(
        new CustomEvent("deleteItem", { detail: this.currentGallery })
      );
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

class GalleryItem extends LitElement {
  render() {
    return html`
      <style>
        ${styles}
      </style>

      <div class="ck-gallery__item">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define("ck-gallery", Gallery);
customElements.define("ck-gallery-item", GalleryItem);
