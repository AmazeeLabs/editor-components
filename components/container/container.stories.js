import { storiesOf } from "@storybook/html";

// Import the container and define a custom element.
import "./index";
import "../section/index";
import Editor from "../base/editor/editor";
import notes from "./container.md";

storiesOf("Container", module)
  .addDecorator(Editor.dummySetup)
  .addDecorator(Editor.decorator)
  .add(
    "simple",
    () => `<ck-container ck-contains="text image"></ck-container>`,
    {
      notes: { markdown: notes }
    }
  )
  .add(
    "prefilled",
    () => `
    <ck-container ck-contains="text image">
      ${Editor.templates.text}
      ${Editor.templates.image()}
    </ck-container>
  `
  )
  .add("single item", () => Editor.templates.image())
  .add(
    "merged",
    () => `
    <ck-container ck-contains="text image">
      ${Editor.templates.added()}
      ${Editor.templates.removed()}
    </ck-container>
  `
  )
  .add(
    "maximum items",
    () => `
    <ck-container ck-max="3" ck-contains="text image"></ck-container>
    `
  )
  .add(
    "maximum items reached",
    () => `
    <ck-container ck-max="1" ck-contains="text image">
      ${Editor.templates.text}
    </ck-container>
    `
  )
  .add(
    "minimum items",
    () => `
    <ck-container ck-min="1" ck-contains="text image">
    </ck-container>
    `
  )
  .add(
    "range of items",
    () => `
    <ck-container ck-min="1" ck-max="3" ck-contains="text image">
    </ck-container>
    `
  );
