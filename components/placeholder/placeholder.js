import { LitElement, html } from 'lit-element';

class Placeholder extends LitElement {
	static get properties() {
		return {
			addSectionActive: { type: Boolean },
			sections: { type: Array },
		};
	}
	constructor() {
		super();
		this.addSectionActive = false;
		this.sections = [
			{ id: 'text', label: 'Text', icon: 'text' },
			{ id: 'formatted-text', label: 'Formatted', icon: 'formatted-text' },
		];
	}
	render() {
		return html`
      <style>
        button {
          background: rgba(0,0,0,0);
          border: none;
          cursor: pointer;
          font-family: inherit;
          font-size: inherit;
          padding: 0;
        }
        ul {
          list-style-type: none;
        }
        ul,
        li {
          margin: 0;
          padding: 0;
        }
        
        .ck-placeholder__insert-wrapper {
          border-bottom: 1px dashed var(--color-black, #222330);
          margin-bottom: 1em;
          text-align: center;
        }
        .ck-placeholder__insert-button {
          background: #fff;
          color: var(--color-blue, #004ADC);
          display: inline-block;
          font-size: 12px;
          font-weight: bold;
          letter-spacing: 0.03em;
          margin: 0;
          padding: 0 1em;
          position: relative;
          top: 0.7em;
        }
        .ck-placeholder__add-wrapper {
          align-items: center;
          border: 1px dotted var(--color-black, #222330);
          display: flex;
          flex-flow: row wrap;
          font-size: 14px;
          padding: 1.9em 1.8em 2em;
        }
        .ck-placeholder__add-button {
          color: var(--color-blue, #004ADC);
          font-weight: bold;
          margin-right: 40px;
          text-transform: uppercase;
        }
        .ck-placeholder__section {
          color: var(--color-black, #222330);
          display: inline-block;
          font-size: 12px;
          margin-right: 20px;
          text-transform: uppercase;
        }
      </style>
      ${ this.addSectionActive ?
		html`
      <div class="ck-placeholder__add-wrapper">
        <button @click="${ this.clickAddHandler }" type="button" class="normalize-button ck-placeholder__add-button">Add</button>
        <ul class="normalize-list ck-placeholder__sections-list">
          ${ this.sections.map( section => html`
            <li class="ck-placeholder__section">
              <button type="button" class="normalize-button">${ section.label }</button>
            </li>   
          ` ) }    
        </ul>
      </div>
		` :
		html`
        <div class="ck-placeholder__insert-wrapper">
          <button 
            @click="${ this.clickHandler }" 
            type="button" 
            class="normalize-button ck-placeholder__insert-button"
          >
            Insert Section
          </button>
        </div>
     ` }
    `;
	}

	clickHandler() {
		this.addSectionActive = !this.addSectionActive;
	}
}

customElements.define( 'ck-placeholder', Placeholder );
