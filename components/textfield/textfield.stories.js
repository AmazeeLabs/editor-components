import { storiesOf } from "@storybook/html";
import Editor from "../editor/editor";
import "./textfield";

storiesOf("Textfield", module)
  .addDecorator(Editor.dummySetup)
  .addDecorator(Editor.decorator)
  .add(
    "Simple",
    () => `<ck-textfield contenteditable="true">This is editable</ck-textfield>`
  )
  .add(
    "Min",
    () =>
      `<ck-textfield ck-min="3" contenteditable="true">This is editable</ck-textfield>`
  )
  .add(
    "Max",
    () =>
      `<ck-textfield ck-max="5" contenteditable="true">This is editable</ck-textfield>`
  )
  .add(
    "Range",
    () =>
      `<ck-textfield ck-min="3" ck-max="5" contenteditable="true">This is editable</ck-textfield>`
  )
  .add(
    "Pattern",
    () =>
      `<ck-textfield ck-pattern="[abc]" ck-error-message="Please use only a, b or c." contenteditable="true">This is editable</ck-textfield>`
  );
