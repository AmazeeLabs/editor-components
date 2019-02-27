import { LitElement, html, svg } from "lit-element";
import { render } from "lit-html";
import * as Operations from "../editor/operations";
import styles from "./tabs.css";
import modalStyles from "./modal.css";
import editIcon from "./icons/pencil.svg";

class Tabs extends LitElement {
  static get properties() {
    return {
      section: String,
      items: Array,
      currentTab: Number,
      modalIsOpen: Boolean
    };
  }

  constructor() {
    super();
    this.items = [];
    this.currentTab = -1;
    this.modalIsOpen = false;
    this.section = null;
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.ownerDocument.body.querySelector("#ck-tabs-modal")) {
      this.modal = this.ownerDocument.body.querySelector("#ck-tabs-modal");
    } else {
      this.modal = this.ownerDocument.createElement("div");
      this.modal.setAttribute("id", "ck-tabs-modal");
      this.ownerDocument.body.appendChild(this.modal);
    }

    const observer = new MutationObserver(() => this.processItems());
    observer.observe(this, {
      attributes: true,
      childList: true,
      subtree: true
    });

    this.processItems();

    if (this.children.length > 0) {
      this.currentTab = 0;
    }
  }

  processItems() {
    this.items = Array.from(this.children).map((child, index) => {
      return {
        title:
          (child.dataset.titleAttribute
            ? child.getAttribute(child.dataset.titleAttribute)
            : null) ||
          child.dataset.tabTitle ||
          "Untitled Tab",
        default: child.dataset.defaultTab,
        index
      };
    });
    this.setTabsItem(this.currentTab);
  }

  openModal() {
    this.modalIsOpen = true;
    render(this.renderModal(), this.modal);
  }

  closeModal() {
    this.modalIsOpen = false;
    render(this.renderModal(), this.modal);
  }

  renderModal() {
    return html`
      <ck-tabs-modal
        @eventCloseModal="${() => {
          this.closeModal();
        }}"
        @eventSaveModal="${e => {
          this.updateItem(e.detail);
        }}"
        @deleteTab="${() => this.deleteItem()}"
        currentTitle="${this.items[this.currentTab].title}"
        currentDefault="${this.items[this.currentTab].default}"
        currentIndex="${this.currentTab}"
        data-visible="${this.modalIsOpen ? "true" : "false"}"
      >
      </ck-tabs-modal>
    `;
  }

  render() {
    return html`
      <style>
        ${styles}
      </style>

      <div class="ck-tabs">
        <div class="ck-tabs__header">
          <ul class="ck-tabs__header-tab-list">
            ${this.items.map(item => this.tabTitle(item))}
            <li
              @click="${() => this.addItem()}"
              class="ck-tabs__header-tab-add"
            ></li>
          </ul>
        </div>
        <ck-modal
          @eventCloseModal="${() => {
            this.closeModal();
          }}"
          @eventSaveModal="${e => {
            this.saveModal(e.detail);
          }}"
          @deleteTab="${() => this.deleteItem()}"
          currentTitle="${this.items[this.currentTab].title}"
          currentDefault="${this.items[this.currentTab].default}"
          currentIndex="${this.currentTab}"
          data-visible="${this.modalIsOpen ? "true" : "false"}"
        >
        </ck-modal>
        <div class="ck-tabs__content">
          <div
            class="ck-tabs__rail"
            style="transform: translateX(${this.currentTab * -100}%)"
          >
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }

  tabTitle(item) {
    return html`
      <li
        @click="${() => this.setTabsItem(item.index)}"
        class="ck-tabs__header-tab-item ${this.currentTab === item.index
          ? "active"
          : ""}
        ${item.default === "true" ? "default" : ""}"
      >
        ${item.title}
        <span
          @click="${() => this.openModal(item)}"
          class="ck-tabs__header-icon"
        >
          ${svg([editIcon])}
        </span>
      </li>
    `;
  }

  deleteItem() {
    if (this.items.length >= 2) {
      this.dispatchEvent(Operations.remove(this.children[this.currentTab]));
      if (this.currentTab === this.items.length - 1) {
        this.currentTab -= 1;
      }
    }
  }

  setTabsItem(index) {
    if (this.children.length <= index || !this.children[index]) {
      return;
    }
    this.currentTab = index;
  }

  addItem() {
    this.currentTab = this.items.length;
    this.dispatchEvent(
      Operations.insert(this.section, this, "end", null, {
        "data-default-tab":
          Array.from(this.children).filter(
            child => child.dataset.defaultTab === "true"
          ).length === 0,
        "data-tab-title": "Untitled Tab"
      })
    );
  }

  updateItem(item) {
    this.dispatchEvent(
      Operations.batch(
        [
          Operations.attributes(this.children[item.index], {
            "data-tab-title": item.title,
            "data-default-tab": item.default
          })
        ].concat(
          item.default
            ? Array.from(this.children)
                .filter(
                  child =>
                    child.dataset.defaultTab === "true" &&
                    child !== this.children[item.index]
                )
                .map(child =>
                  Operations.attributes(child, { "data-default-tab": "false" })
                )
            : []
        )
      )
    );
  }
}

class Modal extends LitElement {
  static get properties() {
    return {
      isVisible: { type: Boolean, reflect: true },
      inputText: String,
      items: Array,
      isDefault: Boolean,
      currentDefault: String,
      currentIndex: String,
      currentTitle: String
    };
  }

  constructor() {
    super();
    this.isVisible = false;
    this.inputText = "";
    this.isDefault = false;
  }

  connectedCallback() {
    super.connectedCallback();
    const self = this;
    const observer = new MutationObserver(mutationsList => {
      mutationsList.forEach(mutation => {
        if (mutation.type === "attributes") {
          if (self.dataset.visible === "true") {
            self.isVisible = true;
            self.isDefault = self.currentDefault === "true";
            self.inputText = self.currentTitle;
          }
        }
      });
    });

    observer.observe(self, {
      attributes: true,
      childList: true,
      subtree: false
    });

    self.isDefault = self.currentDefault === "true";
    self.isVisible = self.dataset.visible === "true";
  }

  closeModal() {
    this.dispatchEvent(new Event("eventCloseModal"));
    this.isVisible = false;
  }

  handleInput(e) {
    this.inputText = e.target.value;
  }

  saveModal() {
    const response = {
      index: this.currentIndex,
      title: this.inputText,
      default: this.isDefault
    };
    this.dispatchEvent(new CustomEvent("eventSaveModal", { detail: response }));
    this.closeModal();
  }

  handleSwitch(e) {
    this.isDefault = e.target.checked;
  }

  deleteTab() {
    this.dispatchEvent(
      new CustomEvent("deleteTab", { detail: this.currentTab })
    );
    this.closeModal();
  }

  render() {
    return html`
      <style>
        ${modalStyles}
      </style>

      <div class="modal ${this.isVisible ? "visible" : ""}">
        <div class="modal__item">
          <h3 class="modal__title">Edit tab</h3>
          <div class="modal__content">
            <label class="modal__label" for="${this.currentIndex}">
              Variation name
            </label>
            <input
              class="modal__input"
              id="${this.currentIndex}"
              @input=${this.handleInput}
              .value=${this.currentTitle}
            />
            <div class="modal__toggle">
              <label class="switch">
                <input
                  type="checkbox"
                  .checked="${this.isDefault}"
                  @input="${e => this.handleSwitch(e)}"
                />
                <span class="slider"></span>
              </label>
              <span class="modal__toggle-label">Set as default</span>
            </div>
          </div>
          <div class="modal__actions">
            <div class="modal__action-wrap-delete">
              <span
                class="modal__action modal__action--delete"
                @click="${() => this.deleteTab()}"
              >
                Delete
              </span>
            </div>
            <span class="modal__action" @click="${() => this.closeModal()}">
              Cancel
            </span>
            <span
              class="modal__action modal__action--primary"
              @click="${() => this.saveModal()}"
            >
              save
            </span>
          </div>
        </div>
      </div>
    `;
  }
}

class Modal extends LitElement {
  static get properties() {
    return {
      isVisible: Boolean,
      inputText: String,
      items: Array,
      isDefault: Boolean,
      currentDefault: String,
      currentIndex: String,
      currentTitle: String
    };
  }

  constructor() {
    super();
    this.isVisible = false;
    this.inputText = "";
    this.isDefault = false;
  }

  connectedCallback() {
    super.connectedCallback();
    const self = this;
    const observer = new MutationObserver(mutationsList => {
      mutationsList.forEach(mutation => {
        if (mutation.type === "attributes") {
          if (self.dataset.visible === "true") {
            self.isVisible = true;
            self.isDefault = self.currentDefault === "true";
            self.inputText = self.currentTitle;
          }
        }
      });
    });

    observer.observe(self, {
      attributes: true,
      childList: true,
      subtree: false
    });

    self.isDefault = self.currentDefault === "true";
    self.isVisible = self.dataset.visible === "true";
  }

  closeModal() {
    this.dispatchEvent(new Event("eventCloseModal"));
    this.isVisible = false;
  }

  handleInput(e) {
    this.inputText = e.target.value;
  }

  saveModal() {
    const response = {
      index: this.currentIndex,
      title: this.inputText,
      default: this.isDefault
    };
    this.dispatchEvent(new CustomEvent("eventSaveModal", { detail: response }));
    this.closeModal();
  }

  handleSwitch(e) {
    this.isDefault = e.target.checked;
  }

  deleteTab() {
    this.dispatchEvent(new Event("deleteTab"));
    this.closeModal();
  }

  render() {
    return html`
      <style>
        ${modalStyles}
      </style>

      <div class="modal ${this.isVisible ? "visible" : ""}">
        <div class="modal__item">
          <h3 class="modal__title">Edit tab</h3>
          <div class="modal__content">
            <label class="modal__label" for="${this.icurrentIndex}">
              Variation name
            </label>
            <input
              class="modal__input"
              id="${this.currentIndex}"
              @input=${this.handleInput}
              .value=${this.currentTitle}
            />
            <div class="modal__toggle">
              <label class="switch">
                <input
                  type="checkbox"
                  .checked="${this.isDefault}"
                  @input="${e => this.handleSwitch(e)}"
                />
                <span class="slider"></span>
              </label>
              <span class="modal__toggle-label">Set as default</span>
            </div>
          </div>
          <div class="modal__actions">
            <div class="modal__action-wrap-delete">
              <span
                class="modal__action modal__action--delete"
                @click="${() => this.deleteTab()}"
              >
                Delete
              </span>
            </div>
            <span class="modal__action" @click="${() => this.closeModal()}">
              Cancel
            </span>
            <span
              class="modal__action modal__action--primary"
              @click="${() => this.saveModal()}"
            >
              save
            </span>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("ck-modal", Modal);
customElements.define("ck-tabs", Tabs);
customElements.define("ck-tabs-modal", Modal);
