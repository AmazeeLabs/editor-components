import { storiesOf } from "@storybook/html";
import "./gallery";

import Editor from "../editor/editor";

storiesOf("Gallery", module)
  .addDecorator(Editor.dummySetup)
  .addDecorator(Editor.decorator)
  .add(
    "Default",
    () =>
      `<ck-gallery section="image" style="width: 500px">${Editor.templates.image()}</ck-gallery>`
  );
