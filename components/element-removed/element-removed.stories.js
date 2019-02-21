import { storiesOf } from "@storybook/html";

import "./element-removed";
import Editor from "../editor/editor";

storiesOf("Element Removed", module)
  .addDecorator(Editor.dummySetup)
  .addDecorator(Editor.decorator)
  .add("Default", () => `<ck-removed>${Editor.templates.text}</ck-removed>`)
  .add("Image", () => `<ck-removed>${Editor.templates.image()}</ck-removed>`);
