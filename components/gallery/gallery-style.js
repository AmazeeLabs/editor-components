import { html } from 'lit-element';

export const galleryStyle = html`
    .ck-gallery {
        position: relative;
        width: 100%;
        display: inline-block;
        margin: auto;
        overflow: hidden;
    }

    .ck-gallery__rail {
        display: flex; 
        transition: transform 0.70s ease;
    }

    ::slotted(ck-gallery-item) {
        display: block;
        width: 100%;
        flex-shrink: 0;
    }

    .ck-gallery__controls {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translate(-50%, 0);
        background-color: #FFF;
        display: flex;
        min-width: 40px;
        justify-content: space-between;
        padding: 10px 20px;
        border-radius: 20px;
    }

    .ck-gallery__dots {
        margin-right: 10px;  
    }

    .ck-gallery__dot-item {
        display: inline-block;
        height: 20px;
        width: 20px;
        border-radius: 100%;
        margin-right: 5px;
        background-color: rgba(0,0,0,0.3); 
        text-align: center;
        line-height: 20px;
        color: #FFF;
        cursor: pointer;
        font-size: 12px;
        transition: background-color 0.35s ease;    
    }

    .ck-gallery__dot-item.active {
        background-color: rgba(0,0,0,0.8); 
    }

    .ck-gallery__add-slide {
        box-sizing: border-box;
        display: inline-block;
        height: 20px;
        width: 20px;
        border-radius: 100%;
        border: 1px solid blue;
        text-align: center;
        line-height: 1;
        color: blue;
        cursor: pointer;
        transition: all 0.35s ease;
    }

    .ck-gallery__add-slide:hover {
        background-color: blue;
        color: #FFF;
    }

`;