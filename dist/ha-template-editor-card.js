var Ht=Object.defineProperty;var zt=Object.getOwnPropertyDescriptor;var y=(r,t,e,s)=>{for(var n=s>1?void 0:s?zt(t,e):t,i=r.length-1,o;i>=0;i--)(o=r[i])&&(n=(s?o(t,e,n):o(n))||n);return s&&n&&Ht(t,e,n),n};var q=globalThis,B=q.ShadowRoot&&(q.ShadyCSS===void 0||q.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,J=Symbol(),ct=new WeakMap,P=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==J)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(B&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=ct.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&ct.set(e,t))}return t}toString(){return this.cssText}},pt=r=>new P(typeof r=="string"?r:r+"",void 0,J),O=(r,...t)=>{let e=r.length===1?r[0]:t.reduce((s,n,i)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+r[i+1],r[0]);return new P(e,r,J)},dt=(r,t)=>{if(B)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),n=q.litNonce;n!==void 0&&s.setAttribute("nonce",n),s.textContent=e.cssText,r.appendChild(s)}},Z=B?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return pt(e)})(r):r;var{is:jt,defineProperty:It,getOwnPropertyDescriptor:Dt,getOwnPropertyNames:qt,getOwnPropertySymbols:Bt,getPrototypeOf:Ft}=Object,F=globalThis,ht=F.trustedTypes,Vt=ht?ht.emptyScript:"",Wt=F.reactiveElementPolyfillSupport,U=(r,t)=>r,L={toAttribute(r,t){switch(t){case Boolean:r=r?Vt:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},V=(r,t)=>!jt(r,t),ut={attribute:!0,type:String,converter:L,reflect:!1,useDefault:!1,hasChanged:V};Symbol.metadata??=Symbol("metadata"),F.litPropertyMetadata??=new WeakMap;var $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=ut){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),n=this.getPropertyDescriptor(t,s,e);n!==void 0&&It(this.prototype,t,n)}}static getPropertyDescriptor(t,e,s){let{get:n,set:i}=Dt(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:n,set(o){let a=n?.call(this);i?.call(this,o),this.requestUpdate(t,a,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ut}static _$Ei(){if(this.hasOwnProperty(U("elementProperties")))return;let t=Ft(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(U("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(U("properties"))){let e=this.properties,s=[...qt(e),...Bt(e)];for(let n of s)this.createProperty(n,e[n])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,n]of e)this.elementProperties.set(s,n)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let n=this._$Eu(e,s);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let n of s)e.unshift(Z(n))}else t!==void 0&&e.push(Z(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return dt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,s);if(n!==void 0&&s.reflect===!0){let i=(s.converter?.toAttribute!==void 0?s.converter:L).toAttribute(e,s.type);this._$Em=t,i==null?this.removeAttribute(n):this.setAttribute(n,i),this._$Em=null}}_$AK(t,e){let s=this.constructor,n=s._$Eh.get(t);if(n!==void 0&&this._$Em!==n){let i=s.getPropertyOptions(n),o=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:L;this._$Em=n;let a=o.fromAttribute(e,i.type);this[n]=a??this._$Ej?.get(n)??a,this._$Em=null}}requestUpdate(t,e,s,n=!1,i){if(t!==void 0){let o=this.constructor;if(n===!1&&(i=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??V)(i,e)||s.useDefault&&s.reflect&&i===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:n,wrapped:i},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),i!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),n===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[n,i]of this._$Ep)this[n]=i;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[n,i]of s){let{wrapped:o}=i,a=this[n];o!==!0||this._$AL.has(n)||a===void 0||this.C(n,void 0,i,a)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[U("elementProperties")]=new Map,$[U("finalized")]=new Map,Wt?.({ReactiveElement:$}),(F.reactiveElementVersions??=[]).push("2.1.2");var rt=globalThis,ft=r=>r,W=rt.trustedTypes,mt=W?W.createPolicy("lit-html",{createHTML:r=>r}):void 0,bt="$lit$",b=`lit$${Math.random().toFixed(9).slice(2)}$`,At="?"+b,Gt=`<${At}>`,S=document,H=()=>S.createComment(""),z=r=>r===null||typeof r!="object"&&typeof r!="function",nt=Array.isArray,Kt=r=>nt(r)||typeof r?.[Symbol.iterator]=="function",Y=`[ 	
\f\r]`,M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,gt=/-->/g,yt=/>/g,E=RegExp(`>|${Y}(?:([^\\s"'>=/]+)(${Y}*=${Y}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),vt=/'/g,_t=/"/g,xt=/^(?:script|style|textarea|title)$/i,it=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),u=it(1),de=it(2),he=it(3),k=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),$t=new WeakMap,w=S.createTreeWalker(S,129);function Et(r,t){if(!nt(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return mt!==void 0?mt.createHTML(t):t}var Jt=(r,t)=>{let e=r.length-1,s=[],n,i=t===2?"<svg>":t===3?"<math>":"",o=M;for(let a=0;a<e;a++){let l=r[a],p,h,c=-1,f=0;for(;f<l.length&&(o.lastIndex=f,h=o.exec(l),h!==null);)f=o.lastIndex,o===M?h[1]==="!--"?o=gt:h[1]!==void 0?o=yt:h[2]!==void 0?(xt.test(h[2])&&(n=RegExp("</"+h[2],"g")),o=E):h[3]!==void 0&&(o=E):o===E?h[0]===">"?(o=n??M,c=-1):h[1]===void 0?c=-2:(c=o.lastIndex-h[2].length,p=h[1],o=h[3]===void 0?E:h[3]==='"'?_t:vt):o===_t||o===vt?o=E:o===gt||o===yt?o=M:(o=E,n=void 0);let d=o===E&&r[a+1].startsWith("/>")?" ":"";i+=o===M?l+Gt:c>=0?(s.push(p),l.slice(0,c)+bt+l.slice(c)+b+d):l+b+(c===-2?a:d)}return[Et(r,i+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},j=class r{constructor({strings:t,_$litType$:e},s){let n;this.parts=[];let i=0,o=0,a=t.length-1,l=this.parts,[p,h]=Jt(t,e);if(this.el=r.createElement(p,s),w.currentNode=this.el.content,e===2||e===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(n=w.nextNode())!==null&&l.length<a;){if(n.nodeType===1){if(n.hasAttributes())for(let c of n.getAttributeNames())if(c.endsWith(bt)){let f=h[o++],d=n.getAttribute(c).split(b),g=/([.?@])?(.*)/.exec(f);l.push({type:1,index:i,name:g[2],strings:d,ctor:g[1]==="."?X:g[1]==="?"?tt:g[1]==="@"?et:N}),n.removeAttribute(c)}else c.startsWith(b)&&(l.push({type:6,index:i}),n.removeAttribute(c));if(xt.test(n.tagName)){let c=n.textContent.split(b),f=c.length-1;if(f>0){n.textContent=W?W.emptyScript:"";for(let d=0;d<f;d++)n.append(c[d],H()),w.nextNode(),l.push({type:2,index:++i});n.append(c[f],H())}}}else if(n.nodeType===8)if(n.data===At)l.push({type:2,index:i});else{let c=-1;for(;(c=n.data.indexOf(b,c+1))!==-1;)l.push({type:7,index:i}),c+=b.length-1}i++}}static createElement(t,e){let s=S.createElement("template");return s.innerHTML=t,s}};function R(r,t,e=r,s){if(t===k)return t;let n=s!==void 0?e._$Co?.[s]:e._$Cl,i=z(t)?void 0:t._$litDirective$;return n?.constructor!==i&&(n?._$AO?.(!1),i===void 0?n=void 0:(n=new i(r),n._$AT(r,e,s)),s!==void 0?(e._$Co??=[])[s]=n:e._$Cl=n),n!==void 0&&(t=R(r,n._$AS(r,t.values),n,s)),t}var Q=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,n=(t?.creationScope??S).importNode(e,!0);w.currentNode=n;let i=w.nextNode(),o=0,a=0,l=s[0];for(;l!==void 0;){if(o===l.index){let p;l.type===2?p=new I(i,i.nextSibling,this,t):l.type===1?p=new l.ctor(i,l.name,l.strings,this,t):l.type===6&&(p=new st(i,this,t)),this._$AV.push(p),l=s[++a]}o!==l?.index&&(i=w.nextNode(),o++)}return w.currentNode=S,n}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},I=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,n){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=R(this,t,e),z(t)?t===m||t==null||t===""?(this._$AH!==m&&this._$AR(),this._$AH=m):t!==this._$AH&&t!==k&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Kt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==m&&z(this._$AH)?this._$AA.nextSibling.data=t:this.T(S.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,n=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=j.createElement(Et(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===n)this._$AH.p(e);else{let i=new Q(n,this),o=i.u(this.options);i.p(e),this.T(o),this._$AH=i}}_$AC(t){let e=$t.get(t.strings);return e===void 0&&$t.set(t.strings,e=new j(t)),e}k(t){nt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,n=0;for(let i of t)n===e.length?e.push(s=new r(this.O(H()),this.O(H()),this,this.options)):s=e[n],s._$AI(i),n++;n<e.length&&(this._$AR(s&&s._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=ft(t).nextSibling;ft(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},N=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,n,i){this.type=1,this._$AH=m,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=i,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=m}_$AI(t,e=this,s,n){let i=this.strings,o=!1;if(i===void 0)t=R(this,t,e,0),o=!z(t)||t!==this._$AH&&t!==k,o&&(this._$AH=t);else{let a=t,l,p;for(t=i[0],l=0;l<i.length-1;l++)p=R(this,a[s+l],e,l),p===k&&(p=this._$AH[l]),o||=!z(p)||p!==this._$AH[l],p===m?t=m:t!==m&&(t+=(p??"")+i[l+1]),this._$AH[l]=p}o&&!n&&this.j(t)}j(t){t===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},X=class extends N{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===m?void 0:t}},tt=class extends N{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==m)}},et=class extends N{constructor(t,e,s,n,i){super(t,e,s,n,i),this.type=5}_$AI(t,e=this){if((t=R(this,t,e,0)??m)===k)return;let s=this._$AH,n=t===m&&s!==m||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,i=t!==m&&(s===m||n);n&&this.element.removeEventListener(this.name,this,s),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},st=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){R(this,t)}};var Zt=rt.litHtmlPolyfillSupport;Zt?.(j,I),(rt.litHtmlVersions??=[]).push("3.3.3");var wt=(r,t,e)=>{let s=e?.renderBefore??t,n=s._$litPart$;if(n===void 0){let i=e?.renderBefore??null;s._$litPart$=n=new I(t.insertBefore(H(),i),i,void 0,e??{})}return n._$AI(r),n};var ot=globalThis,_=class extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=wt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return k}};_._$litElement$=!0,_.finalized=!0,ot.litElementHydrateSupport?.({LitElement:_});var Yt=ot.litElementPolyfillSupport;Yt?.({LitElement:_});(ot.litElementVersions??=[]).push("4.2.2");var G=r=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(r,t)}):customElements.define(r,t)};var Qt={attribute:!0,type:String,converter:L,reflect:!1,hasChanged:V},Xt=(r=Qt,t,e)=>{let{kind:s,metadata:n}=e,i=globalThis.litPropertyMetadata.get(n);if(i===void 0&&globalThis.litPropertyMetadata.set(n,i=new Map),s==="setter"&&((r=Object.create(r)).wrapped=!0),i.set(e.name,r),s==="accessor"){let{name:o}=e;return{set(a){let l=t.get.call(this);t.set.call(this,a),this.requestUpdate(o,l,r,!0,a)},init(a){return a!==void 0&&this.C(o,void 0,r,a),a}}}if(s==="setter"){let{name:o}=e;return function(a){let l=this[o];t.call(this,a),this.requestUpdate(o,l,r,!0,a)}}throw Error("Unsupported decorator location: "+s)};function T(r){return(t,e)=>typeof e=="object"?Xt(r,t,e):((s,n,i)=>{let o=n.hasOwnProperty(i);return n.constructor.createProperty(i,s),o?Object.getOwnPropertyDescriptor(n,i):void 0})(r,t,e)}function A(r){return T({...r,state:!0,attribute:!1})}var te=/^(and|or|not)$/;function ee(r){return/[A-Za-z0-9_.\]]/.test(r)}function St(r){let t=[],e=0,s=-1,n="",i=a=>{let l=n.trim();l.length>0&&t.push({type:"ATOM",value:l,start:s,end:a}),n="",s=-1},o=(a,l)=>{n.length===0&&(s=l),n+=a};for(;e<r.length;){let a=r[e];if(a==="'"||a==='"'){let h=a,c=e+1,f=a;for(;c<r.length&&r[c]!==h;){if(r[c]==="\\"&&c+1<r.length){f+=r[c]+r[c+1],c+=2;continue}f+=r[c],c+=1}c<r.length&&(f+=r[c],c+=1),n.length===0&&(s=e),n+=f,e=c;continue}if(a==="("){let h=n.length>0?n[n.length-1]:"";if(ee(h)){let f=1,d=e+1,g="(";for(;d<r.length&&f>0;){let x=r[d];if(x==="'"||x==='"'){let Mt=x;for(g+=x,d+=1;d<r.length&&r[d]!==Mt;){if(r[d]==="\\"&&d+1<r.length){g+=r[d]+r[d+1],d+=2;continue}g+=r[d],d+=1}d<r.length&&(g+=r[d],d+=1);continue}x==="("&&(f+=1),x===")"&&(f-=1),g+=x,d+=1}n+=g,e=d;continue}else{i(e),t.push({type:"LPAREN",value:"(",start:e,end:e+1}),e+=1;continue}}if(a===")"){i(e),t.push({type:"RPAREN",value:")",start:e,end:e+1}),e+=1;continue}if(/\s/.test(a)){if(e+=1,n.length===0)continue;o(" ",e-1);continue}o(a,e),e+=1;let l=r[e]??"";if(e>=r.length||/[\s()]/.test(l)){let h=n.trim().split(/\s+/),c=h[h.length-1];if(te.test(c)){let f=n.length-c.length,d=n.slice(0,f).trim();d.length>0&&t.push({type:"ATOM",value:d,start:s,end:e-c.length});let g=c.toUpperCase();t.push({type:g,value:c,start:e-c.length,end:e}),n="",s=-1}}}return i(r.length),t.push({type:"EOF",value:"",start:r.length,end:r.length}),t}var at=class{constructor(t){this.pos=0;this.src=t,this.tokens=St(t)}peek(){return this.tokens[this.pos]}advance(){return this.tokens[this.pos++]}sourceBetween(t,e){return this.src.slice(t.start,e.end).trim()}parse(){let t=this.parseOr();if(this.peek().type!=="EOF")throw new Error(`Unexpected token '${this.peek().value}' at position ${this.peek().start}`);return t}parseOr(){let t=this.peek(),e=[this.parseAnd()];for(;this.peek().type==="OR";)this.advance(),e.push(this.parseAnd());if(e.length===1)return e[0];let s=this.tokens[this.pos-1];return{kind:"OR",source:this.sourceBetween(t,s),children:e}}parseAnd(){let t=this.peek(),e=[this.parseNot()];for(;this.peek().type==="AND";)this.advance(),e.push(this.parseNot());if(e.length===1)return e[0];let s=this.tokens[this.pos-1];return{kind:"AND",source:this.sourceBetween(t,s),children:e}}parseNot(){if(this.peek().type==="NOT"){let t=this.advance(),e=this.parseNot();return{kind:"NOT",source:`not ${e.source}`,children:[e]}}return this.parsePrimary()}parsePrimary(){let t=this.peek();if(t.type==="LPAREN"){this.advance();let e=this.parseOr(),s=this.peek();if(s.type!=="RPAREN")throw new Error(`Expected ')' at position ${s.start}`);return this.advance(),e}if(t.type==="ATOM")return this.advance(),{kind:"LEAF",source:t.value};throw new Error(`Unexpected token '${t.value}' at position ${t.start}`)}};function se(r){let t=r.trim(),e=t.match(/^\{\{\s*([\s\S]*?)\s*\}\}$/);return e?e[1].trim():t}function kt(r){let t=se(r);try{return{ast:new at(t).parse(),fallback:!1}}catch{return{ast:{kind:"LEAF",source:t},fallback:!0}}}var re=/\b(states|is_state|state_attr|is_state_attr)\(\s*(['"])((?:\\.|(?!\2).)*)\2\s*(?:,\s*(['"])((?:\\.|(?!\4).)*)\4\s*)?(?:,\s*(['"])((?:\\.|(?!\6).)*)\6\s*)?\)/g;function D(r){return r.replace(/\\(.)/g,"$1")}function Ct(r){let t=[],e=new RegExp(re.source,"g"),s;for(;(s=e.exec(r))!==null;){let[n,i,,o,,a,,l]=s,p=D(o);i==="states"?t.push({raw:n,fn:"states",entityId:p}):i==="is_state"?t.push({raw:n,fn:"is_state",entityId:p,compareValue:a?D(a):void 0}):i==="state_attr"?t.push({raw:n,fn:"state_attr",entityId:p,attribute:a?D(a):void 0}):i==="is_state_attr"&&t.push({raw:n,fn:"is_state_attr",entityId:p,attribute:a?D(a):void 0,compareValue:l?D(l):void 0})}return t}function Rt(r){let t=new Map;for(let e of r){let s=`${e.entityId}\0${e.attribute??""}`,n=t.get(s);n||(n={entityId:e.entityId,attribute:e.attribute,usages:[]},t.set(s,n)),n.usages.push(e)}return Array.from(t.values()).sort((e,s)=>e.entityId===s.entityId?(e.attribute??"").localeCompare(s.attribute??""):e.entityId.localeCompare(s.entityId))}async function Nt(r,t,e,s){let n=`{{ (${t}) }}`;try{return await r.connection.subscribeMessage(i=>e(String(i?.result??"")),{type:"render_template",template:n})}catch(i){return s(i instanceof Error?i:new Error(String(i))),async()=>{}}}function Tt(r){let t=r.trim();if(t===""||t==="None"||t==="none"||t==="null"||t==="False"||t==="false"||t==="0")return!1;if(t==="True"||t==="true")return!0;let e=Number(t);return Number.isNaN(e)?t.length>0:e!==0}function Pt(r,t){if(r.kind==="LEAF"){t.push(r);return}for(let e of r.children??[])Pt(e,t)}function Ot(r,t){if(r.kind==="LEAF"){let n=t.get(r);return n.loading?{node:r,value:!1,loading:!0}:n.error!==void 0?{node:r,value:!1,error:n.error}:{node:r,value:Tt(n.rendered??""),rendered:n.rendered}}let e=(r.children??[]).map(n=>Ot(n,t)),s;return r.kind==="AND"?s=e.every(n=>n.value):r.kind==="OR"?s=e.some(n=>n.value):s=!e[0].value,{node:r,value:s,children:e}}async function Ut(r,t,e){let s=[];Pt(t,s);let n=new Map;for(let a of s)n.set(a,{loading:!0});let i=()=>e(Ot(t,n));i();let o=[];return await Promise.all(s.map(async a=>{let l=await Nt(r,a.source,p=>{n.set(a,{loading:!1,rendered:p}),i()},p=>{n.set(a,{loading:!1,error:p.message}),i()});o.push(l)})),{dispose:async()=>{await Promise.all(o.map(a=>a().catch(()=>{})))}}}function ne(r){switch(r){case"AND":return"AND";case"OR":return"OR";case"NOT":return"NOT";default:return""}}function lt(r,t=0){let{node:e,value:s,rendered:n,error:i,loading:o}=r,a=o?"tpl-node--loading":i?"tpl-node--error":s?"tpl-node--true":"tpl-node--false";if(e.kind==="LEAF")return u`
      <div class="tpl-node ${a}" style="--depth: ${t}">
        <span class="tpl-node__badge">${o?"\u2026":i?"!":s?"\u2713":"\u2717"}</span>
        <code class="tpl-node__source">${e.source}</code>
        ${o?u`<span class="tpl-node__meta">loading…</span>`:i?u`<span class="tpl-node__meta tpl-node__meta--error">${i}</span>`:u`<span class="tpl-node__meta">→ ${n}</span>`}
      </div>
    `;let l=r.children??[];return u`
    <div class="tpl-node ${a} tpl-node--group" style="--depth: ${t}">
      <span class="tpl-node__badge">${s?"\u2713":"\u2717"}</span>
      <span class="tpl-node__op">${ne(e.kind)}</span>
    </div>
    <div class="tpl-children">
      ${l.map(p=>lt(p,t+1))}
    </div>
  `}function ie(r){return r===void 0?"\u2014":r===null?"null":typeof r=="object"?JSON.stringify(r):String(r)}function Lt(r,t){return r.length===0?u`<div class="tpl-refs-empty">No states()/is_state()/state_attr() references found.</div>`:u`
    <table class="tpl-refs">
      <thead>
        <tr>
          <th>Entity</th>
          <th>Attribute</th>
          <th>Current value</th>
          <th>Used as</th>
        </tr>
      </thead>
      <tbody>
        ${r.map(e=>{let s=t[e.entityId],n=s===void 0,i=e.attribute?s?.attributes?.[e.attribute]:s?.state,o=Array.from(new Set(e.usages.map(a=>a.fn))).join(", ");return u`
            <tr class=${n?"tpl-refs__row--missing":""}>
              <td><code>${e.entityId}</code></td>
              <td>${e.attribute?u`<code>${e.attribute}</code>`:"\u2014"}</td>
              <td>${n?"entity not found":ie(i)}</td>
              <td class="tpl-refs__used-as">${o}</td>
            </tr>
          `})}
      </tbody>
    </table>
  `}var C=class extends _{setConfig(t){this.config=t}emit(t){if(!this.config)return;let e={...this.config,...t};this.config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}render(){return this.config?u`
      <div class="form">
        <label>
          Title (optional)
          <input
            type="text"
            .value=${this.config.title??""}
            @change=${t=>this.emit({title:t.target.value})}
          />
        </label>
        <label>
          Entity to compare against (optional)
          <input
            type="text"
            placeholder="sensor.my_template_sensor"
            .value=${this.config.entity??""}
            @change=${t=>this.emit({entity:t.target.value})}
          />
        </label>
        <label>
          Template (paste the value_template Jinja here)
          <textarea
            rows="4"
            .value=${this.config.template??""}
            @change=${t=>this.emit({template:t.target.value})}
          ></textarea>
        </label>
      </div>
    `:u``}};C.styles=O`
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
    input,
    textarea {
      font-family: monospace;
      font-size: 13px;
      padding: 6px;
    }
  `,y([T({attribute:!1})],C.prototype,"hass",2),y([A()],C.prototype,"config",2),C=y([G("ha-template-editor-card-editor")],C);var v=class extends _{constructor(){super(...arguments);this.references=[];this.parseFallback=!1;this.setupGeneration=0}setConfig(e){if(!e?.template)throw new Error('ha-template-editor-card: "template" is required in the card config.');this.config=e}static getConfigElement(){return document.createElement("ha-template-editor-card-editor")}static getStubConfig(){return{type:"custom:ha-template-editor-card",template:"{{ is_state('binary_sensor.front_door', 'on') and states('sensor.mode') == 'home' }}"}}willUpdate(){this.config&&this.hass&&this.config.template!==this.subscribedTemplate&&(this.references=Rt(Ct(this.config.template)),this.setupLiveTree())}async setupLiveTree(){if(!this.config||!this.hass)return;let e=this.config.template;this.subscribedTemplate=e;let s=++this.setupGeneration,n=this.liveHandle;this.liveHandle=void 0,this.tree=void 0,this.globalError=void 0,n&&n.dispose();try{let{ast:i,fallback:o}=kt(e);this.parseFallback=o;let a=await Ut(this.hass,i,l=>{s===this.setupGeneration&&(this.tree=l)});if(s!==this.setupGeneration){a.dispose();return}this.liveHandle=a}catch(i){if(s!==this.setupGeneration)return;this.globalError=i instanceof Error?i.message:String(i)}}disconnectedCallback(){super.disconnectedCallback(),this.setupGeneration++,this.liveHandle?.dispose(),this.liveHandle=void 0}render(){if(!this.config)return u``;let e=this.config.title??"Template logic",s=this.config.entity?this.hass?.states?.[this.config.entity]?.state:void 0;return u`
      <ha-card header=${e}>
        <div class="card-content">
          ${this.globalError?u`<div class="tpl-error">${this.globalError}</div>`:u`
                ${this.parseFallback?u`<div class="tpl-warning">
                      Couldn't fully parse this template's boolean structure - showing it as a
                      single evaluated expression instead.
                    </div>`:""}
                ${this.config.entity?u`<div class="tpl-summary">
                      <span>Entity state:</span> <b>${s??"unknown"}</b>
                    </div>`:""}
                ${this.tree?lt(this.tree):u`<div>Setting up live subscriptions…</div>`}
                <h4 class="tpl-refs-title">Referenced entities &amp; attributes</h4>
                ${Lt(this.references,this.hass?.states??{})}
              `}
        </div>
      </ha-card>
    `}};v.styles=O`
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
      margin-bottom: 8px;
      font-size: 13px;
    }
    .tpl-loading {
      font-size: 12px;
      color: var(--secondary-text-color);
      margin-top: 8px;
    }
    .tpl-refs-title {
      margin: 16px 0 4px;
      font-size: 13px;
      font-weight: 600;
      color: var(--secondary-text-color);
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
    .tpl-refs__used-as {
      color: var(--secondary-text-color);
      font-size: 11px;
    }
    .tpl-refs-empty {
      font-size: 12px;
      color: var(--secondary-text-color);
      margin-top: 8px;
    }
  `,y([T({attribute:!1})],v.prototype,"hass",2),y([A()],v.prototype,"config",2),y([A()],v.prototype,"tree",2),y([A()],v.prototype,"references",2),y([A()],v.prototype,"parseFallback",2),y([A()],v.prototype,"globalError",2),v=y([G("ha-template-editor-card")],v);window.customCards=window.customCards||[];window.customCards.push({type:"ha-template-editor-card",name:"Template Logic Editor",description:"Visualizes a template sensor's boolean logic tree and shows which sub-conditions are true/false."});export{v as HaTemplateEditorCard};
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
