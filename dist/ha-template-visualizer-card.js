var nt=Object.defineProperty;var it=Object.getOwnPropertyDescriptor;var _=(i,e,t,n)=>{for(var r=n>1?void 0:n?it(e,t):e,s=i.length-1,o;s>=0;s--)(o=i[s])&&(r=(n?o(e,t,r):o(r))||r);return n&&r&&nt(e,t,r),r};var B=globalThis,K=B.ShadowRoot&&(B.ShadyCSS===void 0||B.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ee=Symbol(),ge=new WeakMap,P=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==ee)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(K&&e===void 0){let n=t!==void 0&&t.length===1;n&&(e=ge.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&ge.set(t,e))}return e}toString(){return this.cssText}},_e=i=>new P(typeof i=="string"?i:i+"",void 0,ee),L=(i,...e)=>{let t=i.length===1?i[0]:e.reduce((n,r,s)=>n+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+i[s+1],i[0]);return new P(t,i,ee)},ye=(i,e)=>{if(K)i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let n=document.createElement("style"),r=B.litNonce;r!==void 0&&n.setAttribute("nonce",r),n.textContent=t.cssText,i.appendChild(n)}},te=K?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(let n of e.cssRules)t+=n.cssText;return _e(t)})(i):i;var{is:rt,defineProperty:st,getOwnPropertyDescriptor:ot,getOwnPropertyNames:at,getOwnPropertySymbols:lt,getPrototypeOf:ct}=Object,W=globalThis,ve=W.trustedTypes,dt=ve?ve.emptyScript:"",ut=W.reactiveElementPolyfillSupport,H=(i,e)=>i,j={toAttribute(i,e){switch(e){case Boolean:i=i?dt:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},G=(i,e)=>!rt(i,e),be={attribute:!0,type:String,converter:j,reflect:!1,useDefault:!1,hasChanged:G};Symbol.metadata??=Symbol("metadata"),W.litPropertyMetadata??=new WeakMap;var A=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=be){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&st(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:s}=ot(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:r,set(o){let a=r?.call(this);s?.call(this,o),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??be}static _$Ei(){if(this.hasOwnProperty(H("elementProperties")))return;let e=ct(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(H("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(H("properties"))){let t=this.properties,n=[...at(t),...lt(t)];for(let r of n)this.createProperty(r,t[r])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[n,r]of t)this.elementProperties.set(n,r)}this._$Eh=new Map;for(let[t,n]of this.elementProperties){let r=this._$Eu(t,n);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let r of n)t.unshift(te(r))}else e!==void 0&&t.push(te(e));return t}static _$Eu(e,t){let n=t.attribute;return n===!1?void 0:typeof n=="string"?n:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ye(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&n.reflect===!0){let s=(n.converter?.toAttribute!==void 0?n.converter:j).toAttribute(t,n.type);this._$Em=e,s==null?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let s=n.getPropertyOptions(r),o=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:j;this._$Em=r;let a=o.fromAttribute(t,s.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,s){if(e!==void 0){let o=this.constructor;if(r===!1&&(s=this[e]),n??=o.getPropertyOptions(e),!((n.hasChanged??G)(s,t)||n.useDefault&&n.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,n))))return;this.C(e,t,n)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:s},o){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),s!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),r===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,s]of this._$Ep)this[r]=s;this._$Ep=void 0}let n=this.constructor.elementProperties;if(n.size>0)for(let[r,s]of n){let{wrapped:o}=s,a=this[r];o!==!0||this._$AL.has(r)||a===void 0||this.C(r,void 0,s,a)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(n=>n.hostUpdate?.()),this.update(t)):this._$EM()}catch(n){throw e=!1,this._$EM(),n}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[H("elementProperties")]=new Map,A[H("finalized")]=new Map,ut?.({ReactiveElement:A}),(W.reactiveElementVersions??=[]).push("2.1.2");var le=globalThis,$e=i=>i,Y=le.trustedTypes,Ae=Y?Y.createPolicy("lit-html",{createHTML:i=>i}):void 0,Se="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,Te="?"+E,pt=`<${Te}>`,S=document,M=()=>S.createComment(""),U=i=>i===null||typeof i!="object"&&typeof i!="function",ce=Array.isArray,ht=i=>ce(i)||typeof i?.[Symbol.iterator]=="function",ne=`[ 	
\f\r]`,q=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ee=/-->/g,xe=/>/g,w=RegExp(`>|${ne}(?:([^\\s"'>=/]+)(${ne}*=${ne}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ke=/'/g,we=/"/g,Re=/^(?:script|style|textarea|title)$/i,de=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),m=de(1),Ut=de(2),It=de(3),T=Symbol.for("lit-noChange"),g=Symbol.for("lit-nothing"),ze=new WeakMap,z=S.createTreeWalker(S,129);function Ce(i,e){if(!ce(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ae!==void 0?Ae.createHTML(e):e}var ft=(i,e)=>{let t=i.length-1,n=[],r,s=e===2?"<svg>":e===3?"<math>":"",o=q;for(let a=0;a<t;a++){let l=i[a],d,u,c=-1,f=0;for(;f<l.length&&(o.lastIndex=f,u=o.exec(l),u!==null);)f=o.lastIndex,o===q?u[1]==="!--"?o=Ee:u[1]!==void 0?o=xe:u[2]!==void 0?(Re.test(u[2])&&(r=RegExp("</"+u[2],"g")),o=w):u[3]!==void 0&&(o=w):o===w?u[0]===">"?(o=r??q,c=-1):u[1]===void 0?c=-2:(c=o.lastIndex-u[2].length,d=u[1],o=u[3]===void 0?w:u[3]==='"'?we:ke):o===we||o===ke?o=w:o===Ee||o===xe?o=q:(o=w,r=void 0);let p=o===w&&i[a+1].startsWith("/>")?" ":"";s+=o===q?l+pt:c>=0?(n.push(d),l.slice(0,c)+Se+l.slice(c)+E+p):l+E+(c===-2?a:p)}return[Ce(i,s+(i[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]},I=class i{constructor({strings:e,_$litType$:t},n){let r;this.parts=[];let s=0,o=0,a=e.length-1,l=this.parts,[d,u]=ft(e,t);if(this.el=i.createElement(d,n),z.currentNode=this.el.content,t===2||t===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(r=z.nextNode())!==null&&l.length<a;){if(r.nodeType===1){if(r.hasAttributes())for(let c of r.getAttributeNames())if(c.endsWith(Se)){let f=u[o++],p=r.getAttribute(c).split(E),y=/([.?@])?(.*)/.exec(f);l.push({type:1,index:s,name:y[2],strings:p,ctor:y[1]==="."?re:y[1]==="?"?se:y[1]==="@"?oe:N}),r.removeAttribute(c)}else c.startsWith(E)&&(l.push({type:6,index:s}),r.removeAttribute(c));if(Re.test(r.tagName)){let c=r.textContent.split(E),f=c.length-1;if(f>0){r.textContent=Y?Y.emptyScript:"";for(let p=0;p<f;p++)r.append(c[p],M()),z.nextNode(),l.push({type:2,index:++s});r.append(c[f],M())}}}else if(r.nodeType===8)if(r.data===Te)l.push({type:2,index:s});else{let c=-1;for(;(c=r.data.indexOf(E,c+1))!==-1;)l.push({type:7,index:s}),c+=E.length-1}s++}}static createElement(e,t){let n=S.createElement("template");return n.innerHTML=e,n}};function C(i,e,t=i,n){if(e===T)return e;let r=n!==void 0?t._$Co?.[n]:t._$Cl,s=U(e)?void 0:e._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),s===void 0?r=void 0:(r=new s(i),r._$AT(i,t,n)),n!==void 0?(t._$Co??=[])[n]=r:t._$Cl=r),r!==void 0&&(e=C(i,r._$AS(i,e.values),r,n)),e}var ie=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??S).importNode(t,!0);z.currentNode=r;let s=z.nextNode(),o=0,a=0,l=n[0];for(;l!==void 0;){if(o===l.index){let d;l.type===2?d=new D(s,s.nextSibling,this,e):l.type===1?d=new l.ctor(s,l.name,l.strings,this,e):l.type===6&&(d=new ae(s,this,e)),this._$AV.push(d),l=n[++a]}o!==l?.index&&(s=z.nextNode(),o++)}return z.currentNode=S,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,t),t+=n.strings.length-2):n._$AI(e[t])),t++}},D=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=g,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=C(this,e,t),U(e)?e===g||e==null||e===""?(this._$AH!==g&&this._$AR(),this._$AH=g):e!==this._$AH&&e!==T&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ht(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==g&&U(this._$AH)?this._$AA.nextSibling.data=e:this.T(S.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=I.createElement(Ce(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let s=new ie(r,this),o=s.u(this.options);s.p(t),this.T(o),this._$AH=s}}_$AC(e){let t=ze.get(e.strings);return t===void 0&&ze.set(e.strings,t=new I(e)),t}k(e){ce(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,n,r=0;for(let s of e)r===t.length?t.push(n=new i(this.O(M()),this.O(M()),this,this.options)):n=t[r],n._$AI(s),r++;r<t.length&&(this._$AR(n&&n._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let n=$e(e).nextSibling;$e(e).remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},N=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,s){this.type=1,this._$AH=g,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=s,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=g}_$AI(e,t=this,n,r){let s=this.strings,o=!1;if(s===void 0)e=C(this,e,t,0),o=!U(e)||e!==this._$AH&&e!==T,o&&(this._$AH=e);else{let a=e,l,d;for(e=s[0],l=0;l<s.length-1;l++)d=C(this,a[n+l],t,l),d===T&&(d=this._$AH[l]),o||=!U(d)||d!==this._$AH[l],d===g?e=g:e!==g&&(e+=(d??"")+s[l+1]),this._$AH[l]=d}o&&!r&&this.j(e)}j(e){e===g?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},re=class extends N{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===g?void 0:e}},se=class extends N{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==g)}},oe=class extends N{constructor(e,t,n,r,s){super(e,t,n,r,s),this.type=5}_$AI(e,t=this){if((e=C(this,e,t,0)??g)===T)return;let n=this._$AH,r=e===g&&n!==g||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,s=e!==g&&(n===g||r);r&&this.element.removeEventListener(this.name,this,n),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},ae=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){C(this,e)}};var mt=le.litHtmlPolyfillSupport;mt?.(I,D),(le.litHtmlVersions??=[]).push("3.3.3");var Ne=(i,e,t)=>{let n=t?.renderBefore??e,r=n._$litPart$;if(r===void 0){let s=t?.renderBefore??null;n._$litPart$=r=new D(e.insertBefore(M(),s),s,void 0,t??{})}return r._$AI(i),r};var ue=globalThis,b=class extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ne(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return T}};b._$litElement$=!0,b.finalized=!0,ue.litElementHydrateSupport?.({LitElement:b});var gt=ue.litElementPolyfillSupport;gt?.({LitElement:b});(ue.litElementVersions??=[]).push("4.2.2");var J=i=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(i,e)}):customElements.define(i,e)};var _t={attribute:!0,type:String,converter:j,reflect:!1,hasChanged:G},yt=(i=_t,e,t)=>{let{kind:n,metadata:r}=t,s=globalThis.litPropertyMetadata.get(r);if(s===void 0&&globalThis.litPropertyMetadata.set(r,s=new Map),n==="setter"&&((i=Object.create(i)).wrapped=!0),s.set(t.name,i),n==="accessor"){let{name:o}=t;return{set(a){let l=e.get.call(this);e.set.call(this,a),this.requestUpdate(o,l,i,!0,a)},init(a){return a!==void 0&&this.C(o,void 0,i,a),a}}}if(n==="setter"){let{name:o}=t;return function(a){let l=this[o];e.call(this,a),this.requestUpdate(o,l,i,!0,a)}}throw Error("Unsupported decorator location: "+n)};function O(i){return(e,t)=>typeof t=="object"?yt(i,e,t):((n,r,s)=>{let o=r.hasOwnProperty(s);return r.constructor.createProperty(s,n),o?Object.getOwnPropertyDescriptor(r,s):void 0})(i,e,t)}function $(i){return O({...i,state:!0,attribute:!1})}var vt=/^(and|or|not)$/;function bt(i){return/[A-Za-z0-9_.\]]/.test(i)}function Oe(i){let e=[],t=0,n=-1,r="",s=a=>{let l=r.trim();l.length>0&&e.push({type:"ATOM",value:l,start:n,end:a}),r="",n=-1},o=(a,l)=>{r.length===0&&(n=l),r+=a};for(;t<i.length;){let a=i[t];if(a==="'"||a==='"'){let u=a,c=t+1,f=a;for(;c<i.length&&i[c]!==u;){if(i[c]==="\\"&&c+1<i.length){f+=i[c]+i[c+1],c+=2;continue}f+=i[c],c+=1}c<i.length&&(f+=i[c],c+=1),r.length===0&&(n=t),r+=f,t=c;continue}if(a==="("){let u=r.length>0?r[r.length-1]:"";if(bt(u)){let f=1,p=t+1,y="(";for(;p<i.length&&f>0;){let k=i[p];if(k==="'"||k==='"'){let tt=k;for(y+=k,p+=1;p<i.length&&i[p]!==tt;){if(i[p]==="\\"&&p+1<i.length){y+=i[p]+i[p+1],p+=2;continue}y+=i[p],p+=1}p<i.length&&(y+=i[p],p+=1);continue}k==="("&&(f+=1),k===")"&&(f-=1),y+=k,p+=1}r+=y,t=p;continue}else{s(t),e.push({type:"LPAREN",value:"(",start:t,end:t+1}),t+=1;continue}}if(a===")"){s(t),e.push({type:"RPAREN",value:")",start:t,end:t+1}),t+=1;continue}if(/\s/.test(a)){if(t+=1,r.length===0)continue;o(" ",t-1);continue}o(a,t),t+=1;let l=i[t]??"";if(t>=i.length||/[\s()]/.test(l)){let u=r.trim().split(/\s+/),c=u[u.length-1];if(vt.test(c)){let f=r.length-c.length,p=r.slice(0,f).trim();p.length>0&&e.push({type:"ATOM",value:p,start:n,end:t-c.length});let y=c.toUpperCase();e.push({type:y,value:c,start:t-c.length,end:t}),r="",n=-1}}}return s(i.length),e.push({type:"EOF",value:"",start:i.length,end:i.length}),e}var pe=class{constructor(e){this.pos=0;this.src=e,this.tokens=Oe(e)}peek(){return this.tokens[this.pos]}advance(){return this.tokens[this.pos++]}sourceBetween(e,t){return this.src.slice(e.start,t.end).trim()}parse(){let e=this.parseOr();if(this.peek().type!=="EOF")throw new Error(`Unexpected token '${this.peek().value}' at position ${this.peek().start}`);return e}parseOr(){let e=this.peek(),t=[this.parseAnd()];for(;this.peek().type==="OR";)this.advance(),t.push(this.parseAnd());if(t.length===1)return t[0];let n=this.tokens[this.pos-1];return{kind:"OR",source:this.sourceBetween(e,n),children:t}}parseAnd(){let e=this.peek(),t=[this.parseNot()];for(;this.peek().type==="AND";)this.advance(),t.push(this.parseNot());if(t.length===1)return t[0];let n=this.tokens[this.pos-1];return{kind:"AND",source:this.sourceBetween(e,n),children:t}}parseNot(){if(this.peek().type==="NOT"){let e=this.advance(),t=this.parseNot();return{kind:"NOT",source:`not ${t.source}`,children:[t]}}return this.parsePrimary()}parsePrimary(){let e=this.peek();if(e.type==="LPAREN"){this.advance();let t=this.parseOr(),n=this.peek();if(n.type!=="RPAREN")throw new Error(`Expected ')' at position ${n.start}`);return this.advance(),{...t,source:this.sourceBetween(e,this.tokens[this.pos-1])}}if(e.type==="ATOM")return this.advance(),{kind:"LEAF",source:e.value};throw new Error(`Unexpected token '${e.value}' at position ${e.start}`)}};function $t(i){let e=i.trim(),t=e.match(/^\{\{\s*([\s\S]*?)\s*\}\}$/);return t?t[1].trim():e}function Pe(i){let e=$t(i);try{return{ast:new pe(e).parse(),fallback:!1}}catch{return{ast:{kind:"LEAF",source:e},fallback:!0}}}var At=/\b(states|is_state|state_attr|is_state_attr)\(\s*(['"])((?:\\.|(?!\2).)*)\2\s*(?:,\s*(['"])((?:\\.|(?!\4).)*)\4\s*)?(?:,\s*(['"])((?:\\.|(?!\6).)*)\6\s*)?\)/g;function F(i){return i.replace(/\\(.)/g,"$1")}function R(i){let e=[],t=new RegExp(At.source,"g"),n;for(;(n=t.exec(i))!==null;){let[r,s,,o,,a,,l]=n,d=F(o);s==="states"?e.push({raw:r,fn:"states",entityId:d}):s==="is_state"?e.push({raw:r,fn:"is_state",entityId:d,compareValue:a?F(a):void 0}):s==="state_attr"?e.push({raw:r,fn:"state_attr",entityId:d,attribute:a?F(a):void 0}):s==="is_state_attr"&&e.push({raw:r,fn:"is_state_attr",entityId:d,attribute:a?F(a):void 0,compareValue:l?F(l):void 0})}return e}function Le(i){let e=new Map;for(let t of i){let n=`${t.entityId}\0${t.attribute??""}`,r=e.get(n);r||(r={entityId:t.entityId,attribute:t.attribute,usages:[]},e.set(n,r)),r.usages.push(t)}return Array.from(e.values()).sort((t,n)=>t.entityId===n.entityId?(t.attribute??"").localeCompare(n.attribute??""):t.entityId.localeCompare(n.entityId))}async function He(i,e,t,n){let r=`{{ (${e}) }}`;try{return await i.connection.subscribeMessage(s=>t(String(s?.result??"")),{type:"render_template",template:r})}catch(s){return n(s instanceof Error?s:new Error(String(s))),async()=>{}}}function je(i){let e=i.trim();if(e===""||e==="None"||e==="none"||e==="null"||e==="False"||e==="false"||e==="0")return!1;if(e==="True"||e==="true")return!0;let t=Number(e);return Number.isNaN(t)?e.length>0:t!==0}function Et(){return{loading:!0}}function qe(i,e=[]){if(i.kind==="LEAF")return e.push(i),e;for(let t of i.children??[])qe(t,e);return e}function Me(i,e){if(i.kind==="LEAF"){let r=e.get(i);return r.loading?{node:i,value:!1,loading:!0}:r.error!==void 0?{node:i,value:!1,error:r.error}:{node:i,value:je(r.rendered??""),rendered:r.rendered}}let t=(i.children??[]).map(r=>Me(r,e)),n;return i.kind==="AND"?n=t.every(r=>r.value):i.kind==="OR"?n=t.some(r=>r.value):n=!t[0].value,{node:i,value:n,children:t}}async function Ue(i,e,t){let n=[];qe(e,n);let r=new Map;for(let a of n)r.set(a,Et());let s=()=>t(Me(e,r));s();let o=[];return await Promise.all(n.map(async a=>{let l=await He(i,a.source,d=>{r.set(a,{loading:!1,rendered:d}),s()},d=>{r.set(a,{loading:!1,error:d.message}),s()});o.push(l)})),{dispose:async()=>{await Promise.all(o.map(a=>a().catch(()=>{})))}}}async function he(i){return i.callWS({type:"config/entity_registry/list"})}async function Ie(i,e){return(await he(i)).find(n=>n.entity_id===e)}var De=["state","value_template"];async function Fe(i,e){let t=await Ie(i,e);if(!t)throw new Error(`No entity registry entry found for "${e}".`);if(t.platform!=="template")throw new Error(`"${e}" is not a Template entity (platform: "${t.platform}"). Only entities created via Settings > Devices & Services > Helpers > Template are supported.`);if(!t.config_entry_id)throw new Error(`"${e}" has no config entry - it's likely a YAML-defined template sensor, which this card doesn't support. Only UI-created Template Helpers are supported.`);let n=await i.callApi("POST","config/config_entries/options/flow",{handler:t.config_entry_id});try{let o=(n.data_schema??[]).find(a=>De.includes(a.name))?.description?.suggested_value;if(typeof o!="string"||o.trim()==="")throw new Error(`Couldn't find the template field in "${e}"'s configuration (looked for: ${De.join(", ")}).`);return o}finally{await i.callApi("DELETE",`config/config_entries/options/flow/${n.flow_id}`).catch(()=>{})}}var V={"card.default_title":"Template logic","card.parse_fallback_warning":"Couldn't fully parse this template's boolean structure - showing it as a single evaluated expression instead.","card.setting_up":"Setting up live subscriptions\u2026","card.template_source_summary":"Template source (live-synced from {entity})","card.references_summary":"Referenced entities & attributes","references.entity_column":"Entity","references.value_column":"Current value","references.entity_not_found":"entity not found","references.empty":"No states()/is_state()/state_attr() references found.","tree.loading":"loading\u2026","tree.and":"AND","tree.or":"OR","tree.not":"NOT","editor.title_label":"Title (optional)","editor.entity_label":"Template Helper entity","editor.icon_label":"Icon (optional)","editor.icon_hint":"Leave blank to automatically show an on/off icon based on the entity's state.","editor.humanize_label":"Plain language","editor.hint":"Only entities created via Settings \u2192 Devices & Services \u2192 Helpers \u2192 Template are supported. The card reads that helper's template definition directly, so it always stays in sync - nothing to paste or keep updated manually.","humanize.is":"is","humanize.is_not":"is not","humanize.less_than":"is less than","humanize.less_than_or_equal":"is less than or equal to","humanize.greater_than":"is greater than","humanize.greater_than_or_equal":"is greater than or equal to","humanize.is_in":"is in","humanize.is_not_in":"is not in"};var Ve={"card.default_title":"Logique du mod\xE8le","card.parse_fallback_warning":"Impossible d'analyser enti\xE8rement la structure bool\xE9enne de ce mod\xE8le - affichage sous forme d'expression unique \xE9valu\xE9e.","card.setting_up":"Configuration des abonnements en direct\u2026","card.template_source_summary":"Source du mod\xE8le (synchronis\xE9e en direct depuis {entity})","card.references_summary":"Entit\xE9s et attributs r\xE9f\xE9renc\xE9s","references.entity_column":"Entit\xE9","references.value_column":"Valeur actuelle","references.entity_not_found":"entit\xE9 introuvable","references.empty":"Aucune r\xE9f\xE9rence states()/is_state()/state_attr() trouv\xE9e.","tree.loading":"chargement\u2026","tree.and":"ET","tree.or":"OU","tree.not":"NON","editor.title_label":"Titre (facultatif)","editor.entity_label":"Entit\xE9 d'assistant mod\xE8le","editor.icon_label":"Ic\xF4ne (facultative)","editor.icon_hint":"Laissez vide pour afficher automatiquement une ic\xF4ne marche/arr\xEAt selon l'\xE9tat de l'entit\xE9.","editor.humanize_label":"Langage simple","editor.hint":"Seules les entit\xE9s cr\xE9\xE9es via Param\xE8tres \u2192 Appareils et services \u2192 Assistants \u2192 Mod\xE8le sont prises en charge. La carte lit directement la d\xE9finition du mod\xE8le de cet assistant, elle reste donc toujours synchronis\xE9e - rien \xE0 coller ni \xE0 mettre \xE0 jour manuellement.","humanize.is":"est","humanize.is_not":"n'est pas","humanize.less_than":"est inf\xE9rieur \xE0","humanize.less_than_or_equal":"est inf\xE9rieur ou \xE9gal \xE0","humanize.greater_than":"est sup\xE9rieur \xE0","humanize.greater_than_or_equal":"est sup\xE9rieur ou \xE9gal \xE0","humanize.is_in":"est dans","humanize.is_not_in":"n'est pas dans"};var Be={"card.default_title":"Logica del modello","card.parse_fallback_warning":"Impossibile analizzare completamente la struttura booleana di questo modello - visualizzato come un'unica espressione valutata.","card.setting_up":"Configurazione delle sottoscrizioni live\u2026","card.template_source_summary":"Sorgente del modello (sincronizzata in tempo reale da {entity})","card.references_summary":"Entit\xE0 e attributi referenziati","references.entity_column":"Entit\xE0","references.value_column":"Valore attuale","references.entity_not_found":"entit\xE0 non trovata","references.empty":"Nessun riferimento states()/is_state()/state_attr() trovato.","tree.loading":"caricamento\u2026","tree.and":"E","tree.or":"O","tree.not":"NON","editor.title_label":"Titolo (opzionale)","editor.entity_label":"Entit\xE0 helper modello","editor.icon_label":"Icona (opzionale)","editor.icon_hint":"Lascia vuoto per mostrare automaticamente un'icona on/off in base allo stato dell'entit\xE0.","editor.humanize_label":"Linguaggio semplice","editor.hint":"Sono supportate solo le entit\xE0 create tramite Impostazioni \u2192 Dispositivi e servizi \u2192 Helper \u2192 Modello. La scheda legge direttamente la definizione del modello di quell'helper, quindi rimane sempre sincronizzata - niente da incollare o aggiornare manualmente.","humanize.is":"\xE8","humanize.is_not":"non \xE8","humanize.less_than":"\xE8 minore di","humanize.less_than_or_equal":"\xE8 minore o uguale a","humanize.greater_than":"\xE8 maggiore di","humanize.greater_than_or_equal":"\xE8 maggiore o uguale a","humanize.is_in":"\xE8 in","humanize.is_not_in":"non \xE8 in"};var Ke={"card.default_title":"L\xF3gica de la plantilla","card.parse_fallback_warning":"No se pudo analizar completamente la estructura booleana de esta plantilla - se muestra como una \xFAnica expresi\xF3n evaluada.","card.setting_up":"Configurando suscripciones en vivo\u2026","card.template_source_summary":"Origen de la plantilla (sincronizado en vivo desde {entity})","card.references_summary":"Entidades y atributos referenciados","references.entity_column":"Entidad","references.value_column":"Valor actual","references.entity_not_found":"entidad no encontrada","references.empty":"No se encontraron referencias states()/is_state()/state_attr().","tree.loading":"cargando\u2026","tree.and":"Y","tree.or":"O","tree.not":"NO","editor.title_label":"T\xEDtulo (opcional)","editor.entity_label":"Entidad de ayudante de plantilla","editor.icon_label":"Icono (opcional)","editor.icon_hint":"D\xE9jelo en blanco para mostrar autom\xE1ticamente un icono de encendido/apagado seg\xFAn el estado de la entidad.","editor.humanize_label":"Lenguaje sencillo","editor.hint":"Solo se admiten entidades creadas mediante Ajustes \u2192 Dispositivos y servicios \u2192 Ayudantes \u2192 Plantilla. La tarjeta lee directamente la definici\xF3n de la plantilla de ese ayudante, por lo que siempre permanece sincronizada - no hay nada que pegar ni actualizar manualmente.","humanize.is":"es","humanize.is_not":"no es","humanize.less_than":"es menor que","humanize.less_than_or_equal":"es menor o igual que","humanize.greater_than":"es mayor que","humanize.greater_than_or_equal":"es mayor o igual que","humanize.is_in":"est\xE1 en","humanize.is_not_in":"no est\xE1 en"};var We={"card.default_title":"Vorlagenlogik","card.parse_fallback_warning":"Die boolesche Struktur dieser Vorlage konnte nicht vollst\xE4ndig analysiert werden - wird als einzelner ausgewerteter Ausdruck angezeigt.","card.setting_up":"Live-Abonnements werden eingerichtet\u2026","card.template_source_summary":"Vorlagenquelle (live synchronisiert von {entity})","card.references_summary":"Referenzierte Entit\xE4ten & Attribute","references.entity_column":"Entit\xE4t","references.value_column":"Aktueller Wert","references.entity_not_found":"Entit\xE4t nicht gefunden","references.empty":"Keine states()/is_state()/state_attr()-Referenzen gefunden.","tree.loading":"wird geladen\u2026","tree.and":"UND","tree.or":"ODER","tree.not":"NICHT","editor.title_label":"Titel (optional)","editor.entity_label":"Vorlagen-Helfer-Entit\xE4t","editor.icon_label":"Symbol (optional)","editor.icon_hint":"Leer lassen, um automatisch ein Ein/Aus-Symbol basierend auf dem Zustand der Entit\xE4t anzuzeigen.","editor.humanize_label":"Einfache Sprache","editor.hint":"Es werden nur Entit\xE4ten unterst\xFCtzt, die \xFCber Einstellungen \u2192 Ger\xE4te & Dienste \u2192 Helfer \u2192 Vorlage erstellt wurden. Die Karte liest die Vorlagendefinition dieses Helfers direkt aus, sodass sie immer synchron bleibt - nichts muss manuell eingef\xFCgt oder aktualisiert werden.","humanize.is":"ist","humanize.is_not":"ist nicht","humanize.less_than":"ist kleiner als","humanize.less_than_or_equal":"ist kleiner oder gleich","humanize.greater_than":"ist gr\xF6\xDFer als","humanize.greater_than_or_equal":"ist gr\xF6\xDFer oder gleich","humanize.is_in":"ist in","humanize.is_not_in":"ist nicht in"};var Ge={"card.default_title":"Sjabloonlogica","card.parse_fallback_warning":"Kon de booleaanse structuur van dit sjabloon niet volledig analyseren - wordt weergegeven als \xE9\xE9n ge\xEBvalueerde expressie.","card.setting_up":"Live-abonnementen worden ingesteld\u2026","card.template_source_summary":"Sjabloonbron (live gesynchroniseerd vanaf {entity})","card.references_summary":"Gerefereerde entiteiten & attributen","references.entity_column":"Entiteit","references.value_column":"Huidige waarde","references.entity_not_found":"entiteit niet gevonden","references.empty":"Geen states()/is_state()/state_attr()-referenties gevonden.","tree.loading":"laden\u2026","tree.and":"EN","tree.or":"OF","tree.not":"NIET","editor.title_label":"Titel (optioneel)","editor.entity_label":"Sjabloonhelper-entiteit","editor.icon_label":"Pictogram (optioneel)","editor.icon_hint":"Laat leeg om automatisch een aan/uit-pictogram te tonen op basis van de status van de entiteit.","editor.humanize_label":"Duidelijke taal","editor.hint":"Alleen entiteiten die zijn aangemaakt via Instellingen \u2192 Apparaten en diensten \u2192 Hulpmiddelen \u2192 Sjabloon worden ondersteund. De kaart leest de sjabloondefinitie van die hulp rechtstreeks, zodat deze altijd gesynchroniseerd blijft - niets om te plakken of handmatig bij te werken.","humanize.is":"is","humanize.is_not":"is niet","humanize.less_than":"is kleiner dan","humanize.less_than_or_equal":"is kleiner dan of gelijk aan","humanize.greater_than":"is groter dan","humanize.greater_than_or_equal":"is groter dan of gelijk aan","humanize.is_in":"is in","humanize.is_not_in":"is niet in"};var Ye={"card.default_title":"Malogikk","card.parse_fallback_warning":"Klarte ikke \xE5 analysere hele den boolske strukturen i denne malen - viser den som ett enkelt evaluert uttrykk i stedet.","card.setting_up":"Setter opp direkteabonnementer\u2026","card.template_source_summary":"Malkilde (synkronisert direkte fra {entity})","card.references_summary":"Refererte enheter og attributter","references.entity_column":"Enhet","references.value_column":"N\xE5v\xE6rende verdi","references.entity_not_found":"enheten ble ikke funnet","references.empty":"Fant ingen states()/is_state()/state_attr()-referanser.","tree.loading":"laster\u2026","tree.and":"OG","tree.or":"ELLER","tree.not":"IKKE","editor.title_label":"Tittel (valgfritt)","editor.entity_label":"Malhjelper-enhet","editor.icon_label":"Ikon (valgfritt)","editor.icon_hint":"La st\xE5 tomt for \xE5 automatisk vise et p\xE5/av-ikon basert p\xE5 enhetens tilstand.","editor.humanize_label":"Enkelt spr\xE5k","editor.hint":"Kun enheter opprettet via Innstillinger \u2192 Enheter og tjenester \u2192 Hjelpere \u2192 Mal st\xF8ttes. Kortet leser malens definisjon direkte fra hjelperen, s\xE5 det holder seg alltid synkronisert - ingenting \xE5 lime inn eller oppdatere manuelt.","humanize.is":"er","humanize.is_not":"er ikke","humanize.less_than":"er mindre enn","humanize.less_than_or_equal":"er mindre enn eller lik","humanize.greater_than":"er st\xF8rre enn","humanize.greater_than_or_equal":"er st\xF8rre enn eller lik","humanize.is_in":"er i","humanize.is_not_in":"er ikke i"};var Je={"card.default_title":"Malogikk","card.parse_fallback_warning":"Klarte ikkje \xE5 analysere heile den boolske strukturen i denne malen - viser han som eitt enkelt evaluert uttrykk i staden.","card.setting_up":"Set opp direkteabonnement\u2026","card.template_source_summary":"Malkjelde (synkronisert direkte fr\xE5 {entity})","card.references_summary":"Refererte einingar og attributt","references.entity_column":"Eining","references.value_column":"Gjeldande verdi","references.entity_not_found":"eininga vart ikkje funnen","references.empty":"Fann ingen states()/is_state()/state_attr()-referansar.","tree.loading":"lastar\u2026","tree.and":"OG","tree.or":"ELLER","tree.not":"IKKJE","editor.title_label":"Tittel (valfritt)","editor.entity_label":"Malhjelpar-eining","editor.icon_label":"Ikon (valfritt)","editor.icon_hint":"La st\xE5 tomt for \xE5 automatisk visa eit p\xE5/av-ikon basert p\xE5 tilstanden til eininga.","editor.humanize_label":"Enkelt spr\xE5k","editor.hint":"Berre einingar oppretta via Innstillingar \u2192 Einingar og tenester \u2192 Hjelparar \u2192 Mal er st\xF8tta. Kortet les maldefinisjonen til den hjelparen direkte, s\xE5 det held seg alltid synkronisert - ingenting \xE5 lime inn eller oppdatere manuelt.","humanize.is":"er","humanize.is_not":"er ikkje","humanize.less_than":"er mindre enn","humanize.less_than_or_equal":"er mindre enn eller lik","humanize.greater_than":"er st\xF8rre enn","humanize.greater_than_or_equal":"er st\xF8rre enn eller lik","humanize.is_in":"er i","humanize.is_not_in":"er ikkje i"};var Q={en:V,fr:Ve,it:Be,es:Ke,de:We,nl:Ge,nb:Ye,nn:Je};function xt(i){if(!i)return V;if(Q[i])return Q[i];let e=i.split("-")[0];return Q[e]?Q[e]:V}function h(i,e,t){let r=xt(i?.language)[e]??V[e];if(t)for(let[s,o]of Object.entries(t))r=r.replaceAll(`{${s}}`,o);return r}var kt=[["<=","lte"],[">=","gte"],["!=","ne"],["==","eq"],["<","lt"],[">","gt"]],wt=[["not in","not_in"],["is not","is_not"],["in","in"],["is","is"]],Ze={eq:"humanize.is",ne:"humanize.is_not",lt:"humanize.less_than",lte:"humanize.less_than_or_equal",gt:"humanize.greater_than",gte:"humanize.greater_than_or_equal",in:"humanize.is_in",not_in:"humanize.is_not_in",is:"humanize.is",is_not:"humanize.is_not"};function Qe(i){return/[A-Za-z0-9_.\]]/.test(i)}function zt(i){let e=0;for(let t=0;t<i.length;t++){let n=i[t];if(n==="'"||n==='"'){let r=n;for(t++;t<i.length&&i[t]!==r;)i[t]==="\\"&&t++,t++;continue}if(n==="("){e++;continue}if(n===")"){e--;continue}if(e===0){for(let[r,s]of kt)if(i.startsWith(r,t)){let o=i.slice(0,t).trim(),a=i.slice(t+r.length).trim();if(o&&a)return{op:s,left:o,right:a}}for(let[r,s]of wt)if(i.startsWith(r,t)){let o=t>0?i[t-1]:" ",a=t+r.length,l=a<i.length?i[a]:" ";if(!Qe(o)&&!Qe(l)){let d=i.slice(0,t).trim(),u=i.slice(a).trim();if(d&&u)return{op:s,left:d,right:u}}}}}return null}function St(i){switch(i){case"lt":return"gt";case"gt":return"lt";case"lte":return"gte";case"gte":return"lte";case"eq":return"eq";case"ne":return"ne";default:return null}}function Tt(i,e){let t=i?.states?.[e]?.attributes?.friendly_name;if(typeof t=="string"&&t.trim()!=="")return t.trim();let n=e.replace(/^[a-z_]+\./,"").replace(/[-_]+/g," ").trim();return n.length>0?n:e}function Rt(i){return i.replace(/[-_]+/g," ")}function X(i,e){let t=Tt(i,e.entityId);return e.attribute?`${t} ${Rt(e.attribute)}`:t}function Ct(i){let e=i.trim();return e.startsWith("'")&&e.endsWith("'")&&e.length>=2||e.startsWith('"')&&e.endsWith('"')&&e.length>=2?e.slice(1,-1).replace(/\\(.)/g,"$1"):null}function Nt(i,e){let t=[],n="",r=0,s=null;for(let o=0;o<i.length;o++){let a=i[o];if(s){if(a==="\\"){n+=a+(i[o+1]??""),o++;continue}n+=a,a===s&&(s=null);continue}if(a==="'"||a==='"'){s=a,n+=a;continue}if(a==="["&&r++,a==="]"&&r--,a===e&&r===0){t.push(n),n="";continue}n+=a}return n.trim()&&t.push(n),t}function fe(i,e){let t=Ct(i);if(t!==null)return t;let n=i.trim();if(/^-?\d+(\.\d+)?$/.test(n))return n;if(/^\[.*\]$/.test(n)){let s=n.slice(1,-1),a=Nt(s,",").map(l=>fe(l,e));return a.some(l=>l===null)?null:a.join(", ")}let r=R(n);return r.length===1?X(e,r[0]):n}function Xe(i,e){let t=zt(i);if(t){let o=R(t.left),a=R(t.right),l=null,d=null,u=t.op;if(o.length>=1)l=X(e,o[0]),d=t.right;else if(a.length>=1){let f=St(t.op);if(f===null)return null;l=X(e,a[0]),d=t.left,u=f}else return null;let c=fe(d,e);return l===null||c===null?null:`${l} ${h(e,Ze[u])} ${c}`}let n=R(i);if(n.length!==1)return null;let r=n[0],s=X(e,r);if(r.compareValue!==void 0){let o=fe(r.compareValue,e);return o===null?null:`${s} ${h(e,Ze.eq)} ${o}`}return s}function Ot(i,e){switch(i){case"AND":return h(e,"tree.and");case"OR":return h(e,"tree.or");case"NOT":return h(e,"tree.not");default:return""}}function me(i,e,t=!1,n=0){let{node:r,value:s,rendered:o,error:a,loading:l}=i,d=l?"tpl-node--loading":a?"tpl-node--error":s?"tpl-node--true":"tpl-node--false";if(r.kind==="LEAF"){let c=Xe(r.source,e),f=t?r.source:c??r.source;return m`
      <div class="tpl-node ${d}" style="--depth: ${n}">
        <span class="tpl-node__badge">${l?"\u2026":a?"!":s?"\u2713":"\u2717"}</span>
        <span class="tpl-node__label${t?" tpl-node__label--code":""}">${f}</span>
        ${l?m`<span class="tpl-node__meta">${h(e,"tree.loading")}</span>`:a?m`<span class="tpl-node__meta tpl-node__meta--error">${a}</span>`:m`<span class="tpl-node__meta">→ ${o}</span>`}
      </div>
    `}let u=i.children??[];return m`
    <div class="tpl-node ${d} tpl-node--group" style="--depth: ${n}">
      <span class="tpl-node__badge">${s?"\u2713":"\u2717"}</span>
      <span class="tpl-node__op">${Ot(r.kind,e)}</span>
    </div>
    <div class="tpl-children">
      ${u.map(c=>me(c,e,t,n+1))}
    </div>
  `}function Pt(i){return i===void 0?"\u2014":i===null?"null":typeof i=="object"?JSON.stringify(i):String(i)}function et(i,e,t){return i.length===0?m`<div class="tpl-refs-empty">${h(t,"references.empty")}</div>`:m`
    <table class="tpl-refs">
      <thead>
        <tr>
          <th>${h(t,"references.entity_column")}</th>
          <th>${h(t,"references.value_column")}</th>
        </tr>
      </thead>
      <tbody>
        ${i.map(n=>{let r=e[n.entityId],s=r===void 0,o=n.attribute?r?.attributes?.[n.attribute]:r?.state,a=n.attribute?`${n.entityId}.${n.attribute}`:n.entityId;return m`
            <tr class=${s?"tpl-refs__row--missing":""}>
              <td><code>${a}</code></td>
              <td>${s?h(t,"references.entity_not_found"):Pt(o)}</td>
            </tr>
          `})}
      </tbody>
    </table>
  `}var x=class extends b{constructor(){super(...arguments);this.entityFilter=t=>!this.templateEntityIds||this.templateEntityIds.size===0||this.templateEntityIds.has(t.entity_id)}setConfig(t){this.config=t}willUpdate(){this.hass&&!this.templateEntityIds&&this.loadTemplateEntities()}async loadTemplateEntities(){if(this.hass){this.templateEntityIds=new Set;try{let t=await he(this.hass);this.templateEntityIds=new Set(t.filter(n=>n.platform==="template").map(n=>n.entity_id))}catch{this.templateEntityIds=new Set}}}emit(t){if(!this.config)return;let n={...this.config,...t};this.config=n,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:n}}))}render(){return this.config?m`
      <div class="form">
        <ha-input
          .label=${h(this.hass,"editor.title_label")}
          .value=${this.config.title??""}
          @input=${t=>this.emit({title:t.target.value})}
        ></ha-input>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this.config.entity??""}
          .label=${h(this.hass,"editor.entity_label")}
          .entityFilter=${this.entityFilter}
          @value-changed=${t=>this.emit({entity:t.detail.value})}
        ></ha-entity-picker>
        <ha-icon-picker
          .hass=${this.hass}
          .value=${this.config.icon??""}
          .label=${h(this.hass,"editor.icon_label")}
          @value-changed=${t=>this.emit({icon:t.detail.value||void 0})}
        ></ha-icon-picker>
        <p class="tpl-hint">${h(this.hass,"editor.icon_hint")}</p>
        <ha-switch
          .checked=${this.config.showCode!==!0}
          @change=${t=>this.emit({showCode:!t.target.checked})}
        >${h(this.hass,"editor.humanize_label")}</ha-switch>
        <ha-alert alert-type="info">${h(this.hass,"editor.hint")}</ha-alert>
      </div>
    `:m``}};x.styles=L`
    .form {
      display: flex;
      flex-direction: column;
      gap: var(--ha-space-3, 12px);
      padding: 8px 0;
    }
    .tpl-hint {
      font-size: 12px;
      color: var(--secondary-text-color);
      margin: 0;
    }
    ha-alert {
      margin-top: var(--ha-space-1, 4px);
    }
  `,_([O({attribute:!1})],x.prototype,"hass",2),_([$()],x.prototype,"config",2),_([$()],x.prototype,"templateEntityIds",2),x=_([J("ha-template-visualizer-card-editor")],x);var v=class extends b{constructor(){super(...arguments);this.references=[];this.parseFallback=!1;this.setupGeneration=0}setConfig(t){if(!t?.entity)throw new Error('ha-template-visualizer-card: "entity" is required in the card config.');this.config=t}static getConfigElement(){return document.createElement("ha-template-visualizer-card-editor")}static getStubConfig(){return{type:"custom:ha-template-visualizer-card",entity:"binary_sensor.example_template_helper"}}willUpdate(){this.config&&this.hass&&this.config.entity!==this.subscribedEntity&&this.setupLiveTree()}async setupLiveTree(){if(!this.config||!this.hass)return;let t=this.config.entity;this.subscribedEntity=t;let n=++this.setupGeneration,r=this.liveHandle;this.liveHandle=void 0,this.tree=void 0,this.references=[],this.templateText=void 0,this.globalError=void 0,r&&r.dispose();try{let s=await Fe(this.hass,t);if(n!==this.setupGeneration)return;this.templateText=s,this.references=Le(R(s));let{ast:o,fallback:a}=Pe(s);this.parseFallback=a;let l=await Ue(this.hass,o,d=>{n===this.setupGeneration&&(this.tree=d)});if(n!==this.setupGeneration){l.dispose();return}this.liveHandle=l}catch(s){if(n!==this.setupGeneration)return;this.globalError=s instanceof Error?s.message:String(s)}}disconnectedCallback(){super.disconnectedCallback(),this.setupGeneration++,this.liveHandle?.dispose(),this.liveHandle=void 0}render(){if(!this.config)return m``;let t=this.config.title??h(this.hass,"card.default_title"),n=this.hass?.states?.[this.config.entity];return m`
      <ha-card>
        <div class="card-header">
          ${this.config.icon?m`<ha-icon icon=${this.config.icon}></ha-icon>`:m`<ha-state-icon .hass=${this.hass} .stateObj=${n}></ha-state-icon>`}
          <span class="card-header__title">${t}</span>
        </div>
        <div class="card-content">
          ${this.globalError?m`<div class="tpl-error">${this.globalError}</div>`:m`
                ${this.parseFallback?m`<div class="tpl-warning">${h(this.hass,"card.parse_fallback_warning")}</div>`:""}
                ${this.tree?me(this.tree,this.hass,this.config.showCode===!0):m`<div>${h(this.hass,"card.setting_up")}</div>`}
                ${this.templateText?m`<details class="tpl-source">
                      <summary>
                        ${h(this.hass,"card.template_source_summary",{entity:this.config.entity})}
                      </summary>
                      <pre>${this.templateText}</pre>
                    </details>`:""}
                <details class="tpl-refs-details">
                  <summary>${h(this.hass,"card.references_summary")}</summary>
                  ${et(this.references,this.hass?.states??{},this.hass)}
                </details>
              `}
        </div>
      </ha-card>
    `}};v.styles=L`
    :host {
      display: block;
    }
    .card-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 16px 0;
      font-size: 1.2em;
      font-weight: 400;
      color: var(--ha-card-header-color, var(--primary-text-color));
    }
    .card-header ha-icon,
    .card-header ha-state-icon {
      --mdc-icon-size: 24px;
      color: var(--paper-item-icon-color, #44739e);
      flex: none;
    }
    .card-content {
      padding: 8px 16px 16px;
      font-family: var(--paper-font-body1_-_font-family, sans-serif);
    }
    .tpl-node {
      display: flex;
      align-items: baseline;
      gap: 8px;
      padding: 4px 0 4px calc(var(--depth, 0) * 18px);
      font-size: 13px;
      line-height: 1.4;
    }
    .tpl-node__badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      font-size: 11px;
      font-weight: bold;
      flex: none;
    }
    .tpl-node--true .tpl-node__badge {
      background: var(--success-color, #4caf50);
      color: white;
    }
    .tpl-node--false .tpl-node__badge {
      background: var(--error-color, #db4437);
      color: white;
    }
    .tpl-node--error .tpl-node__badge {
      background: var(--warning-color, #ff9800);
      color: white;
    }
    .tpl-node--loading .tpl-node__badge {
      background: var(--disabled-text-color, #9e9e9e);
      color: white;
    }
    .tpl-node__op {
      font-weight: 700;
      letter-spacing: 0.5px;
      color: var(--secondary-text-color);
    }
    .tpl-node__label {
      font-weight: 500;
    }
    .tpl-node__label--code {
      font-family: var(--code-editor-font-family, monospace);
      font-size: 12px;
      white-space: pre-wrap;
      word-break: break-word;
    }
    .tpl-node__meta {
      color: var(--secondary-text-color);
      font-size: 12px;
    }
    .tpl-node__meta--error {
      color: var(--error-color, #db4437);
    }
    .tpl-children {
      border-left: 1px dashed var(--divider-color, #ccc);
      margin-left: 8px;
    }
    .tpl-error {
      color: var(--error-color, #db4437);
    }
    .tpl-warning {
      color: var(--warning-color, #ff9800);
      font-size: 12px;
      margin-bottom: 8px;
    }
    .tpl-source,
    .tpl-refs-details {
      margin: 12px 0 0;
      font-size: 12px;
    }
    .tpl-refs-details summary,
    .tpl-source summary {
      cursor: pointer;
      color: var(--secondary-text-color);
    }
    .tpl-source pre {
      white-space: pre-wrap;
      background: var(--code-editor-background-color, rgba(127, 127, 127, 0.08));
      padding: 8px;
      border-radius: 4px;
      margin: 6px 0 0;
    }
    .tpl-loading {
      font-size: 12px;
      color: var(--secondary-text-color);
      margin-top: 8px;
    }
    .tpl-refs {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
    }
    .tpl-refs th {
      text-align: left;
      font-weight: 600;
      color: var(--secondary-text-color);
      border-bottom: 1px solid var(--divider-color, #ccc);
      padding: 4px 8px 4px 0;
    }
    .tpl-refs td {
      padding: 4px 8px 4px 0;
      border-bottom: 1px solid var(--divider-color, rgba(127, 127, 127, 0.15));
      vertical-align: top;
    }
    .tpl-refs__row--missing td {
      color: var(--error-color, #db4437);
    }
    .tpl-refs-empty {
      font-size: 12px;
      color: var(--secondary-text-color);
      margin-top: 8px;
    }
  `,_([O({attribute:!1})],v.prototype,"hass",2),_([$()],v.prototype,"config",2),_([$()],v.prototype,"tree",2),_([$()],v.prototype,"references",2),_([$()],v.prototype,"parseFallback",2),_([$()],v.prototype,"globalError",2),_([$()],v.prototype,"templateText",2),v=_([J("ha-template-visualizer-card")],v);window.customCards=window.customCards||[];window.customCards.push({type:"ha-template-visualizer-card",name:"Template Logic Visualizer",description:"Visualizes a template sensor's boolean logic tree and shows which sub-conditions are true/false."});export{v as HaTemplateEditorCard};
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
//# sourceMappingURL=ha-template-visualizer-card.js.map
