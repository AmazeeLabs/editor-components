import { storiesOf } from "@storybook/html";
import Editor from "../editor/editor";
import "./textfield";

storiesOf("Textfield", module)
  .addDecorator(Editor.dummySetup)
  .addDecorator(Editor.decorator)
  .add(
    "Simple",
    () =>
      `<ck-textfield style="margin-top: 40px" ck-message-helper="here to help you"><span contenteditable="true">This is editable</span></ck-textfield>`
  )
  .add(
    "Min",
    () =>
      `<ck-textfield style="margin-top: 40px" ck-min="3" ck-message-helper="here to help you"><span contenteditable="true">This is editable</span></ck-textfield>`
  )
  .add(
    "Max",
    () =>
      `<ck-textfield style="margin-top: 40px" ck-max="5"><span contenteditable="true">This is editable</span></ck-textfield>`
  )
  .add(
    "Range",
    () =>
      `<ck-textfield style="margin-top: 40px" ck-min="3" ck-max="9" ck-message-helper="here to help you"><span contenteditable="true">This is editable</span></ck-textfield>`
  )
  .add(
    "Pattern",
    () =>
      `<ck-textfield style="margin-top: 40px" ck-pattern="[abc]" ck-message-helper="here to help you" ck-error-message="Please use only a, b or c."><span contenteditable="true">This is editable</span></ck-textfield>`
  );
