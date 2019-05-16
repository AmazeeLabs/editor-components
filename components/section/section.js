import { css } from "lit-element";
import { html, svg } from "lit-html";
import global from "global";
import EditorElement from "../base/editor-element/editor-element";

const iconUp = svg`
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <g id="baseline-arrow_back-24px" transform="translate(24) rotate(90)">
    <path id="Path_91" data-name="Path 91" d="M20,11H7.83l5.59-5.59L12,4,4,12l8,8,1.41-1.41L7.83,13H20Z" fill="#fff"/>
  </g>
</svg>
`;

const iconDown = svg`
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <g id="baseline-arrow_forward-24px_1_" data-name="baseline-arrow_forward-24px (1)" transform="translate(24) rotate(90)">
    <path id="Path_93" data-name="Path 93" d="M12,4,10.59,5.41,16.17,11H4v2H16.17l-5.58,5.59L12,20l8-8Z" fill="#fff"/>
  </g>
</svg>
`;

const iconDelete = svg`
<svg id="icon_delete" data-name="icon delete" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <path id="Path_84" data-name="Path 84" d="M5.889,17.222A1.783,1.783,0,0,0,7.667,19h7.111a1.783,1.783,0,0,0,1.778-1.778V6.556H5.889ZM7.667,8.333h7.111v8.889H7.667Zm6.667-4.444L13.444,3H9l-.889.889H5V5.667H17.444V3.889Z" transform="translate(1 1)" fill="#fff"/>
</svg>
`;

const iconConfigure = svg`
<svg id="icon_more_vertical" data-name="icon more vertical" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <path id="Path_103" data-name="Path 103" d="M12,8a2,2,0,1,0-2-2A2.006,2.006,0,0,0,12,8Zm0,2a2,2,0,1,0,2,2A2.006,2.006,0,0,0,12,10Zm0,6a2,2,0,1,0,2,2A2.006,2.006,0,0,0,12,16Z" fill="#fff"/>
</svg>
`;

/**
 * Root element for section templates.
 *
 * Handles container movement and element diffing.
 */
