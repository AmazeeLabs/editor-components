import { LitElement } from "lit-element";
import iconRightArrow from "./assets/rightArrow";
import iconTrash from "./assets/trash";
import iconLeftArrow from "./assets/leftArrow";

class GalleryIcon extends LitElement {
  static get properties() {
    return {
      iconId: { type: String }
    };
  }

  constructor() {
    super();
    this.iconId = "text";
  }

  render() {
    switch (this.iconId) {
      case "formatted-text":
      case "iconRightArrow":
        return iconRightArrow;
      case "iconTrash":
        return iconTrash;
      case "iconLeftArrow":
        return iconLeftArrow;
      default:
        return iconLeftArrow;
    }
  }
}

customElements.define("ck-gallery-icon", GalleryIcon);
