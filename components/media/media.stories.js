import { storiesOf } from "@storybook/html";
import "./media";

storiesOf("Media", module).add("Default", () => {
  const media = document.createElement("ck-media");
  media.style.width = "500px";
  media.style.height = "300px";
  media.style.display = "block";
  media.setAttribute("data-media-uuid", ``);
  media.setAttribute("media-loader", ``);
  media.onclick = () => {
    media.setAttribute("media-loader", `active`);
    window.setTimeout(() => {
      media.setAttribute("data-media-uuid", 200 + Math.ceil(Math.random() * 200));
    }, 3000);
  };
  media.addEventListener('removeLoader', () => {
    media.setAttribute("media-loader", ``);
  });
  return media;
});
