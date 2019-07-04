import { html, svg } from "lit-element";
import styles from "!raw-loader!./media.css";
import EditorElement from "../base/editor-element/editor-element";

const iconSelect = svg`
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
`;

const iconUpload = svg`
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/></svg>
`;

const iconEdit = svg`
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
`;

const iconReset = svg`
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <path d="M6,19a2.006,2.006,0,0,0,2,2h8a2.006,2.006,0,0,0,2-2V7H6ZM8,9h8V19H8Zm7.5-5-1-1h-5l-1,1H5V6H19V4Z"/>
</svg>
`;

const mediaLoader = html`
  <div class="ck-media__loader">
    <div class="ck-media__spinner">
      <div class="ck-media__bounce ck-media__bounce--1"></div>
      <div class="ck-media__bounce ck-media__bounce--2"></div>
      <div class="ck-media__bounce ck-media__bounce--3"></div>
    </div>
  </div>
`;

export default class Media extends EditorElement {
  static get properties() {
    return {
      loaderIsVisible: Boolean,
      mediaType: { attribute: "data-media-type", type: String },
      mediaUuid: { attribute: "data-media-uuid", type: String },
      mediaDisplay: { attribute: "data-media-display", type: String },
      enableUpload: { attribute: "ck-upload", type: Boolean },
      enableEdit: { attribute: "ck-edit", type: Boolean },
      enableReset: { type: Boolean },
      buttonPosition: { attribute: "ck-button-position", type: String },
      preview: String,
      error: Boolean
    };
  }

  validate() {
    const hadError = this.error;

    this.error = !this.mediaUuid;
    if (!hadError && this.error) {
      this.emitElementValidationErrorEvent(
        "Media is required",
        "media_required"
      );
    } else if (hadError && !this.error) {
      this.emitElementValidationErrorResolvedEvent();
    }
  }

  connectedCallback() {
    super.connectedCallback();

    // Textfield errors immediately highlighted
    this.requestInformation("show-errors", {}, showErrors => {
      if (showErrors) {
        this.validate();
      }
    });
    this.enableReset = !this.getAttribute("ck-validation") && !!this.mediaUuid;
  }

  renderPreview() {
    this.loaderIsVisible = true;
    this.requestInformation(
      "media-preview",
      {
        type: this.mediaType,
        uuid: this.mediaUuid,
        display: this.mediaDisplay
      },
      preview => {
        this.preview = preview;
        this.loaderIsVisible = false;
      }
    );
  }

  updated(properties) {
    this.previewPane = this.shadowRoot.querySelector(".ck-media__preview");
    if (properties.has("mediaUuid") && this.mediaUuid) {
      this.validate();
      this.renderPreview();
    }

    if (properties.has("preview") && this.preview) {
      this.previewPane.innerHTML = this.preview;
    }

    this.enableReset = !this.getAttribute("ck-validation") && !!this.mediaUuid;
  }

  render() {
    return html`
      <style>
        ${styles}
      </style>
      <div class="ck-media ${this.error ? "error" : "no-error"}">
        <div
          class="ck-media__preview ${this.preview ? "visible" : "hidden"}"
        ></div>
        <div
          class="ck-media__placeholder ${this.preview ? "hidden" : "visible"}"
        ></div>
        ${this.loaderIsVisible ? mediaLoader : null}
        ${this.inEditor
          ? html`
              <div
                class="ck-media__buttons ${this.buttonPosition ||
                  "bottom-right"}"
              >
                <button class="select" @click=${this.selectHandler}>
                  ${iconSelect}
                </button>
                ${this.enableUpload
                  ? html`
                      <button class="upload" @click=${this.uploadHandler}>
                        ${iconUpload}
                      </button>
                    `
                  : null}
                ${this.enableEdit
                  ? html`
                      <button class="edit" @click=${this.editHandler}>
                        ${iconEdit}
                      </button>
                    `
                  : null}
                ${this.enableReset
                  ? html`
                      <button class="reset" @click=${this.resetHandler}>
                        ${iconReset}
                      </button>
                    `
                  : null}
              </div>
            `
          : null}
      </div>
    `;
  }

  selectHandler() {
    this.requestInformation(
      "media-select",
      {
        type: this.mediaType,
        uuid: this.mediaUuid
      },
      uuid => {
        this.modifyDocument(editor => {
          editor.attributes(this, {
            "data-media-uuid": uuid
          });
        });
      }
    );
  }

  uploadHandler() {
    this.requestInformation(
      "media-upload",
      {
        type: this.mediaType,
        uuid: this.mediaUuid
      },
      uuid => {
        this.modifyDocument(editor => {
          editor.attributes(this, {
            "data-media-uuid": uuid
          });
        });
      }
    );
  }

  editHandler() {
    this.requestInformation(
      "media-edit",
      {
        type: this.mediaType,
        uuid: this.mediaUuid
      },
      () => {
        this.renderPreview();
      }
    );
  }

  resetHandler() {
    this.modifyDocument(editor => {
      editor.attributes(this, {
        "data-media-uuid": ""
      });
      this.mediaUuid = "";
      this.preview = "";
    });
  }
}
