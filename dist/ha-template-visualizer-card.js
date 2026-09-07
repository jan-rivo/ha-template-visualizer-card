var Ct=Object.defineProperty;var Lt=Object.getOwnPropertyDescriptor;var g=(n,e,t,i)=>{for(var r=i>1?void 0:i?Lt(e,t):e,a=n.length-1,s;a>=0;a--)(s=n[a])&&(r=(i?s(e,t,r):s(r))||r);return i&&r&&Ct(e,t,r),r};var te=globalThis,ne=te.ShadowRoot&&(te.ShadyCSS===void 0||te.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ge=Symbol(),Le=new WeakMap,H=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==ge)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(ne&&e===void 0){let i=t!==void 0&&t.length===1;i&&(e=Le.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&Le.set(t,e))}return e}toString(){return this.cssText}},Pe=n=>new H(typeof n=="string"?n:n+"",void 0,ge),j=(n,...e)=>{let t=n.length===1?n[0]:e.reduce((i,r,a)=>i+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+n[a+1],n[0]);return new H(t,n,ge)},He=(n,e)=>{if(ne)n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let i=document.createElement("style"),r=te.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=t.cssText,n.appendChild(i)}},_e=ne?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return Pe(t)})(n):n;var{is:Pt,defineProperty:Ht,getOwnPropertyDescriptor:jt,getOwnPropertyNames:It,getOwnPropertySymbols:Mt,getPrototypeOf:Ut}=Object,ie=globalThis,je=ie.trustedTypes,qt=je?je.emptyScript:"",Dt=ie.reactiveElementPolyfillSupport,I=(n,e)=>n,M={toAttribute(n,e){switch(e){case Boolean:n=n?qt:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},re=(n,e)=>!Pt(n,e),Ie={attribute:!0,type:String,converter:M,reflect:!1,useDefault:!1,hasChanged:re};Symbol.metadata??=Symbol("metadata"),ie.litPropertyMetadata??=new WeakMap;var E=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Ie){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let i=Symbol(),r=this.getPropertyDescriptor(e,i,t);r!==void 0&&Ht(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){let{get:r,set:a}=jt(this.prototype,e)??{get(){return this[t]},set(s){this[t]=s}};return{get:r,set(s){let o=r?.call(this);a?.call(this,s),this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Ie}static _$Ei(){if(this.hasOwnProperty(I("elementProperties")))return;let e=Ut(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(I("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(I("properties"))){let t=this.properties,i=[...It(t),...Mt(t)];for(let r of i)this.createProperty(r,t[r])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[i,r]of t)this.elementProperties.set(i,r)}this._$Eh=new Map;for(let[t,i]of this.elementProperties){let r=this._$Eu(t,i);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let r of i)t.unshift(_e(r))}else e!==void 0&&t.push(_e(e));return t}static _$Eu(e,t){let i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return He(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){let i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(r!==void 0&&i.reflect===!0){let a=(i.converter?.toAttribute!==void 0?i.converter:M).toAttribute(t,i.type);this._$Em=e,a==null?this.removeAttribute(r):this.setAttribute(r,a),this._$Em=null}}_$AK(e,t){let i=this.constructor,r=i._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let a=i.getPropertyOptions(r),s=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute!==void 0?a.converter:M;this._$Em=r;let o=s.fromAttribute(t,a.type);this[r]=o??this._$Ej?.get(r)??o,this._$Em=null}}requestUpdate(e,t,i,r=!1,a){if(e!==void 0){let s=this.constructor;if(r===!1&&(a=this[e]),i??=s.getPropertyOptions(e),!((i.hasChanged??re)(a,t)||i.useDefault&&i.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:a},s){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,s??t??this[e]),a!==!0||s!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),r===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,a]of this._$Ep)this[r]=a;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[r,a]of i){let{wrapped:s}=a,o=this[r];s!==!0||this._$AL.has(r)||o===void 0||this.C(r,void 0,a,o)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};E.elementStyles=[],E.shadowRootOptions={mode:"open"},E[I("elementProperties")]=new Map,E[I("finalized")]=new Map,Dt?.({ReactiveElement:E}),(ie.reactiveElementVersions??=[]).push("2.1.2");var Ae=globalThis,Me=n=>n,se=Ae.trustedTypes,Ue=se?se.createPolicy("lit-html",{createHTML:n=>n}):void 0,We="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,Ke="?"+A,Vt=`<${Ke}>`,z=document,q=()=>z.createComment(""),D=n=>n===null||typeof n!="object"&&typeof n!="function",xe=Array.isArray,Ft=n=>xe(n)||typeof n?.[Symbol.iterator]=="function",ye=`[ 	
\f\r]`,U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,qe=/-->/g,De=/>/g,S=RegExp(`>|${ye}(?:([^\\s"'>=/]+)(${ye}*=${ye}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ve=/'/g,Fe=/"/g,Ge=/^(?:script|style|textarea|title)$/i,ke=n=>(e,...t)=>({_$litType$:n,strings:e,values:t}),m=ke(1),Sn=ke(2),Tn=ke(3),O=Symbol.for("lit-noChange"),_=Symbol.for("lit-nothing"),Be=new WeakMap,T=z.createTreeWalker(z,129);function Xe(n,e){if(!xe(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ue!==void 0?Ue.createHTML(e):e}var Bt=(n,e)=>{let t=n.length-1,i=[],r,a=e===2?"<svg>":e===3?"<math>":"",s=U;for(let o=0;o<t;o++){let l=n[o],u,d,c=-1,h=0;for(;h<l.length&&(s.lastIndex=h,d=s.exec(l),d!==null);)h=s.lastIndex,s===U?d[1]==="!--"?s=qe:d[1]!==void 0?s=De:d[2]!==void 0?(Ge.test(d[2])&&(r=RegExp("</"+d[2],"g")),s=S):d[3]!==void 0&&(s=S):s===S?d[0]===">"?(s=r??U,c=-1):d[1]===void 0?c=-2:(c=s.lastIndex-d[2].length,u=d[1],s=d[3]===void 0?S:d[3]==='"'?Fe:Ve):s===Fe||s===Ve?s=S:s===qe||s===De?s=U:(s=S,r=void 0);let f=s===S&&n[o+1].startsWith("/>")?" ":"";a+=s===U?l+Vt:c>=0?(i.push(u),l.slice(0,c)+We+l.slice(c)+A+f):l+A+(c===-2?o:f)}return[Xe(n,a+(n[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},V=class n{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let a=0,s=0,o=e.length-1,l=this.parts,[u,d]=Bt(e,t);if(this.el=n.createElement(u,i),T.currentNode=this.el.content,t===2||t===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(r=T.nextNode())!==null&&l.length<o;){if(r.nodeType===1){if(r.hasAttributes())for(let c of r.getAttributeNames())if(c.endsWith(We)){let h=d[s++],f=r.getAttribute(c).split(A),v=/([.?@])?(.*)/.exec(h);l.push({type:1,index:a,name:v[2],strings:f,ctor:v[1]==="."?be:v[1]==="?"?$e:v[1]==="@"?we:C}),r.removeAttribute(c)}else c.startsWith(A)&&(l.push({type:6,index:a}),r.removeAttribute(c));if(Ge.test(r.tagName)){let c=r.textContent.split(A),h=c.length-1;if(h>0){r.textContent=se?se.emptyScript:"";for(let f=0;f<h;f++)r.append(c[f],q()),T.nextNode(),l.push({type:2,index:++a});r.append(c[h],q())}}}else if(r.nodeType===8)if(r.data===Ke)l.push({type:2,index:a});else{let c=-1;for(;(c=r.data.indexOf(A,c+1))!==-1;)l.push({type:7,index:a}),c+=A.length-1}a++}}static createElement(e,t){let i=z.createElement("template");return i.innerHTML=e,i}};function R(n,e,t=n,i){if(e===O)return e;let r=i!==void 0?t._$Co?.[i]:t._$Cl,a=D(e)?void 0:e._$litDirective$;return r?.constructor!==a&&(r?._$AO?.(!1),a===void 0?r=void 0:(r=new a(n),r._$AT(n,t,i)),i!==void 0?(t._$Co??=[])[i]=r:t._$Cl=r),r!==void 0&&(e=R(n,r._$AS(n,e.values),r,i)),e}var ve=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:i}=this._$AD,r=(e?.creationScope??z).importNode(t,!0);T.currentNode=r;let a=T.nextNode(),s=0,o=0,l=i[0];for(;l!==void 0;){if(s===l.index){let u;l.type===2?u=new F(a,a.nextSibling,this,e):l.type===1?u=new l.ctor(a,l.name,l.strings,this,e):l.type===6&&(u=new Ee(a,this,e)),this._$AV.push(u),l=i[++o]}s!==l?.index&&(a=T.nextNode(),s++)}return T.currentNode=z,r}p(e){let t=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},F=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=_,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=R(this,e,t),D(e)?e===_||e==null||e===""?(this._$AH!==_&&this._$AR(),this._$AH=_):e!==this._$AH&&e!==O&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Ft(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==_&&D(this._$AH)?this._$AA.nextSibling.data=e:this.T(z.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:i}=e,r=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=V.createElement(Xe(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(t);else{let a=new ve(r,this),s=a.u(this.options);a.p(t),this.T(s),this._$AH=a}}_$AC(e){let t=Be.get(e.strings);return t===void 0&&Be.set(e.strings,t=new V(e)),t}k(e){xe(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,r=0;for(let a of e)r===t.length?t.push(i=new n(this.O(q()),this.O(q()),this,this.options)):i=t[r],i._$AI(a),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let i=Me(e).nextSibling;Me(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},C=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,a){this.type=1,this._$AH=_,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=a,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=_}_$AI(e,t=this,i,r){let a=this.strings,s=!1;if(a===void 0)e=R(this,e,t,0),s=!D(e)||e!==this._$AH&&e!==O,s&&(this._$AH=e);else{let o=e,l,u;for(e=a[0],l=0;l<a.length-1;l++)u=R(this,o[i+l],t,l),u===O&&(u=this._$AH[l]),s||=!D(u)||u!==this._$AH[l],u===_?e=_:e!==_&&(e+=(u??"")+a[l+1]),this._$AH[l]=u}s&&!r&&this.j(e)}j(e){e===_?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},be=class extends C{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===_?void 0:e}},$e=class extends C{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==_)}},we=class extends C{constructor(e,t,i,r,a){super(e,t,i,r,a),this.type=5}_$AI(e,t=this){if((e=R(this,e,t,0)??_)===O)return;let i=this._$AH,r=e===_&&i!==_||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,a=e!==_&&(i===_||r);r&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Ee=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){R(this,e)}};var Wt=Ae.litHtmlPolyfillSupport;Wt?.(V,F),(Ae.litHtmlVersions??=[]).push("3.3.3");var Ye=(n,e,t)=>{let i=t?.renderBefore??e,r=i._$litPart$;if(r===void 0){let a=t?.renderBefore??null;i._$litPart$=r=new F(e.insertBefore(q(),a),a,void 0,t??{})}return r._$AI(n),r};var Se=globalThis,$=class extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ye(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return O}};$._$litElement$=!0,$.finalized=!0,Se.litElementHydrateSupport?.({LitElement:$});var Kt=Se.litElementPolyfillSupport;Kt?.({LitElement:$});(Se.litElementVersions??=[]).push("4.2.2");var ae=n=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(n,e)}):customElements.define(n,e)};var Gt={attribute:!0,type:String,converter:M,reflect:!1,hasChanged:re},Xt=(n=Gt,e,t)=>{let{kind:i,metadata:r}=t,a=globalThis.litPropertyMetadata.get(r);if(a===void 0&&globalThis.litPropertyMetadata.set(r,a=new Map),i==="setter"&&((n=Object.create(n)).wrapped=!0),a.set(t.name,n),i==="accessor"){let{name:s}=t;return{set(o){let l=e.get.call(this);e.set.call(this,o),this.requestUpdate(s,l,n,!0,o)},init(o){return o!==void 0&&this.C(s,void 0,n,o),o}}}if(i==="setter"){let{name:s}=t;return function(o){let l=this[s];e.call(this,o),this.requestUpdate(s,l,n,!0,o)}}throw Error("Unsupported decorator location: "+i)};function L(n){return(e,t)=>typeof t=="object"?Xt(n,e,t):((i,r,a)=>{let s=r.hasOwnProperty(a);return r.constructor.createProperty(a,i),s?Object.getOwnPropertyDescriptor(r,a):void 0})(n,e,t)}function b(n){return L({...n,state:!0,attribute:!1})}var Yt=/^(and|or|not)$/;function Zt(n){return/[A-Za-z0-9_.\]]/.test(n)}function Ze(n){let e=[],t=0,i=-1,r="",a=o=>{let l=r.trim();l.length>0&&e.push({type:"ATOM",value:l,start:i,end:o}),r="",i=-1},s=(o,l)=>{r.length===0&&(i=l),r+=o};for(;t<n.length;){let o=n[t];if(o==="'"||o==='"'){let d=o,c=t+1,h=o;for(;c<n.length&&n[c]!==d;){if(n[c]==="\\"&&c+1<n.length){h+=n[c]+n[c+1],c+=2;continue}h+=n[c],c+=1}c<n.length&&(h+=n[c],c+=1),r.length===0&&(i=t),r+=h,t=c;continue}if(o==="("){let d=r.length>0?r[r.length-1]:"";if(Zt(d)){let h=1,f=t+1,v="(";for(;f<n.length&&h>0;){let w=n[f];if(w==="'"||w==='"'){let he=w;for(v+=w,f+=1;f<n.length&&n[f]!==he;){if(n[f]==="\\"&&f+1<n.length){v+=n[f]+n[f+1],f+=2;continue}v+=n[f],f+=1}f<n.length&&(v+=n[f],f+=1);continue}w==="("&&(h+=1),w===")"&&(h-=1),v+=w,f+=1}r+=v,t=f;continue}else{a(t),e.push({type:"LPAREN",value:"(",start:t,end:t+1}),t+=1;continue}}if(o===")"){a(t),e.push({type:"RPAREN",value:")",start:t,end:t+1}),t+=1;continue}if(/\s/.test(o)){if(t+=1,r.length===0)continue;s(" ",t-1);continue}s(o,t),t+=1;let l=n[t]??"";if(t>=n.length||/[\s()]/.test(l)){let d=r.trim().split(/\s+/),c=d[d.length-1];if(Yt.test(c)){let h=r.length-c.length,f=r.slice(0,h).trim();f.length>0&&e.push({type:"ATOM",value:f,start:i,end:t-c.length});let v=c.toUpperCase();e.push({type:v,value:c,start:t-c.length,end:t}),r="",i=-1}}}return a(n.length),e.push({type:"EOF",value:"",start:n.length,end:n.length}),e}function Jt(n,e,t){let i=n.length,r=e;for(;r<i;){let a=n[r];if(a==="'"||a==='"'){let s=a;for(r+=1;r<i&&n[r]!==s;)n[r]==="\\"&&r+1<i?r+=2:r+=1;r<i&&(r+=1);continue}if(n.startsWith(t,r))return r-e;r+=1}return-1}function Te(n){let e=[],t=n.length,i=0;for(;i<t;){let r=i;for(;i<t&&!n.startsWith("{{",i)&&!n.startsWith("{%",i)&&!n.startsWith("{#",i);)i+=1;if(i>r&&e.push({type:"text",content:n.slice(r,i),start:r,end:i}),i>=t)break;let a,s;n.startsWith("{{",i)?(a="expr",s="}}"):n.startsWith("{%",i)?(a="stmt",s="%}"):(a="comment",s="#}");let o=i+2,l=Jt(n,o,s);if(l===-1){e.push({type:"text",content:n.slice(r),start:r,end:t}),i=t;break}let u=o+l;e.push({type:a,content:n.slice(o,u),start:i,end:u+s.length}),i=u+s.length}return e}var W=class{constructor(e){this.pos=0;this.src=e,this.tokens=Ze(e)}peek(){return this.tokens[this.pos]}advance(){return this.tokens[this.pos++]}sourceBetween(e,t){return this.src.slice(e.start,t.end).trim()}parse(){let e=this.parseOr();if(this.peek().type!=="EOF")throw new Error(`Unexpected token '${this.peek().value}' at position ${this.peek().start}`);return e}parseOr(){let e=this.peek(),t=[this.parseAnd()];for(;this.peek().type==="OR";)this.advance(),t.push(this.parseAnd());if(t.length===1)return t[0];let i=this.tokens[this.pos-1];return{kind:"OR",source:this.sourceBetween(e,i),children:t}}parseAnd(){let e=this.peek(),t=[this.parseNot()];for(;this.peek().type==="AND";)this.advance(),t.push(this.parseNot());if(t.length===1)return t[0];let i=this.tokens[this.pos-1];return{kind:"AND",source:this.sourceBetween(e,i),children:t}}parseNot(){if(this.peek().type==="NOT"){let e=this.advance(),t=this.parseNot();return{kind:"NOT",source:`not ${t.source}`,children:[t]}}return this.parsePrimary()}parsePrimary(){let e=this.peek();if(e.type==="LPAREN"){this.advance();let t=this.parseOr(),i=this.peek();if(i.type!=="RPAREN")throw new Error(`Expected ')' at position ${i.start}`);return this.advance(),{...t,source:this.sourceBetween(e,this.tokens[this.pos-1])}}if(e.type==="ATOM")return this.advance(),{kind:"LEAF",source:e.value};throw new Error(`Unexpected token '${e.value}' at position ${e.start}`)}};function Qt(n){let e=n.trim(),t=e.match(/^\{\{\s*([\s\S]*?)\s*\}\}$/);return t?t[1].trim():e}function et(n){let e=Te(n),t=en(e,n);if(t)try{let a=t.expr,o=new W(a).parse();return B(o).forEach(l=>{l.kind==="LEAF"&&(l.preamble=t.preamble)}),{ast:o,fallback:!1,preamble:t.preamble}}catch{}let i=rt(e,n);if(i)return{ast:i,fallback:!1,preamble:i.preamble};let r=Qt(n);try{return{ast:new W(r).parse(),fallback:!1}}catch{return{ast:{kind:"LEAF",source:r},fallback:!0}}}function en(n,e){let t,i=[],r=!1;for(let s of n)switch(s.type){case"text":if(s.content.trim()!=="")return;break;case"comment":break;case"stmt":if(r||!tt(s.content))return;i.push(s);break;case"expr":if(r)return;r=!0,t=s;break}if(!t)return;let a=i.map(s=>e.slice(s.start,s.end)).join(" ");return{expr:t.content.trim(),preamble:a}}function K(n){return n.replace(/^[\s-]+/,"").replace(/[\s-]+$/,"").trim()}function tt(n){return/^\s*set\b/i.test(n)}function B(n,e=[]){e.push(n);for(let t of n.children??[])B(t,e);for(let t of n.branches??[])t.condition&&B(t.condition,e),B(t.body,e);return e}function ze(n){return/^\s*if\b/i.test(K(n))}function nt(n){let e=K(n);return/^\s*elif\b/i.test(e)||/^\s*else\s+if\b/i.test(e)}function Je(n){let e=K(n);return/^\s*else\b/i.test(e)&&!nt(n)}function it(n){return/^\s*endif\b/i.test(K(n))}function rt(n,e){let t=-1;for(let o=0;o<n.length;o++){let l=n[o];if(l.type==="stmt"&&ze(l.content)){t=o;break}if(l.type==="stmt"&&!tt(l.content)||l.type==="expr"||l.type==="text"&&l.content.trim()!=="")return;l.type}if(t===-1)return;let i=tn(n,t);if(i===-1)return;for(let o=i+1;o<n.length;o++){let l=n[o];if(l.type==="text"){if(l.content.trim()!=="")return;continue}if(l.type!=="comment")return}let a=n.slice(0,t).filter(o=>o.type==="stmt").map(o=>e.slice(o.start,o.end)).join(" "),s=nn(t,i,n,e,a);return st(s,a),s}function tn(n,e){let t=0;for(let i=e;i<n.length;i++){let r=n[i];if(r.type==="stmt"){if(ze(r.content))t+=1;else if(it(r.content)&&(t-=1,t===0))return i}}return-1}function nn(n,e,t,i,r){let a=[],s=0,o,l=(d,c)=>({conditionContent:d,bodyStart:t[c].end,bodyEnd:i.length});for(let d=n;d<=e;d++){let c=t[d];if(c.type!=="stmt")continue;let h=c.content;ze(h)?(s===0&&(o=l(Qe(h),d),a.push(o)),s+=1):it(h)?(s-=1,s===0&&o&&(o.bodyEnd=c.start)):(nt(h)||Je(h))&&s===1&&(o&&(o.bodyEnd=c.start),o=l(Je(h)?void 0:Qe(h),d),a.push(o))}let u=a.map(d=>{let c=i.slice(d.bodyStart,d.bodyEnd).trim(),h;d.conditionContent!==void 0&&(h=rn(d.conditionContent),st(h,r));let f=sn(c);return{condition:h,body:f,source:i.slice(t[n].start,t[e].end)}});return{kind:"CONDITIONAL",source:i.slice(t[n].start,t[e].end),branches:u,preamble:r}}function Qe(n){return K(n).replace(/^(if|elif)\b/i,"").trim()}function rn(n){try{return new W(n).parse()}catch{return{kind:"LEAF",source:n}}}function sn(n){if(n.trim()==="")return{kind:"OUTPUT",source:""};let e=Te(n.trim()),t=rt(e,n.trim());return t||{kind:"OUTPUT",source:n}}function st(n,e){B(n).forEach(t=>{(t.kind==="LEAF"||t.kind==="OUTPUT")&&(t.preamble=e)})}var an=/\b(states|is_state|state_attr|is_state_attr)\(\s*(['"])((?:\\.|(?!\2).)*)\2\s*(?:,\s*(['"])((?:\\.|(?!\4).)*)\4\s*)?(?:,\s*(['"])((?:\\.|(?!\6).)*)\6\s*)?\)/g;function G(n){return n.replace(/\\(.)/g,"$1")}function x(n){let e=[],t=new RegExp(an.source,"g"),i;for(;(i=t.exec(n))!==null;){let[r,a,,s,,o,,l]=i,u=G(s);a==="states"?e.push({raw:r,fn:"states",entityId:u}):a==="is_state"?e.push({raw:r,fn:"is_state",entityId:u,compareValue:o?G(o):void 0}):a==="state_attr"?e.push({raw:r,fn:"state_attr",entityId:u,attribute:o?G(o):void 0}):a==="is_state_attr"&&e.push({raw:r,fn:"is_state_attr",entityId:u,attribute:o?G(o):void 0,compareValue:l?G(l):void 0})}return e}function at(n){let e=new Map;for(let t of n){let i=`${t.entityId}\0${t.attribute??""}`,r=e.get(i);r||(r={entityId:t.entityId,attribute:t.attribute,usages:[]},e.set(i,r)),r.usages.push(t)}return Array.from(e.values()).sort((t,i)=>t.entityId===i.entityId?(t.attribute??"").localeCompare(i.attribute??""):t.entityId.localeCompare(i.entityId))}async function Oe(n,e,t,i,r=""){let a=`${r}${r?" ":""}${e}`;try{return await n.connection.subscribeMessage(s=>t(String(s?.result??"")),{type:"render_template",template:a})}catch(s){return i(s instanceof Error?s:new Error(String(s))),async()=>{}}}async function ot(n,e,t,i,r=""){return Oe(n,`{{ (${e}) }}`,t,i,r)}function lt(n){let e=n.trim();if(e===""||e==="None"||e==="none"||e==="null"||e==="False"||e==="false"||e==="0")return!1;if(e==="True"||e==="true")return!0;let t=Number(e);return Number.isNaN(t)?e.length>0:t!==0}function ct(){return{loading:!0}}function le(n,e=[]){if(n.kind==="LEAF"||n.kind==="OUTPUT")return e.push(n),e;if(n.kind==="CONDITIONAL"){for(let t of n.branches??[])t.condition&&le(t.condition,e),le(t.body,e);return e}for(let t of n.children??[])le(t,e);return e}function ce(n,e){if(n.kind==="LEAF"||n.kind==="OUTPUT"){let r=e.get(n)??ct();return r.loading?{node:n,value:!1,loading:!0}:r.error!==void 0?{node:n,value:!1,error:r.error}:{node:n,value:lt(r.rendered??""),rendered:r.rendered}}if(n.kind==="CONDITIONAL"){let r=!1,a=(n.branches??[]).map(s=>{let o=s.condition?ce(s.condition,e):void 0,l=ce(s.body,e),u=!1;return o?u=!r&&o.value:u=!r,u&&(r=!0),{condition:o,body:l,fired:u}});return{node:n,value:r,branches:a}}let t=(n.children??[]).map(r=>ce(r,e)),i;return n.kind==="AND"?i=t.every(r=>r.value):n.kind==="OR"?i=t.some(r=>r.value):i=!t[0].value,{node:n,value:i,children:t}}async function dt(n,e,t){let i=[];le(e,i);let r=new Map;for(let o of i)r.set(o,ct());let a=()=>t(ce(e,r));a();let s=[];return await Promise.all(i.map(async o=>{let l=c=>{r.set(o,{loading:!1,rendered:c}),a()},u=c=>{r.set(o,{loading:!1,error:c.message}),a()},d;o.kind==="LEAF"?d=await ot(n,o.source,l,u,o.preamble):d=await Oe(n,o.source,l,u,o.preamble),s.push(d)})),{dispose:async()=>{await Promise.all(s.map(o=>o().catch(()=>{})))}}}async function Ne(n){return n.callWS({type:"config/entity_registry/list"})}async function ut(n,e){return(await Ne(n)).find(i=>i.entity_id===e)}var de=["state","value_template"];async function pt(n,e){let t=await ut(n,e);if(!t)throw new Error(`No entity registry entry found for "${e}".`);if(t.platform!=="template")throw new Error(`"${e}" is not a Template entity (platform: "${t.platform}"). Only entities created via Settings > Devices & Services > Helpers > Template are supported.`);if(!t.config_entry_id)throw new Error(`"${e}" has no config entry - it's likely a YAML-defined template sensor, which this card doesn't support. Only UI-created Template Helpers are supported.`);return t}function ht(n){let e={};for(let t of n??[])if(t.type==="section"&&t.schema){let i=ht(t.schema);Object.keys(i).length>0&&(e[t.name]=i)}else{let i=t.description?.suggested_value;i!=null&&i!==""&&(e[t.name]=i)}return e}async function ft(n,e){let t=await pt(n,e),i=await n.callApi("POST","config/config_entries/options/flow",{handler:t.config_entry_id});try{let s=(i.data_schema??[]).find(o=>de.includes(o.name))?.description?.suggested_value;if(typeof s!="string"||s.trim()==="")throw new Error(`Couldn't find the template field in "${e}"'s configuration (looked for: ${de.join(", ")}).`);return s}finally{await n.callApi("DELETE",`config/config_entries/options/flow/${i.flow_id}`).catch(()=>{})}}async function mt(n,e,t){let i=await pt(n,e),r=await n.callApi("POST","config/config_entries/options/flow",{handler:i.config_entry_id});try{let a=r.data_schema??[],s=a.find(u=>de.includes(u.name))?.name;if(!s)throw new Error(`Couldn't find the template field in "${e}"'s configuration (looked for: ${de.join(", ")}).`);let o=ht(a);o[s]=t;let l=await n.callApi("POST",`config/config_entries/options/flow/${r.flow_id}`,o);if(l.type!=="create_entry"){let u=l.errors?Object.values(l.errors).join(" "):"the configuration flow rejected the update";throw new Error(`Couldn't save the template: ${u}`)}}finally{await n.callApi("DELETE",`config/config_entries/options/flow/${r.flow_id}`).catch(()=>{})}}function gt(n,e){return!n.startsWith("sensor.")&&!n.startsWith("binary_sensor.")?!1:e?.entities?.[n]?.platform==="template"}function _t(n,e=[],t=[]){for(let r of[...e,...t])if(gt(r,n))return r;let i=n?.entities;if(i){for(let r of Object.values(i))if(r&&gt(r.entity_id,n))return r.entity_id}}var X={"card.default_title":"Template logic","card.parse_fallback_warning":"Couldn't fully parse this template's boolean structure - showing it as a single evaluated expression instead.","card.setting_up":"Setting up live subscriptions\u2026","card.references_summary":"State values","card.edit_template":"Edit template","card.discard_changes":"Discard","card.save_template":"Save to helper","card.saving_template":"Saving\u2026","card.empty_title":"Can't load template","card.empty_hint":"Choose a Template helper created via Settings \u2192 Devices & Services \u2192 Helpers in the card configuration.","card.edit_hint":"Editing a draft below. The visualization re-parses live as you type. Save writes it back to the helper; Discard reverts to the helper's saved template.","references.entity_column":"Entity","references.value_column":"Current value","references.entity_not_found":"entity not found","references.empty":"No states()/is_state()/state_attr() references found.","tree.loading":"loading\u2026","tree.and":"AND","tree.or":"OR","tree.not":"NOT","tree.if":"IF","tree.else_if":"ELSE IF","tree.else":"ELSE","tree.empty_output":"(empty output)","editor.title_label":"Title (optional)","editor.entity_label":"Template Helper entity","editor.icon_label":"Icon (optional)","editor.humanize_label":"Plain language","editor.show_state_values_label":"State values","editor.show_header_label":"Show icon & title","editor.show_edit_button_label":"Show edit button","editor.hint":"Only entities created via Settings \u2192 Devices & Services \u2192 Helpers \u2192 Template are supported. The card reads that helper's template definition directly, so it always stays in sync - nothing to paste or keep updated manually.","humanize.is":"is","humanize.is_not":"is not","humanize.less_than":"is less than","humanize.less_than_or_equal":"is less than or equal to","humanize.greater_than":"is greater than","humanize.greater_than_or_equal":"is greater than or equal to","humanize.is_in":"is in","humanize.is_not_in":"is not in","humanize.now":"the current time","humanize.current":"current","humanize.and":"and","humanize.between":"is between"};var yt={"card.default_title":"Logique du mod\xE8le","card.parse_fallback_warning":"Impossible d'analyser enti\xE8rement la structure bool\xE9enne de ce mod\xE8le - affichage sous forme d'expression unique \xE9valu\xE9e.","card.setting_up":"Configuration des abonnements en direct\u2026","card.references_summary":"Valeurs d'\xE9tat","card.edit_template":"Modifier le mod\xE8le","card.discard_changes":"Ignorer","card.save_template":"Enregistrer dans l'assistant","card.saving_template":"Enregistrement\u2026","card.empty_title":"Impossible de charger le mod\xE8le","card.empty_hint":"Choisissez un assistant Mod\xE8le cr\xE9\xE9 via Param\xE8tres \u2192 Appareils et services \u2192 Assistants dans la configuration de la carte.","card.edit_hint":"Modification d'un brouillon ci-dessous. La visualisation est re-analys\xE9e en direct pendant la saisie. Appuyez sur Termin\xE9 pour revenir au mod\xE8le enregistr\xE9 de l'assistant (l'enregistrement n'est pas encore pris en charge).","references.entity_column":"Entit\xE9","references.value_column":"Valeur actuelle","references.entity_not_found":"entit\xE9 introuvable","references.empty":"Aucune r\xE9f\xE9rence states()/is_state()/state_attr() trouv\xE9e.","tree.loading":"chargement\u2026","tree.and":"ET","tree.or":"OU","tree.not":"NON","tree.if":"SI","tree.else_if":"SINON SI","tree.else":"SINON","tree.empty_output":"(sortie vide)","editor.title_label":"Titre (facultatif)","editor.entity_label":"Entit\xE9 d'assistant mod\xE8le","editor.icon_label":"Ic\xF4ne (facultative)","editor.humanize_label":"Langage simple","editor.show_state_values_label":"Valeurs d'\xE9tat","editor.show_header_label":"Afficher l'ic\xF4ne et le titre","editor.show_edit_button_label":"Afficher le bouton de modification","editor.hint":"Seules les entit\xE9s cr\xE9\xE9es via Param\xE8tres \u2192 Appareils et services \u2192 Assistants \u2192 Mod\xE8le sont prises en charge. La carte lit directement la d\xE9finition du mod\xE8le de cet assistant, elle reste donc toujours synchronis\xE9e - rien \xE0 coller ni \xE0 mettre \xE0 jour manuellement.","humanize.is":"est","humanize.is_not":"n'est pas","humanize.less_than":"est inf\xE9rieur \xE0","humanize.less_than_or_equal":"est inf\xE9rieur ou \xE9gal \xE0","humanize.greater_than":"est sup\xE9rieur \xE0","humanize.greater_than_or_equal":"est sup\xE9rieur ou \xE9gal \xE0","humanize.is_in":"est dans","humanize.is_not_in":"n'est pas dans","humanize.now":"l\u2019heure actuelle","humanize.current":"actuel","humanize.and":"et","humanize.between":"est entre"};var vt={"card.default_title":"Logica del modello","card.parse_fallback_warning":"Impossibile analizzare completamente la struttura booleana di questo modello - visualizzato come un'unica espressione valutata.","card.setting_up":"Configurazione delle sottoscrizioni live\u2026","card.references_summary":"Valori di stato","card.edit_template":"Modifica modello","card.discard_changes":"Annulla","card.save_template":"Salva nell'helper","card.saving_template":"Salvataggio\u2026","card.empty_title":"Impossibile caricare il modello","card.empty_hint":"Scegli un helper Modello creato tramite Impostazioni \u2192 Dispositivi e servizi \u2192 Helper nella configurazione della scheda.","card.edit_hint":"Modifica di una bozza qui sotto. La visualizzazione viene ri-analizzata in tempo reale mentre digiti. Premi Fatto per tornare al modello salvato dell'helper (il salvataggio non \xE8 ancora supportato).","references.entity_column":"Entit\xE0","references.value_column":"Valore attuale","references.entity_not_found":"entit\xE0 non trovata","references.empty":"Nessun riferimento states()/is_state()/state_attr() trovato.","tree.loading":"caricamento\u2026","tree.and":"E","tree.or":"O","tree.not":"NON","tree.if":"SE","tree.else_if":"ALTRIMENTI SE","tree.else":"ALTRIMENTI","tree.empty_output":"(uscita vuota)","editor.title_label":"Titolo (opzionale)","editor.entity_label":"Entit\xE0 helper modello","editor.icon_label":"Icona (opzionale)","editor.humanize_label":"Linguaggio semplice","editor.show_state_values_label":"Valori di stato","editor.show_header_label":"Mostra icona e titolo","editor.show_edit_button_label":"Mostra il pulsante di modifica","editor.hint":"Sono supportate solo le entit\xE0 create tramite Impostazioni \u2192 Dispositivi e servizi \u2192 Helper \u2192 Modello. La scheda legge direttamente la definizione del modello di quell'helper, quindi rimane sempre sincronizzata - niente da incollare o aggiornare manualmente.","humanize.is":"\xE8","humanize.is_not":"non \xE8","humanize.less_than":"\xE8 minore di","humanize.less_than_or_equal":"\xE8 minore o uguale a","humanize.greater_than":"\xE8 maggiore di","humanize.greater_than_or_equal":"\xE8 maggiore o uguale a","humanize.is_in":"\xE8 in","humanize.is_not_in":"non \xE8 in","humanize.now":"l\u2019ora corrente","humanize.current":"corrente","humanize.and":"e","humanize.between":"\xE8 tra"};var bt={"card.default_title":"L\xF3gica de la plantilla","card.parse_fallback_warning":"No se pudo analizar completamente la estructura booleana de esta plantilla - se muestra como una \xFAnica expresi\xF3n evaluada.","card.setting_up":"Configurando suscripciones en vivo\u2026","card.references_summary":"Valores de estado","card.edit_template":"Editar plantilla","card.discard_changes":"Descartar","card.save_template":"Guardar en el ayudante","card.saving_template":"Guardando\u2026","card.empty_title":"No se pudo cargar la plantilla","card.empty_hint":"Elige un ayudante de Plantilla creado mediante Ajustes \u2192 Dispositivos y servicios \u2192 Ayudantes en la configuraci\xF3n de la tarjeta.","card.edit_hint":"Editando un borrador a continuaci\xF3n. La visualizaci\xF3n se vuelve a analizar en vivo mientras escribes. Pulsa Hecho para volver a la plantilla guardada del ayudante (guardar a\xFAn no es compatible).","references.entity_column":"Entidad","references.value_column":"Valor actual","references.entity_not_found":"entidad no encontrada","references.empty":"No se encontraron referencias states()/is_state()/state_attr().","tree.loading":"cargando\u2026","tree.and":"Y","tree.or":"O","tree.not":"NO","tree.if":"SI","tree.else_if":"SI NO","tree.else":"SI NO","tree.empty_output":"(salida vac\xEDa)","editor.title_label":"T\xEDtulo (opcional)","editor.entity_label":"Entidad de ayudante de plantilla","editor.icon_label":"Icono (opcional)","editor.humanize_label":"Lenguaje sencillo","editor.show_state_values_label":"Valores de estado","editor.show_header_label":"Mostrar icono y t\xEDtulo","editor.show_edit_button_label":"Mostrar el bot\xF3n de edici\xF3n","editor.hint":"Solo se admiten entidades creadas mediante Ajustes \u2192 Dispositivos y servicios \u2192 Ayudantes \u2192 Plantilla. La tarjeta lee directamente la definici\xF3n de la plantilla de ese ayudante, por lo que siempre permanece sincronizada - no hay nada que pegar ni actualizar manualmente.","humanize.is":"es","humanize.is_not":"no es","humanize.less_than":"es menor que","humanize.less_than_or_equal":"es menor o igual que","humanize.greater_than":"es mayor que","humanize.greater_than_or_equal":"es mayor o igual que","humanize.is_in":"est\xE1 en","humanize.is_not_in":"no est\xE1 en","humanize.now":"la hora actual","humanize.current":"actual","humanize.and":"y","humanize.between":"est\xE1 entre"};var $t={"card.default_title":"Vorlagenlogik","card.parse_fallback_warning":"Die boolesche Struktur dieser Vorlage konnte nicht vollst\xE4ndig analysiert werden - wird als einzelner ausgewerteter Ausdruck angezeigt.","card.setting_up":"Live-Abonnements werden eingerichtet\u2026","card.references_summary":"Statuswerte","card.edit_template":"Vorlage bearbeiten","card.discard_changes":"Verwerfen","card.save_template":"Im Helfer speichern","card.saving_template":"Speichert\u2026","card.empty_title":"Vorlage kann nicht geladen werden","card.empty_hint":"W\xE4hle in der Kartenkonfiguration einen Vorlagen-Helfer, der \xFCber Einstellungen \u2192 Ger\xE4te & Dienste \u2192 Helfer erstellt wurde.","card.edit_hint":"Unten wird ein Entwurf bearbeitet. Die Visualisierung wird beim Tippen live neu analysiert. Mit 'Fertig' wird zur gespeicherten Vorlage des Helfers zur\xFCckgekehrt (Speichern wird noch nicht unterst\xFCtzt).","references.entity_column":"Entit\xE4t","references.value_column":"Aktueller Wert","references.entity_not_found":"Entit\xE4t nicht gefunden","references.empty":"Keine states()/is_state()/state_attr()-Referenzen gefunden.","tree.loading":"wird geladen\u2026","tree.and":"UND","tree.or":"ODER","tree.not":"NICHT","tree.if":"WENN","tree.else_if":"SONST WENN","tree.else":"SONST","tree.empty_output":"(leere Ausgabe)","editor.title_label":"Titel (optional)","editor.entity_label":"Vorlagen-Helfer-Entit\xE4t","editor.icon_label":"Symbol (optional)","editor.humanize_label":"Einfache Sprache","editor.show_state_values_label":"Statuswerte","editor.show_header_label":"Symbol & Titel anzeigen","editor.show_edit_button_label":"Bearbeiten-Schaltfl\xE4che anzeigen","editor.hint":"Es werden nur Entit\xE4ten unterst\xFCtzt, die \xFCber Einstellungen \u2192 Ger\xE4te & Dienste \u2192 Helfer \u2192 Vorlage erstellt wurden. Die Karte liest die Vorlagendefinition dieses Helfers direkt aus, sodass sie immer synchron bleibt - nichts muss manuell eingef\xFCgt oder aktualisiert werden.","humanize.is":"ist","humanize.is_not":"ist nicht","humanize.less_than":"ist kleiner als","humanize.less_than_or_equal":"ist kleiner oder gleich","humanize.greater_than":"ist gr\xF6\xDFer als","humanize.greater_than_or_equal":"ist gr\xF6\xDFer oder gleich","humanize.is_in":"ist in","humanize.is_not_in":"ist nicht in","humanize.now":"die aktuelle Zeit","humanize.current":"aktuelle","humanize.and":"und","humanize.between":"liegt zwischen"};var wt={"card.default_title":"Sjabloonlogica","card.parse_fallback_warning":"Kon de booleaanse structuur van dit sjabloon niet volledig analyseren - wordt weergegeven als \xE9\xE9n ge\xEBvalueerde expressie.","card.setting_up":"Live-abonnementen worden ingesteld\u2026","card.references_summary":"Statuswaarden","card.edit_template":"Sjabloon bewerken","card.discard_changes":"Verwerpen","card.save_template":"Opslaan in de helper","card.saving_template":"Opslaan\u2026","card.empty_title":"Kan sjabloon niet laden","card.empty_hint":"Kies in de kaartconfiguratie een Sjabloonhelper die is gemaakt via Instellingen \u2192 Apparaten en diensten \u2192 Hulpmiddelen.","card.edit_hint":"U bewerkt hieronder een concept. De visualisatie wordt live opnieuw geanalyseerd terwijl u typt. Druk op Klaar om terug te keren naar het opgeslagen sjabloon van de helper (opslaan wordt nog niet ondersteund).","references.entity_column":"Entiteit","references.value_column":"Huidige waarde","references.entity_not_found":"entiteit niet gevonden","references.empty":"Geen states()/is_state()/state_attr()-referenties gevonden.","tree.loading":"laden\u2026","tree.and":"EN","tree.or":"OF","tree.not":"NIET","tree.if":"ALS","tree.else_if":"ANDERS ALS","tree.else":"ANDERS","tree.empty_output":"(lege uitvoer)","editor.title_label":"Titel (optioneel)","editor.entity_label":"Sjabloonhelper-entiteit","editor.icon_label":"Pictogram (optioneel)","editor.humanize_label":"Duidelijke taal","editor.show_state_values_label":"Statuswaarden","editor.show_header_label":"Pictogram & titel tonen","editor.show_edit_button_label":"Bewerkknop tonen","editor.hint":"Alleen entiteiten die zijn aangemaakt via Instellingen \u2192 Apparaten en diensten \u2192 Hulpmiddelen \u2192 Sjabloon worden ondersteund. De kaart leest de sjabloondefinitie van die hulp rechtstreeks, zodat deze altijd gesynchroniseerd blijft - niets om te plakken of handmatig bij te werken.","humanize.is":"is","humanize.is_not":"is niet","humanize.less_than":"is kleiner dan","humanize.less_than_or_equal":"is kleiner dan of gelijk aan","humanize.greater_than":"is groter dan","humanize.greater_than_or_equal":"is groter dan of gelijk aan","humanize.is_in":"is in","humanize.is_not_in":"is niet in","humanize.now":"de huidige tijd","humanize.current":"huidige","humanize.and":"en","humanize.between":"ligt tussen"};var Et={"card.default_title":"Malogikk","card.parse_fallback_warning":"Klarte ikke \xE5 analysere hele den boolske strukturen i denne malen - viser den som ett enkelt evaluert uttrykk i stedet.","card.setting_up":"Setter opp direkteabonnementer\u2026","card.references_summary":"Tilstandsverdier","card.edit_template":"Rediger mal","card.discard_changes":"Forkast","card.save_template":"Lagre i hjelperen","card.saving_template":"Lagrer\u2026","card.empty_title":"Kan ikke laste malen","card.empty_hint":"Velg en Malhjelper opprettet via Innstillinger \u2192 Enheter og tjenester \u2192 Hjelpere i kortets konfigurasjon.","card.edit_hint":"Redigerer et utkast nedenfor. Visualiseringen re-analyseres direkte mens du skriver. Trykk Ferdig for \xE5 g\xE5 tilbake til hjelperens lagrede mal (lagring st\xF8ttes enn\xE5 ikke).","references.entity_column":"Enhet","references.value_column":"N\xE5v\xE6rende verdi","references.entity_not_found":"enheten ble ikke funnet","references.empty":"Fant ingen states()/is_state()/state_attr()-referanser.","tree.loading":"laster\u2026","tree.and":"OG","tree.or":"ELLER","tree.not":"IKKE","tree.if":"HVIS","tree.else_if":"ELLERS HVIS","tree.else":"ELLERS","tree.empty_output":"(tom utdata)","editor.title_label":"Tittel (valgfritt)","editor.entity_label":"Malhjelper-enhet","editor.icon_label":"Ikon (valgfritt)","editor.humanize_label":"Enkelt spr\xE5k","editor.show_state_values_label":"Tilstandsverdier","editor.show_header_label":"Vis ikon og tittel","editor.show_edit_button_label":"Vis redigeringsknapp","editor.hint":"Kun enheter opprettet via Innstillinger \u2192 Enheter og tjenester \u2192 Hjelpere \u2192 Mal st\xF8ttes. Kortet leser malens definisjon direkte fra hjelperen, s\xE5 det holder seg alltid synkronisert - ingenting \xE5 lime inn eller oppdatere manuelt.","humanize.is":"er","humanize.is_not":"er ikke","humanize.less_than":"er mindre enn","humanize.less_than_or_equal":"er mindre enn eller lik","humanize.greater_than":"er st\xF8rre enn","humanize.greater_than_or_equal":"er st\xF8rre enn eller lik","humanize.is_in":"er i","humanize.is_not_in":"er ikke i","humanize.now":"gjeldende tid","humanize.current":"gjeldende","humanize.and":"og","humanize.between":"er mellom"};var At={"card.default_title":"Malogikk","card.parse_fallback_warning":"Klarte ikkje \xE5 analysere heile den boolske strukturen i denne malen - viser han som eitt enkelt evaluert uttrykk i staden.","card.setting_up":"Set opp direkteabonnement\u2026","card.references_summary":"Tilstandsverdiar","card.edit_template":"Rediger mal","card.discard_changes":"Forkast","card.save_template":"Lagre i hjelparen","card.saving_template":"Lagrar\u2026","card.empty_title":"Kan ikkje laste malen","card.empty_hint":"Vel ein Malhjelpar oppretta via Innstillingar \u2192 Einingar og tenester \u2192 Hjelparar i konfigurasjonen til kortet.","card.edit_hint":"Redigerer eit utkast nedanfor. Visualiseringa vert analysert p\xE5 nytt direkte medan du skriv. Trykk Ferdig for \xE5 g\xE5 attende til den lagra malen til hjelparen (lagring vert enno ikkje st\xF8tta).","references.entity_column":"Eining","references.value_column":"Gjeldande verdi","references.entity_not_found":"eininga vart ikkje funnen","references.empty":"Fann ingen states()/is_state()/state_attr()-referansar.","tree.loading":"lastar\u2026","tree.and":"OG","tree.or":"ELLER","tree.not":"IKKJE","tree.if":"VISS","tree.else_if":"ELLES VISS","tree.else":"ELLES","tree.empty_output":"(tom utdata)","editor.title_label":"Tittel (valfritt)","editor.entity_label":"Malhjelpar-eining","editor.icon_label":"Ikon (valfritt)","editor.humanize_label":"Enkelt spr\xE5k","editor.show_state_values_label":"Tilstandsverdiar","editor.show_header_label":"Vis ikon og tittel","editor.show_edit_button_label":"Vis redigeringsknapp","editor.hint":"Berre einingar oppretta via Innstillingar \u2192 Einingar og tenester \u2192 Hjelparar \u2192 Mal er st\xF8tta. Kortet les maldefinisjonen til den hjelparen direkte, s\xE5 det held seg alltid synkronisert - ingenting \xE5 lime inn eller oppdatere manuelt.","humanize.is":"er","humanize.is_not":"er ikkje","humanize.less_than":"er mindre enn","humanize.less_than_or_equal":"er mindre enn eller lik","humanize.greater_than":"er st\xF8rre enn","humanize.greater_than_or_equal":"er st\xF8rre enn eller lik","humanize.is_in":"er i","humanize.is_not_in":"er ikkje i","humanize.now":"gjeldande tid","humanize.current":"gjeldande","humanize.and":"og","humanize.between":"er mellom"};var ue={en:X,fr:yt,it:vt,es:bt,de:$t,nl:wt,nb:Et,nn:At};function on(n){if(!n)return X;if(ue[n])return ue[n];let e=n.split("-")[0];return ue[e]?ue[e]:X}function p(n,e,t){let r=on(n?.language)[e]??X[e];if(t)for(let[a,s]of Object.entries(t))r=r.replaceAll(`{${a}}`,s);return r}var ln=[["<=","lte"],[">=","gte"],["!=","ne"],["==","eq"],["<","lt"],[">","gt"]],cn=[["not in","not_in"],["is not","is_not"],["in","in"],["is","is"]],pe={eq:"humanize.is",ne:"humanize.is_not",lt:"humanize.less_than",lte:"humanize.less_than_or_equal",gt:"humanize.greater_than",gte:"humanize.greater_than_or_equal",in:"humanize.is_in",not_in:"humanize.is_not_in",is:"humanize.is",is_not:"humanize.is_not"};function xt(n){return/[A-Za-z0-9_.\]]/.test(n)}function Re(n){let e=0;for(let t=0;t<n.length;t++){let i=n[t];if(i==="'"||i==='"'){let r=i;for(t++;t<n.length&&n[t]!==r;)n[t]==="\\"&&t++,t++;continue}if(i==="("){e++;continue}if(i===")"){e--;continue}if(e===0){for(let[r,a]of ln)if(n.startsWith(r,t)){let s=n.slice(0,t).trim(),o=n.slice(t+r.length).trim();if(s&&o)return{op:a,left:s,right:o}}for(let[r,a]of cn)if(n.startsWith(r,t)){let s=t>0?n[t-1]:" ",o=t+r.length,l=o<n.length?n[o]:" ";if(!xt(s)&&!xt(l)){let u=n.slice(0,t).trim(),d=n.slice(o).trim();if(u&&d)return{op:a,left:u,right:d}}}}}return null}function dn(n){let e=Re(n.right);return!e||Re(e.right)?null:{a:n.left,op1:n.op,b:e.left,op2:e.op,c:e.right}}function kt(n){switch(n){case"lt":return"gt";case"gt":return"lt";case"lte":return"gte";case"gte":return"lte";case"eq":return"eq";case"ne":return"ne";default:return null}}function un(n,e){let t=n?.states?.[e]?.attributes?.friendly_name;if(typeof t=="string"&&t.trim()!=="")return t.trim();let i=e.replace(/^[a-z_]+\./,"").replace(/[-_]+/g," ").trim();return i.length>0?i:e}function Tt(n){return n.replace(/[-_]+/g," ")}function Z(n,e){let t=un(n,e.entityId);return e.attribute?`${t} ${Tt(e.attribute)}`:t}function pn(n){let e=n.trim();return e.startsWith("'")&&e.endsWith("'")&&e.length>=2||e.startsWith('"')&&e.endsWith('"')&&e.length>=2?e.slice(1,-1).replace(/\\(.)/g,"$1"):null}function hn(n,e){let t=[],i="",r=0,a=null;for(let s=0;s<n.length;s++){let o=n[s];if(a){if(o==="\\"){i+=o+(n[s+1]??""),s++;continue}i+=o,o===a&&(a=null);continue}if(o==="'"||o==='"'){a=o,i+=o;continue}if(o==="["&&r++,o==="]"&&r--,o===e&&r===0){t.push(i),i="";continue}i+=o}return i.trim()&&t.push(i),t}function St(n,e){let t=n.trim(),i=x(t);if(i.length===1)return Z(e,i[0]);let r=t.match(/^now\s*\(\s*\)\s*(.*)$/);if(r){let a=r[1].trim();if(a==="")return p(e,"humanize.now");let s=a.match(/^\.\s*([A-Za-z_]+)\s*$/);if(s)return`${p(e,"humanize.current")} ${Tt(s[1])}`}return t.length?t:null}function Y(n,e){let t=pn(n);if(t!==null)return t;let i=n.trim();if(/^-?\d+(\.\d+)?$/.test(i))return i;if(/^\[.*\]$/.test(i)){let a=i.slice(1,-1),o=hn(a,",").map(l=>Y(l,e));return o.some(l=>l===null)?null:o.join(", ")}let r=x(i);return r.length===1?Z(e,r[0]):i}function Ce(n,e){let t=Re(n);if(t){let s=dn(t);if(s){let{a:f,op1:v,b:w,op2:he,c:Ot}=s,fe=St(w,e);if(fe===null)return null;let N=kt(v);if(N===null)return null;let Q=Y(f,e),ee=Y(Ot,e);if(Q===null||ee===null)return null;let P=he,me=N==="gt"||N==="gte";if(me&&(P==="lt"||P==="lte")||(N==="lt"||N==="lte")&&(P==="gt"||P==="gte")){let Nt=me?Q:ee,Rt=me?ee:Q;return`${fe} ${p(e,"humanize.between")} ${Nt} ${p(e,"humanize.and")} ${Rt}`}return`${fe} ${p(e,pe[N])} ${Q} ${p(e,"humanize.and")} ${p(e,pe[P])} ${ee}`}let o=x(t.left),l=x(t.right),u=null,d=null,c=t.op;if(o.length>=1)u=Z(e,o[0]),d=t.right;else if(l.length>=1){let f=kt(t.op);if(f===null)return null;u=Z(e,l[0]),d=t.left,c=f}else u=St(t.left,e),d=t.right;let h=Y(d,e);return u===null||h===null?null:`${u} ${p(e,pe[c])} ${h}`}let i=x(n);if(i.length!==1)return null;let r=i[0],a=Z(e,r);if(r.compareValue!==void 0){let s=Y(r.compareValue,e);return s===null?null:`${a} ${p(e,pe.eq)} ${s}`}return a}function fn(n,e){switch(n){case"AND":return p(e,"tree.and");case"OR":return p(e,"tree.or");case"NOT":return p(e,"tree.not");default:return""}}function mn(n){let e=n.trim().toLowerCase();return e==="true"||e==="false"}function J(n,e,t=!1,i=0){let{node:r,value:a,error:s,loading:o}=n,l=o?"tpl-node--loading":s?"tpl-node--error":a?"tpl-node--true":"tpl-node--false";if(r.kind==="OUTPUT"){if(r.source==="")return m`<div class="tpl-node tpl-node--empty" style="--depth: ${i}">
        <span class="tpl-node__meta">${p(e,"tree.empty_output")}</span>
      </div>`;let d=n.rendered,c=d!==void 0&&mn(d),h=Ce(r.source,e),f=t?r.source:h??r.source;return m`<div class="tpl-node ${l} tpl-node--output" style="--depth: ${i}">
      ${o?m`<span class="tpl-node__badge">…</span>`:s?m`<span class="tpl-node__badge">!</span>`:c?m`<span class="tpl-node__badge">${a?"\u2713":"\u2717"}</span>`:m`<ha-icon class="tpl-node__value-icon" icon="mdi:variable-box"></ha-icon>`}
      <span class="tpl-node__label tpl-node__label--output">
        ${o?p(e,"tree.loading"):s||(c?d:m`<span class="tpl-node__stmt">${f}</span><span class="tpl-node__arrow">→</span>${d}`)}
      </span>
    </div>`}if(r.kind==="LEAF"){let d=Ce(r.source,e),c=t?r.source:d??r.source;return m`
      <div class="tpl-node ${l}" style="--depth: ${i}">
        <span class="tpl-node__badge">${o?"\u2026":s?"!":a?"\u2713":"\u2717"}</span>
        <span class="tpl-node__label${t?" tpl-node__label--code":""}">${c}</span>
        ${o?m`<span class="tpl-node__meta">${p(e,"tree.loading")}</span>`:s?m`<span class="tpl-node__meta tpl-node__meta--error">${s}</span>`:""}
      </div>
    `}if(r.kind==="CONDITIONAL"){let d=n.branches??[];return m`
      <div class="tpl-children">
        ${d.map((c,h)=>gn(c,h,e,t,i+1))}
      </div>
    `}let u=n.children??[];return m`
    <div class="tpl-node ${l} tpl-node--group" style="--depth: ${i}">
      <span class="tpl-node__badge">${a?"\u2713":"\u2717"}</span>
      <span class="tpl-node__op">${fn(r.kind,e)}</span>
    </div>
    <div class="tpl-children">
      ${u.map(d=>J(d,e,t,i+1))}
    </div>
  `}function gn(n,e,t,i=!1,r=0){let s=n.condition===void 0?p(t,"tree.else"):e===0?p(t,"tree.if"):p(t,"tree.else_if"),o=n.fired;return m`
    <div class="tpl-branch${o?" tpl-branch--fired":""}" style="--depth: ${r}">
      <div class="tpl-branch__head">
        <span class="tpl-branch__tag tpl-branch__tag--${o?"true":"false"}">
          ${o?"\u2713":"\u2717"} ${s}
        </span>
      </div>
      ${n.condition?J(n.condition,t,i,r):""}
      ${J(n.body,t,i,r)}
    </div>
  `}function _n(n){return n===void 0?"\u2014":n===null?"null":typeof n=="object"?JSON.stringify(n):String(n)}function zt(n,e,t){return n.length===0?m`<div class="tpl-refs-empty">${p(t,"references.empty")}</div>`:m`
    <table class="tpl-refs">
      <thead>
        <tr>
          <th>${p(t,"references.entity_column")}</th>
          <th class="tpl-refs__value">${p(t,"references.value_column")}</th>
        </tr>
      </thead>
      <tbody>
        ${n.map(i=>{let r=e[i.entityId],a=r===void 0,s=i.attribute?r?.attributes?.[i.attribute]:r?.state,o=!a&&typeof r.attributes?.friendly_name=="string"?r.attributes.friendly_name:i.entityId,l=i.attribute?`${i.entityId}.${i.attribute}`:i.entityId,u=!i.attribute&&!a&&typeof r.attributes?.unit_of_measurement=="string"?` ${r.attributes.unit_of_measurement}`:"";return m`
            <tr class=${a?"tpl-refs__row--missing":""}>
              <td>
                <div class="tpl-refs__entity">
                  ${a?"":m`<ha-state-icon .stateObj=${r}></ha-state-icon>`}
                  <span class="tpl-refs__text">
                    <span class="tpl-refs__name">${o}</span>
                    <span class="tpl-refs__id">${l}</span>
                  </span>
                </div>
              </td>
              <td class="tpl-refs__value">
                ${a?p(t,"references.entity_not_found"):m`${_n(s)}${u}`}
              </td>
            </tr>
          `})}
      </tbody>
    </table>
  `}var k=class extends ${constructor(){super(...arguments);this.entityFilter=t=>!this.templateEntityIds||this.templateEntityIds.size===0||this.templateEntityIds.has(t.entity_id)}setConfig(t){this.config=t}get showStateValues(){return this.config?.showStateValues??this.config?.showReferences??!0}willUpdate(){this.hass&&!this.templateEntityIds&&this.loadTemplateEntities()}async loadTemplateEntities(){if(this.hass){this.templateEntityIds=new Set;try{let t=await Ne(this.hass);this.templateEntityIds=new Set(t.filter(i=>i.platform==="template").map(i=>i.entity_id))}catch{this.templateEntityIds=new Set}}}emit(t){if(!this.config)return;let i={...this.config,...t};this.config=i,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:i}}))}render(){return this.config?m`
      <div class="form">
        <ha-input
          .label=${p(this.hass,"editor.title_label")}
          .value=${this.config.title??""}
          @input=${t=>this.emit({title:t.target.value})}
        ></ha-input>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this.config.entity??""}
          .label=${p(this.hass,"editor.entity_label")}
          .entityFilter=${this.entityFilter}
          @value-changed=${t=>this.emit({entity:t.detail.value})}
        ></ha-entity-picker>
        <ha-icon-picker
          .hass=${this.hass}
          .value=${this.config.icon??""}
          .label=${p(this.hass,"editor.icon_label")}
          @value-changed=${t=>this.emit({icon:t.detail.value||void 0})}
        ></ha-icon-picker>
        <ha-switch
          .checked=${this.config.showCode!==!0}
          @change=${t=>this.emit({showCode:!t.target.checked})}
        >${p(this.hass,"editor.humanize_label")}</ha-switch>
        <ha-switch
          .checked=${this.showStateValues}
          @change=${t=>this.emit({showStateValues:t.target.checked})}
        >${p(this.hass,"editor.show_state_values_label")}</ha-switch>
        <ha-switch
          .checked=${this.config.showHeader!==!1}
          @change=${t=>this.emit({showHeader:t.target.checked})}
        >${p(this.hass,"editor.show_header_label")}</ha-switch>
        <ha-switch
          .checked=${this.config.showEditButton!==!1}
          @change=${t=>this.emit({showEditButton:t.target.checked})}
        >${p(this.hass,"editor.show_edit_button_label")}</ha-switch>
        <ha-alert alert-type="info">${p(this.hass,"editor.hint")}</ha-alert>
      </div>
    `:m``}};k.styles=j`
    .form {
      display: flex;
      flex-direction: column;
      gap: var(--ha-space-3, 12px);
      padding: 8px 0;
    }
    ha-alert {
      margin-top: var(--ha-space-1, 4px);
    }
  `,g([L({attribute:!1})],k.prototype,"hass",2),g([b()],k.prototype,"config",2),g([b()],k.prototype,"templateEntityIds",2),k=g([ae("ha-template-visualizer-card-editor")],k);var yn="mdi:ab-testing",y=class extends ${constructor(){super(...arguments);this.references=[];this.parseFallback=!1;this.editing=!1;this.draft="";this.saving=!1;this.setupGeneration=0}get canEdit(){return this.hass?.user?.is_admin===!0}get showStateValues(){return this.config?.showStateValues??this.config?.showReferences??!0}setConfig(t){if(!t?.entity)throw new Error('ha-template-visualizer-card: "entity" is required in the card config.');this.config=t}static getConfigElement(){return document.createElement("ha-template-visualizer-card-editor")}getCardSize(){return 5}getGridOptions(){return{columns:12,min_rows:3}}static getStubConfig(t,i=[],r=[]){return{type:"custom:ha-template-visualizer-card",entity:_t(t,i,r)??"binary_sensor.example_template_helper"}}willUpdate(){this.config&&this.hass&&this.config.entity!==this.subscribedEntity&&this.setupLiveTree()}async setupLiveTree(){if(!this.config||!this.hass)return;let t=this.config.entity;this.subscribedEntity=t;let i=this.beginSetup();try{let r=await ft(this.hass,t);if(i!==this.setupGeneration)return;this.templateText=r,this.editing||(this.draft=r),await this.setupFromTemplate(r,i)}catch(r){if(i!==this.setupGeneration)return;this.globalError=r instanceof Error?r.message:String(r)}}beginSetup(){let t=++this.setupGeneration,i=this.liveHandle;return this.liveHandle=void 0,this.tree=void 0,this.references=[],this.globalError=void 0,i&&i.dispose(),t}async setupFromTemplate(t,i){this.references=at(x(t));let{ast:r,fallback:a}=et(t);this.parseFallback=a;let s=await dt(this.hass,r,o=>{i===this.setupGeneration&&(this.tree=o)});if(i!==this.setupGeneration){s.dispose();return}this.liveHandle=s}handleDraftChange(t){this.draft=t,window.clearTimeout(this.draftTimer),this.draftTimer=window.setTimeout(()=>{this.editing=!0;let i=this.beginSetup();this.setupFromTemplate(this.draft,i)},400)}startEditing(){this.editing=!0,this.saveError=void 0,this.draft=this.templateText??""}discardChanges(){if(window.clearTimeout(this.draftTimer),this.editing=!1,this.saveError=void 0,!this.templateText)return;this.draft=this.templateText;let t=this.beginSetup();this.setupFromTemplate(this.templateText,t)}async saveDraft(){if(!(!this.config||!this.hass||!this.editing||!this.canEdit)){window.clearTimeout(this.draftTimer),this.saving=!0,this.saveError=void 0;try{await mt(this.hass,this.config.entity,this.draft),this.saving=!1,this.editing=!1,this.draft=this.draft,this.templateText=this.draft;let t=this.beginSetup();await this.setupFromTemplate(this.draft,t)}catch(t){this.saving=!1,this.saveError=t instanceof Error?t.message:String(t)}}}disconnectedCallback(){super.disconnectedCallback(),this.setupGeneration++,this.liveHandle?.dispose(),this.liveHandle=void 0}render(){if(!this.config)return m``;let t=this.config.title??p(this.hass,"card.default_title"),i=this.config.showHeader!==!1;return m`
      <ha-card>
        ${i?m`<div class="card-header">
              <ha-icon icon=${this.config.icon??yn}></ha-icon>
              <span class="card-header__title">${t}</span>
            </div>`:""}
        <div class="card-content">
          ${this.globalError?m`<div class="tpl-empty">
                <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
                <div class="tpl-empty__title">${p(this.hass,"card.empty_title")}</div>
                <div class="tpl-empty__reason">${this.globalError}</div>
                <div class="tpl-empty__hint">${p(this.hass,"card.empty_hint")}</div>
              </div>`:m`
                ${this.editing?m`
                      <div class="tpl-edit">
                        <div class="tpl-edit__hint">${p(this.hass,"card.edit_hint")}</div>
                        <ha-code-editor
                          .value=${this.draft}
                          @value-changed=${r=>this.handleDraftChange(r.detail.value??"")}
                        ></ha-code-editor>
                        ${this.saveError?m`<div class="tpl-error">${this.saveError}</div>`:""}
                        <div class="tpl-edit__actions">
                          <ha-button .disabled=${this.saving} @click=${this.discardChanges}>
                            ${p(this.hass,"card.discard_changes")}
                          </ha-button>
                          <ha-button
                            class="tpl-edit__save"
                            .disabled=${this.saving||this.draft.trim()===""}
                            @click=${this.saveDraft}
                          >
                            ${this.saving?p(this.hass,"card.saving_template"):p(this.hass,"card.save_template")}
                          </ha-button>
                        </div>
                      </div>
                    `:""}
                ${this.parseFallback?m`<div class="tpl-warning">${p(this.hass,"card.parse_fallback_warning")}</div>`:""}
                ${this.tree?J(this.tree,this.hass,this.config.showCode===!0):m`<div>${p(this.hass,"card.setting_up")}</div>`}
                ${this.canEdit&&!this.editing&&this.config.showEditButton!==!1?m`<div class="tpl-edit-action">
                      <ha-button appearance="plain" @click=${this.startEditing}>
                        <ha-icon slot="start" icon="mdi:code-tags"></ha-icon>
                        ${p(this.hass,"card.edit_template")}
                      </ha-button>
                    </div>`:""}
                ${this.showStateValues?m`<ha-expansion-panel
                      class="tpl-refs-panel"
                      .header=${p(this.hass,"card.references_summary")}
                    >
                      ${zt(this.references,this.hass?.states??{},this.hass)}
                    </ha-expansion-panel>`:""}
              `}
        </div>
      </ha-card>
    `}};y.styles=j`
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
    .card-header ha-icon {
      --mdc-icon-size: 24px;
      color: var(--paper-item-icon-color, #44739e);
      flex: none;
    }
    .tpl-edit-action {
      margin-top: 12px;
    }
    .tpl-edit-action ha-button {
      width: 100%;
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
      border-left: 1px solid var(--divider-color, #ccc);
      margin-left: 8px;
    }
    .tpl-node--output .tpl-node__label {
      font-weight: 400;
      color: var(--primary-text-color, #000);
    }
    .tpl-node__value-icon {
      flex: none;
      color: var(--secondary-text-color, #888);
    }
    .tpl-node__stmt {
      font-family: var(--code-editor-font-family, monospace);
      font-size: 12px;
      color: var(--secondary-text-color, #888);
    }
    .tpl-node__arrow {
      color: var(--secondary-text-color, #888);
      margin: 0 6px;
    }
    .tpl-node--empty {
      font-style: italic;
    }
    .tpl-branch {
      padding: 4px 0;
    }
    .tpl-branch__head {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      color: var(--secondary-text-color);
      margin-bottom: 2px;
    }
    .tpl-branch__tag {
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .tpl-branch__tag--true {
      color: var(--success-color, #4caf50);
    }
    .tpl-branch__tag--false {
      color: var(--error-color, #db4437);
    }
    .tpl-error {
      color: var(--error-color, #db4437);
    }
    .tpl-empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 8px;
      padding: 24px 16px;
    }
    .tpl-empty ha-icon {
      --mdc-icon-size: 40px;
      color: var(--secondary-text-color);
    }
    .tpl-empty__title {
      font-weight: 500;
    }
    .tpl-empty__reason {
      color: var(--error-color, #db4437);
      font-size: 12px;
    }
    .tpl-empty__hint {
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .tpl-edit {
      margin: 12px 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .tpl-edit__hint {
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .tpl-edit__actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
    .tpl-edit__save {
      --mdc-theme-primary: var(--green-color, #4caf50);
    }
    ha-code-editor {
      width: 100%;
      min-height: 160px;
      border: 1px solid var(--divider-color, #ccc);
      border-radius: 4px;
    }
    .tpl-warning {
      color: var(--warning-color, #ff9800);
      font-size: 12px;
      margin-bottom: 8px;
    }
    .tpl-refs-panel {
      margin: 12px 0 0;
      font-size: 12px;
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
    .tpl-refs__entity {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .tpl-refs__entity ha-state-icon {
      width: 20px;
      height: 20px;
      flex: none;
    }
    .tpl-refs__text {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }
    .tpl-refs__name {
      font-weight: 500;
    }
    .tpl-refs__id {
      font-size: 11px;
      color: var(--secondary-text-color);
    }
    .tpl-refs__value {
      text-align: right;
      white-space: nowrap;
    }
    .tpl-refs__row--missing td {
      color: var(--error-color, #db4437);
    }
    .tpl-refs-empty {
      font-size: 12px;
      color: var(--secondary-text-color);
      margin-top: 8px;
    }
  `,g([L({attribute:!1})],y.prototype,"hass",2),g([b()],y.prototype,"config",2),g([b()],y.prototype,"tree",2),g([b()],y.prototype,"references",2),g([b()],y.prototype,"parseFallback",2),g([b()],y.prototype,"globalError",2),g([b()],y.prototype,"templateText",2),g([b()],y.prototype,"editing",2),g([b()],y.prototype,"draft",2),g([b()],y.prototype,"saving",2),g([b()],y.prototype,"saveError",2),y=g([ae("ha-template-visualizer-card")],y);window.customCards=window.customCards||[];window.customCards.push({type:"ha-template-visualizer-card",name:"Template Visualizer",description:"Visualizes a template sensor's boolean logic tree and shows which sub-conditions are true/false.",preview:!1,documentationURL:"https://github.com/jan-rivo/ha-template-visualizer-card",getEntitySuggestion:(n,e)=>{let t=e.split(".")[0];return t!=="sensor"&&t!=="binary_sensor"?null:{config:{type:"custom:ha-template-visualizer-card",entity:e}}}});export{y as HaTemplateEditorCard};
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
