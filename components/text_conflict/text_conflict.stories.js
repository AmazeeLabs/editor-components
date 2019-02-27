import { storiesOf } from "@storybook/html";
import "./text_conflict";
import "./text_conflict_option/text_conflict_option";

storiesOf("Text Conflict", module).add("Default", () => {
  const textConflict = document.createElement("ck-conflict-text");
  textConflict.setAttribute("label", "Conflict needs resolving");

  const options = [
    { label: "HQ Version", content: "<p>HQ version text</p>" },
    { label: "Market A Version", content: "<p>Market A text</p>" },
    { label: "Market B Version", content: "<p>Market B text</p>" },
    { label: "Empty", content: "" }
  ];

  options.forEach(option => {
    const textOption = document.createElement("ck-conflict-option");
    textOption.setAttribute("label", option.label);

    const optionContent = document.createElement("div");
    optionContent.innerHTML = option.content;
    textOption.appendChild(optionContent);
    textConflict.appendChild(textOption);
  });
  return textConflict;
});
