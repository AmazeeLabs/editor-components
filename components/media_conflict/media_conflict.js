import { html } from "lit-element";
import styles from "./media_conflict.css";
import EditorElement from "../base/editor-element/editor-element";

export default class MediaConflict extends EditorElement {
  static get properties() {
    return {
      from: { type: String }
    };
  }

  connectedCallback() {
    super.connectedCallback();

    const children = Array.from(this.children);
    children.forEach(item => {
      item.addEventListener(
        "optionSelected",
        this.selectOptionHandler.bind(this)
      );
    });

    this.children.item(0).setAttribute("position", "left");
    this.children.item(1).setAttribute("position", "right");
    this.touchStart = false;

    this.addEventListener("mousedown", this.touchStartHandler, false);
    this.addEventListener("mouseup", this.touchEndHandler, false);
    this.addEventListener("mouseover", this.touchEndHandler, false);
    this.addEventListener("mousemove", this.eventHandler, false);
    this.addEventListener("touchmove", this.eventHandler, false);
  }

  render() {
    return html`
      <style>
        ${styles}
      </style>
      <div class="media-conflict">
        <div class="media-conflict-switcher"></div>
        <slot></slot>
      </div>
    `;
  }

  selectOptionHandler(event) {
    this.modifyDocument(editor => editor.swap(event.detail, this));
  }

  touchStartHandler(e) {
    this.touchStart = true;
    this.eventHandler(e);
  }

  touchEndHandler() {
    this.touchStart = false;
  }

  eventHandler(e) {
    if (!this.touchStart) {
      return;
    }
    const { target } = e;
    let x = 0;
    let totalOffsetX = 0;
    const container = target;
    if (container.tagName !== "CK-CONFLICT-MEDIA") {
      return;
    }

    let currentElement = container;

    do {
      totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
    } while ((currentElement = currentElement.offsetParent));

    x = e.pageX - totalOffsetX;

    if (e.type === "touchmove") {
      x = e.touches[0].pageX - totalOffsetX;
    }

    container.getElementsByTagName(
      "ck-conflict-media-option"
    )[0].style.width = `${x}px`;
  }
}

MediaConflict.labels = {
  left: "Left version",
  right: "Right version",
  source: "Source version",
  empty: "Clear"
};
