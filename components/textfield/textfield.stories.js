import { storiesOf } from "@storybook/html";
import Editor from "../base/editor/editor";
import "./index";

storiesOf("Textfield", module)
  .addDecorator(Editor.dummySetup)
  .addDecorator(Editor.decorator)
  .add(
    "Simple",
    () =>
      `<ck-textfield ck-message-helper="here to help you"><span contenteditable="true">This is editable</span></ck-textfield>`
  )
  .add(
    "Min",
    () =>
      `<ck-textfield ck-min="3" ck-message-helper="here to help you"><span contenteditable="true">This is editable</span></ck-textfield>`
  )
  .add(
    "Max",
    () =>
      `<ck-textfield ck-max="5"><span contenteditable="true">This is editable</span></ck-textfield>`
  )
  .add(
    "Range",
    () =>
      `<ck-textfield ck-min="3" ck-max="9" ck-message-helper="here to help you"><span contenteditable="true">This is editable</span></ck-textfield>`
  )
  .add(
    "Pattern",
    () =>
      `<ck-textfield ck-pattern="[abc]" ck-message-helper="here to help you" ck-error-message="Please use only a, b or c."><span contenteditable="true">This is editable</span></ck-textfield>`
  )
  .add(
    "H1",
    () =>
      `<ck-textfield ck-pattern="[abc]" ck-message-helper="here to help you" ck-error-message="Please use only a, b or c."><h1 contenteditable="true">This is editable</h1></ck-textfield>`
  );

storiesOf("Textfield", module)
  .addDecorator(Editor.dummySetup)
  .addDecorator(Editor.decorator)
  .addDecorator(Editor.showErrors)
  .add(
    "Max reached",
    () =>
      `<ck-textfield ck-max="5"><span contenteditable="true">This is editable</span></ck-textfield>`
  );
