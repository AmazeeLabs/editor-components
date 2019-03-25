export default (preload = false) => {
  const media = document.createElement("ck-media");
  media.style.display = "block";
  media.setAttribute("data-media-uuid", ``);
  media.setAttribute("data-media-display", `default`);
  media.setAttribute("media-loader", ``);

  media.onclick = () => {
    media.setAttribute("data-media-uuid", 200 + Math.ceil(Math.random() * 200));
  };

  if (preload === true) {
    media.setAttribute("data-media-uuid", 200 + Math.ceil(Math.random() * 200));
  }
  return media;
};
