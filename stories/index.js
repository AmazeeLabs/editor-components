import { storiesOf } from '@storybook/html';

// @TODO: remove demo content.
// eslint-disable-next-line no-undef
storiesOf( 'Demo', module )
	.add( 'heading', () => '<h1>Hello World</h1>' )
	.add( 'button', () => {
		// eslint-disable-next-line no-undef
		const button = document.createElement( 'button' );
		button.innerText = 'Hello Button';
		return button;
	} );
