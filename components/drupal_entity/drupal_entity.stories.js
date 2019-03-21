import { storiesOf } from "@storybook/html";
import "./drupal_entity";

storiesOf("Drupal Entity", module).add("Default", () => {
  const media = document.createElement("drupal-entity");
  media.style.maxWidth = "500px";
  media.style.height = "500px";
  media.style.background = "lime";
  media.style.display = "block";
  media.setAttribute("data-entity-uuid", ``);
  media.onclick = () => {
    media.setAttribute(
      "data-entity-uuid",
      200 + Math.ceil(Math.random() * 200)
    );
  };
  media.addEventListener("removeLoader", () => {
    media.setAttribute("media-loader", ``);
  });
  return media;
});
