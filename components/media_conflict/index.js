import global from "global";
import MediaConflict from "./media_conflict";
import MediaConflictOption from "./media_conflict_option/media_conflict_option";

global.customElements.define("ck-conflict-media", MediaConflict);
global.customElements.define("ck-conflict-media-option", MediaConflictOption);
