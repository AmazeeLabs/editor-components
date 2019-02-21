import { storiesOf } from "@storybook/html";

// Import the container and define a custom element.
import "./container";
import Editor from "../editor/editor";
import notes from "./container.md";

storiesOf("Container", module)
  .addDecorator(Editor.dummySetup)
  .addDecorator(Editor.decorator)
  .add("simple", () => `<ck-container sections="text image"></ck-container>`, {
    notes: { markdown: notes }
  })
  .add(
    "prefilled",
    () => `
    <ck-container sections="text image">
      ${Editor.templates.text}
      ${Editor.templates.image()}
    </ck-container>
  `
  )
  .add("single item", () => Editor.templates.image());
