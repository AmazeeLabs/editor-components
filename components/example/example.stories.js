import { storiesOf } from "@storybook/html";
import exampleNotes from "./example.md";
import "./example";

storiesOf("Example", module).add("Default", () => "<ck-example></ck-example>", {
  notes: { markdown: exampleNotes }
});
