import global from "global";
import TextConflict from "./text_conflict";
import TextConflictOption from "./text_conflict_option/text_conflict_option";

global.customElements.define("ck-conflict-text", TextConflict);
global.customElements.define("ck-conflict-option", TextConflictOption);
