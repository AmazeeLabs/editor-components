import { storiesOf } from "@storybook/html";

import "../container/container";
import Editor from "../editor/editor";

storiesOf("Diff Element", module)
  .addDecorator(story => {
    Editor.templates = {
      text:
        "<ck-container-item added><p>The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee.</p></ck-container-item>",
      image: () =>
        `<ck-container-item removed><img src="https://placekitten.com/800/${Math.ceil(
          300 + Math.random() * 200
        )}" style="width: 100%; height: auto"/></ck-container-item>`
    };
    return story();
  })
  .addDecorator(Editor.decorator)
  .add(
    "prefilled",
    () => `
      <ck-container sections="text image">
        ${Editor.templates.text}
        ${Editor.templates.image()}
      </ck-container>
    `
  );
