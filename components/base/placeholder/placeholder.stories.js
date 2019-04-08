import { storiesOf } from "@storybook/html";
import placeholderNotes from "./placeholder.md";

import "./index";
import Editor from "../editor/editor";

storiesOf("Base/Placeholder", module)
  .addDecorator(Editor.dummySetup)
  .addDecorator(Editor.decorator)
  .add(
    "Default",
    () => `<ck-placeholder sections="text image"></ck-placeholder>`,
    {
      notes: { markdown: placeholderNotes }
    }
  )
  .add(
    "Collapsed",
    () =>
      `<ck-placeholder sections="text image" collapsed="true"></ck-placeholder>`,
    {
      notes: { markdown: placeholderNotes }
    }
  )
  .add(
    "Closed",
    () =>
      `<ck-placeholder sections="text image" closed="true"></ck-placeholder>`,
    {
      notes: { markdown: placeholderNotes }
    }
  )
  .add(
    "Collapsed & Closed",
    () =>
      `<ck-placeholder sections="text image" collapsed="true" closed="true"></ck-placeholder>`,
    {
      notes: { markdown: placeholderNotes }
    }
  )
  .add(
    "Single item collapsed",
    () => `<ck-placeholder sections="text" collapsed="true"></ck-placeholder>`,
    {
      notes: { markdown: placeholderNotes }
    }
  )
  .add(
    "Single item closed",
    () => `<ck-placeholder sections="text" closed="true"></ck-placeholder>`,
    {
      notes: { markdown: placeholderNotes }
    }
  )
  .add(
    "Fixed layout",
    () =>
      `<ck-placeholder sections="text image" style=" width: 600px; height: 400px; --align-buttons: center"></ck-placeholder>`,
    {
      notes: { markdown: placeholderNotes }
    }
  );
