import { storiesOf } from "@storybook/html";
import "./placeholder";

storiesOf("Placeholder", module).add("placeholder", () => {
  return `<ck-placeholder 
      sections='[
        {"id":"text", "label":"Text", "icon":"text"}, 
        {"id":"formatted-text", "label":"Formatted", "icon":"formatted-text"}, 
        {"id":"text-media", "label":"Text/Media", "icon":"text-media"},
        {"id":"stage-image", "label":"Stage media", "icon":"stage-image"},
        {"id":"stage-video", "label":"Stage video", "icon":"stage-video"},
        {"id":"carousel", "label":"Carousel", "icon":"carousel"},
        {"id":"configurator", "label":"Configurator", "icon":"configurator"},
        {"id":"visualizer", "label":"Visualizer", "icon":"visualizer"}
      ]'>
    </ck-placeholder>`;
});
