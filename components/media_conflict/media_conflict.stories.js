import { storiesOf } from "@storybook/html";
import "./media_conflict";
import createMediaElement from "../media/media.element";

import Editor from "../editor/editor";

storiesOf("Media Conflict", module)
  .addDecorator(Editor.dummySetup)
  .addDecorator(Editor.decorator)
  .add("Default", () => {
    const conflict = document.createElement("ck-conflict-media");

    const optionHQ = document.createElement("ck-conflict-media-option");
    optionHQ.setAttribute("from", "HQ version");
    conflict.appendChild(optionHQ);
    const contentHQ = createMediaElement(true);
    optionHQ.appendChild(contentHQ);

    const optionMy = document.createElement("ck-conflict-media-option");
    optionMy.setAttribute("from", "My version");
    conflict.appendChild(optionMy);
    const contentMy = createMediaElement(true);
    optionMy.appendChild(contentMy);

    return conflict.outerHTML;
  });
