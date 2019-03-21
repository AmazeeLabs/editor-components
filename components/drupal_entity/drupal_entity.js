import { LitElement, html } from "lit-element";
import styles from "./drupal_entity.css";

const mediaLoader = html`
  <div class="ck-media__loader">
    <div class="ck-media__spinner">
      <div class="ck-media__bounce ck-media__bounce--1"></div>
      <div class="ck-media__bounce ck-media__bounce--2"></div>
      <div class="ck-media__bounce ck-media__bounce--3"></div>
    </div>
  </div>
`;

export default class DrupalEntity extends LitElement {
  static get properties() {
    return {
      loaderIsVisible: Boolean,
      entityUuid: { attribute: "data-entity-uuid", type: String },
      embedButton: { attribute: "data-embed-button", type: String },
      viewMode: { attribute: "data-entity-embed-display", type: String },
      entityType: { attribute: "data-entity-type", type: String },
      preview: String
    };
  }

  updated(properties) {
    this.previewPane = this.shadowRoot.querySelector(".ck-embed__preview");
    if (properties.has("entityUuid") && this.entityUuid) {
      this.loaderIsVisible = true;
      DrupalEntity.previewCallback(this.entityUuid, this.viewMode, preview => {
        this.preview = preview;
        this.loaderIsVisible = false;
      });
    }

    if (properties.has("preview") && this.preview) {
      this.previewPane.innerHTML = this.preview;
    }
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html`
      <style>
        ${styles}
      </style>
      <div class="ck-embed">
        <div
          class="ck-embed__preview ${this.preview ? "visible" : "hidden"}"
        ></div>
        <div
          class="ck-media__placeholder ${this.preview ? "hidden" : "visible"}"
        ></div>
        ${this.loaderIsVisible ? mediaLoader : null}
      </div>
    `;
  }
}

DrupalEntity.previewCallback = (uuid, display, callback) =>
  window.setTimeout(() => {
    callback(`<div class="node">
      <div class="node-title">Node Title</div>
    </div>`);
  }, 1000);

customElements.define("drupal-entity", DrupalEntity);
