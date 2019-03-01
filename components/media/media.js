import { LitElement, html } from "lit-element";
import styles from "./media.css";

class Media extends LitElement {
  static get properties() {
    return {
      previewIsVisible: Boolean,
      loaderIsVisible: Boolean,
      mediaUuid: String,
      preview: String
    };
  }

  constructor() {
    super();
    this.previewIsVisible = false;
    this.loaderIsVisible = false;
    this.preview = null;
  }

  connectedCallback() {
    super.connectedCallback();
    const self = this;

    const observer = new MutationObserver(mutationsList => {
      mutationsList.forEach(mutation => {
        if (mutation.attributeName === "data-media-uuid") {
          self.mediaUuid = self.getAttribute(mutation.attributeName);
          Media.previewCallback(
            self.mediaUuid,
            preview => (self.preview = preview)
          );
          self.loaderIsVisible = false;
          this.previewIsVisible = true;
          self.dispatchEvent(new Event('removeLoader'));
        }
        if (mutation.attributeName === "media-loader") {
          self.mediaLoader = self.getAttribute(mutation.attributeName);
          if (self.getAttribute(mutation.attributeName) === "active") {
            self.loaderIsVisible = true;
          }
        }
      });
    });

    observer.observe(self, {
      attributes: true,
      childList: false,
      subtree: false
    });
  }

  render() {
    return html`
      <style>
        ${styles}
      </style>

      <div class="ck-media">
        ${this.previewIsVisible
          ? html`
              <div class="ck-media__preview">
                ${this.preview}
              </div>
            `
          : html`
              <div class="ck-media__placeholder"></div>
            `}
        <ck-media-loader class="${this.loaderIsVisible ? "active" : ""}" />
      </div>
    `;
  }
}

class MediaLoader extends LitElement {
  render() {
    return html`
      <style>
        ${styles}
      </style>

      <div class="ck-media__loader">
        <div class="ck-media__spinner">
          <div class="ck-media__bounce ck-media__bounce--1"></div>
          <div class="ck-media__bounce ck-media__bounce--2"></div>
          <div class="ck-media__bounce ck-media__bounce--3"></div>
        </div>
      </div>
    `;
  }
}

Media.previewCallback = (uuid, callback) =>
  callback(
    html`
      <img src="https://placekitten.com/500/${uuid}" />
    `
  );

customElements.define("ck-media", Media);
customElements.define("ck-media-loader", MediaLoader);
