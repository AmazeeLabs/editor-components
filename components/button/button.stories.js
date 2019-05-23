import { storiesOf } from "@storybook/html";
import buttonNotes from "./button.md";
import "./index";
import Editor from "../base/editor/editor";

/**
 * Helper function to add ck-editor:select-link event handler.
 *
 * @todo: consider converting to a decorator.
 *
 * @param document
 */
function addEventHandlers(document) {
  document.addEventListener(
    "ck-editor:select-link",
    event => {
      if (event.detail['link-target']) {
        event.respond({
          href: null,
          "data-foo": "baz"
        });
      } else {
        event.respond({
          href: "http://drupal.org",
          "data-foo": "bar"
        });
      }
    },
    { capture: true }
  );
  document.addEventListener("ck-editor:element-validation-error", event => {
    console.log("ck-editor:element-validation-error", event);
  });
}

storiesOf("Button", module)
  .addDecorator(Editor.decorator)
  .add(
    "Default",
    () => {
      const button = document.createElement("ck-button");
      button.innerHTML = "<p>Button content</p>";
      button.style.backgroundColor = "#ff9c38";
      button.style.display = "block";
      button.style.color = "white";
      button.style.setProperty("--icon-color", "white");
      button.style.setProperty("--button-border-radius", "5px");
      button.style.setProperty("--button-background-color", "green");
      button.style.borderRadius = "1.5em";
      button.setAttribute("contenteditable", true);
      addEventHandlers(document);
      return button;
    },
    {
      notes: { markdown: buttonNotes }
    }
  );

storiesOf("Button", module)
  .addDecorator(Editor.decorator)
  .addDecorator(Editor.showErrors)
  .add(
    "Errors",
    () => {
      addEventHandlers(document);
      return `<ck-button contenteditable="true"><p>Please enter either A) text and link or B) no text and no link!</p></ck-textfield>`;
    },
    {
      notes: { markdown: buttonNotes }
    }
  );
