import global from "global";
import Button from "./button";
import ButtonConflict from "./button-conflict";

global.customElements.define("ck-button", ButtonConflict);
