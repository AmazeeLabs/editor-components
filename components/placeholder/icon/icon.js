import { LitElement } from "lit-element";
import iconFormattedText from "./assets/formatted-text";
import iconCarousel from "./assets/carousel";
import iconConfigurator from "./assets/configurator";
import iconStageImage from "./assets/stage-image";
import iconStageVideo from "./assets/stage-video";
import iconTextMedia from "./assets/text-media";
import iconVisualizer from "./assets/visualizer";
import iconClose from "./assets/close";
import iconText from "./assets/text";

class PlaceholderIcon extends LitElement {
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
        return iconFormattedText;
      case "carousel":
        return iconCarousel;
      case "configurator":
        return iconConfigurator;
      case "stage-image":
        return iconStageImage;
      case "stage-video":
        return iconStageVideo;
      case "text-media":
        return iconTextMedia;
      case "visualizer":
        return iconVisualizer;
      case "close":
        return iconClose;
      case "text":
      default:
        return iconText;
    }
  }
}

customElements.define("ck-placeholder-icon", PlaceholderIcon);
