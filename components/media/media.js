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

export default class Media extends LitElement {
  static get properties() {
    return {
      loaderIsVisible: Boolean,
      mediaUuid: { attribute: "data-media-uuid", type: String },
      mediaDisplay: { attribute: "data-media-display", type: String },
      preview: String
    };
  }

  connectedCallback() {
    super.connectedCallback();
  }

  updated(properties) {
    this.previewPane = this.shadowRoot.querySelector(".ck-media__preview");
    if (properties.has("mediaUuid") && this.mediaUuid) {
      this.loaderIsVisible = true;
      Media.previewCallback(this.mediaUuid, this.mediaDisplay, preview => {
        this.preview = preview;
        this.loaderIsVisible = false;
      });
    }

    if (properties.has("preview") && this.preview) {
      this.previewPane.innerHTML = this.preview;
    }
  }

  render() {
    return html`
      <style>
        ${styles}
      </style>
      <div class="ck-media">
        <div
          class="ck-media__preview ${this.preview ? "visible" : "hidden"}"
        ></div>
        <div
          class="ck-media__placeholder ${this.preview ? "hidden" : "visible"}"
        ></div>
        ${this.loaderIsVisible ? mediaLoader : null}
      </div>
    `;
  }
}

Media.previewCallback = (uuid, display, callback) =>
  window.setTimeout(() => {
    callback(`<img src="https://placekitten.com/500/${uuid}" />`);
  }, 3000);

customElements.define("ck-media", Media);
