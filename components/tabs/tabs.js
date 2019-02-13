import { LitElement, html } from "lit-element";
import styles from "./tabs.css";

class Tabs extends LitElement {
  static get properties() {
    return {
      items: Array,
      currentTabs: Number
    };
  }

  constructor() {
    super();
    this.items = [];
    this.currentTabs = 0;
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

    observer.observe(self.children[0], {
      attributes: true,
      childList: false,
      subtree: false
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
        <div class="ck-tabs__content">
          <div
            class="ck-tabs__rail"
            style="transform: translateX(${this.currentTabs * -100}%)"
          >
            <slot></slot>
          </div>
        </div>
      </div>
    `;
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
    this.setTabsItem(this.items.length - 1);
  }

  setTabsItem(index) {
    if (this.children.length <= index || !this.children[index]) {
      return;
    }
    this.currentTabs = index;
  }

  tabTitle(item) {
    return html`
      <li
        @click="${() => this.setTabsItem(item.index)}"
        class="ck-tabs__header-tab-item ${this.currentTabs === item.index
          ? "active"
          : ""}
        ${item.default === "true" ? "default" : ""}"
      >
        ${item.title}
      </li>
    `;
  }

  addItem() {
    this.dispatchEvent(new Event("addItem"));
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

customElements.define("ck-tabs", Tabs);
customElements.define("ck-tabs-item", TabsItem);
