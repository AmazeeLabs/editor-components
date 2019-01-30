import { LitElement, html } from 'lit-element';
import { galleryStyle } from './gallery-style';

class Gallery extends LitElement {

	static get properties() {
		return {
			'items': Array,
			'currentGallery': Number
		};
	}

	constructor() {
		super();
		this.items = [];
		this.currentGallery = 0;
	}

	connectedCallback() {		
		super.connectedCallback();

		let slots = this.shadowRoot
		slots.addEventListener('slotchange', () => {
			this.items = Array.from( this.children ).map( ( child, index ) => ( {
				title: index + 1,
				index,
			} ) );
			this.setGalleryItem(this.items.length - 1)
		});

		this.items = Array.from( this.children ).map( ( child, index ) => ( {
			title: index + 1,
			index,
		} ) );
		this.setGalleryItem( this.currentGallery );
	}

	render() {
		return html`
			<style>
				${galleryStyle}
			</style>

			<div class="ck-gallery">

			<div class="ck-gallery__rail" style="transform: translateX(${this.currentGallery * -100}%)">
				<slot></slot>
			</div>


				<div class="ck-gallery__controls">
					<div class="ck-gallery__dots">
						${ this.items.map( item => this.button( item ) ) }
					</div>
					<div class="ck-gallery__action">
						<span @click="${() => this.addItem()}" class="ck-gallery__add-slide">+</span>
					</div>
				</div>

			</div>
		`;
	}

	addItem () {
		this.dispatchEvent(new Event('addItem'));
	}

	button( item ) {
		return html`<span @click="${ () => this.setGalleryItem( item.index ) }" class="ck-gallery__dot-item ${this.currentGallery === item.index ? 'active' : ''}">${ item.title }</span>`;
	}

	setGalleryItem( index ) {
		if ( this.children.length <= index || !this.children[ index ] ) {
			return;
		}

		// Update image slide

		this.currentGallery = index;
	}
}

class GalleryItem extends LitElement {
	render() {
		return html`
			<style>
				${galleryStyle}
			</style>

			<div class="ck-gallery__item">
				<slot></slot>
			</div>
		`;
	}
}

customElements.define('ck-gallery', Gallery);
customElements.define('ck-gallery-item', GalleryItem);
