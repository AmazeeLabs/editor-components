import { storiesOf } from "@storybook/html";
import Editor from "../base/editor/editor";
import "./index";

storiesOf("Tabs", module)
  .addDecorator(Editor.dummySetup)
  .addDecorator(Editor.decorator)
  .add(
    "Empty",
    () => `<ck-tabs ck-contains="text image" ck-max="3"></ck-tabs>`
  );
