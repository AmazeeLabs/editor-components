!function(t){var e={};function n(s){if(e[s])return e[s].exports;var r=e[s]={i:s,l:!1,exports:{}};return t[s].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,s){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(s,r,function(e){return t[e]}.bind(null,r));return s},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=1)}([function(t,e){t.exports=":host {\n  --color-blue: #004adc;\n  --color-black: #222330;\n  --color-grey-light: #B8B8B8;\n  --align-buttons: left;\n  display: block;\n  font-family: var(--font-family, sans-serif);\n}\n\nbutton {\n  background: rgba(0, 0, 0, 0);\n  border: none;\n  cursor: pointer;\n  font-family: inherit;\n  font-size: inherit;\n  padding: 0;\n}\n\nul {\n  list-style-type: none;\n}\n\nul,\nli {\n  margin: 0;\n  padding: 0;\n}\n\n.ck-placeholder__insert-wrapper {\n  border-bottom: 1px dashed var(--color-black, #222330);\n  margin-bottom: 1em;\n  text-align: center;\n}\n\n.ck-placeholder__insert-button {\n  background: #fff;\n  color: var(--color-blue, #004adc);\n  display: inline-block;\n  font-size: 12px;\n  font-weight: bold;\n  letter-spacing: 0.03em;\n  margin: 0;\n  padding: 0 1em;\n  position: relative;\n  top: 0.7em;\n}\n\n.ck-placeholder__insert-button:hover,\n.ck-placeholder__insert-button:focus {\n  color: var(--color-black, #222330);\n}\n\n.ck-placeholder__add-wrapper {\n  border: 1px dashed var(--color-black, #222330);\n  box-sizing: border-box;\n  display: flex;\n  flex-flow: row nowrap;\n  align-items: center;\n  font-size: 14px;\n  min-height: 80px;\n  padding: 0.5em 1.8em 0.6em;\n  height: 100%;\n}\n\n.ck-placeholder__add-button {\n  color: var(--color-black, #222330);\n  font-weight: bold;\n  margin-right: 40px;\n  text-transform: uppercase;\n}\n\n.ck-placeholder__add-button:hover,\n.ck-placeholder__add-button:focus {\n  color: var(--color-blue, #004adc);\n}\n\n.ck-placeholder__sections-list {\n  text-align: var(--align-buttons);\n}\n\n.ck-placeholder__section-item {\n  color: var(--color-black, #222330);\n  display: inline-block;\n  font-size: 12px;\n  margin-right: 20px;\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n\n.ck-placeholder__icon-wrapper {\n  color: var(--color-grey-light, #B8B8B8);\n  margin-bottom: 8px;\n  width: 18px;\n}\n\n.ck-placeholder__section-button {\n  align-items: center;\n  display: flex;\n  flex-flow: column wrap;\n  text-transform: uppercase;\n}\n\n.ck-placeholder__section-button:hover,\n.ck-placeholder__section-button:focus {\n  color: var(--color-blue, #004adc);\n}\n\n.ck-placeholder__section-button:hover .ck-placeholder__icon-wrapper,\n.ck-placeholder__section-button:focus .ck-placeholder__icon-wrapper {\n  color: var(--color-blue, #004adc);\n}\n\n.ck-placeholder__close-button {\n  margin-left: auto;\n  position: relative;\n}\n\n.ck-placeholder__close-button .ck-placeholder__icon-wrapper {\n  margin-bottom: 0;\n}\n\n.ck-placeholder__close-button:hover .ck-placeholder__icon-wrapper,\n.ck-placeholder__close-button:focus .ck-placeholder__icon-wrapper {\n  color: var(--color-black, #222330);\n}\n\n.ck-placeholder__close-button-label {\n  left: 0;\n  opacity: 0;\n  position: absolute;\n  top: 0;\n}\n"},function(t,e,n){"use strict";n.r(e);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const s=new WeakMap,r=t=>"function"==typeof t&&s.has(t),o=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,i=(t,e,n=null,s=null)=>{let r=e;for(;r!==n;){const e=r.nextSibling;t.insertBefore(r,s),r=e}},a=(t,e,n=null)=>{let s=e;for(;s!==n;){const e=s.nextSibling;t.removeChild(s),s=e}},l={},c={},h=`{{lit-${String(Math.random()).slice(2)}}}`,d=`\x3c!--${h}--\x3e`,p=new RegExp(`${h}|${d}`),u="$lit$";class m{constructor(t,e){this.parts=[],this.element=e;let n=-1,s=0;const r=[],o=e=>{const i=e.content,a=document.createTreeWalker(i,133,null,!1);let l=0;for(;a.nextNode();){n++;const e=a.currentNode;if(1===e.nodeType){if(e.hasAttributes()){const r=e.attributes;let o=0;for(let t=0;t<r.length;t++)r[t].value.indexOf(h)>=0&&o++;for(;o-- >0;){const r=t.strings[s],o=g.exec(r)[2],i=o.toLowerCase()+u,a=e.getAttribute(i).split(p);this.parts.push({type:"attribute",index:n,name:o,strings:a}),e.removeAttribute(i),s+=a.length-1}}"TEMPLATE"===e.tagName&&o(e)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(h)>=0){const o=e.parentNode,i=t.split(p),a=i.length-1;for(let t=0;t<a;t++)o.insertBefore(""===i[t]?f():document.createTextNode(i[t]),e),this.parts.push({type:"node",index:++n});""===i[a]?(o.insertBefore(f(),e),r.push(e)):e.data=i[a],s+=a}}else if(8===e.nodeType)if(e.data===h){const t=e.parentNode;null!==e.previousSibling&&n!==l||(n++,t.insertBefore(f(),e)),l=n,this.parts.push({type:"node",index:n}),null===e.nextSibling?e.data="":(r.push(e),n--),s++}else{let t=-1;for(;-1!==(t=e.data.indexOf(h,t+1));)this.parts.push({type:"node",index:-1})}}};o(e);for(const t of r)t.parentNode.removeChild(t)}}const v=t=>-1!==t.index,f=()=>document.createComment(""),g=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=\/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class _{constructor(t,e,n){this._parts=[],this.template=t,this.processor=e,this.options=n}update(t){let e=0;for(const n of this._parts)void 0!==n&&n.setValue(t[e]),e++;for(const t of this._parts)void 0!==t&&t.commit()}_clone(){const t=o?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=this.template.parts;let n=0,s=0;const r=t=>{const o=document.createTreeWalker(t,133,null,!1);let i=o.nextNode();for(;n<e.length&&null!==i;){const t=e[n];if(v(t))if(s===t.index){if("node"===t.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(i.previousSibling),this._parts.push(t)}else this._parts.push(...this.processor.handleAttributeExpressions(i,t.name,t.strings,this.options));n++}else s++,"TEMPLATE"===i.nodeName&&r(i.content),i=o.nextNode();else this._parts.push(void 0),n++}};return r(t),o&&(document.adoptNode(t),customElements.upgrade(t)),t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */class y{constructor(t,e,n,s){this.strings=t,this.values=e,this.type=n,this.processor=s}getHTML(){const t=this.strings.length-1;let e="";for(let n=0;n<t;n++){const t=this.strings[n],s=g.exec(t);e+=s?t.substr(0,s.index)+s[1]+s[2]+u+s[3]+h:t+d}return e+this.strings[t]}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}class b extends y{getHTML(){return`<svg>${super.getHTML()}</svg>`}getTemplateElement(){const t=super.getTemplateElement(),e=t.content,n=e.firstChild;return e.removeChild(n),i(e,n.firstChild),t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const w=t=>null===t||!("object"==typeof t||"function"==typeof t);class S{constructor(t,e,n){this.dirty=!0,this.element=t,this.name=e,this.strings=n,this.parts=[];for(let t=0;t<n.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new x(this)}_getValue(){const t=this.strings,e=t.length-1;let n="";for(let s=0;s<e;s++){n+=t[s];const e=this.parts[s];if(void 0!==e){const t=e.value;if(null!=t&&(Array.isArray(t)||"string"!=typeof t&&t[Symbol.iterator]))for(const e of t)n+="string"==typeof e?e:String(e);else n+="string"==typeof t?t:String(t)}}return n+=t[e]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class x{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===l||w(t)&&t===this.value||(this.value=t,r(t)||(this.committer.dirty=!0))}commit(){for(;r(this.value);){const t=this.value;this.value=l,t(this)}this.value!==l&&this.committer.commit()}}class k{constructor(t){this.value=void 0,this._pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(f()),this.endNode=t.appendChild(f())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t._insert(this.startNode=f()),t._insert(this.endNode=f())}insertAfterPart(t){t._insert(this.startNode=f()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this._pendingValue=t}commit(){for(;r(this._pendingValue);){const t=this._pendingValue;this._pendingValue=l,t(this)}const t=this._pendingValue;t!==l&&(w(t)?t!==this.value&&this._commitText(t):t instanceof y?this._commitTemplateResult(t):t instanceof Node?this._commitNode(t):Array.isArray(t)||t[Symbol.iterator]?this._commitIterable(t):t===c?(this.value=c,this.clear()):this._commitText(t))}_insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}_commitNode(t){this.value!==t&&(this.clear(),this._insert(t),this.value=t)}_commitText(t){const e=this.startNode.nextSibling;t=null==t?"":t,e===this.endNode.previousSibling&&3===e.nodeType?e.data=t:this._commitNode(document.createTextNode("string"==typeof t?t:String(t))),this.value=t}_commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value&&this.value.template===e)this.value.update(t.values);else{const n=new _(e,t.processor,this.options),s=n._clone();n.update(t.values),this._commitNode(s),this.value=n}}_commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let n,s=0;for(const r of t)void 0===(n=e[s])&&(n=new k(this.options),e.push(n),0===s?n.appendIntoPart(this):n.insertAfterPart(e[s-1])),n.setValue(r),n.commit(),s++;s<e.length&&(e.length=s,this.clear(n&&n.endNode))}clear(t=this.startNode){a(this.startNode.parentNode,t.nextSibling,this.endNode)}}class P{constructor(t,e,n){if(this.value=void 0,this._pendingValue=void 0,2!==n.length||""!==n[0]||""!==n[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=n}setValue(t){this._pendingValue=t}commit(){for(;r(this._pendingValue);){const t=this._pendingValue;this._pendingValue=l,t(this)}if(this._pendingValue===l)return;const t=!!this._pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)),this.value=t,this._pendingValue=l}}class C extends S{constructor(t,e,n){super(t,e,n),this.single=2===n.length&&""===n[0]&&""===n[1]}_createPart(){return new N(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class N extends x{}let z=!1;try{const t={get capture(){return z=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}class A{constructor(t,e,n){this.value=void 0,this._pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=n,this._boundHandleEvent=(t=>this.handleEvent(t))}setValue(t){this._pendingValue=t}commit(){for(;r(this._pendingValue);){const t=this._pendingValue;this._pendingValue=l,t(this)}if(this._pendingValue===l)return;const t=this._pendingValue,e=this.value,n=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),s=null!=t&&(null==e||n);n&&this.element.removeEventListener(this.eventName,this._boundHandleEvent,this._options),s&&(this._options=E(t),this.element.addEventListener(this.eventName,this._boundHandleEvent,this._options)),this.value=t,this._pendingValue=l}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const E=t=>t&&(z?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const T=new class{handleAttributeExpressions(t,e,n,s){const r=e[0];return"."===r?new C(t,e.slice(1),n).parts:"@"===r?[new A(t,e.slice(1),s.eventContext)]:"?"===r?[new P(t,e.slice(1),n)]:new S(t,e,n).parts}handleTextExpression(t){return new k(t)}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */function O(t){let e=V.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},V.set(t.type,e));let n=e.stringsArray.get(t.strings);if(void 0!==n)return n;const s=t.strings.join(h);return void 0===(n=e.keyString.get(s))&&(n=new m(t,t.getTemplateElement()),e.keyString.set(s,n)),e.stringsArray.set(t.strings,n),n}const V=new Map,M=new WeakMap,B=(t,...e)=>new y(t,e,"html",T),R=(t,...e)=>new b(t,e,"svg",T),$=133;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */function H(t,e){const{element:{content:n},parts:s}=t,r=document.createTreeWalker(n,$,null,!1);let o=U(s),i=s[o],a=-1,l=0;const c=[];let h=null;for(;r.nextNode();){a++;const t=r.currentNode;for(t.previousSibling===h&&(h=null),e.has(t)&&(c.push(t),null===h&&(h=t)),null!==h&&l++;void 0!==i&&i.index===a;)i.index=null!==h?-1:i.index-l,i=s[o=U(s,o)]}c.forEach(t=>t.parentNode.removeChild(t))}const j=t=>{let e=11===t.nodeType?0:1;const n=document.createTreeWalker(t,$,null,!1);for(;n.nextNode();)e++;return e},U=(t,e=-1)=>{for(let n=e+1;n<t.length;n++){const e=t[n];if(v(e))return n}return-1};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const I=(t,e)=>`${t}--${e}`;let q=!0;void 0===window.ShadyCSS?q=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected.Please update to at least @webcomponents/webcomponentsjs@2.0.2 and@webcomponents/shadycss@1.3.1."),q=!1);const L=t=>e=>{const n=I(e.type,t);let s=V.get(n);void 0===s&&(s={stringsArray:new WeakMap,keyString:new Map},V.set(n,s));let r=s.stringsArray.get(e.strings);if(void 0!==r)return r;const o=e.strings.join(h);if(void 0===(r=s.keyString.get(o))){const n=e.getTemplateElement();q&&window.ShadyCSS.prepareTemplateDom(n,t),r=new m(e,n),s.keyString.set(o,r)}return s.stringsArray.set(e.strings,r),r},F=["html","svg"],W=new Set,J=(t,e,n)=>{W.add(n);const s=t.querySelectorAll("style");if(0===s.length)return void window.ShadyCSS.prepareTemplateStyles(e.element,n);const r=document.createElement("style");for(let t=0;t<s.length;t++){const e=s[t];e.parentNode.removeChild(e),r.textContent+=e.textContent}if((t=>{F.forEach(e=>{const n=V.get(I(e,t));void 0!==n&&n.keyString.forEach(t=>{const{element:{content:e}}=t,n=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{n.add(t)}),H(t,n)})})})(n),function(t,e,n=null){const{element:{content:s},parts:r}=t;if(null==n)return void s.appendChild(e);const o=document.createTreeWalker(s,$,null,!1);let i=U(r),a=0,l=-1;for(;o.nextNode();)for(l++,o.currentNode===n&&(a=j(e),n.parentNode.insertBefore(e,n));-1!==i&&r[i].index===l;){if(a>0){for(;-1!==i;)r[i].index+=a,i=U(r,i);return}i=U(r,i)}}(e,r,e.element.content.firstChild),window.ShadyCSS.prepareTemplateStyles(e.element,n),window.ShadyCSS.nativeShadow){const n=e.element.content.querySelector("style");t.insertBefore(n.cloneNode(!0),t.firstChild)}else{e.element.content.insertBefore(r,e.element.content.firstChild);const t=new Set;t.add(r),H(e,t)}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
window.JSCompiler_renameProperty=((t,e)=>t);const D={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},Z=(t,e)=>e!==t&&(e==e||t==t),G={attribute:!0,type:String,converter:D,reflect:!1,hasChanged:Z},K=Promise.resolve(!0),Q=1,X=4,Y=8,tt=16,et=32;class nt extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=K,this._hasConnectedResolver=void 0,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,n)=>{const s=this._attributeNameForProperty(n,e);void 0!==s&&(this._attributeToPropertyMap.set(s,n),t.push(s))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=G){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const n="symbol"==typeof t?Symbol():`__${t}`;Object.defineProperty(this.prototype,t,{get(){return this[n]},set(e){const s=this[t];this[n]=e,this.requestUpdate(t,s)},configurable:!0,enumerable:!0})}static finalize(){if(this.hasOwnProperty(JSCompiler_renameProperty("finalized",this))&&this.finalized)return;const t=Object.getPrototypeOf(this);if("function"==typeof t.finalize&&t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const n of e)this.createProperty(n,t[n])}}static _attributeNameForProperty(t,e){const n=e.attribute;return!1===n?void 0:"string"==typeof n?n:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,n=Z){return n(t,e)}static _propertyValueFromAttribute(t,e){const n=e.type,s=e.converter||D,r="function"==typeof s?s:s.fromAttribute;return r?r(t,n):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const n=e.type,s=e.converter;return(s&&s.toAttribute||D.toAttribute)(t,n)}initialize(){this._saveInstanceProperties()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this._updateState=this._updateState|et,this._hasConnectedResolver?(this._hasConnectedResolver(),this._hasConnectedResolver=void 0):this.requestUpdate()}disconnectedCallback(){}attributeChangedCallback(t,e,n){e!==n&&this._attributeToProperty(t,n)}_propertyToAttribute(t,e,n=G){const s=this.constructor,r=s._attributeNameForProperty(t,n);if(void 0!==r){const t=s._propertyValueToAttribute(e,n);if(void 0===t)return;this._updateState=this._updateState|Y,null==t?this.removeAttribute(r):this.setAttribute(r,t),this._updateState=this._updateState&~Y}}_attributeToProperty(t,e){if(this._updateState&Y)return;const n=this.constructor,s=n._attributeToPropertyMap.get(t);if(void 0!==s){const t=n._classProperties.get(s)||G;this._updateState=this._updateState|tt,this[s]=n._propertyValueFromAttribute(e,t),this._updateState=this._updateState&~tt}}requestUpdate(t,e){let n=!0;if(void 0!==t&&!this._changedProperties.has(t)){const s=this.constructor,r=s._classProperties.get(t)||G;s._valueHasChanged(this[t],e,r.hasChanged)?(this._changedProperties.set(t,e),!0!==r.reflect||this._updateState&tt||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,r))):n=!1}return!this._hasRequestedUpdate&&n&&this._enqueueUpdate(),this.updateComplete}async _enqueueUpdate(){let t;this._updateState=this._updateState|X;const e=this._updatePromise;this._updatePromise=new Promise(e=>t=e),await e,this._hasConnected||await new Promise(t=>this._hasConnectedResolver=t);const n=this.performUpdate();null!=n&&"function"==typeof n.then&&await n,t(!this._hasRequestedUpdate)}get _hasConnected(){return this._updateState&et}get _hasRequestedUpdate(){return this._updateState&X}get hasUpdated(){return this._updateState&Q}performUpdate(){if(this._instanceProperties&&this._applyInstanceProperties(),this.shouldUpdate(this._changedProperties)){const t=this._changedProperties;this.update(t),this._markUpdated(),this._updateState&Q||(this._updateState=this._updateState|Q,this.firstUpdated(t)),this.updated(t)}else this._markUpdated()}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~X}get updateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0)}updated(t){}firstUpdated(t){}}nt.finalized=!0;ot((t,e)=>t.querySelector(e)),ot((t,e)=>t.querySelectorAll(e));const st=(t,e,n)=>{Object.defineProperty(e,n,t)},rt=(t,e)=>({kind:"method",placement:"prototype",key:e.key,descriptor:t});function ot(t){return e=>(n,s)=>{const r={get(){return t(this.renderRoot,e)},enumerable:!0,configurable:!0};return void 0!==s?st(r,n,s):rt(r,n)}}const it="adoptedStyleSheets"in Document.prototype;Symbol();const at=t=>t.flat?t.flat(1/0):
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
function t(e,n=[]){for(let s=0,r=e.length;s<r;s++){const r=e[s];Array.isArray(r)?t(r,n):n.push(r)}return n}(t);class lt extends nt{static finalize(){super.finalize(),this._styles=this.hasOwnProperty(JSCompiler_renameProperty("styles",this))?this._getUniqueStyles():this._styles||[]}static _getUniqueStyles(){const t=this.styles,e=[];if(Array.isArray(t)){at(t).reduceRight((t,e)=>(t.add(e),t),new Set).forEach(t=>e.unshift(t))}else t&&e.push(t);return e}initialize(){super.initialize(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?it?this.renderRoot.adoptedStyleSheets=t.map(t=>t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){super.update(t);const e=this.render();e instanceof y&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){}}lt.finalized=!0,lt.render=((t,e,n)=>{const s=n.scopeName,r=M.has(e),o=e instanceof ShadowRoot&&q&&t instanceof y,i=o&&!W.has(s),l=i?document.createDocumentFragment():e;if(((t,e,n)=>{let s=M.get(e);void 0===s&&(a(e,e.firstChild),M.set(e,s=new k(Object.assign({templateFactory:O},n))),s.appendInto(e)),s.setValue(t),s.commit()})(t,l,Object.assign({templateFactory:L(s)},n)),i){const t=M.get(l);M.delete(l),t.value instanceof _&&J(l,t.value.template,s),a(e,e.firstChild),e.appendChild(l),M.set(e,t)}!r&&o&&window.ShadyCSS.styleElement(e.host)});var ct=n(0),ht=n.n(ct);var dt=R`
  <svg viewBox="0 0 26 20" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor"><path d="m295.991 66.055v-.88h-3.785v.88h1.452v14.814h-1.452v.88h3.785v-.88h-1.452v-14.814z" transform="translate(-269.117 -65.175)"/><path d="m.163 100.069 4.43-10a1.728 1.728 0 0 1 1.634-1.108h.163a1.7 1.7 0 0 1 1.616 1.108l4.43 10a1.363 1.363 0 0 1 .145.563 1.325 1.325 0 0 1 -1.326 1.344 1.423 1.423 0 0 1 -1.344-.962l-.853-2h-5.59l-.89 2.088a1.373 1.373 0 0 1 -1.289.871 1.286 1.286 0 0 1 -1.289-1.305 1.483 1.483 0 0 1 .163-.599zm7.862-3.522-1.761-4.195-1.764 4.195z" transform="translate(0 -87.078)"/><path d="m176.011 134.837v-.037c0-2.124 1.616-3.1 3.922-3.1a6.915 6.915 0 0 1 2.379.4v-.163c0-1.144-.708-1.779-2.088-1.779a6.328 6.328 0 0 0 -1.907.272 1.168 1.168 0 0 1 -.4.073 1.124 1.124 0 0 1 -1.144-1.126 1.144 1.144 0 0 1 .744-1.071 8.474 8.474 0 0 1 3.105-.508 4.494 4.494 0 0 1 3.287 1.089 4.242 4.242 0 0 1 1.053 3.1v4.43a1.325 1.325 0 0 1 -1.344 1.326 1.236 1.236 0 0 1 -1.325-1.144v-.018a3.742 3.742 0 0 1 -2.941 1.235c-1.834-.001-3.341-1.054-3.341-2.979zm6.337-.636v-.49a4.28 4.28 0 0 0 -1.761-.363c-1.18 0-1.906.472-1.906 1.344v.036c0 .744.617 1.18 1.507 1.18 1.288 0 2.16-.708 2.16-1.708z" transform="translate(-162.103 -122.844)"/></g></svg>
`;var pt=R`
  <svg viewBox="0 0 18.862 15.09" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor"><path d="m1.572 1.257h.943v12.575h-.943z"/><path d="m16.347 1.257h.943v12.575h-.943z"/><path d="m17.919 2.515h.943v10.06h-.943z"/><path d="m0 2.515h.943v10.06h-.943z"/><path d="m10 6v15.09h12.575v-15.09zm11 13.518h-9.428v-11.946h9.428z" transform="translate(-6.856 -6)"/></g></svg>
`;var ut=R`
  <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor"><path d="m158.2 149.935h-.733a.6.6 0 0 1 -.5-.392 5.813 5.813 0 0 0 -.244-.583.6.6 0 0 1 .078-.631l.522-.522a.939.939 0 0 0 0-1.326l-.847-.847a.937.937 0 0 0 -1.326 0l-.522.522a.535.535 0 0 1 -.373.134.6.6 0 0 1 -.258-.055 5.836 5.836 0 0 0 -.584-.244.6.6 0 0 1 -.392-.5v-.733a.939.939 0 0 0 -.937-.937h-1.2a.939.939 0 0 0 -.937.937v.733a.6.6 0 0 1 -.392.5 5.833 5.833 0 0 0 -.583.244.6.6 0 0 1 -.257.055.536.536 0 0 1 -.374-.134l-.521-.521a.938.938 0 0 0 -1.326 0l-.848.847a.937.937 0 0 0 0 1.326l.522.522a.6.6 0 0 1 .079.631 5.8 5.8 0 0 0 -.243.582.6.6 0 0 1 -.5.392h-.733a.939.939 0 0 0 -.937.937v1.2a.939.939 0 0 0 .937.937h.733a.6.6 0 0 1 .5.392 5.8 5.8 0 0 0 .244.582.6.6 0 0 1 -.079.631l-.522.522a.939.939 0 0 0 0 1.326l.848.848a.937.937 0 0 0 1.326 0l.522-.522a.536.536 0 0 1 .374-.134.594.594 0 0 1 .257.055 5.817 5.817 0 0 0 .583.244.6.6 0 0 1 .392.5v.733a.938.938 0 0 0 .937.937h1.2a.938.938 0 0 0 .937-.937v-.733a.6.6 0 0 1 .392-.5 5.834 5.834 0 0 0 .583-.244.6.6 0 0 1 .257-.055.536.536 0 0 1 .374.134l.522.522a.937.937 0 0 0 1.326 0l.847-.848a.939.939 0 0 0 0-1.326l-.521-.522a.6.6 0 0 1 -.079-.631 5.808 5.808 0 0 0 .244-.583.6.6 0 0 1 .5-.392h.733a.939.939 0 0 0 .937-.937v-1.2a.939.939 0 0 0 -.938-.936zm-3.971 1.536a2.747 2.747 0 1 1 -2.747-2.747 2.75 2.75 0 0 1 2.752 2.748z" transform="translate(-139.142 -139.128)"/><path d="m6.871 5.006a.153.153 0 0 1 .1-.092h.367a.626.626 0 0 0 .625-.625v-.6a.626.626 0 0 0 -.625-.625h-.362a.152.152 0 0 1 -.1-.092 3.031 3.031 0 0 0 -.129-.307.149.149 0 0 1 .009-.137l.261-.261a.626.626 0 0 0 0-.884l-.427-.422a.625.625 0 0 0 -.884 0l-.261.261a.121.121 0 0 1 -.076.021.144.144 0 0 1 -.061-.012 3.033 3.033 0 0 0 -.308-.131.153.153 0 0 1 -.091-.1v-.369a.626.626 0 0 0 -.625-.625h-.6a.626.626 0 0 0 -.624.625v.369a.152.152 0 0 1 -.092.1 3.043 3.043 0 0 0 -.307.129.146.146 0 0 1 -.061.012.121.121 0 0 1 -.076-.021l-.261-.259a.625.625 0 0 0 -.884 0l-.423.423a.626.626 0 0 0 0 .884l.261.261a.149.149 0 0 1 .009.137 3.043 3.043 0 0 0 -.129.307.153.153 0 0 1 -.1.092h-.372a.626.626 0 0 0 -.625.626v.6a.626.626 0 0 0 .625.625h.367a.153.153 0 0 1 .1.092 3.022 3.022 0 0 0 .129.307.149.149 0 0 1 -.009.137l-.261.261a.625.625 0 0 0 0 .884l.423.423a.625.625 0 0 0 .884 0l.261-.261a.121.121 0 0 1 .081-.022.145.145 0 0 1 .061.012 3.04 3.04 0 0 0 .307.128.153.153 0 0 1 .092.1v.367a.626.626 0 0 0 .625.625h.6a.626.626 0 0 0 .625-.625v-.362a.152.152 0 0 1 .09-.105 3.041 3.041 0 0 0 .307-.129.145.145 0 0 1 .061-.012.121.121 0 0 1 .076.021l.261.261a.625.625 0 0 0 .884 0l.424-.418a.626.626 0 0 0 0-.884l-.261-.261a.149.149 0 0 1 -.009-.137 3.079 3.079 0 0 0 .128-.312zm-1.671-1.016a1.217 1.217 0 1 1 -1.216-1.218 1.219 1.219 0 0 1 1.216 1.218z" transform="translate(0 -.006)"/></g></svg>
`;var mt=R`
  <svg viewBox="0 0 17.304 13.724" xmlns="http://www.w3.org/2000/svg"><path d="m17.005 6h-16.705a.3.3 0 0 0 -.3.3v13.125a.3.3 0 0 0 .3.3h16.705a.3.3 0 0 0 .3-.3v-13.125a.3.3 0 0 0 -.3-.3zm-12.232 3.282a1.661 1.661 0 1 1 -1.661 1.661 1.663 1.663 0 0 1 1.661-1.661zm10.96 5.572a.3.3 0 0 1 -.422.018l-3.36-3.08-2.739 3 1.434 1.434a.3.3 0 1 1 -.422.422l-3.072-3.074-4.866 4.285a.3.3 0 1 1 -.394-.448l5.077-4.47a.3.3 0 0 1 .408.013l1.414 1.416 2.922-3.2a.3.3 0 0 1 .207-.1.307.307 0 0 1 .215.078l3.58 3.282a.3.3 0 0 1 .018.423z" fill="currentColor" transform="translate(0 -6)"/></svg>
`;var vt=R`
  <svg viewBox="0 0 19.45 13" xmlns="http://www.w3.org/2000/svg"><path d="m-130.878 73.4a.585.585 0 0 0 -.21-.042.5.5 0 0 0 -.378.16l-3.382 3.374v-1.385a2.328 2.328 0 0 0 -.709-1.708 2.328 2.328 0 0 0 -1.708-.709h-10.318a2.329 2.329 0 0 0 -1.708.709 2.329 2.329 0 0 0 -.709 1.708v5.909a2.328 2.328 0 0 0 .709 1.708 2.328 2.328 0 0 0 1.708.709h10.318a2.328 2.328 0 0 0 1.708-.709 2.328 2.328 0 0 0 .709-1.708v-1.394l3.382 3.382a.5.5 0 0 0 .378.159.586.586 0 0 0 .21-.042.5.5 0 0 0 .327-.5v-9.121a.5.5 0 0 0 -.327-.5z" fill="currentColor" transform="translate(150 -73.09)"/></svg>
`;var ft=R`
  <svg viewBox="0 0 20.26 16.073" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor"><path d="m9.229 136.932-2.307-2.307-2.336 2.335 1.814 1.813h1.181v.659h-1.319a.33.33 0 0 1 -.233-.1l-3.063-3.063-2.966 2.97v.852a.989.989 0 0 0 .989.989h7.251a.989.989 0 0 0 .989-.989zm0 0" transform="translate(0 -131.852)"/><path d="m176.659 64.33a.33.33 0 1 1 -.33-.33.33.33 0 0 1 .33.33zm0 0" transform="translate(-172.374 -62.682)"/><path d="m9.229.989a.989.989 0 0 0 -.989-.989h-7.251a.989.989 0 0 0 -.989.989v5.466l2.733-2.733a.33.33 0 0 1 .466 0l.921.921 2.568-2.569a.33.33 0 0 1 .466 0l2.075 2.074zm-5.274 1.648a.989.989 0 1 1 .989-.989.989.989 0 0 1 -.989.989zm0 0"/><path d="m11.109.102h9.151v1.141h-9.151z"/><path d="m0 11.51h20.26v1.141h-20.26z"/><path d="m11.109 3.525h9.151v1.141h-9.151z"/><path d="m0 14.932h12.275v1.141h-12.275z"/><path d="m11.109 6.947h9.151v1.141h-9.151z"/></g></svg>
`;var gt=R`
  <svg viewBox="0 0 29 18" xmlns="http://www.w3.org/2000/svg"><path d="m12.08 42.781q-.511 0-1.02 0a45.3 45.3 0 0 0 -5.481.329 4.341 4.341 0 0 0 -1.336 1.568 16.531 16.531 0 0 0 -1.424 3.844 5.419 5.419 0 0 1 -.458.573c-.164-.04.012-.409-.028-.584.1-.542-.553-.872-1.005-.665-.458.177-1.151.224-1.328.763a1.076 1.076 0 0 0 1.217.994c.272.044.387.383.554.569.014.988-.21 1.979-.155 2.974a7.278 7.278 0 0 0 .159 1.9.179.179 0 0 0 .157.068.383.383 0 0 0 -.02.111v5.128a.444.444 0 0 0 .427.427h1.709a.444.444 0 0 0 .427-.427v-1.768h15.007v1.768a.444.444 0 0 0 .427.427h1.709a.444.444 0 0 0 .427-.427v-5.127a.382.382 0 0 0 -.02-.118c.307 0 .23-.494.279-.715a20.447 20.447 0 0 0 -.159-3.988 1.317 1.317 0 0 1 .547-.789 1.174 1.174 0 0 0 1.275-.9c-.08-.561-.784-.676-1.225-.837-.4-.165-1.078-.088-1.118.445-.042.243.114.62.007.78-.248-.1-.347-.426-.515-.628a18.2 18.2 0 0 0 -1.234-3.534 6.232 6.232 0 0 0 -1.43-1.81 29.911 29.911 0 0 0 -3.31-.279c-1.02-.049-2.042-.071-3.063-.072zm-.08.551c2.014 0 4.028.006 4.186.022a1.807 1.807 0 0 1 .384.081c.16.061.221.126.58.6a5.03 5.03 0 0 0 .883.966c.71.633.784.736.988 1.387.065.206.256.811.427 1.345s.307 1 .3 1.038l-.007.065-1.725.015c-3.326.03-7.14.037-9.379.02-1.243-.009-2.741-.018-3.329-.02-.942 0-1.07-.009-1.084-.044a9.363 9.363 0 0 1 .266-.918c.155-.483.348-1.091.429-1.352a2.215 2.215 0 0 1 .833-1.354 6.758 6.758 0 0 0 1.048-1.09c.167-.22.346-.448.4-.506a.883.883 0 0 1 .615-.231c.152-.015 2.166-.024 4.185-.024zm-8.442 6.408a13.527 13.527 0 0 1 3.026 1.382c.555.21 1.3.78.861 1.435-.735.52-1.767.174-2.608.153-.669-.191-1.72-.127-2.043-.863-.041-.697-.202-1.996.764-2.107zm16.722.039c1.088-.039 1.3 1.773.61 2.35a6.934 6.934 0 0 1 -3.741.639c-.6.094-1.182-.636-.573-1.064a10.6 10.6 0 0 1 3.7-1.925z" fill="currentColor" transform="translate(0 -42.781)"/></svg>
`;var _t=R`
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M21,6.611,19.389,5,13,11.389,6.611,5,5,6.611,11.389,13,5,19.389,6.611,21,13,14.611,19.389,21,21,19.389,14.611,13Z" transform="translate(-1 -1)"/><path d="M0,0H24V24H0Z" fill="none"/></svg>
`;var yt=R`
  <svg viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg"><path d="m91.93 13.877a2.346 2.346 0 0 1 -1.262-.334 1.217 1.217 0 0 1 -.561-.647 6.709 6.709 0 0 1 -.151-1.856v-4.253h3.928v-2.6h-3.928v-4.187h-2.363a6.615 6.615 0 0 1 -.583 2.115 4.6 4.6 0 0 1 -1.11 1.424 4.974 4.974 0 0 1 -1.673.906v2.342h1.833v5.813a4.847 4.847 0 0 0 .237 1.737 3 3 0 0 0 .853 1.133 4.394 4.394 0 0 0 1.489.809 6.34 6.34 0 0 0 2.007.292 7.809 7.809 0 0 0 1.867-.205 9.536 9.536 0 0 0 1.921-.7v-2.61a4.5 4.5 0 0 1 -2.504.821z" fill="currentColor" transform="translate(-84.226)"/></svg>
`;customElements.define("ck-placeholder-icon",class extends lt{static get properties(){return{iconId:{type:String}}}constructor(){super(),this.iconId="text"}render(){switch(this.iconId){case"formatted-text":return dt;case"carousel":return pt;case"configurator":return ut;case"stage-image":return mt;case"stage-video":return vt;case"text-media":return ft;case"visualizer":return gt;case"close":return _t;case"text":default:return yt}}});customElements.define("ck-placeholder",class extends lt{static get properties(){return{collapsed:{type:Boolean},closed:{type:Boolean},isOpen:{type:Boolean},sections:{type:Array},labelOpen:{type:String},labelExpand:{type:String}}}constructor(){super(),this.closed=!1,this.collapsed=!1,this.isOpen=!1,this.labelOpen="Add",this.labelExpand="Insert",this.sections=[]}render(){return B`
      <style>
        ${ht.a}
      </style>
      ${this.collapsed?B`
            <div class="ck-placeholder__insert-wrapper">
              <button
                @click="${this.clickExpandHandler}"
                type="button"
                class="normalize-button ck-placeholder__insert-button"
              >
                ${this.labelExpand}
              </button>
            </div>
          `:B`
            <div class="ck-placeholder__add-wrapper">
              ${this.closed?B`
                    <button
                      @click="${this.clickOpenHandler}"
                      type="button"
                      class="normalize-button ck-placeholder__add-button"
                    >
                      ${this.labelOpen}
                    </button>
                  `:null}
              ${!this.closed||this.isOpen?B`
                    <ul class="normalize-list ck-placeholder__sections-list">
                      ${this.sections.map(t=>B`
                          <li class="ck-placeholder__section-item">
                            <button
                              @click="${e=>this.clickSectionHandler(e,t.id)}"
                              type="button"
                              class="normalize-button ck-placeholder__section-button"
                            >
                              <div class="ck-placeholder__icon-wrapper">
                                <ck-placeholder-icon
                                  iconId="${t.icon}"
                                ></ck-placeholder-icon>
                              </div>
                              ${t.label}
                            </button>
                          </li>
                        `)}
                    </ul>
                    ${this.closed?B`
                          <button
                            @click="${this.clickCloseHandler}"
                            type="button"
                            class="normalize-button ck-placeholder__close-button"
                          >
                            <div class="ck-placeholder__icon-wrapper">
                              <ck-placeholder-icon
                                iconId="close"
                              ></ck-placeholder-icon>
                            </div>
                            <span class="ck-placeholder__close-button-label"
                              >Close</span
                            >
                          </button>
                        `:null}
                  `:""}
            </div>
          `}
    `}clickOpenHandler(){1===this.sections.length?this.clickSectionHandler(null,this.sections[0].id):this.isOpen=!this.isOpen}clickExpandHandler(){1===this.sections.length?this.clickSectionHandler(null,this.sections[0].id):this.collapsed=!1}clickCloseHandler(){this.isOpen=!1}clickSectionHandler(t,e){this.dispatchEvent(new CustomEvent("addSection",{detail:e}))}})}]);