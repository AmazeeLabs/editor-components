import { LitElement, html } from "lit-element";
import styles from "./example.css";

class ExampleElement extends LitElement {
  render() {
    return html`
      <style>
        ${styles}
      </style>
      <p>This is in the shadow Dom!</p>
    `;
  }
}

customElements.define("ck-example", ExampleElement);
