import { LitElement, html } from "lit-element";
import styles from "./tabs.css";
import modalStyles from "./modal.css";

class Tabs extends LitElement {
  static get properties() {
    return {
      items: Array,
      currentTab: Number,
      modalIsOpen: Boolean
    };
  }

  constructor() {
    super();
    this.items = [];
    this.currentTab = 0;
    this.modalIsOpen = false;
  }

  connectedCallback() {
    super.connectedCallback();
    const self = this;
    const slots = this.shadowRoot;

    const observer = new MutationObserver(mutationsList => {
      mutationsList.forEach(mutation => {
        if (mutation.type === "attributes") {
          self.updateTabDom();
        }
      });
    });

    observer.observe(self, {
      attributes: true,
      childList: false,
      subtree: true
    });

    slots.addEventListener("slotchange", () => {
      self.updateTabDom();
    });

    self.updateTabDom();
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

  deleteItem() {
    if (this.items.length >= 2) {
      this.dispatchEvent(
        new CustomEvent("deleteItem", { detail: this.currentTab })
      );
      if (this.currentTab === this.items.length - 1) {
        this.currentTab -= 1;
      }
    }
  }

  updateTabDom() {
    this.items = Array.from(this.children).map((child, index) => {
      return {
        title: child.dataset.title
          ? child.dataset.title
          : child.dataset[child.dataset.titleAttribute],
        default: child.dataset.default,
        index
      };
    });
    this.setTabsItem(this.currentTab);
  }

  setTabsItem(index) {
    if (this.children.length <= index || !this.children[index]) {
      return;
    }
    this.currentTab = index;
  }

  tabTitleAction(item) {
    if (this.currentTab === item.index) {
      this.openModal(item);
    } else {
      this.setTabsItem(item.index);
    }
  }

  tabTitle(item) {
    return html`
      <li
        @click="${() => this.tabTitleAction(item)}"
        class="ck-tabs__header-tab-item ${this.currentTab === item.index
          ? "active"
          : ""}
        ${item.default === "true" ? "default" : ""}"
      >
        ${item.title}
      </li>
    `;
  }

  saveModal(item) {
    this.dispatchEvent(new CustomEvent("eventSaveModal", { detail: item }));
  }

  openModal() {
    this.modalIsOpen = true;
  }

  closeModal() {
    this.modalIsOpen = false;
  }

  addItem() {
    this.dispatchEvent(new Event("addItem"));
    this.currentTab = this.items.length;
  }
}

class TabsItem extends LitElement {
  render() {
    return html`
      <style>
        ${styles}
      </style>

      <div class="ck-tabs__item">
        <slot></slot>
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
          <h3 class="modal__title">Add variation</h3>
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
customElements.define("ck-tabs-item", TabsItem);
