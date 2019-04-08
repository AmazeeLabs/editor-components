import { storiesOf } from "@storybook/html";
import "./index";
import Editor from "../base/editor/editor";

storiesOf("Text Conflict", module)
  .addDecorator(Editor.decorator)
  .add(
    "Default",
    () => `
  <ck-conflict-text>
    <ck-conflict-option from="source"><p>Source version</p></ck-conflict-option>
    <ck-conflict-option from="left"><p>Left version</p></ck-conflict-option>
    <ck-conflict-option from="right"><p>Right version</p></ck-conflict-option>
    <ck-conflict-option from="empty"><p></p></ck-conflict-option>
  </ck-conflict-text>
  `
  );
