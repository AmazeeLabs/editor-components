import { storiesOf } from "@storybook/html";

import "./element-added";
import Editor from "../editor/editor";

storiesOf("Element Added", module)
  .addDecorator(Editor.dummySetup)
  .addDecorator(Editor.decorator)
  .add("Default", () => `<ck-added>${Editor.templates.text}</ck-added>`)
  .add("Image", () => `<ck-added>${Editor.templates.image()}</ck-added>`);
