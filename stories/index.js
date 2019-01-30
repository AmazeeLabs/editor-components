import { storiesOf } from '@storybook/html';

import '../components/example/example';
import '../components/gallery/gallery';

storiesOf( 'Example', module )
	.add('example', () => '<ck-example></ck-example>');

storiesOf( 'Gallery', module )
	.add( 'gallery', () => {

	let item = 1;
	let colors = ['lime', 'purple', 'hotpink', 'yellow']
	const gallery = document.createElement('ck-gallery');
	gallery.style.width='500px';
	gallery.style.display='block';
	const galleryItem = document.createElement('ck-gallery-item');
	galleryItem.innerHTML = `<div><div style="padding-bottom: 40%; background-color: ${colors[item%colors.length]}"></div></div>`
	gallery.appendChild(galleryItem)	

	gallery.addEventListener('addItem', e => {
		const galleryItem = document.createElement('ck-gallery-item');
		galleryItem.innerHTML = `<div><div style="padding-bottom: 40%; background-color: ${colors[++item%colors.length]}"></div></div>`
		gallery.appendChild(galleryItem)	
	});
    return gallery;
	}
	);
