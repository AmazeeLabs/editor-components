import { storiesOf } from "@storybook/html";
import "./media";

storiesOf("Media", module).add("Default", () => {
  const media = document.createElement("ck-media");
  media.style.width = "500px";
  media.style.height = "300px";
  media.style.display = "block";
  media.setAttribute("media-uuid", ``);
  // create button for changing attribute
  const button = document.createElement("button");
  button.innerHTML = `Upload Image`;
  button.style.display = "block";
  button.onclick = () => {
    media.setAttribute(
      "media-uuid",
      `Screen-Shot-2016-04-25-at-15.34.461.png?quality=95&resize=500,300`
    );
  };
  const body = document.querySelectorAll("body");
  body[0].appendChild(button);
  return media;
});
