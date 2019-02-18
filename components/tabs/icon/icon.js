import { LitElement } from "lit-element";
import iconPencil from "./assets/pencil";

class TabsIcon extends LitElement {
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
      case "iconPencil":
        return iconPencil;
      default:
        return iconPencil;
    }
  }
}

customElements.define("ck-tabs-icon", TabsIcon);
