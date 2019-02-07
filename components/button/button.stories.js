import { storiesOf } from "@storybook/html";
import buttonNotes from "./button.md";
import "./button";

storiesOf("Button", module).add(
  "Default",
  () => {
    const button = document.createElement("ck-button");
    button.innerHTML = "<p>Button content</p>";
    button.style.backgroundColor = "#ff9c38";
    button.style.display = "block";
    button.style.padding = "0.5em 1.5em 0.5em 2em";
    button.style.color = "white";
    button.style.setProperty("--icon-color", "white");
    button.style.borderRadius = "1.5em";
    button.setAttribute("target", "http://drupal.org");
    button.addEventListener("selectLink", event => {
      if (event.detail) {
        button.removeAttribute("target");
      } else {
        button.setAttribute("target", "http://drupal.org");
      }
    });
    return button;
  },
  {
    notes: { markdown: buttonNotes }
  }
);
