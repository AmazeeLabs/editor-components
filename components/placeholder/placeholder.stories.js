import { storiesOf } from "@storybook/html";
import placeholderNotes from "./placeholder.md";
import "./placeholder";

const createPlaceholder = () => {
  const sections = `[
    {"id":"text", "label":"Text", "icon":"text"},
    {"id":"formatted-text", "label":"Formatted", "icon":"formatted-text"},
    {"id":"text-media", "label":"Text/Media", "icon":"text-media"},
    {"id":"stage-image", "label":"Stage media", "icon":"stage-image"},
    {"id":"stage-video", "label":"Stage video", "icon":"stage-video"},
    {"id":"carousel", "label":"Carousel", "icon":"carousel"},
    {"id":"configurator", "label":"Configurator", "icon":"configurator"},
    {"id":"visualizer", "label":"Visualizer", "icon":"visualizer"}
  ]`;

  const placeholder = document.createElement("ck-placeholder");

  placeholder.addEventListener("addSection", event => {
    const section = document.createElement("p");
    const sectionContent = document.createTextNode(`${event.detail}`);
    section.appendChild(sectionContent);
    placeholder.insertAdjacentElement("afterend", section);
    placeholder.remove();
  });

  placeholder.setAttribute("sections", sections);

  return placeholder;
};

storiesOf("Placeholder", module)
  .add(
    "Insert section",
    () => {
      return createPlaceholder();
    },
    {
      notes: { markdown: placeholderNotes }
    }
  )
  .add(
    "Add",
    () => {
      const addPlaceholder = createPlaceholder();
      addPlaceholder.setAttribute("addSectionActive", "true");
      return addPlaceholder;
    },
    {
      notes: { markdown: placeholderNotes }
    }
  );
