var Ze=Object.defineProperty;var Qe=Object.getOwnPropertyDescriptor;var y=(r,e,t,n)=>{for(var i=n>1?void 0:n?Qe(e,t):e,s=r.length-1,o;s>=0;s--)(o=r[s])&&(i=(n?o(e,t,i):o(i))||i);return n&&i&&Ze(e,t,i),i};var V=globalThis,B=V.ShadowRoot&&(V.ShadyCSS===void 0||V.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Q=Symbol(),ue=new WeakMap,P=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==Q)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(B&&e===void 0){let n=t!==void 0&&t.length===1;n&&(e=ue.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&ue.set(t,e))}return e}toString(){return this.cssText}},fe=r=>new P(typeof r=="string"?r:r+"",void 0,Q),L=(r,...e)=>{let t=r.length===1?r[0]:e.reduce((n,i,s)=>n+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[s+1],r[0]);return new P(t,r,Q)},me=(r,e)=>{if(B)r.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let n=document.createElement("style"),i=V.litNonce;i!==void 0&&n.setAttribute("nonce",i),n.textContent=t.cssText,r.appendChild(n)}},X=B?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(let n of e.cssRules)t+=n.cssText;return fe(t)})(r):r;var{is:Xe,defineProperty:et,getOwnPropertyDescriptor:tt,getOwnPropertyNames:nt,getOwnPropertySymbols:rt,getPrototypeOf:it}=Object,K=globalThis,ge=K.trustedTypes,st=ge?ge.emptyScript:"",ot=K.reactiveElementPolyfillSupport,z=(r,e)=>r,H={toAttribute(r,e){switch(e){case Boolean:r=r?st:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},W=(r,e)=>!Xe(r,e),ye={attribute:!0,type:String,converter:H,reflect:!1,useDefault:!1,hasChanged:W};Symbol.metadata??=Symbol("metadata"),K.litPropertyMetadata??=new WeakMap;var A=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ye){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),i=this.getPropertyDescriptor(e,n,t);i!==void 0&&et(this.prototype,e,i)}}static getPropertyDescriptor(e,t,n){let{get:i,set:s}=tt(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:i,set(o){let a=i?.call(this);s?.call(this,o),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ye}static _$Ei(){if(this.hasOwnProperty(z("elementProperties")))return;let e=it(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(z("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(z("properties"))){let t=this.properties,n=[...nt(t),...rt(t)];for(let i of n)this.createProperty(i,t[i])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[n,i]of t)this.elementProperties.set(n,i)}this._$Eh=new Map;for(let[t,n]of this.elementProperties){let i=this._$Eu(t,n);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let i of n)t.unshift(X(i))}else e!==void 0&&t.push(X(e));return t}static _$Eu(e,t){let n=t.attribute;return n===!1?void 0:typeof n=="string"?n:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return me(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,n);if(i!==void 0&&n.reflect===!0){let s=(n.converter?.toAttribute!==void 0?n.converter:H).toAttribute(t,n.type);this._$Em=e,s==null?this.removeAttribute(i):this.setAttribute(i,s),this._$Em=null}}_$AK(e,t){let n=this.constructor,i=n._$Eh.get(e);if(i!==void 0&&this._$Em!==i){let s=n.getPropertyOptions(i),o=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:H;this._$Em=i;let a=o.fromAttribute(t,s.type);this[i]=a??this._$Ej?.get(i)??a,this._$Em=null}}requestUpdate(e,t,n,i=!1,s){if(e!==void 0){let o=this.constructor;if(i===!1&&(s=this[e]),n??=o.getPropertyOptions(e),!((n.hasChanged??W)(s,t)||n.useDefault&&n.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,n))))return;this.C(e,t,n)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:i,wrapped:s},o){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),s!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,s]of this._$Ep)this[i]=s;this._$Ep=void 0}let n=this.constructor.elementProperties;if(n.size>0)for(let[i,s]of n){let{wrapped:o}=s,a=this[i];o!==!0||this._$AL.has(i)||a===void 0||this.C(i,void 0,s,a)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(n=>n.hostUpdate?.()),this.update(t)):this._$EM()}catch(n){throw e=!1,this._$EM(),n}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[z("elementProperties")]=new Map,A[z("finalized")]=new Map,ot?.({ReactiveElement:A}),(K.reactiveElementVersions??=[]).push("2.1.2");var oe=globalThis,_e=r=>r,G=oe.trustedTypes,ve=G?G.createPolicy("lit-html",{createHTML:r=>r}):void 0,we="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,ke="?"+E,at=`<${ke}>`,T=document,M=()=>T.createComment(""),U=r=>r===null||typeof r!="object"&&typeof r!="function",ae=Array.isArray,lt=r=>ae(r)||typeof r?.[Symbol.iterator]=="function",ee=`[ 	
\f\r]`,j=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,be=/-->/g,$e=/>/g,k=RegExp(`>|${ee}(?:([^\\s"'>=/]+)(${ee}*=${ee}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ae=/'/g,Ee=/"/g,Se=/^(?:script|style|textarea|title)$/i,le=r=>(e,...t)=>({_$litType$:r,strings:e,values:t}),u=le(1),kt=le(2),St=le(3),R=Symbol.for("lit-noChange"),g=Symbol.for("lit-nothing"),xe=new WeakMap,S=T.createTreeWalker(T,129);function Te(r,e){if(!ae(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return ve!==void 0?ve.createHTML(e):e}var ct=(r,e)=>{let t=r.length-1,n=[],i,s=e===2?"<svg>":e===3?"<math>":"",o=j;for(let a=0;a<t;a++){let l=r[a],d,h,c=-1,m=0;for(;m<l.length&&(o.lastIndex=m,h=o.exec(l),h!==null);)m=o.lastIndex,o===j?h[1]==="!--"?o=be:h[1]!==void 0?o=$e:h[2]!==void 0?(Se.test(h[2])&&(i=RegExp("</"+h[2],"g")),o=k):h[3]!==void 0&&(o=k):o===k?h[0]===">"?(o=i??j,c=-1):h[1]===void 0?c=-2:(c=o.lastIndex-h[2].length,d=h[1],o=h[3]===void 0?k:h[3]==='"'?Ee:Ae):o===Ee||o===Ae?o=k:o===be||o===$e?o=j:(o=k,i=void 0);let p=o===k&&r[a+1].startsWith("/>")?" ":"";s+=o===j?l+at:c>=0?(n.push(d),l.slice(0,c)+we+l.slice(c)+E+p):l+E+(c===-2?a:p)}return[Te(r,s+(r[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]},I=class r{constructor({strings:e,_$litType$:t},n){let i;this.parts=[];let s=0,o=0,a=e.length-1,l=this.parts,[d,h]=ct(e,t);if(this.el=r.createElement(d,n),S.currentNode=this.el.content,t===2||t===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(i=S.nextNode())!==null&&l.length<a;){if(i.nodeType===1){if(i.hasAttributes())for(let c of i.getAttributeNames())if(c.endsWith(we)){let m=h[o++],p=i.getAttribute(c).split(E),_=/([.?@])?(.*)/.exec(m);l.push({type:1,index:s,name:_[2],strings:p,ctor:_[1]==="."?ne:_[1]==="?"?re:_[1]==="@"?ie:C}),i.removeAttribute(c)}else c.startsWith(E)&&(l.push({type:6,index:s}),i.removeAttribute(c));if(Se.test(i.tagName)){let c=i.textContent.split(E),m=c.length-1;if(m>0){i.textContent=G?G.emptyScript:"";for(let p=0;p<m;p++)i.append(c[p],M()),S.nextNode(),l.push({type:2,index:++s});i.append(c[m],M())}}}else if(i.nodeType===8)if(i.data===ke)l.push({type:2,index:s});else{let c=-1;for(;(c=i.data.indexOf(E,c+1))!==-1;)l.push({type:7,index:s}),c+=E.length-1}s++}}static createElement(e,t){let n=T.createElement("template");return n.innerHTML=e,n}};function N(r,e,t=r,n){if(e===R)return e;let i=n!==void 0?t._$Co?.[n]:t._$Cl,s=U(e)?void 0:e._$litDirective$;return i?.constructor!==s&&(i?._$AO?.(!1),s===void 0?i=void 0:(i=new s(r),i._$AT(r,t,n)),n!==void 0?(t._$Co??=[])[n]=i:t._$Cl=i),i!==void 0&&(e=N(r,i._$AS(r,e.values),i,n)),e}var te=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,i=(e?.creationScope??T).importNode(t,!0);S.currentNode=i;let s=S.nextNode(),o=0,a=0,l=n[0];for(;l!==void 0;){if(o===l.index){let d;l.type===2?d=new D(s,s.nextSibling,this,e):l.type===1?d=new l.ctor(s,l.name,l.strings,this,e):l.type===6&&(d=new se(s,this,e)),this._$AV.push(d),l=n[++a]}o!==l?.index&&(s=S.nextNode(),o++)}return S.currentNode=T,i}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,t),t+=n.strings.length-2):n._$AI(e[t])),t++}},D=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,i){this.type=2,this._$AH=g,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=N(this,e,t),U(e)?e===g||e==null||e===""?(this._$AH!==g&&this._$AR(),this._$AH=g):e!==this._$AH&&e!==R&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):lt(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==g&&U(this._$AH)?this._$AA.nextSibling.data=e:this.T(T.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,i=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=I.createElement(Te(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===i)this._$AH.p(t);else{let s=new te(i,this),o=s.u(this.options);s.p(t),this.T(o),this._$AH=s}}_$AC(e){let t=xe.get(e.strings);return t===void 0&&xe.set(e.strings,t=new I(e)),t}k(e){ae(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,n,i=0;for(let s of e)i===t.length?t.push(n=new r(this.O(M()),this.O(M()),this,this.options)):n=t[i],n._$AI(s),i++;i<t.length&&(this._$AR(n&&n._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let n=_e(e).nextSibling;_e(e).remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},C=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,i,s){this.type=1,this._$AH=g,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=s,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=g}_$AI(e,t=this,n,i){let s=this.strings,o=!1;if(s===void 0)e=N(this,e,t,0),o=!U(e)||e!==this._$AH&&e!==R,o&&(this._$AH=e);else{let a=e,l,d;for(e=s[0],l=0;l<s.length-1;l++)d=N(this,a[n+l],t,l),d===R&&(d=this._$AH[l]),o||=!U(d)||d!==this._$AH[l],d===g?e=g:e!==g&&(e+=(d??"")+s[l+1]),this._$AH[l]=d}o&&!i&&this.j(e)}j(e){e===g?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},ne=class extends C{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===g?void 0:e}},re=class extends C{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==g)}},ie=class extends C{constructor(e,t,n,i,s){super(e,t,n,i,s),this.type=5}_$AI(e,t=this){if((e=N(this,e,t,0)??g)===R)return;let n=this._$AH,i=e===g&&n!==g||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,s=e!==g&&(n===g||i);i&&this.element.removeEventListener(this.name,this,n),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},se=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){N(this,e)}};var dt=oe.litHtmlPolyfillSupport;dt?.(I,D),(oe.litHtmlVersions??=[]).push("3.3.3");var Re=(r,e,t)=>{let n=t?.renderBefore??e,i=n._$litPart$;if(i===void 0){let s=t?.renderBefore??null;n._$litPart$=i=new D(e.insertBefore(M(),s),s,void 0,t??{})}return i._$AI(r),i};var ce=globalThis,b=class extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Re(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return R}};b._$litElement$=!0,b.finalized=!0,ce.litElementHydrateSupport?.({LitElement:b});var pt=ce.litElementPolyfillSupport;pt?.({LitElement:b});(ce.litElementVersions??=[]).push("4.2.2");var J=r=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(r,e)}):customElements.define(r,e)};var ht={attribute:!0,type:String,converter:H,reflect:!1,hasChanged:W},ut=(r=ht,e,t)=>{let{kind:n,metadata:i}=t,s=globalThis.litPropertyMetadata.get(i);if(s===void 0&&globalThis.litPropertyMetadata.set(i,s=new Map),n==="setter"&&((r=Object.create(r)).wrapped=!0),s.set(t.name,r),n==="accessor"){let{name:o}=t;return{set(a){let l=e.get.call(this);e.set.call(this,a),this.requestUpdate(o,l,r,!0,a)},init(a){return a!==void 0&&this.C(o,void 0,r,a),a}}}if(n==="setter"){let{name:o}=t;return function(a){let l=this[o];e.call(this,a),this.requestUpdate(o,l,r,!0,a)}}throw Error("Unsupported decorator location: "+n)};function O(r){return(e,t)=>typeof t=="object"?ut(r,e,t):((n,i,s)=>{let o=i.hasOwnProperty(s);return i.constructor.createProperty(s,n),o?Object.getOwnPropertyDescriptor(i,s):void 0})(r,e,t)}function $(r){return O({...r,state:!0,attribute:!1})}var ft=/^(and|or|not)$/;function mt(r){return/[A-Za-z0-9_.\]]/.test(r)}function Ne(r){let e=[],t=0,n=-1,i="",s=a=>{let l=i.trim();l.length>0&&e.push({type:"ATOM",value:l,start:n,end:a}),i="",n=-1},o=(a,l)=>{i.length===0&&(n=l),i+=a};for(;t<r.length;){let a=r[t];if(a==="'"||a==='"'){let h=a,c=t+1,m=a;for(;c<r.length&&r[c]!==h;){if(r[c]==="\\"&&c+1<r.length){m+=r[c]+r[c+1],c+=2;continue}m+=r[c],c+=1}c<r.length&&(m+=r[c],c+=1),i.length===0&&(n=t),i+=m,t=c;continue}if(a==="("){let h=i.length>0?i[i.length-1]:"";if(mt(h)){let m=1,p=t+1,_="(";for(;p<r.length&&m>0;){let w=r[p];if(w==="'"||w==='"'){let Ye=w;for(_+=w,p+=1;p<r.length&&r[p]!==Ye;){if(r[p]==="\\"&&p+1<r.length){_+=r[p]+r[p+1],p+=2;continue}_+=r[p],p+=1}p<r.length&&(_+=r[p],p+=1);continue}w==="("&&(m+=1),w===")"&&(m-=1),_+=w,p+=1}i+=_,t=p;continue}else{s(t),e.push({type:"LPAREN",value:"(",start:t,end:t+1}),t+=1;continue}}if(a===")"){s(t),e.push({type:"RPAREN",value:")",start:t,end:t+1}),t+=1;continue}if(/\s/.test(a)){if(t+=1,i.length===0)continue;o(" ",t-1);continue}o(a,t),t+=1;let l=r[t]??"";if(t>=r.length||/[\s()]/.test(l)){let h=i.trim().split(/\s+/),c=h[h.length-1];if(ft.test(c)){let m=i.length-c.length,p=i.slice(0,m).trim();p.length>0&&e.push({type:"ATOM",value:p,start:n,end:t-c.length});let _=c.toUpperCase();e.push({type:_,value:c,start:t-c.length,end:t}),i="",n=-1}}}return s(r.length),e.push({type:"EOF",value:"",start:r.length,end:r.length}),e}var de=class{constructor(e){this.pos=0;this.src=e,this.tokens=Ne(e)}peek(){return this.tokens[this.pos]}advance(){return this.tokens[this.pos++]}sourceBetween(e,t){return this.src.slice(e.start,t.end).trim()}parse(){let e=this.parseOr();if(this.peek().type!=="EOF")throw new Error(`Unexpected token '${this.peek().value}' at position ${this.peek().start}`);return e}parseOr(){let e=this.peek(),t=[this.parseAnd()];for(;this.peek().type==="OR";)this.advance(),t.push(this.parseAnd());if(t.length===1)return t[0];let n=this.tokens[this.pos-1];return{kind:"OR",source:this.sourceBetween(e,n),children:t}}parseAnd(){let e=this.peek(),t=[this.parseNot()];for(;this.peek().type==="AND";)this.advance(),t.push(this.parseNot());if(t.length===1)return t[0];let n=this.tokens[this.pos-1];return{kind:"AND",source:this.sourceBetween(e,n),children:t}}parseNot(){if(this.peek().type==="NOT"){let e=this.advance(),t=this.parseNot();return{kind:"NOT",source:`not ${t.source}`,children:[t]}}return this.parsePrimary()}parsePrimary(){let e=this.peek();if(e.type==="LPAREN"){this.advance();let t=this.parseOr(),n=this.peek();if(n.type!=="RPAREN")throw new Error(`Expected ')' at position ${n.start}`);return this.advance(),t}if(e.type==="ATOM")return this.advance(),{kind:"LEAF",source:e.value};throw new Error(`Unexpected token '${e.value}' at position ${e.start}`)}};function gt(r){let e=r.trim(),t=e.match(/^\{\{\s*([\s\S]*?)\s*\}\}$/);return t?t[1].trim():e}function Ce(r){let e=gt(r);try{return{ast:new de(e).parse(),fallback:!1}}catch{return{ast:{kind:"LEAF",source:e},fallback:!0}}}var yt=/\b(states|is_state|state_attr|is_state_attr)\(\s*(['"])((?:\\.|(?!\2).)*)\2\s*(?:,\s*(['"])((?:\\.|(?!\4).)*)\4\s*)?(?:,\s*(['"])((?:\\.|(?!\6).)*)\6\s*)?\)/g;function q(r){return r.replace(/\\(.)/g,"$1")}function Oe(r){let e=[],t=new RegExp(yt.source,"g"),n;for(;(n=t.exec(r))!==null;){let[i,s,,o,,a,,l]=n,d=q(o);s==="states"?e.push({raw:i,fn:"states",entityId:d}):s==="is_state"?e.push({raw:i,fn:"is_state",entityId:d,compareValue:a?q(a):void 0}):s==="state_attr"?e.push({raw:i,fn:"state_attr",entityId:d,attribute:a?q(a):void 0}):s==="is_state_attr"&&e.push({raw:i,fn:"is_state_attr",entityId:d,attribute:a?q(a):void 0,compareValue:l?q(l):void 0})}return e}function Pe(r){let e=new Map;for(let t of r){let n=`${t.entityId}\0${t.attribute??""}`,i=e.get(n);i||(i={entityId:t.entityId,attribute:t.attribute,usages:[]},e.set(n,i)),i.usages.push(t)}return Array.from(e.values()).sort((t,n)=>t.entityId===n.entityId?(t.attribute??"").localeCompare(n.attribute??""):t.entityId.localeCompare(n.entityId))}async function Le(r,e,t,n){let i=`{{ (${e}) }}`;try{return await r.connection.subscribeMessage(s=>t(String(s?.result??"")),{type:"render_template",template:i})}catch(s){return n(s instanceof Error?s:new Error(String(s))),async()=>{}}}function ze(r){let e=r.trim();if(e===""||e==="None"||e==="none"||e==="null"||e==="False"||e==="false"||e==="0")return!1;if(e==="True"||e==="true")return!0;let t=Number(e);return Number.isNaN(t)?e.length>0:t!==0}function He(r,e){if(r.kind==="LEAF"){e.push(r);return}for(let t of r.children??[])He(t,e)}function je(r,e){if(r.kind==="LEAF"){let i=e.get(r);return i.loading?{node:r,value:!1,loading:!0}:i.error!==void 0?{node:r,value:!1,error:i.error}:{node:r,value:ze(i.rendered??""),rendered:i.rendered}}let t=(r.children??[]).map(i=>je(i,e)),n;return r.kind==="AND"?n=t.every(i=>i.value):r.kind==="OR"?n=t.some(i=>i.value):n=!t[0].value,{node:r,value:n,children:t}}async function Me(r,e,t){let n=[];He(e,n);let i=new Map;for(let a of n)i.set(a,{loading:!0});let s=()=>t(je(e,i));s();let o=[];return await Promise.all(n.map(async a=>{let l=await Le(r,a.source,d=>{i.set(a,{loading:!1,rendered:d}),s()},d=>{i.set(a,{loading:!1,error:d.message}),s()});o.push(l)})),{dispose:async()=>{await Promise.all(o.map(a=>a().catch(()=>{})))}}}async function pe(r){return r.callWS({type:"config/entity_registry/list"})}async function Ue(r,e){return(await pe(r)).find(n=>n.entity_id===e)}var Ie=["state","value_template"];async function De(r,e){let t=await Ue(r,e);if(!t)throw new Error(`No entity registry entry found for "${e}".`);if(t.platform!=="template")throw new Error(`"${e}" is not a Template entity (platform: "${t.platform}"). Only entities created via Settings > Devices & Services > Helpers > Template are supported.`);if(!t.config_entry_id)throw new Error(`"${e}" has no config entry - it's likely a YAML-defined template sensor, which this card doesn't support. Only UI-created Template Helpers are supported.`);let n=await r.callApi("POST","config/config_entries/options/flow",{handler:t.config_entry_id});try{let o=(n.data_schema??[]).find(a=>Ie.includes(a.name))?.description?.suggested_value;if(typeof o!="string"||o.trim()==="")throw new Error(`Couldn't find the template field in "${e}"'s configuration (looked for: ${Ie.join(", ")}).`);return o}finally{await r.callApi("DELETE",`config/config_entries/options/flow/${n.flow_id}`).catch(()=>{})}}var F={"card.default_title":"Template logic","card.parse_fallback_warning":"Couldn't fully parse this template's boolean structure - showing it as a single evaluated expression instead.","card.setting_up":"Setting up live subscriptions\u2026","card.template_source_summary":"Template source (live-synced from {entity})","card.references_summary":"Referenced entities & attributes","references.entity_column":"Entity","references.value_column":"Current value","references.entity_not_found":"entity not found","references.empty":"No states()/is_state()/state_attr() references found.","tree.loading":"loading\u2026","tree.and":"AND","tree.or":"OR","tree.not":"NOT","editor.title_label":"Title (optional)","editor.entity_label":"Template Helper entity","editor.icon_label":"Icon (optional)","editor.icon_hint":"Leave blank to automatically show an on/off icon based on the entity's state.","editor.hint":"Only entities created via Settings \u2192 Devices & Services \u2192 Helpers \u2192 Template are supported. The card reads that helper's template definition directly, so it always stays in sync - nothing to paste or keep updated manually."};var qe={"card.default_title":"Logique du mod\xE8le","card.parse_fallback_warning":"Impossible d'analyser enti\xE8rement la structure bool\xE9enne de ce mod\xE8le - affichage sous forme d'expression unique \xE9valu\xE9e.","card.setting_up":"Configuration des abonnements en direct\u2026","card.template_source_summary":"Source du mod\xE8le (synchronis\xE9e en direct depuis {entity})","card.references_summary":"Entit\xE9s et attributs r\xE9f\xE9renc\xE9s","references.entity_column":"Entit\xE9","references.value_column":"Valeur actuelle","references.entity_not_found":"entit\xE9 introuvable","references.empty":"Aucune r\xE9f\xE9rence states()/is_state()/state_attr() trouv\xE9e.","tree.loading":"chargement\u2026","tree.and":"ET","tree.or":"OU","tree.not":"NON","editor.title_label":"Titre (facultatif)","editor.entity_label":"Entit\xE9 d'assistant mod\xE8le","editor.icon_label":"Ic\xF4ne (facultative)","editor.icon_hint":"Laissez vide pour afficher automatiquement une ic\xF4ne marche/arr\xEAt selon l'\xE9tat de l'entit\xE9.","editor.hint":"Seules les entit\xE9s cr\xE9\xE9es via Param\xE8tres \u2192 Appareils et services \u2192 Assistants \u2192 Mod\xE8le sont prises en charge. La carte lit directement la d\xE9finition du mod\xE8le de cet assistant, elle reste donc toujours synchronis\xE9e - rien \xE0 coller ni \xE0 mettre \xE0 jour manuellement."};var Fe={"card.default_title":"Logica del modello","card.parse_fallback_warning":"Impossibile analizzare completamente la struttura booleana di questo modello - visualizzato come un'unica espressione valutata.","card.setting_up":"Configurazione delle sottoscrizioni live\u2026","card.template_source_summary":"Sorgente del modello (sincronizzata in tempo reale da {entity})","card.references_summary":"Entit\xE0 e attributi referenziati","references.entity_column":"Entit\xE0","references.value_column":"Valore attuale","references.entity_not_found":"entit\xE0 non trovata","references.empty":"Nessun riferimento states()/is_state()/state_attr() trovato.","tree.loading":"caricamento\u2026","tree.and":"E","tree.or":"O","tree.not":"NON","editor.title_label":"Titolo (opzionale)","editor.entity_label":"Entit\xE0 helper modello","editor.icon_label":"Icona (opzionale)","editor.icon_hint":"Lascia vuoto per mostrare automaticamente un'icona on/off in base allo stato dell'entit\xE0.","editor.hint":"Sono supportate solo le entit\xE0 create tramite Impostazioni \u2192 Dispositivi e servizi \u2192 Helper \u2192 Modello. La scheda legge direttamente la definizione del modello di quell'helper, quindi rimane sempre sincronizzata - niente da incollare o aggiornare manualmente."};var Ve={"card.default_title":"L\xF3gica de la plantilla","card.parse_fallback_warning":"No se pudo analizar completamente la estructura booleana de esta plantilla - se muestra como una \xFAnica expresi\xF3n evaluada.","card.setting_up":"Configurando suscripciones en vivo\u2026","card.template_source_summary":"Origen de la plantilla (sincronizado en vivo desde {entity})","card.references_summary":"Entidades y atributos referenciados","references.entity_column":"Entidad","references.value_column":"Valor actual","references.entity_not_found":"entidad no encontrada","references.empty":"No se encontraron referencias states()/is_state()/state_attr().","tree.loading":"cargando\u2026","tree.and":"Y","tree.or":"O","tree.not":"NO","editor.title_label":"T\xEDtulo (opcional)","editor.entity_label":"Entidad de ayudante de plantilla","editor.icon_label":"Icono (opcional)","editor.icon_hint":"D\xE9jelo en blanco para mostrar autom\xE1ticamente un icono de encendido/apagado seg\xFAn el estado de la entidad.","editor.hint":"Solo se admiten entidades creadas mediante Ajustes \u2192 Dispositivos y servicios \u2192 Ayudantes \u2192 Plantilla. La tarjeta lee directamente la definici\xF3n de la plantilla de ese ayudante, por lo que siempre permanece sincronizada - no hay nada que pegar ni actualizar manualmente."};var Be={"card.default_title":"Vorlagenlogik","card.parse_fallback_warning":"Die boolesche Struktur dieser Vorlage konnte nicht vollst\xE4ndig analysiert werden - wird als einzelner ausgewerteter Ausdruck angezeigt.","card.setting_up":"Live-Abonnements werden eingerichtet\u2026","card.template_source_summary":"Vorlagenquelle (live synchronisiert von {entity})","card.references_summary":"Referenzierte Entit\xE4ten & Attribute","references.entity_column":"Entit\xE4t","references.value_column":"Aktueller Wert","references.entity_not_found":"Entit\xE4t nicht gefunden","references.empty":"Keine states()/is_state()/state_attr()-Referenzen gefunden.","tree.loading":"wird geladen\u2026","tree.and":"UND","tree.or":"ODER","tree.not":"NICHT","editor.title_label":"Titel (optional)","editor.entity_label":"Vorlagen-Helfer-Entit\xE4t","editor.icon_label":"Symbol (optional)","editor.icon_hint":"Leer lassen, um automatisch ein Ein/Aus-Symbol basierend auf dem Zustand der Entit\xE4t anzuzeigen.","editor.hint":"Es werden nur Entit\xE4ten unterst\xFCtzt, die \xFCber Einstellungen \u2192 Ger\xE4te & Dienste \u2192 Helfer \u2192 Vorlage erstellt wurden. Die Karte liest die Vorlagendefinition dieses Helfers direkt aus, sodass sie immer synchron bleibt - nichts muss manuell eingef\xFCgt oder aktualisiert werden."};var Ke={"card.default_title":"Sjabloonlogica","card.parse_fallback_warning":"Kon de booleaanse structuur van dit sjabloon niet volledig analyseren - wordt weergegeven als \xE9\xE9n ge\xEBvalueerde expressie.","card.setting_up":"Live-abonnementen worden ingesteld\u2026","card.template_source_summary":"Sjabloonbron (live gesynchroniseerd vanaf {entity})","card.references_summary":"Gerefereerde entiteiten & attributen","references.entity_column":"Entiteit","references.value_column":"Huidige waarde","references.entity_not_found":"entiteit niet gevonden","references.empty":"Geen states()/is_state()/state_attr()-referenties gevonden.","tree.loading":"laden\u2026","tree.and":"EN","tree.or":"OF","tree.not":"NIET","editor.title_label":"Titel (optioneel)","editor.entity_label":"Sjabloonhelper-entiteit","editor.icon_label":"Pictogram (optioneel)","editor.icon_hint":"Laat leeg om automatisch een aan/uit-pictogram te tonen op basis van de status van de entiteit.","editor.hint":"Alleen entiteiten die zijn aangemaakt via Instellingen \u2192 Apparaten en diensten \u2192 Hulpmiddelen \u2192 Sjabloon worden ondersteund. De kaart leest de sjabloondefinitie van die hulp rechtstreeks, zodat deze altijd gesynchroniseerd blijft - niets om te plakken of handmatig bij te werken."};var We={"card.default_title":"Malogikk","card.parse_fallback_warning":"Klarte ikke \xE5 analysere hele den boolske strukturen i denne malen - viser den som ett enkelt evaluert uttrykk i stedet.","card.setting_up":"Setter opp direkteabonnementer\u2026","card.template_source_summary":"Malkilde (synkronisert direkte fra {entity})","card.references_summary":"Refererte enheter og attributter","references.entity_column":"Enhet","references.value_column":"N\xE5v\xE6rende verdi","references.entity_not_found":"enheten ble ikke funnet","references.empty":"Fant ingen states()/is_state()/state_attr()-referanser.","tree.loading":"laster\u2026","tree.and":"OG","tree.or":"ELLER","tree.not":"IKKE","editor.title_label":"Tittel (valgfritt)","editor.entity_label":"Malhjelper-enhet","editor.icon_label":"Ikon (valgfritt)","editor.icon_hint":"La st\xE5 tomt for \xE5 automatisk vise et p\xE5/av-ikon basert p\xE5 enhetens tilstand.","editor.hint":"Kun enheter opprettet via Innstillinger \u2192 Enheter og tjenester \u2192 Hjelpere \u2192 Mal st\xF8ttes. Kortet leser malens definisjon direkte fra hjelperen, s\xE5 det holder seg alltid synkronisert - ingenting \xE5 lime inn eller oppdatere manuelt."};var Ge={"card.default_title":"Malogikk","card.parse_fallback_warning":"Klarte ikkje \xE5 analysere heile den boolske strukturen i denne malen - viser han som eitt enkelt evaluert uttrykk i staden.","card.setting_up":"Set opp direkteabonnement\u2026","card.template_source_summary":"Malkjelde (synkronisert direkte fr\xE5 {entity})","card.references_summary":"Refererte einingar og attributt","references.entity_column":"Eining","references.value_column":"Gjeldande verdi","references.entity_not_found":"eininga vart ikkje funnen","references.empty":"Fann ingen states()/is_state()/state_attr()-referansar.","tree.loading":"lastar\u2026","tree.and":"OG","tree.or":"ELLER","tree.not":"IKKJE","editor.title_label":"Tittel (valfritt)","editor.entity_label":"Malhjelpar-eining","editor.icon_label":"Ikon (valfritt)","editor.icon_hint":"La st\xE5 tomt for \xE5 automatisk visa eit p\xE5/av-ikon basert p\xE5 tilstanden til eininga.","editor.hint":"Berre einingar oppretta via Innstillingar \u2192 Einingar og tenester \u2192 Hjelparar \u2192 Mal er st\xF8tta. Kortet les maldefinisjonen til den hjelparen direkte, s\xE5 det held seg alltid synkronisert - ingenting \xE5 lime inn eller oppdatere manuelt."};var Z={en:F,fr:qe,it:Fe,es:Ve,de:Be,nl:Ke,nb:We,nn:Ge};function _t(r){if(!r)return F;if(Z[r])return Z[r];let e=r.split("-")[0];return Z[e]?Z[e]:F}function f(r,e,t){let i=_t(r?.language)[e]??F[e];if(t)for(let[s,o]of Object.entries(t))i=i.replaceAll(`{${s}}`,o);return i}function vt(r,e){switch(r){case"AND":return f(e,"tree.and");case"OR":return f(e,"tree.or");case"NOT":return f(e,"tree.not");default:return""}}function he(r,e,t=0){let{node:n,value:i,rendered:s,error:o,loading:a}=r,l=a?"tpl-node--loading":o?"tpl-node--error":i?"tpl-node--true":"tpl-node--false";if(n.kind==="LEAF")return u`
      <div class="tpl-node ${l}" style="--depth: ${t}">
        <span class="tpl-node__badge">${a?"\u2026":o?"!":i?"\u2713":"\u2717"}</span>
        <code class="tpl-node__source">${n.source}</code>
        ${a?u`<span class="tpl-node__meta">${f(e,"tree.loading")}</span>`:o?u`<span class="tpl-node__meta tpl-node__meta--error">${o}</span>`:u`<span class="tpl-node__meta">→ ${s}</span>`}
      </div>
    `;let d=r.children??[];return u`
    <div class="tpl-node ${l} tpl-node--group" style="--depth: ${t}">
      <span class="tpl-node__badge">${i?"\u2713":"\u2717"}</span>
      <span class="tpl-node__op">${vt(n.kind,e)}</span>
    </div>
    <div class="tpl-children">
      ${d.map(h=>he(h,e,t+1))}
    </div>
  `}function bt(r){return r===void 0?"\u2014":r===null?"null":typeof r=="object"?JSON.stringify(r):String(r)}function Je(r,e,t){return r.length===0?u`<div class="tpl-refs-empty">${f(t,"references.empty")}</div>`:u`
    <table class="tpl-refs">
      <thead>
        <tr>
          <th>${f(t,"references.entity_column")}</th>
          <th>${f(t,"references.value_column")}</th>
        </tr>
      </thead>
      <tbody>
        ${r.map(n=>{let i=e[n.entityId],s=i===void 0,o=n.attribute?i?.attributes?.[n.attribute]:i?.state,a=n.attribute?`${n.entityId}.${n.attribute}`:n.entityId;return u`
            <tr class=${s?"tpl-refs__row--missing":""}>
              <td><code>${a}</code></td>
              <td>${s?f(t,"references.entity_not_found"):bt(o)}</td>
            </tr>
          `})}
      </tbody>
    </table>
  `}var x=class extends b{constructor(){super(...arguments);this.entityFilter=t=>!this.templateEntityIds||this.templateEntityIds.size===0||this.templateEntityIds.has(t.entity_id)}setConfig(t){this.config=t}willUpdate(){this.hass&&!this.templateEntityIds&&this.loadTemplateEntities()}async loadTemplateEntities(){if(this.hass){this.templateEntityIds=new Set;try{let t=await pe(this.hass);this.templateEntityIds=new Set(t.filter(n=>n.platform==="template").map(n=>n.entity_id))}catch{this.templateEntityIds=new Set}}}emit(t){if(!this.config)return;let n={...this.config,...t};this.config=n,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:n}}))}render(){return this.config?u`
      <div class="form">
        <label>
          ${f(this.hass,"editor.title_label")}
          <input
            type="text"
            .value=${this.config.title??""}
            @change=${t=>this.emit({title:t.target.value})}
          />
        </label>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this.config.entity??""}
          .label=${f(this.hass,"editor.entity_label")}
          .entityFilter=${this.entityFilter}
          @value-changed=${t=>this.emit({entity:t.detail.value})}
        ></ha-entity-picker>
        <ha-icon-picker
          .hass=${this.hass}
          .value=${this.config.icon??""}
          .label=${f(this.hass,"editor.icon_label")}
          @value-changed=${t=>this.emit({icon:t.detail.value||void 0})}
        ></ha-icon-picker>
        <p class="tpl-hint">${f(this.hass,"editor.icon_hint")}</p>
        <p class="tpl-hint">${f(this.hass,"editor.hint")}</p>
      </div>
    `:u``}};x.styles=L`
    .form {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 8px 0;
    }
    label {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 13px;
    }
    input {
      font-family: monospace;
      font-size: 13px;
      padding: 6px;
    }
    .tpl-hint {
      font-size: 12px;
      color: var(--secondary-text-color);
      margin: 0;
    }
  `,y([O({attribute:!1})],x.prototype,"hass",2),y([$()],x.prototype,"config",2),y([$()],x.prototype,"templateEntityIds",2),x=y([J("ha-template-visualizer-card-editor")],x);var v=class extends b{constructor(){super(...arguments);this.references=[];this.parseFallback=!1;this.setupGeneration=0}setConfig(t){if(!t?.entity)throw new Error('ha-template-visualizer-card: "entity" is required in the card config.');this.config=t}static getConfigElement(){return document.createElement("ha-template-visualizer-card-editor")}static getStubConfig(){return{type:"custom:ha-template-visualizer-card",entity:"binary_sensor.example_template_helper"}}willUpdate(){this.config&&this.hass&&this.config.entity!==this.subscribedEntity&&this.setupLiveTree()}async setupLiveTree(){if(!this.config||!this.hass)return;let t=this.config.entity;this.subscribedEntity=t;let n=++this.setupGeneration,i=this.liveHandle;this.liveHandle=void 0,this.tree=void 0,this.references=[],this.templateText=void 0,this.globalError=void 0,i&&i.dispose();try{let s=await De(this.hass,t);if(n!==this.setupGeneration)return;this.templateText=s,this.references=Pe(Oe(s));let{ast:o,fallback:a}=Ce(s);this.parseFallback=a;let l=await Me(this.hass,o,d=>{n===this.setupGeneration&&(this.tree=d)});if(n!==this.setupGeneration){l.dispose();return}this.liveHandle=l}catch(s){if(n!==this.setupGeneration)return;this.globalError=s instanceof Error?s.message:String(s)}}disconnectedCallback(){super.disconnectedCallback(),this.setupGeneration++,this.liveHandle?.dispose(),this.liveHandle=void 0}render(){if(!this.config)return u``;let t=this.config.title??f(this.hass,"card.default_title"),n=this.hass?.states?.[this.config.entity];return u`
      <ha-card>
        <div class="card-header">
          ${this.config.icon?u`<ha-icon icon=${this.config.icon}></ha-icon>`:u`<ha-state-icon .hass=${this.hass} .stateObj=${n}></ha-state-icon>`}
          <span class="card-header__title">${t}</span>
        </div>
        <div class="card-content">
          ${this.globalError?u`<div class="tpl-error">${this.globalError}</div>`:u`
                ${this.parseFallback?u`<div class="tpl-warning">${f(this.hass,"card.parse_fallback_warning")}</div>`:""}
                ${this.tree?he(this.tree,this.hass):u`<div>${f(this.hass,"card.setting_up")}</div>`}
                ${this.templateText?u`<details class="tpl-source">
                      <summary>
                        ${f(this.hass,"card.template_source_summary",{entity:this.config.entity})}
                      </summary>
                      <pre>${this.templateText}</pre>
                    </details>`:""}
                <details class="tpl-refs-details">
                  <summary>${f(this.hass,"card.references_summary")}</summary>
                  ${Je(this.references,this.hass?.states??{},this.hass)}
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
    .tpl-node__source {
      background: var(--code-editor-background-color, rgba(127, 127, 127, 0.08));
      padding: 1px 6px;
      border-radius: 4px;
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
  `,y([O({attribute:!1})],v.prototype,"hass",2),y([$()],v.prototype,"config",2),y([$()],v.prototype,"tree",2),y([$()],v.prototype,"references",2),y([$()],v.prototype,"parseFallback",2),y([$()],v.prototype,"globalError",2),y([$()],v.prototype,"templateText",2),v=y([J("ha-template-visualizer-card")],v);window.customCards=window.customCards||[];window.customCards.push({type:"ha-template-visualizer-card",name:"Template Logic Visualizer",description:"Visualizes a template sensor's boolean logic tree and shows which sub-conditions are true/false."});export{v as HaTemplateEditorCard};
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
