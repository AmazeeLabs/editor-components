import { storiesOf } from '@storybook/html';

import '../components/example/example';

storiesOf( 'Example', module )
	.add('example', () => '<ck-example></ck-example>');

storiesOf( 'Gallery', module )
	.add( 'gallery', () => `
	<ck-gallery>
		<ck-gallery-item><div style="height: 200px"></div></ck-gallery-item>
		<ck-gallery-item><div style="height: 200px"></div></ck-gallery-item>
		<ck-gallery-item><div style="height: 200px"></div></ck-gallery-item>
	</ck-gallery>
	`);
