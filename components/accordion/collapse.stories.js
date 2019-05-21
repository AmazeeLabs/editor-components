import { storiesOf } from "@storybook/html";
import "./index";

import Editor from "../base/editor/editor";

storiesOf("Accordion/", module)
  .addDecorator(Editor.dummySetup)
  .addDecorator(Editor.decorator)
  .add(
    "Collapse",
    () => `
    <ck-collapse ck-collapse-open ck-collapse-arrow-down ck-collapse-index="0">
      <p slot="title">Collapse Title</p>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </div>
    </ck-collapse>
    <ck-collapse  ck-collapse-arrow-up ck-collapse-arrow-down  ck-collapse-index="1">
      <p slot="title">Collapse Title</p>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </div>
    </ck-collapse>
    <ck-collapse ck-collapse-arrow-up  ck-collapse-index="2">
      <p slot="title">Collapse Title</p>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </div>
    </ck-collapse>
    `
  );
