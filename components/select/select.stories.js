import { storiesOf } from "@storybook/html";
import "./index";
import Editor from "../base/editor/editor";

storiesOf("Select Element", module)
  .addDecorator(Editor.dummySetup)
  .addDecorator(Editor.decorator)
  .add(
    "Default",
    () => `
  <ck-select ck-options="Value 1, Value 2" data-selected="Value 1"></ck-select>
  `
  );
