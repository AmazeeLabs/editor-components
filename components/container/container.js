import { html, customElement } from "lit-element";
import EditorElement from "../base/editor-element/editor-element";

export default class Container extends EditorElement {
  static get properties() {
    return {
      sections: { type: String, attribute: "ck-contains" },
      numberOfChildren: { type: Number },
      max: { type: Number, attribute: "ck-max" }
    };
  }

  constructor() {
    super();
    this.observer = null;
    this.observer = new MutationObserver(() => this.processChildren());
    this.observer.observe(this, {
      attributes: false,
      childList: true,
      subtree: false
    });
  }

  firstUpdated() {
    this.processChildren();
  }

  processChildren() {
    this.numberOfChildren = this.children.length;
    if (!this.max) {
      this.max = 0;
    }
    Array.from(this.children).forEach((child, index) => {
      child.dispatchEvent(
        new CustomEvent("containerUpdate", {
          detail: {
            inContainer: true,
            containerSections: this.sections,
            containerIndex: index,
            containerMax: this.max,
            containerItems: this.children.length || 0
          }
        })
      );
    });
  }

  render() {
    return html`
      <div class="container"><slot></slot></div>
      ${
        this.inEditor && (this.numberOfChildren < this.max || this.max === 0)
          ? html`
              <ck-placeholder
                @ckEditorOperation="${this.appendHandler}"
                closed="true"
                sections="${this.sections}"
              >
              </ck-placeholder>
            `
          : null
      }
      </ck-placeholder>
    `;
  }

  appendHandler(event) {
    this.editor.insert(event.detail.section, this, "end");
  }
}
