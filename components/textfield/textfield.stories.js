import { storiesOf } from "@storybook/html";
import Editor from "../editor/editor";
import "./textfield";

storiesOf("Textfield", module)
  .addDecorator(Editor.dummySetup)
  .addDecorator(Editor.decorator)
  .add("Simple", () => `<ck-textfield contenteditable="true">This is editable</ck-textfield>`);
