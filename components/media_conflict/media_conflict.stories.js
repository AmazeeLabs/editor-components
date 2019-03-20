import { storiesOf } from "@storybook/html";
import "./media_conflict";

import Editor from "../editor/editor";

storiesOf("Media Conflict", module)
  .addDecorator(Editor.dummySetup)
  .addDecorator(Editor.decorator)
  .add("Default", () => `
  <ck-conflict-media>
  	<ck-conflict-media-option from="HQ version">${Editor.templates.image()}</ck-conflict-media-option>
  	<ck-conflict-media-option from="My version">${Editor.templates.image()}</ck-conflict-media-option>
  </ck-conflict-media>
  `);
