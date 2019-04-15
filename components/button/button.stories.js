import { storiesOf } from "@storybook/html";
import buttonNotes from "./button.md";
import "./index";
import Editor from "../base/editor/editor";

storiesOf("Button", module)
  .addDecorator(Editor.decorator)
  .add(
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
      button.setAttribute("contenteditable", true);
      document.addEventListener(
        "ck-editor:select-link",
        event => {
          if (event.detail.target) {
            event.respond(null);
          } else {
            event.respond("http://drupal.org");
          }
        },
        { capture: true }
      );
      return button;
    },
    {
      notes: { markdown: buttonNotes }
    }
  );
