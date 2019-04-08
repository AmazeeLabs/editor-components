import { storiesOf } from "@storybook/html";
import "./index";

import Editor from "../base/editor/editor";

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