export default class Section extends EditorElement {
  static get properties() {
    return {
      // Diffing specific attributes.
      added: { type: Boolean },
      removed: { type: Boolean },

      // Container management.
      inContainer: { type: Boolean },
      containerIndex: { type: Number },
      containerMax: { type: Number },
      containerItems: { type: Number },
      containerSections: { type: String },
      isHovered: { type: Boolean },
      error: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.added = false;
    this.removed = false;

    this.inContainer = false;
    this.containerIndex = 0;
    this.containerItems = 0;
    this.containerSections = false;

    this.addEventListener("containerUpdate", event => {
      event.stopImmediatePropagation();
      event.stopPropagation();
      event.preventDefault();
      this.containerUpdate(event);
    });

    // TODO: Decide if hovered state should be displayed for multiple elements at once.
    // this.addEventListener("mouseover", event => {
    //   this.isHovered = true;
    //   event.stopImmediatePropagation();
    //   event.stopPropagation();
    //   event.preventDefault();
    // });
    //
    // this.addEventListener("mouseout", event => {
    //   this.isHovered = false;
    // });

    this.addEventListener("ck-editor:element-validation-error", event => {
      this.error = true;
    });

    this.addEventListener(
      "ck-editor:element-validation-error-resolved",
      event => {
        this.error = false;
      }
    );
  }

  hasError() {
    return this.error;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  handleAccept() {
    if (this.added) {
      this.modifyDocument(editor => editor.removeAttribute(this, "added"));
    } else {
      this.modifyDocument(editor => editor.remove(this));
    }
  }

  handleDecline() {
    if (this.removed) {
      this.modifyDocument(editor => editor.removeAttribute(this, "removed"));
    } else {
      this.modifyDocument(editor => editor.remove(this));
    }
  }

  get containerFirst() {
    return this.containerIndex === 0;
  }

  get containerLast() {
    return this.containerIndex === this.containerItems - 1;
  }

  containerUpdate({
    detail: {
      inContainer,
      containerSections,
      containerIndex,
      containerMax,
      containerItems
    }
  }) {
    this.inContainer = inContainer;
    this.containerSections = containerSections;
    this.containerIndex = containerIndex;
    this.containerMax = containerMax;
    this.containerItems = containerItems;
  }

  upHandler() {
    if (!this.containerFirst) {
      const diff =
        global.window.scrollY +
        this.parentElement.children[this.containerIndex - 1].offsetTop -
        this.offsetTop;
      global.scrollTo(0, diff);
      this.modifyDocument(editor =>
        editor.move(
          this.parentElement,
          "before",
          this.containerIndex,
          this.containerIndex - 1
        )
      );
    }
  }

  downHandler() {
    if (!this.containerLast) {
      const diff =
        global.scrollY +
        (this.containerIndex < this.containerItems - 2
          ? this.parentElement.children[this.containerIndex + 2].offsetTop -
            this.parentElement.children[this.containerIndex + 1].offsetTop
          : this.parentElement.children[this.containerIndex + 1].offsetHeight);
      global.scrollTo(0, diff);
      this.modifyDocument(editor =>
        editor.move(
          this.parentElement,
          "after",
          this.containerIndex,
          this.containerIndex + 1
        )
      );
    }
  }

  removeHandler() {
    this.modifyDocument(editor => editor.remove(this));
  }

  insertHandler(event) {
    this.modifyDocument(editor =>
      editor.insert(
        event.detail.section,
        this.parentElement,
        "before",
        this.containerIndex
      )
    );
  }

  render() {
    const upButton = html`
      <button
        class="up${this.containerFirst ? " disabled" : ""}"
        @click="${() => this.upHandler()}"
      >
        ${iconUp}
      </button>
    `;

    const downButton = html`
      <button
        class="up${this.containerLast ? " disabled" : ""}"
        @click="${() => this.downHandler()}"
      >
        ${iconDown}
      </button>
    `;

    return html`
      <div class="${this.isHovered ? "hovered" : ""}">
        ${this.inContainer
          ? html`
              ${this.containerItems < this.containerMax ||
              this.containerMax === 0
                ? html`
                    <ck-placeholder
                      collapsed="true"
                      @ckEditorOperation="${event => this.insertHandler(event)}"
                      sections="${this.containerSections}"
                    ></ck-placeholder>
                  `
                : null}
              ${this.added || this.removed
                ? null
                : html`
                    <div class="controls">
                      ${this.containerFirst ? null : upButton}
                      ${this.containerLast ? null : downButton}
                      <button
                        class="remove"
                        @click="${() => this.removeHandler()}"
                      >
                        ${iconDelete}
                      </button>
                      <button class="configure disabled">
                        ${iconConfigure}
                      </button>
                    </div>
                  `}
            `
          : null}
        <div class="${this.inContainer ? "item" : ""}">
          ${this.added || this.removed
            ? html`
                <div class="overlay ${this.added ? "added" : "removed"}">
                  <slot></slot>
                  <div class="overlay__background">
                    <div class="actions">
                      <button
                        class="accept"
                        @click=${this.handleAccept.bind(this)}
                      >
                        Accept
                      </button>
                      <button
                        class="decline"
                        @click=${this.handleDecline.bind(this)}
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              `
            : html`
                <slot></slot>
              `}
        </div>
      </div>
    `;
  }
}

Section.styles = css`
  :host {
    --button-size: 3em;
    --button-background-color: black;
    --button-foreground-color: white;
    --outline-color: #004adc;
    --color-light-green: rgba(91, 200, 156, 0.3);
    --color-light-red: rgba(215, 34, 34, 0.3);
    --color-green: #5bc89c;
    --color-red: #d72222;
    --highlight-padding: 0px;

    position: relative;
    display: block;
  }

  .overlay {
    position: relative;
  }

  .overlay.removed {
  }

  .overlay__background {
    position: absolute;
    border: 2px solid var(--color-green);
    top: calc(var(--highlight-padding) * -1);
    left: calc(var(--highlight-padding) * -1);
    bottom: calc(var(--highlight-padding) * -1);
    right: calc(var(--highlight-padding) * -1);
    background: var(--color-light-green);
    z-index: 5;
  }

  .removed .overlay__background {
    background: var(--color-light-red);
    border: 2px solid var(--color-red);
  }

  .actions {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 200px;
    height: 20px;
    margin: auto;
  }

  .overlay:hover .actions {
    visibility: visible;
    opacity: 1;
    transition: visibility 0.35s linear, opacity 0.35s;
  }

  button {
    border: none;
    color: white;
    cursor: pointer;
    font-family: inherit;
    padding: 5px 10px;
  }

  button.accept {
    background-color: var(--color-green);
    margin-right: 20px;
  }

  button.decline {
    background-color: var(--color-red);
  }

  .controls {
    z-index: 1;
    position: absolute;
    right: 0;
    display: flex;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  /* TODO: Decide if we need a hovered class or :hover is enough. */
  :hover .item {
    outline-style: solid;
    outline-width: 2px;
    outline-color: var(--outline-color);
  }

  /* TODO: Decide if we need a hovered class or :hover is enough. */
  :hover .controls {
    opacity: 1;
  }

  .controls button {
    border: none;
    background: var(--button-background-color);
    width: var(--button-size);
    height: var(--button-size);
    padding: 2px;
    display: flex;
    cursor: pointer;
  }

  svg {
    width: 100%;
  }

  svg * {
    fill: var(--button-foreground-color);
  }

  .disabled {
    opacity: 0.5;
    pointer-events: none;
    cursor: auto;
  }
`;
