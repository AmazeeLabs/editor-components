import { storiesOf } from "@storybook/html";
import Editor from "../editor/editor";
import "./tabs";

storiesOf("Tabs", module)
  .addDecorator(Editor.dummySetup)
  .addDecorator(Editor.decorator)
  .add("Empty", () => `<ck-tabs section="image"></ck-tabs>`)
  .add(
    "Filled",
    () =>
      `<ck-tabs section="image"><ck-container-item data-tab-title="Kitties" data-default-tab="true"><img src="https://placekitten.com/800/${Math.ceil(
        300 + Math.random() * 200
      )}" style="width: 100%; height: auto"/></ck-container-item></ck-tabs>`
  );