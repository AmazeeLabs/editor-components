import { storiesOf } from "@storybook/html";
import "./gallery";

storiesOf("Gallery", module).add("Default", () => {
  let item = 1;
  const colors = ["lime", "purple", "hotpink", "yellow"];
  const gallery = document.createElement("ck-gallery");
  gallery.style.width = "500px";
  gallery.style.display = "block";
  const galleryItem = document.createElement("ck-gallery-item");
  galleryItem.innerHTML = `<div><div style="padding-bottom: 40%; background-color: ${
    colors[item % colors.length]
  }"></div></div>`;
  gallery.appendChild(galleryItem);

  gallery.addEventListener("addItem", () => {
    const additionalGalleryItem = document.createElement("ck-gallery-item");
    additionalGalleryItem.innerHTML = `<div><div style="padding-bottom: 40%; background-color: ${
      colors[(item += 1 % colors.length)]
    }"></div></div>`;
    gallery.appendChild(additionalGalleryItem);
  });
  return gallery;
});
