function randomUuid() {
  return `${200 + Math.ceil(Math.random() * 200)}`;
}
export default (preload = false) => {
  const media = document.createElement("ck-media");
  media.style.display = "block";
  media.setAttribute("data-media-uuid", ``);
  media.setAttribute("data-media-display", `default`);
  media.setAttribute("media-loader", ``);
  media.setAttribute("ck-upload", true);
  media.setAttribute("ck-edit", true);

  document.addEventListener(
    "editor-ui:media-select",
    event => {
      event.respond(randomUuid());
    },
    { capture: true }
  );

  document.addEventListener(
    "editor-ui:media-upload",
    event => {
      event.respond(randomUuid());
    },
    { capture: true }
  );

  document.addEventListener(
    "editor-ui:media-edit",
    event => {
      event.respond(randomUuid());
    },
    { capture: true }
  );

  document.addEventListener(
    "editor-ui:media-preview",
    event => {
      window.setTimeout(() => {
        event.respond(
          `<img width="100%" src="https://placekitten.com/500/${
            event.detail.uuid
          }" />`
        );
      }, 2000);
    },
    { capture: true }
  );

  if (preload === true) {
    media.setAttribute("data-media-uuid", randomUuid());
  }
  return media;
};
