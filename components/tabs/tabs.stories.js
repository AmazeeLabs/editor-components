import { storiesOf } from "@storybook/html";
import "./tabs";

storiesOf("Tabs", module).add("Default", () => {
  let itemContent = 1;
  let itemTitle = 1;
  // create ck-tabs
  const tabs = document.createElement("ck-tabs");
  tabs.style.width = "1000px";
  tabs.style.display = "block";
  // create ck-tabs-item
  const tabsItem = document.createElement("ck-tabs-item");
  tabsItem.innerHTML = `<div><div style="padding: 40px; background-color: lime">hello ${itemContent}</div></div>`;
  tabsItem.setAttribute("data-title-attribute", `contentClass`);
  tabsItem.setAttribute("data-content-class", `Dynamic title`);
  tabsItem.setAttribute("data-default", true);
  tabsItem.classList.add("active");
  tabs.appendChild(tabsItem);

  // create ck-modal
  const modal = document.createElement("ck-modal");
  modal.setAttribute("data-default", true);

  // create button for changing attribute
  const button = document.createElement("button");
  button.innerHTML = `Change attribute`;
  button.style.display = "block";
  button.onclick = () => {
    tabsItem.setAttribute("data-title", `LALALALALA`);
  };
  const body = document.querySelectorAll("body");
  body[0].appendChild(button);
  // tabs eventListener
  tabs.addEventListener("addItem", () => {
    const additionalTabsItem = document.createElement("ck-tabs-item");
    additionalTabsItem.innerHTML = `<div><div style="padding: 40px; background-color: lime">hello ${++itemContent}</div></div>`;
    additionalTabsItem.setAttribute("data-title", `title item ${++itemTitle}`);
    additionalTabsItem.setAttribute("data-default", false);
    tabs.appendChild(additionalTabsItem);
  });
  tabs.addEventListener("deleteItem", e => {
    const list = document.getElementsByTagName("ck-tabs")[0];
    tabs.removeChild(list.childNodes[e.detail]);
  });

  // Update item (title & default)
  tabs.addEventListener("eventSaveModal", e => {
    const list = document.querySelectorAll("ck-tabs-item");

    if (e.detail.default) {
      Array.from(list).map(item => {
        item.setAttribute("data-default", false);
      });
      list[e.detail.index].setAttribute("data-default", e.detail.default);
    }
    list[e.detail.index].setAttribute("data-title", e.detail.title);
  });

  return tabs;
});
