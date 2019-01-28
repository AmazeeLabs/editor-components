import { LitElement, html } from 'lit-element';

class ExampleElement extends LitElement {
	render() {
		return html`
		<p>This is in the shadow Dom!</p>
		`;
	}
}

customElements.define('ck-example', ExampleElement);
