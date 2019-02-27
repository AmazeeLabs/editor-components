import { storiesOf } from "@storybook/html";
import "../gallery/gallery";
import "../placeholder/placeholder";
import "!style-loader!css-loader!./editor.css";
import page from "!raw-loader!./templates/page.html";

import Editor from "./editor";

storiesOf("Editor", module)
  .addDecorator(Editor.dummySetup)
  .addDecorator(Editor.decorator)
  .add("Default", () => page);
