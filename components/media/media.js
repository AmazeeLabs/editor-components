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
        if (mutation.attributeName === "media-uuid") {
          self.loaderIsVisible = true;
          self.mediaUuid = self.getAttribute(mutation.attributeName);
          // here I call the external callback (too quick to show the loader)
          // to test it just wrap the function below into a setTimout()
          Media.previewCallback(
            self.mediaUuid,
            preview => (self.preview = preview)
          );
          self.loaderIsVisible = false;
          this.previewIsVisible = true;
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
  static get properties() {
    return {
      isVisible: Boolean
    };
  }

  constructor() {
    super();
    this.isVisible = false;
  }

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
      <img src="https://i0.wp.com/grapevine.is/wp-content/uploads/${uuid}" />
    `
  );

customElements.define("ck-media", Media);
customElements.define("ck-media-loader", MediaLoader);
