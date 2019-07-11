import { html } from "lit-element";
import EditorElement from "../base/editor-element/editor-element";

export default class Container extends EditorElement {
  static get properties() {
    return {
      sections: { type: String, attribute: "ck-contains" },
      numberOfChildren: { type: Number },
      max: { type: Number, attribute: "ck-max" },
      min: { type: Number, attribute: "ck-min" },
      closed: { type: Boolean, attribute: "ck-closed" },
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
    this.closed = false;
  }

  firstUpdated() {
    this.processChildren();
  }

  connectedCallback() {
    super.connectedCallback();
    this.processChildren();
  }

  processChildren() {
    this.numberOfChildren = Array.from(this.children).filter(
      child => child.nodeName !== "BR"
    ).length;

    if (!this.max) {
      this.max = 0;
    }

    if (!this.min) {
      this.min = 0;
    }

    if (this.numberOfChildren >= this.min) {
      Array.from(this.children).forEach((child, index) => {
        child.dispatchEvent(
          new CustomEvent("containerUpdate", {
            detail: {
              inContainer: true,
              containerSections: this.sections,
              containerIndex: index,
              containerMax: this.max,
              containerItems: this.numberOfChildren || 0
            }
          })
        );
      });
    } else {
      const options = this.sections.split(" ");
      if (options.length === 1) {
        const element = options[0];
        this.modifyDocument(editor => {
          for (let i = this.numberOfChildren; i < this.min; i += 1) {
            editor.insert(element, this, "end");
          }
        });
      }
    }
  }

  render() {
    return html`
      <div class="container"><slot></slot></div>
      ${
        this.inEditor && (this.numberOfChildren < this.max || this.max === 0)
          ? html`
              <ck-placeholder
                @ckEditorOperation="${this.appendHandler}"
                ?closed="${!this.closed}"
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
    this.modifyDocument(editor =>
      editor.insert(event.detail.section, this, "end")
    );
  }
}
