import { storiesOf } from "@storybook/html";
import "./index";

import Editor from "../base/editor/editor";

function randomUuid() {
  return `${200 + Math.ceil(Math.random() * 200)}`;
}

function addMediaHandlers(document) {
  document.addEventListener(
    "ck-editor:media-select",
    event => {
      console.log("HHHLHLHLH");
      event.respond(randomUuid());
    },
    { capture: true }
  );
  document.addEventListener(
    "ck-editor:media-preview",
    event => {
      window.setTimeout(() => {
        event.respond(
          `<img width="100%" src="https://placekitten.com/500/${
            event.detail.uuid
          }" />`
        );
      }, 200);
    },
    { capture: true }
  );
}

function addValidationHandler(document) {
  document.addEventListener("ck-editor:element-validation-error", event => {
    console.log("ck-editor:element-validation-error", event);
  });
}

storiesOf("Gallery", module)
  .addDecorator(Editor.dummySetup)
  .addDecorator(Editor.decorator)
  .add(
    "Default",
    () =>
      `<ck-gallery ck-contains="image text" style="width: 500px">${Editor.templates.image()}</ck-gallery>`
  )
  .add(
    "Max items",
    () =>
      `<ck-gallery ck-contains="image text" ck-max="3" style="width: 500px">${Editor.templates.image()}</ck-gallery>`
  );

storiesOf("Gallery", module)
  .addDecorator(Editor.dummySetup)
  .addDecorator(Editor.decorator)
  .addDecorator(Editor.showErrors)
  .add("Errors", () => {
    addMediaHandlers(document);
    addValidationHandler(document);
    return `<ck-gallery ck-contains="image text media" style="width: 500px">${Editor.templates.image()}</ck-gallery>`;
  });
