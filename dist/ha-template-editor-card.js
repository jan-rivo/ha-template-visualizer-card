var Ze=Object.defineProperty;var Qe=Object.getOwnPropertyDescriptor;var y=(n,e,t,r)=>{for(var s=r>1?void 0:r?Qe(e,t):e,i=n.length-1,o;i>=0;i--)(o=n[i])&&(s=(r?o(e,t,s):o(s))||s);return r&&s&&Ze(e,t,s),s};var B=globalThis,V=B.ShadowRoot&&(B.ShadyCSS===void 0||B.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Q=Symbol(),he=new WeakMap,P=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==Q)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(V&&e===void 0){let r=t!==void 0&&t.length===1;r&&(e=he.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&he.set(t,e))}return e}toString(){return this.cssText}},fe=n=>new P(typeof n=="string"?n:n+"",void 0,Q),H=(n,...e)=>{let t=n.length===1?n[0]:e.reduce((r,s,i)=>r+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[i+1],n[0]);return new P(t,n,Q)},me=(n,e)=>{if(V)n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let r=document.createElement("style"),s=B.litNonce;s!==void 0&&r.setAttribute("nonce",s),r.textContent=t.cssText,n.appendChild(r)}},X=V?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(let r of e.cssRules)t+=r.cssText;return fe(t)})(n):n;var{is:Xe,defineProperty:et,getOwnPropertyDescriptor:tt,getOwnPropertyNames:rt,getOwnPropertySymbols:nt,getPrototypeOf:st}=Object,K=globalThis,ge=K.trustedTypes,it=ge?ge.emptyScript:"",ot=K.reactiveElementPolyfillSupport,L=(n,e)=>n,j={toAttribute(n,e){switch(e){case Boolean:n=n?it:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},W=(n,e)=>!Xe(n,e),ye={attribute:!0,type:String,converter:j,reflect:!1,useDefault:!1,hasChanged:W};Symbol.metadata??=Symbol("metadata"),K.litPropertyMetadata??=new WeakMap;var A=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ye){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let r=Symbol(),s=this.getPropertyDescriptor(e,r,t);s!==void 0&&et(this.prototype,e,s)}}static getPropertyDescriptor(e,t,r){let{get:s,set:i}=tt(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:s,set(o){let a=s?.call(this);i?.call(this,o),this.requestUpdate(e,a,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ye}static _$Ei(){if(this.hasOwnProperty(L("elementProperties")))return;let e=st(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(L("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(L("properties"))){let t=this.properties,r=[...rt(t),...nt(t)];for(let s of r)this.createProperty(s,t[s])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[r,s]of t)this.elementProperties.set(r,s)}this._$Eh=new Map;for(let[t,r]of this.elementProperties){let s=this._$Eu(t,r);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let r=new Set(e.flat(1/0).reverse());for(let s of r)t.unshift(X(s))}else e!==void 0&&t.push(X(e));return t}static _$Eu(e,t){let r=t.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let r of t.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return me(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,r){this._$AK(e,r)}_$ET(e,t){let r=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,r);if(s!==void 0&&r.reflect===!0){let i=(r.converter?.toAttribute!==void 0?r.converter:j).toAttribute(t,r.type);this._$Em=e,i==null?this.removeAttribute(s):this.setAttribute(s,i),this._$Em=null}}_$AK(e,t){let r=this.constructor,s=r._$Eh.get(e);if(s!==void 0&&this._$Em!==s){let i=r.getPropertyOptions(s),o=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:j;this._$Em=s;let a=o.fromAttribute(t,i.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(e,t,r,s=!1,i){if(e!==void 0){let o=this.constructor;if(s===!1&&(i=this[e]),r??=o.getPropertyOptions(e),!((r.hasChanged??W)(i,t)||r.useDefault&&r.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,r))))return;this.C(e,t,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:r,reflect:s,wrapped:i},o){r&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),i!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||r||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,i]of this._$Ep)this[s]=i;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[s,i]of r){let{wrapped:o}=i,a=this[s];o!==!0||this._$AL.has(s)||a===void 0||this.C(s,void 0,i,a)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(t)):this._$EM()}catch(r){throw e=!1,this._$EM(),r}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[L("elementProperties")]=new Map,A[L("finalized")]=new Map,ot?.({ReactiveElement:A}),(K.reactiveElementVersions??=[]).push("2.1.2");var oe=globalThis,_e=n=>n,G=oe.trustedTypes,ve=G?G.createPolicy("lit-html",{createHTML:n=>n}):void 0,we="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,ke="?"+E,at=`<${ke}>`,T=document,M=()=>T.createComment(""),U=n=>n===null||typeof n!="object"&&typeof n!="function",ae=Array.isArray,lt=n=>ae(n)||typeof n?.[Symbol.iterator]=="function",ee=`[ 	
\f\r]`,z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,be=/-->/g,$e=/>/g,k=RegExp(`>|${ee}(?:([^\\s"'>=/]+)(${ee}*=${ee}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ae=/'/g,Ee=/"/g,Se=/^(?:script|style|textarea|title)$/i,le=n=>(e,...t)=>({_$litType$:n,strings:e,values:t}),h=le(1),kt=le(2),St=le(3),R=Symbol.for("lit-noChange"),g=Symbol.for("lit-nothing"),xe=new WeakMap,S=T.createTreeWalker(T,129);function Te(n,e){if(!ae(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return ve!==void 0?ve.createHTML(e):e}var ct=(n,e)=>{let t=n.length-1,r=[],s,i=e===2?"<svg>":e===3?"<math>":"",o=z;for(let a=0;a<t;a++){let l=n[a],d,u,c=-1,f=0;for(;f<l.length&&(o.lastIndex=f,u=o.exec(l),u!==null);)f=o.lastIndex,o===z?u[1]==="!--"?o=be:u[1]!==void 0?o=$e:u[2]!==void 0?(Se.test(u[2])&&(s=RegExp("</"+u[2],"g")),o=k):u[3]!==void 0&&(o=k):o===k?u[0]===">"?(o=s??z,c=-1):u[1]===void 0?c=-2:(c=o.lastIndex-u[2].length,d=u[1],o=u[3]===void 0?k:u[3]==='"'?Ee:Ae):o===Ee||o===Ae?o=k:o===be||o===$e?o=z:(o=k,s=void 0);let p=o===k&&n[a+1].startsWith("/>")?" ":"";i+=o===z?l+at:c>=0?(r.push(d),l.slice(0,c)+we+l.slice(c)+E+p):l+E+(c===-2?a:p)}return[Te(n,i+(n[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),r]},I=class n{constructor({strings:e,_$litType$:t},r){let s;this.parts=[];let i=0,o=0,a=e.length-1,l=this.parts,[d,u]=ct(e,t);if(this.el=n.createElement(d,r),S.currentNode=this.el.content,t===2||t===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(s=S.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(let c of s.getAttributeNames())if(c.endsWith(we)){let f=u[o++],p=s.getAttribute(c).split(E),_=/([.?@])?(.*)/.exec(f);l.push({type:1,index:i,name:_[2],strings:p,ctor:_[1]==="."?re:_[1]==="?"?ne:_[1]==="@"?se:C}),s.removeAttribute(c)}else c.startsWith(E)&&(l.push({type:6,index:i}),s.removeAttribute(c));if(Se.test(s.tagName)){let c=s.textContent.split(E),f=c.length-1;if(f>0){s.textContent=G?G.emptyScript:"";for(let p=0;p<f;p++)s.append(c[p],M()),S.nextNode(),l.push({type:2,index:++i});s.append(c[f],M())}}}else if(s.nodeType===8)if(s.data===ke)l.push({type:2,index:i});else{let c=-1;for(;(c=s.data.indexOf(E,c+1))!==-1;)l.push({type:7,index:i}),c+=E.length-1}i++}}static createElement(e,t){let r=T.createElement("template");return r.innerHTML=e,r}};function N(n,e,t=n,r){if(e===R)return e;let s=r!==void 0?t._$Co?.[r]:t._$Cl,i=U(e)?void 0:e._$litDirective$;return s?.constructor!==i&&(s?._$AO?.(!1),i===void 0?s=void 0:(s=new i(n),s._$AT(n,t,r)),r!==void 0?(t._$Co??=[])[r]=s:t._$Cl=s),s!==void 0&&(e=N(n,s._$AS(n,e.values),s,r)),e}var te=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:r}=this._$AD,s=(e?.creationScope??T).importNode(t,!0);S.currentNode=s;let i=S.nextNode(),o=0,a=0,l=r[0];for(;l!==void 0;){if(o===l.index){let d;l.type===2?d=new D(i,i.nextSibling,this,e):l.type===1?d=new l.ctor(i,l.name,l.strings,this,e):l.type===6&&(d=new ie(i,this,e)),this._$AV.push(d),l=r[++a]}o!==l?.index&&(i=S.nextNode(),o++)}return S.currentNode=T,s}p(e){let t=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}},D=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,r,s){this.type=2,this._$AH=g,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=N(this,e,t),U(e)?e===g||e==null||e===""?(this._$AH!==g&&this._$AR(),this._$AH=g):e!==this._$AH&&e!==R&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):lt(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==g&&U(this._$AH)?this._$AA.nextSibling.data=e:this.T(T.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:r}=e,s=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=I.createElement(Te(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(t);else{let i=new te(s,this),o=i.u(this.options);i.p(t),this.T(o),this._$AH=i}}_$AC(e){let t=xe.get(e.strings);return t===void 0&&xe.set(e.strings,t=new I(e)),t}k(e){ae(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,r,s=0;for(let i of e)s===t.length?t.push(r=new n(this.O(M()),this.O(M()),this,this.options)):r=t[s],r._$AI(i),s++;s<t.length&&(this._$AR(r&&r._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let r=_e(e).nextSibling;_e(e).remove(),e=r}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},C=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,r,s,i){this.type=1,this._$AH=g,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=i,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=g}_$AI(e,t=this,r,s){let i=this.strings,o=!1;if(i===void 0)e=N(this,e,t,0),o=!U(e)||e!==this._$AH&&e!==R,o&&(this._$AH=e);else{let a=e,l,d;for(e=i[0],l=0;l<i.length-1;l++)d=N(this,a[r+l],t,l),d===R&&(d=this._$AH[l]),o||=!U(d)||d!==this._$AH[l],d===g?e=g:e!==g&&(e+=(d??"")+i[l+1]),this._$AH[l]=d}o&&!s&&this.j(e)}j(e){e===g?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},re=class extends C{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===g?void 0:e}},ne=class extends C{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==g)}},se=class extends C{constructor(e,t,r,s,i){super(e,t,r,s,i),this.type=5}_$AI(e,t=this){if((e=N(this,e,t,0)??g)===R)return;let r=this._$AH,s=e===g&&r!==g||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,i=e!==g&&(r===g||s);s&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},ie=class{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){N(this,e)}};var dt=oe.litHtmlPolyfillSupport;dt?.(I,D),(oe.litHtmlVersions??=[]).push("3.3.3");var Re=(n,e,t)=>{let r=t?.renderBefore??e,s=r._$litPart$;if(s===void 0){let i=t?.renderBefore??null;r._$litPart$=s=new D(e.insertBefore(M(),i),i,void 0,t??{})}return s._$AI(n),s};var ce=globalThis,b=class extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Re(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return R}};b._$litElement$=!0,b.finalized=!0,ce.litElementHydrateSupport?.({LitElement:b});var pt=ce.litElementPolyfillSupport;pt?.({LitElement:b});(ce.litElementVersions??=[]).push("4.2.2");var J=n=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(n,e)}):customElements.define(n,e)};var ut={attribute:!0,type:String,converter:j,reflect:!1,hasChanged:W},ht=(n=ut,e,t)=>{let{kind:r,metadata:s}=t,i=globalThis.litPropertyMetadata.get(s);if(i===void 0&&globalThis.litPropertyMetadata.set(s,i=new Map),r==="setter"&&((n=Object.create(n)).wrapped=!0),i.set(t.name,n),r==="accessor"){let{name:o}=t;return{set(a){let l=e.get.call(this);e.set.call(this,a),this.requestUpdate(o,l,n,!0,a)},init(a){return a!==void 0&&this.C(o,void 0,n,a),a}}}if(r==="setter"){let{name:o}=t;return function(a){let l=this[o];e.call(this,a),this.requestUpdate(o,l,n,!0,a)}}throw Error("Unsupported decorator location: "+r)};function O(n){return(e,t)=>typeof t=="object"?ht(n,e,t):((r,s,i)=>{let o=s.hasOwnProperty(i);return s.constructor.createProperty(i,r),o?Object.getOwnPropertyDescriptor(s,i):void 0})(n,e,t)}function $(n){return O({...n,state:!0,attribute:!1})}var ft=/^(and|or|not)$/;function mt(n){return/[A-Za-z0-9_.\]]/.test(n)}function Ne(n){let e=[],t=0,r=-1,s="",i=a=>{let l=s.trim();l.length>0&&e.push({type:"ATOM",value:l,start:r,end:a}),s="",r=-1},o=(a,l)=>{s.length===0&&(r=l),s+=a};for(;t<n.length;){let a=n[t];if(a==="'"||a==='"'){let u=a,c=t+1,f=a;for(;c<n.length&&n[c]!==u;){if(n[c]==="\\"&&c+1<n.length){f+=n[c]+n[c+1],c+=2;continue}f+=n[c],c+=1}c<n.length&&(f+=n[c],c+=1),s.length===0&&(r=t),s+=f,t=c;continue}if(a==="("){let u=s.length>0?s[s.length-1]:"";if(mt(u)){let f=1,p=t+1,_="(";for(;p<n.length&&f>0;){let w=n[p];if(w==="'"||w==='"'){let Ye=w;for(_+=w,p+=1;p<n.length&&n[p]!==Ye;){if(n[p]==="\\"&&p+1<n.length){_+=n[p]+n[p+1],p+=2;continue}_+=n[p],p+=1}p<n.length&&(_+=n[p],p+=1);continue}w==="("&&(f+=1),w===")"&&(f-=1),_+=w,p+=1}s+=_,t=p;continue}else{i(t),e.push({type:"LPAREN",value:"(",start:t,end:t+1}),t+=1;continue}}if(a===")"){i(t),e.push({type:"RPAREN",value:")",start:t,end:t+1}),t+=1;continue}if(/\s/.test(a)){if(t+=1,s.length===0)continue;o(" ",t-1);continue}o(a,t),t+=1;let l=n[t]??"";if(t>=n.length||/[\s()]/.test(l)){let u=s.trim().split(/\s+/),c=u[u.length-1];if(ft.test(c)){let f=s.length-c.length,p=s.slice(0,f).trim();p.length>0&&e.push({type:"ATOM",value:p,start:r,end:t-c.length});let _=c.toUpperCase();e.push({type:_,value:c,start:t-c.length,end:t}),s="",r=-1}}}return i(n.length),e.push({type:"EOF",value:"",start:n.length,end:n.length}),e}var de=class{constructor(e){this.pos=0;this.src=e,this.tokens=Ne(e)}peek(){return this.tokens[this.pos]}advance(){return this.tokens[this.pos++]}sourceBetween(e,t){return this.src.slice(e.start,t.end).trim()}parse(){let e=this.parseOr();if(this.peek().type!=="EOF")throw new Error(`Unexpected token '${this.peek().value}' at position ${this.peek().start}`);return e}parseOr(){let e=this.peek(),t=[this.parseAnd()];for(;this.peek().type==="OR";)this.advance(),t.push(this.parseAnd());if(t.length===1)return t[0];let r=this.tokens[this.pos-1];return{kind:"OR",source:this.sourceBetween(e,r),children:t}}parseAnd(){let e=this.peek(),t=[this.parseNot()];for(;this.peek().type==="AND";)this.advance(),t.push(this.parseNot());if(t.length===1)return t[0];let r=this.tokens[this.pos-1];return{kind:"AND",source:this.sourceBetween(e,r),children:t}}parseNot(){if(this.peek().type==="NOT"){let e=this.advance(),t=this.parseNot();return{kind:"NOT",source:`not ${t.source}`,children:[t]}}return this.parsePrimary()}parsePrimary(){let e=this.peek();if(e.type==="LPAREN"){this.advance();let t=this.parseOr(),r=this.peek();if(r.type!=="RPAREN")throw new Error(`Expected ')' at position ${r.start}`);return this.advance(),t}if(e.type==="ATOM")return this.advance(),{kind:"LEAF",source:e.value};throw new Error(`Unexpected token '${e.value}' at position ${e.start}`)}};function gt(n){let e=n.trim(),t=e.match(/^\{\{\s*([\s\S]*?)\s*\}\}$/);return t?t[1].trim():e}function Ce(n){let e=gt(n);try{return{ast:new de(e).parse(),fallback:!1}}catch{return{ast:{kind:"LEAF",source:e},fallback:!0}}}var yt=/\b(states|is_state|state_attr|is_state_attr)\(\s*(['"])((?:\\.|(?!\2).)*)\2\s*(?:,\s*(['"])((?:\\.|(?!\4).)*)\4\s*)?(?:,\s*(['"])((?:\\.|(?!\6).)*)\6\s*)?\)/g;function q(n){return n.replace(/\\(.)/g,"$1")}function Oe(n){let e=[],t=new RegExp(yt.source,"g"),r;for(;(r=t.exec(n))!==null;){let[s,i,,o,,a,,l]=r,d=q(o);i==="states"?e.push({raw:s,fn:"states",entityId:d}):i==="is_state"?e.push({raw:s,fn:"is_state",entityId:d,compareValue:a?q(a):void 0}):i==="state_attr"?e.push({raw:s,fn:"state_attr",entityId:d,attribute:a?q(a):void 0}):i==="is_state_attr"&&e.push({raw:s,fn:"is_state_attr",entityId:d,attribute:a?q(a):void 0,compareValue:l?q(l):void 0})}return e}function Pe(n){let e=new Map;for(let t of n){let r=`${t.entityId}\0${t.attribute??""}`,s=e.get(r);s||(s={entityId:t.entityId,attribute:t.attribute,usages:[]},e.set(r,s)),s.usages.push(t)}return Array.from(e.values()).sort((t,r)=>t.entityId===r.entityId?(t.attribute??"").localeCompare(r.attribute??""):t.entityId.localeCompare(r.entityId))}async function He(n,e,t,r){let s=`{{ (${e}) }}`;try{return await n.connection.subscribeMessage(i=>t(String(i?.result??"")),{type:"render_template",template:s})}catch(i){return r(i instanceof Error?i:new Error(String(i))),async()=>{}}}function Le(n){let e=n.trim();if(e===""||e==="None"||e==="none"||e==="null"||e==="False"||e==="false"||e==="0")return!1;if(e==="True"||e==="true")return!0;let t=Number(e);return Number.isNaN(t)?e.length>0:t!==0}function je(n,e){if(n.kind==="LEAF"){e.push(n);return}for(let t of n.children??[])je(t,e)}function ze(n,e){if(n.kind==="LEAF"){let s=e.get(n);return s.loading?{node:n,value:!1,loading:!0}:s.error!==void 0?{node:n,value:!1,error:s.error}:{node:n,value:Le(s.rendered??""),rendered:s.rendered}}let t=(n.children??[]).map(s=>ze(s,e)),r;return n.kind==="AND"?r=t.every(s=>s.value):n.kind==="OR"?r=t.some(s=>s.value):r=!t[0].value,{node:n,value:r,children:t}}async function Me(n,e,t){let r=[];je(e,r);let s=new Map;for(let a of r)s.set(a,{loading:!0});let i=()=>t(ze(e,s));i();let o=[];return await Promise.all(r.map(async a=>{let l=await He(n,a.source,d=>{s.set(a,{loading:!1,rendered:d}),i()},d=>{s.set(a,{loading:!1,error:d.message}),i()});o.push(l)})),{dispose:async()=>{await Promise.all(o.map(a=>a().catch(()=>{})))}}}async function pe(n){return n.callWS({type:"config/entity_registry/list"})}async function Ue(n,e){return(await pe(n)).find(r=>r.entity_id===e)}var Ie=["state","value_template"];async function De(n,e){let t=await Ue(n,e);if(!t)throw new Error(`No entity registry entry found for "${e}".`);if(t.platform!=="template")throw new Error(`"${e}" is not a Template entity (platform: "${t.platform}"). Only entities created via Settings > Devices & Services > Helpers > Template are supported.`);if(!t.config_entry_id)throw new Error(`"${e}" has no config entry - it's likely a YAML-defined template sensor, which this card doesn't support. Only UI-created Template Helpers are supported.`);let r=await n.callApi("POST","config/config_entries/options/flow",{handler:t.config_entry_id});try{let o=(r.data_schema??[]).find(a=>Ie.includes(a.name))?.description?.suggested_value;if(typeof o!="string"||o.trim()==="")throw new Error(`Couldn't find the template field in "${e}"'s configuration (looked for: ${Ie.join(", ")}).`);return o}finally{await n.callApi("DELETE",`config/config_entries/options/flow/${r.flow_id}`).catch(()=>{})}}var F={"card.default_title":"Template logic","card.parse_fallback_warning":"Couldn't fully parse this template's boolean structure - showing it as a single evaluated expression instead.","card.setting_up":"Setting up live subscriptions\u2026","card.template_source_summary":"Template source (live-synced from {entity})","card.references_summary":"Referenced entities & attributes","references.entity_column":"Entity","references.value_column":"Current value","references.entity_not_found":"entity not found","references.empty":"No states()/is_state()/state_attr() references found.","tree.loading":"loading\u2026","tree.and":"AND","tree.or":"OR","tree.not":"NOT","editor.title_label":"Title (optional)","editor.entity_label":"Template Helper entity","editor.hint":"Only entities created via Settings \u2192 Devices & Services \u2192 Helpers \u2192 Template are supported. The card reads that helper's template definition directly, so it always stays in sync - nothing to paste or keep updated manually."};var qe={"card.default_title":"Logique du mod\xE8le","card.parse_fallback_warning":"Impossible d'analyser enti\xE8rement la structure bool\xE9enne de ce mod\xE8le - affichage sous forme d'expression unique \xE9valu\xE9e.","card.setting_up":"Configuration des abonnements en direct\u2026","card.template_source_summary":"Source du mod\xE8le (synchronis\xE9e en direct depuis {entity})","card.references_summary":"Entit\xE9s et attributs r\xE9f\xE9renc\xE9s","references.entity_column":"Entit\xE9","references.value_column":"Valeur actuelle","references.entity_not_found":"entit\xE9 introuvable","references.empty":"Aucune r\xE9f\xE9rence states()/is_state()/state_attr() trouv\xE9e.","tree.loading":"chargement\u2026","tree.and":"ET","tree.or":"OU","tree.not":"NON","editor.title_label":"Titre (facultatif)","editor.entity_label":"Entit\xE9 d'assistant mod\xE8le","editor.hint":"Seules les entit\xE9s cr\xE9\xE9es via Param\xE8tres \u2192 Appareils et services \u2192 Assistants \u2192 Mod\xE8le sont prises en charge. La carte lit directement la d\xE9finition du mod\xE8le de cet assistant, elle reste donc toujours synchronis\xE9e - rien \xE0 coller ni \xE0 mettre \xE0 jour manuellement."};var Fe={"card.default_title":"Logica del modello","card.parse_fallback_warning":"Impossibile analizzare completamente la struttura booleana di questo modello - visualizzato come un'unica espressione valutata.","card.setting_up":"Configurazione delle sottoscrizioni live\u2026","card.template_source_summary":"Sorgente del modello (sincronizzata in tempo reale da {entity})","card.references_summary":"Entit\xE0 e attributi referenziati","references.entity_column":"Entit\xE0","references.value_column":"Valore attuale","references.entity_not_found":"entit\xE0 non trovata","references.empty":"Nessun riferimento states()/is_state()/state_attr() trovato.","tree.loading":"caricamento\u2026","tree.and":"E","tree.or":"O","tree.not":"NON","editor.title_label":"Titolo (opzionale)","editor.entity_label":"Entit\xE0 helper modello","editor.hint":"Sono supportate solo le entit\xE0 create tramite Impostazioni \u2192 Dispositivi e servizi \u2192 Helper \u2192 Modello. La scheda legge direttamente la definizione del modello di quell'helper, quindi rimane sempre sincronizzata - niente da incollare o aggiornare manualmente."};var Be={"card.default_title":"L\xF3gica de la plantilla","card.parse_fallback_warning":"No se pudo analizar completamente la estructura booleana de esta plantilla - se muestra como una \xFAnica expresi\xF3n evaluada.","card.setting_up":"Configurando suscripciones en vivo\u2026","card.template_source_summary":"Origen de la plantilla (sincronizado en vivo desde {entity})","card.references_summary":"Entidades y atributos referenciados","references.entity_column":"Entidad","references.value_column":"Valor actual","references.entity_not_found":"entidad no encontrada","references.empty":"No se encontraron referencias states()/is_state()/state_attr().","tree.loading":"cargando\u2026","tree.and":"Y","tree.or":"O","tree.not":"NO","editor.title_label":"T\xEDtulo (opcional)","editor.entity_label":"Entidad de ayudante de plantilla","editor.hint":"Solo se admiten entidades creadas mediante Ajustes \u2192 Dispositivos y servicios \u2192 Ayudantes \u2192 Plantilla. La tarjeta lee directamente la definici\xF3n de la plantilla de ese ayudante, por lo que siempre permanece sincronizada - no hay nada que pegar ni actualizar manualmente."};var Ve={"card.default_title":"Vorlagenlogik","card.parse_fallback_warning":"Die boolesche Struktur dieser Vorlage konnte nicht vollst\xE4ndig analysiert werden - wird als einzelner ausgewerteter Ausdruck angezeigt.","card.setting_up":"Live-Abonnements werden eingerichtet\u2026","card.template_source_summary":"Vorlagenquelle (live synchronisiert von {entity})","card.references_summary":"Referenzierte Entit\xE4ten & Attribute","references.entity_column":"Entit\xE4t","references.value_column":"Aktueller Wert","references.entity_not_found":"Entit\xE4t nicht gefunden","references.empty":"Keine states()/is_state()/state_attr()-Referenzen gefunden.","tree.loading":"wird geladen\u2026","tree.and":"UND","tree.or":"ODER","tree.not":"NICHT","editor.title_label":"Titel (optional)","editor.entity_label":"Vorlagen-Helfer-Entit\xE4t","editor.hint":"Es werden nur Entit\xE4ten unterst\xFCtzt, die \xFCber Einstellungen \u2192 Ger\xE4te & Dienste \u2192 Helfer \u2192 Vorlage erstellt wurden. Die Karte liest die Vorlagendefinition dieses Helfers direkt aus, sodass sie immer synchron bleibt - nichts muss manuell eingef\xFCgt oder aktualisiert werden."};var Ke={"card.default_title":"Sjabloonlogica","card.parse_fallback_warning":"Kon de booleaanse structuur van dit sjabloon niet volledig analyseren - wordt weergegeven als \xE9\xE9n ge\xEBvalueerde expressie.","card.setting_up":"Live-abonnementen worden ingesteld\u2026","card.template_source_summary":"Sjabloonbron (live gesynchroniseerd vanaf {entity})","card.references_summary":"Gerefereerde entiteiten & attributen","references.entity_column":"Entiteit","references.value_column":"Huidige waarde","references.entity_not_found":"entiteit niet gevonden","references.empty":"Geen states()/is_state()/state_attr()-referenties gevonden.","tree.loading":"laden\u2026","tree.and":"EN","tree.or":"OF","tree.not":"NIET","editor.title_label":"Titel (optioneel)","editor.entity_label":"Sjabloonhelper-entiteit","editor.hint":"Alleen entiteiten die zijn aangemaakt via Instellingen \u2192 Apparaten en diensten \u2192 Hulpmiddelen \u2192 Sjabloon worden ondersteund. De kaart leest de sjabloondefinitie van die hulp rechtstreeks, zodat deze altijd gesynchroniseerd blijft - niets om te plakken of handmatig bij te werken."};var We={"card.default_title":"Malogikk","card.parse_fallback_warning":"Klarte ikke \xE5 analysere hele den boolske strukturen i denne malen - viser den som ett enkelt evaluert uttrykk i stedet.","card.setting_up":"Setter opp direkteabonnementer\u2026","card.template_source_summary":"Malkilde (synkronisert direkte fra {entity})","card.references_summary":"Refererte enheter og attributter","references.entity_column":"Enhet","references.value_column":"N\xE5v\xE6rende verdi","references.entity_not_found":"enheten ble ikke funnet","references.empty":"Fant ingen states()/is_state()/state_attr()-referanser.","tree.loading":"laster\u2026","tree.and":"OG","tree.or":"ELLER","tree.not":"IKKE","editor.title_label":"Tittel (valgfritt)","editor.entity_label":"Malhjelper-enhet","editor.hint":"Kun enheter opprettet via Innstillinger \u2192 Enheter og tjenester \u2192 Hjelpere \u2192 Mal st\xF8ttes. Kortet leser malens definisjon direkte fra hjelperen, s\xE5 det holder seg alltid synkronisert - ingenting \xE5 lime inn eller oppdatere manuelt."};var Ge={"card.default_title":"Malogikk","card.parse_fallback_warning":"Klarte ikkje \xE5 analysere heile den boolske strukturen i denne malen - viser han som eitt enkelt evaluert uttrykk i staden.","card.setting_up":"Set opp direkteabonnement\u2026","card.template_source_summary":"Malkjelde (synkronisert direkte fr\xE5 {entity})","card.references_summary":"Refererte einingar og attributt","references.entity_column":"Eining","references.value_column":"Gjeldande verdi","references.entity_not_found":"eininga vart ikkje funnen","references.empty":"Fann ingen states()/is_state()/state_attr()-referansar.","tree.loading":"lastar\u2026","tree.and":"OG","tree.or":"ELLER","tree.not":"IKKJE","editor.title_label":"Tittel (valfritt)","editor.entity_label":"Malhjelpar-eining","editor.hint":"Berre einingar oppretta via Innstillingar \u2192 Einingar og tenester \u2192 Hjelparar \u2192 Mal er st\xF8tta. Kortet les maldefinisjonen til den hjelparen direkte, s\xE5 det held seg alltid synkronisert - ingenting \xE5 lime inn eller oppdatere manuelt."};var Z={en:F,fr:qe,it:Fe,es:Be,de:Ve,nl:Ke,nb:We,nn:Ge};function _t(n){if(!n)return F;if(Z[n])return Z[n];let e=n.split("-")[0];return Z[e]?Z[e]:F}function m(n,e,t){let s=_t(n?.language)[e]??F[e];if(t)for(let[i,o]of Object.entries(t))s=s.replaceAll(`{${i}}`,o);return s}function vt(n,e){switch(n){case"AND":return m(e,"tree.and");case"OR":return m(e,"tree.or");case"NOT":return m(e,"tree.not");default:return""}}function ue(n,e,t=0){let{node:r,value:s,rendered:i,error:o,loading:a}=n,l=a?"tpl-node--loading":o?"tpl-node--error":s?"tpl-node--true":"tpl-node--false";if(r.kind==="LEAF")return h`
      <div class="tpl-node ${l}" style="--depth: ${t}">
        <span class="tpl-node__badge">${a?"\u2026":o?"!":s?"\u2713":"\u2717"}</span>
        <code class="tpl-node__source">${r.source}</code>
        ${a?h`<span class="tpl-node__meta">${m(e,"tree.loading")}</span>`:o?h`<span class="tpl-node__meta tpl-node__meta--error">${o}</span>`:h`<span class="tpl-node__meta">→ ${i}</span>`}
      </div>
    `;let d=n.children??[];return h`
    <div class="tpl-node ${l} tpl-node--group" style="--depth: ${t}">
      <span class="tpl-node__badge">${s?"\u2713":"\u2717"}</span>
      <span class="tpl-node__op">${vt(r.kind,e)}</span>
    </div>
    <div class="tpl-children">
      ${d.map(u=>ue(u,e,t+1))}
    </div>
  `}function bt(n){return n===void 0?"\u2014":n===null?"null":typeof n=="object"?JSON.stringify(n):String(n)}function Je(n,e,t){return n.length===0?h`<div class="tpl-refs-empty">${m(t,"references.empty")}</div>`:h`
    <table class="tpl-refs">
      <thead>
        <tr>
          <th>${m(t,"references.entity_column")}</th>
          <th>${m(t,"references.value_column")}</th>
        </tr>
      </thead>
      <tbody>
        ${n.map(r=>{let s=e[r.entityId],i=s===void 0,o=r.attribute?s?.attributes?.[r.attribute]:s?.state,a=r.attribute?`${r.entityId}.${r.attribute}`:r.entityId;return h`
            <tr class=${i?"tpl-refs__row--missing":""}>
              <td><code>${a}</code></td>
              <td>${i?m(t,"references.entity_not_found"):bt(o)}</td>
            </tr>
          `})}
      </tbody>
    </table>
  `}var x=class extends b{constructor(){super(...arguments);this.entityFilter=t=>!this.templateEntityIds||this.templateEntityIds.size===0||this.templateEntityIds.has(t.entity_id)}setConfig(t){this.config=t}willUpdate(){this.hass&&!this.templateEntityIds&&this.loadTemplateEntities()}async loadTemplateEntities(){if(this.hass){this.templateEntityIds=new Set;try{let t=await pe(this.hass);this.templateEntityIds=new Set(t.filter(r=>r.platform==="template").map(r=>r.entity_id))}catch{this.templateEntityIds=new Set}}}emit(t){if(!this.config)return;let r={...this.config,...t};this.config=r,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:r}}))}render(){return this.config?h`
      <div class="form">
        <label>
          ${m(this.hass,"editor.title_label")}
          <input
            type="text"
            .value=${this.config.title??""}
            @change=${t=>this.emit({title:t.target.value})}
          />
        </label>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this.config.entity??""}
          .label=${m(this.hass,"editor.entity_label")}
          .entityFilter=${this.entityFilter}
          @value-changed=${t=>this.emit({entity:t.detail.value})}
        ></ha-entity-picker>
        <p class="tpl-hint">${m(this.hass,"editor.hint")}</p>
      </div>
    `:h``}};x.styles=H`
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
  `,y([O({attribute:!1})],x.prototype,"hass",2),y([$()],x.prototype,"config",2),y([$()],x.prototype,"templateEntityIds",2),x=y([J("ha-template-editor-card-editor")],x);var v=class extends b{constructor(){super(...arguments);this.references=[];this.parseFallback=!1;this.setupGeneration=0}setConfig(t){if(!t?.entity)throw new Error('ha-template-editor-card: "entity" is required in the card config.');this.config=t}static getConfigElement(){return document.createElement("ha-template-editor-card-editor")}static getStubConfig(){return{type:"custom:ha-template-editor-card",entity:"binary_sensor.example_template_helper"}}willUpdate(){this.config&&this.hass&&this.config.entity!==this.subscribedEntity&&this.setupLiveTree()}async setupLiveTree(){if(!this.config||!this.hass)return;let t=this.config.entity;this.subscribedEntity=t;let r=++this.setupGeneration,s=this.liveHandle;this.liveHandle=void 0,this.tree=void 0,this.references=[],this.templateText=void 0,this.globalError=void 0,s&&s.dispose();try{let i=await De(this.hass,t);if(r!==this.setupGeneration)return;this.templateText=i,this.references=Pe(Oe(i));let{ast:o,fallback:a}=Ce(i);this.parseFallback=a;let l=await Me(this.hass,o,d=>{r===this.setupGeneration&&(this.tree=d)});if(r!==this.setupGeneration){l.dispose();return}this.liveHandle=l}catch(i){if(r!==this.setupGeneration)return;this.globalError=i instanceof Error?i.message:String(i)}}disconnectedCallback(){super.disconnectedCallback(),this.setupGeneration++,this.liveHandle?.dispose(),this.liveHandle=void 0}render(){if(!this.config)return h``;let t=this.config.title??m(this.hass,"card.default_title"),r=this.hass?.states?.[this.config.entity];return h`
      <ha-card header=${t}>
        <div class="card-content">
          ${this.globalError?h`<div class="tpl-error">${this.globalError}</div>`:h`
                ${this.parseFallback?h`<div class="tpl-warning">${m(this.hass,"card.parse_fallback_warning")}</div>`:""}
                <div class="tpl-summary">
                  <ha-state-icon .hass=${this.hass} .stateObj=${r}></ha-state-icon>
                  <b>${r?.state??"unknown"}</b>
                </div>
                ${this.tree?ue(this.tree,this.hass):h`<div>${m(this.hass,"card.setting_up")}</div>`}
                ${this.templateText?h`<details class="tpl-source">
                      <summary>
                        ${m(this.hass,"card.template_source_summary",{entity:this.config.entity})}
                      </summary>
                      <pre>${this.templateText}</pre>
                    </details>`:""}
                <details class="tpl-refs-details">
                  <summary>${m(this.hass,"card.references_summary")}</summary>
                  ${Je(this.references,this.hass?.states??{},this.hass)}
                </details>
              `}
        </div>
      </ha-card>
    `}};v.styles=H`
    :host {
      display: block;
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
    .tpl-summary {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
      font-size: 13px;
    }
    .tpl-summary ha-state-icon {
      --mdc-icon-size: 22px;
      color: var(--paper-item-icon-color, #44739e);
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
  `,y([O({attribute:!1})],v.prototype,"hass",2),y([$()],v.prototype,"config",2),y([$()],v.prototype,"tree",2),y([$()],v.prototype,"references",2),y([$()],v.prototype,"parseFallback",2),y([$()],v.prototype,"globalError",2),y([$()],v.prototype,"templateText",2),v=y([J("ha-template-editor-card")],v);window.customCards=window.customCards||[];window.customCards.push({type:"ha-template-editor-card",name:"Template Logic Editor",description:"Visualizes a template sensor's boolean logic tree and shows which sub-conditions are true/false."});export{v as HaTemplateEditorCard};
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
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

@lit/reactive-element/decorators/custom-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/property.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/state.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/event-options.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/base.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-all.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-async.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
//# sourceMappingURL=ha-template-editor-card.js.map
