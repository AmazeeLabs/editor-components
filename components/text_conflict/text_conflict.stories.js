import { storiesOf } from "@storybook/html";
import "./text_conflict";
import "./text_conflict_option/text_conflict_option";

storiesOf("Text Conflict", module).add("Default", () => {
  const textConflict = document.createElement("ck-conflict-text");
  textConflict.setAttribute("label", "Conflict needs resolving");

  const options = [
    { from: "source", content: "<p>HQ version text</p>" },
    { from: "left", content: "<p>Market A text</p>" },
    { from: "right", content: "<p>Market B text</p>" },
    { from: "empty", content: "" }
  ];

  options.forEach(option => {
    const textOption = document.createElement("ck-conflict-option");
    textOption.setAttribute("from", option.from);

    const optionContent = document.createElement("div");
    optionContent.innerHTML = option.content;
    textOption.appendChild(optionContent);
    textConflict.appendChild(textOption);
  });
  return textConflict;
});
