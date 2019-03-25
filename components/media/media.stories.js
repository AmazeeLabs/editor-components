import { storiesOf } from "@storybook/html";
import "./media";
import createMediaElement from "./media.element";

storiesOf("Media", module).add("Default", createMediaElement);
