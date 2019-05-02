import global from "global";
import { storiesOf } from "@storybook/html";
import { html } from "lit-html";
import EditorElement from "./editor-element";
import notes from "./editor-element.md";

class TestEditorElement extends EditorElement {
  render() {
    return this.inEditor
      ? html`
          <p>I'm in an editor.</p>
        `
      : html`
          <p>I'm <strong>not</strong> in an editor</p>
        `;
  }
}

global.customElements.define("ck-test-element", TestEditorElement);

storiesOf("Base/Editor element", module)
  .add(
    "In editor",
    () => `<div class="ck-editor"><ck-test-element></ck-test-element></div>`,
    { notes }
  )
  .add("Not editor", () => `<ck-test-element></ck-test-element>`);
