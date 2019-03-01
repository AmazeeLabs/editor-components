import { LitElement, html } from "lit-element";
import styles from "./media.css";

const mediaLoader = html`
  <div class="ck-media__loader">
    <div class="ck-media__spinner">
      <div class="ck-media__bounce ck-media__bounce--1"></div>
      <div class="ck-media__bounce ck-media__bounce--2"></div>
      <div class="ck-media__bounce ck-media__bounce--3"></div>
    </div>
  </div>
`;

class Media extends LitElement {
  static get properties() {
    return {
      loaderIsVisible: Boolean,
      mediaUuid: { attribute: "data-media-uuid", type: String },
      mediaDisplay: { attribute: "data-media-display", type: String },
      preview: String
    };
  }

  updated(properties) {
    if (properties.has("mediaUuid") && this.mediaUuid) {
      this.loaderIsVisible = true;
      Media.previewCallback(this.mediaUuid, this.mediaDisplay, preview => {
        this.preview = preview;
        this.loaderIsVisible = false;
      });
    }
  }

  render() {
    return html`
      <style>
        ${styles}
      </style>

      <div class="ck-media">
        ${this.preview
          ? html`
              <div class="ck-media__preview">
                ${this.preview}
              </div>
            `
          : html`
              <div class="ck-media__placeholder"></div>
            `}
        ${this.loaderIsVisible ? mediaLoader : null}
      </div>
    `;
  }
}

Media.previewCallback = (uuid, display, callback) =>
  window.setTimeout(() => {
    callback(
      html`
        <img src="https://placekitten.com/500/${uuid}" />
      `
    );
  }, 3000);

customElements.define("ck-media", Media);
