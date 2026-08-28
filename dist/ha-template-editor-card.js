var Dt=Object.defineProperty;var Ft=Object.getOwnPropertyDescriptor;var g=(r,t,e,s)=>{for(var i=s>1?void 0:s?Ft(t,e):t,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=(s?o(t,e,i):o(i))||i);return s&&i&&Dt(t,e,i),i};var F=globalThis,q=F.ShadowRoot&&(F.ShadyCSS===void 0||F.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,J=Symbol(),pt=new WeakMap,P=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==J)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(q&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=pt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&pt.set(e,t))}return t}toString(){return this.cssText}},dt=r=>new P(typeof r=="string"?r:r+"",void 0,J),O=(r,...t)=>{let e=r.length===1?r[0]:t.reduce((s,i,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[n+1],r[0]);return new P(e,r,J)},ht=(r,t)=>{if(q)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),i=F.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},Y=q?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return dt(e)})(r):r;var{is:qt,defineProperty:Bt,getOwnPropertyDescriptor:Vt,getOwnPropertyNames:Wt,getOwnPropertySymbols:Gt,getPrototypeOf:Kt}=Object,B=globalThis,ut=B.trustedTypes,Jt=ut?ut.emptyScript:"",Yt=B.reactiveElementPolyfillSupport,U=(r,t)=>r,H={toAttribute(r,t){switch(t){case Boolean:r=r?Jt:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},V=(r,t)=>!qt(r,t),ft={attribute:!0,type:String,converter:H,reflect:!1,useDefault:!1,hasChanged:V};Symbol.metadata??=Symbol("metadata"),B.litPropertyMetadata??=new WeakMap;var b=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=ft){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Bt(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:n}=Vt(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){let a=i?.call(this);n?.call(this,o),this.requestUpdate(t,a,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ft}static _$Ei(){if(this.hasOwnProperty(U("elementProperties")))return;let t=Kt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(U("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(U("properties"))){let e=this.properties,s=[...Wt(e),...Gt(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(Y(i))}else t!==void 0&&e.push(Y(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ht(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let n=(s.converter?.toAttribute!==void 0?s.converter:H).toAttribute(e,s.type);this._$Em=t,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let n=s.getPropertyOptions(i),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:H;this._$Em=i;let a=o.fromAttribute(e,n.type);this[i]=a??this._$Ej?.get(i)??a,this._$Em=null}}requestUpdate(t,e,s,i=!1,n){if(t!==void 0){let o=this.constructor;if(i===!1&&(n=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??V)(n,e)||s.useDefault&&s.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:n},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),n!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,n]of this._$Ep)this[i]=n;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,n]of s){let{wrapped:o}=n,a=this[i];o!==!0||this._$AL.has(i)||a===void 0||this.C(i,void 0,n,a)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[U("elementProperties")]=new Map,b[U("finalized")]=new Map,Yt?.({ReactiveElement:b}),(B.reactiveElementVersions??=[]).push("2.1.2");var rt=globalThis,mt=r=>r,W=rt.trustedTypes,gt=W?W.createPolicy("lit-html",{createHTML:r=>r}):void 0,At="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,xt="?"+A,Zt=`<${xt}>`,k=document,M=()=>k.createComment(""),I=r=>r===null||typeof r!="object"&&typeof r!="function",it=Array.isArray,Qt=r=>it(r)||typeof r?.[Symbol.iterator]=="function",Z=`[ 	
\f\r]`,L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,yt=/-->/g,vt=/>/g,w=RegExp(`>|${Z}(?:([^\\s"'>=/]+)(${Z}*=${Z}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),_t=/'/g,$t=/"/g,Et=/^(?:script|style|textarea|title)$/i,nt=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),u=nt(1),me=nt(2),ge=nt(3),C=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),bt=new WeakMap,S=k.createTreeWalker(k,129);function wt(r,t){if(!it(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return gt!==void 0?gt.createHTML(t):t}var Xt=(r,t)=>{let e=r.length-1,s=[],i,n=t===2?"<svg>":t===3?"<math>":"",o=L;for(let a=0;a<e;a++){let l=r[a],p,h,c=-1,f=0;for(;f<l.length&&(o.lastIndex=f,h=o.exec(l),h!==null);)f=o.lastIndex,o===L?h[1]==="!--"?o=yt:h[1]!==void 0?o=vt:h[2]!==void 0?(Et.test(h[2])&&(i=RegExp("</"+h[2],"g")),o=w):h[3]!==void 0&&(o=w):o===w?h[0]===">"?(o=i??L,c=-1):h[1]===void 0?c=-2:(c=o.lastIndex-h[2].length,p=h[1],o=h[3]===void 0?w:h[3]==='"'?$t:_t):o===$t||o===_t?o=w:o===yt||o===vt?o=L:(o=w,i=void 0);let d=o===w&&r[a+1].startsWith("/>")?" ":"";n+=o===L?l+Zt:c>=0?(s.push(p),l.slice(0,c)+At+l.slice(c)+A+d):l+A+(c===-2?a:d)}return[wt(r,n+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},z=class r{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0,a=t.length-1,l=this.parts,[p,h]=Xt(t,e);if(this.el=r.createElement(p,s),S.currentNode=this.el.content,e===2||e===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(i=S.nextNode())!==null&&l.length<a;){if(i.nodeType===1){if(i.hasAttributes())for(let c of i.getAttributeNames())if(c.endsWith(At)){let f=h[o++],d=i.getAttribute(c).split(A),y=/([.?@])?(.*)/.exec(f);l.push({type:1,index:n,name:y[2],strings:d,ctor:y[1]==="."?X:y[1]==="?"?tt:y[1]==="@"?et:T}),i.removeAttribute(c)}else c.startsWith(A)&&(l.push({type:6,index:n}),i.removeAttribute(c));if(Et.test(i.tagName)){let c=i.textContent.split(A),f=c.length-1;if(f>0){i.textContent=W?W.emptyScript:"";for(let d=0;d<f;d++)i.append(c[d],M()),S.nextNode(),l.push({type:2,index:++n});i.append(c[f],M())}}}else if(i.nodeType===8)if(i.data===xt)l.push({type:2,index:n});else{let c=-1;for(;(c=i.data.indexOf(A,c+1))!==-1;)l.push({type:7,index:n}),c+=A.length-1}n++}}static createElement(t,e){let s=k.createElement("template");return s.innerHTML=t,s}};function R(r,t,e=r,s){if(t===C)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl,n=I(t)?void 0:t._$litDirective$;return i?.constructor!==n&&(i?._$AO?.(!1),n===void 0?i=void 0:(i=new n(r),i._$AT(r,e,s)),s!==void 0?(e._$Co??=[])[s]=i:e._$Cl=i),i!==void 0&&(t=R(r,i._$AS(r,t.values),i,s)),t}var Q=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??k).importNode(e,!0);S.currentNode=i;let n=S.nextNode(),o=0,a=0,l=s[0];for(;l!==void 0;){if(o===l.index){let p;l.type===2?p=new j(n,n.nextSibling,this,t):l.type===1?p=new l.ctor(n,l.name,l.strings,this,t):l.type===6&&(p=new st(n,this,t)),this._$AV.push(p),l=s[++a]}o!==l?.index&&(n=S.nextNode(),o++)}return S.currentNode=k,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},j=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=R(this,t,e),I(t)?t===m||t==null||t===""?(this._$AH!==m&&this._$AR(),this._$AH=m):t!==this._$AH&&t!==C&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Qt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==m&&I(this._$AH)?this._$AA.nextSibling.data=t:this.T(k.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=z.createElement(wt(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{let n=new Q(i,this),o=n.u(this.options);n.p(e),this.T(o),this._$AH=n}}_$AC(t){let e=bt.get(t.strings);return e===void 0&&bt.set(t.strings,e=new z(t)),e}k(t){it(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let n of t)i===e.length?e.push(s=new r(this.O(M()),this.O(M()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=mt(t).nextSibling;mt(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},T=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=m,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=m}_$AI(t,e=this,s,i){let n=this.strings,o=!1;if(n===void 0)t=R(this,t,e,0),o=!I(t)||t!==this._$AH&&t!==C,o&&(this._$AH=t);else{let a=t,l,p;for(t=n[0],l=0;l<n.length-1;l++)p=R(this,a[s+l],e,l),p===C&&(p=this._$AH[l]),o||=!I(p)||p!==this._$AH[l],p===m?t=m:t!==m&&(t+=(p??"")+n[l+1]),this._$AH[l]=p}o&&!i&&this.j(t)}j(t){t===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},X=class extends T{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===m?void 0:t}},tt=class extends T{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==m)}},et=class extends T{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=R(this,t,e,0)??m)===C)return;let s=this._$AH,i=t===m&&s!==m||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==m&&(s===m||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},st=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){R(this,t)}};var te=rt.litHtmlPolyfillSupport;te?.(z,j),(rt.litHtmlVersions??=[]).push("3.3.3");var St=(r,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let n=e?.renderBefore??null;s._$litPart$=i=new j(t.insertBefore(M(),n),n,void 0,e??{})}return i._$AI(r),i};var ot=globalThis,_=class extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=St(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return C}};_._$litElement$=!0,_.finalized=!0,ot.litElementHydrateSupport?.({LitElement:_});var ee=ot.litElementPolyfillSupport;ee?.({LitElement:_});(ot.litElementVersions??=[]).push("4.2.2");var G=r=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(r,t)}):customElements.define(r,t)};var se={attribute:!0,type:String,converter:H,reflect:!1,hasChanged:V},re=(r=se,t,e)=>{let{kind:s,metadata:i}=e,n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),s==="setter"&&((r=Object.create(r)).wrapped=!0),n.set(e.name,r),s==="accessor"){let{name:o}=e;return{set(a){let l=t.get.call(this);t.set.call(this,a),this.requestUpdate(o,l,r,!0,a)},init(a){return a!==void 0&&this.C(o,void 0,r,a),a}}}if(s==="setter"){let{name:o}=e;return function(a){let l=this[o];t.call(this,a),this.requestUpdate(o,l,r,!0,a)}}throw Error("Unsupported decorator location: "+s)};function N(r){return(t,e)=>typeof e=="object"?re(r,t,e):((s,i,n)=>{let o=i.hasOwnProperty(n);return i.constructor.createProperty(n,s),o?Object.getOwnPropertyDescriptor(i,n):void 0})(r,t,e)}function $(r){return N({...r,state:!0,attribute:!1})}var ie=/^(and|or|not)$/;function ne(r){return/[A-Za-z0-9_.\]]/.test(r)}function kt(r){let t=[],e=0,s=-1,i="",n=a=>{let l=i.trim();l.length>0&&t.push({type:"ATOM",value:l,start:s,end:a}),i="",s=-1},o=(a,l)=>{i.length===0&&(s=l),i+=a};for(;e<r.length;){let a=r[e];if(a==="'"||a==='"'){let h=a,c=e+1,f=a;for(;c<r.length&&r[c]!==h;){if(r[c]==="\\"&&c+1<r.length){f+=r[c]+r[c+1],c+=2;continue}f+=r[c],c+=1}c<r.length&&(f+=r[c],c+=1),i.length===0&&(s=e),i+=f,e=c;continue}if(a==="("){let h=i.length>0?i[i.length-1]:"";if(ne(h)){let f=1,d=e+1,y="(";for(;d<r.length&&f>0;){let E=r[d];if(E==="'"||E==='"'){let jt=E;for(y+=E,d+=1;d<r.length&&r[d]!==jt;){if(r[d]==="\\"&&d+1<r.length){y+=r[d]+r[d+1],d+=2;continue}y+=r[d],d+=1}d<r.length&&(y+=r[d],d+=1);continue}E==="("&&(f+=1),E===")"&&(f-=1),y+=E,d+=1}i+=y,e=d;continue}else{n(e),t.push({type:"LPAREN",value:"(",start:e,end:e+1}),e+=1;continue}}if(a===")"){n(e),t.push({type:"RPAREN",value:")",start:e,end:e+1}),e+=1;continue}if(/\s/.test(a)){if(e+=1,i.length===0)continue;o(" ",e-1);continue}o(a,e),e+=1;let l=r[e]??"";if(e>=r.length||/[\s()]/.test(l)){let h=i.trim().split(/\s+/),c=h[h.length-1];if(ie.test(c)){let f=i.length-c.length,d=i.slice(0,f).trim();d.length>0&&t.push({type:"ATOM",value:d,start:s,end:e-c.length});let y=c.toUpperCase();t.push({type:y,value:c,start:e-c.length,end:e}),i="",s=-1}}}return n(r.length),t.push({type:"EOF",value:"",start:r.length,end:r.length}),t}var at=class{constructor(t){this.pos=0;this.src=t,this.tokens=kt(t)}peek(){return this.tokens[this.pos]}advance(){return this.tokens[this.pos++]}sourceBetween(t,e){return this.src.slice(t.start,e.end).trim()}parse(){let t=this.parseOr();if(this.peek().type!=="EOF")throw new Error(`Unexpected token '${this.peek().value}' at position ${this.peek().start}`);return t}parseOr(){let t=this.peek(),e=[this.parseAnd()];for(;this.peek().type==="OR";)this.advance(),e.push(this.parseAnd());if(e.length===1)return e[0];let s=this.tokens[this.pos-1];return{kind:"OR",source:this.sourceBetween(t,s),children:e}}parseAnd(){let t=this.peek(),e=[this.parseNot()];for(;this.peek().type==="AND";)this.advance(),e.push(this.parseNot());if(e.length===1)return e[0];let s=this.tokens[this.pos-1];return{kind:"AND",source:this.sourceBetween(t,s),children:e}}parseNot(){if(this.peek().type==="NOT"){let t=this.advance(),e=this.parseNot();return{kind:"NOT",source:`not ${e.source}`,children:[e]}}return this.parsePrimary()}parsePrimary(){let t=this.peek();if(t.type==="LPAREN"){this.advance();let e=this.parseOr(),s=this.peek();if(s.type!=="RPAREN")throw new Error(`Expected ')' at position ${s.start}`);return this.advance(),e}if(t.type==="ATOM")return this.advance(),{kind:"LEAF",source:t.value};throw new Error(`Unexpected token '${t.value}' at position ${t.start}`)}};function oe(r){let t=r.trim(),e=t.match(/^\{\{\s*([\s\S]*?)\s*\}\}$/);return e?e[1].trim():t}function Ct(r){let t=oe(r);try{return{ast:new at(t).parse(),fallback:!1}}catch{return{ast:{kind:"LEAF",source:t},fallback:!0}}}var ae=/\b(states|is_state|state_attr|is_state_attr)\(\s*(['"])((?:\\.|(?!\2).)*)\2\s*(?:,\s*(['"])((?:\\.|(?!\4).)*)\4\s*)?(?:,\s*(['"])((?:\\.|(?!\6).)*)\6\s*)?\)/g;function D(r){return r.replace(/\\(.)/g,"$1")}function Rt(r){let t=[],e=new RegExp(ae.source,"g"),s;for(;(s=e.exec(r))!==null;){let[i,n,,o,,a,,l]=s,p=D(o);n==="states"?t.push({raw:i,fn:"states",entityId:p}):n==="is_state"?t.push({raw:i,fn:"is_state",entityId:p,compareValue:a?D(a):void 0}):n==="state_attr"?t.push({raw:i,fn:"state_attr",entityId:p,attribute:a?D(a):void 0}):n==="is_state_attr"&&t.push({raw:i,fn:"is_state_attr",entityId:p,attribute:a?D(a):void 0,compareValue:l?D(l):void 0})}return t}function Tt(r){let t=new Map;for(let e of r){let s=`${e.entityId}\0${e.attribute??""}`,i=t.get(s);i||(i={entityId:e.entityId,attribute:e.attribute,usages:[]},t.set(s,i)),i.usages.push(e)}return Array.from(t.values()).sort((e,s)=>e.entityId===s.entityId?(e.attribute??"").localeCompare(s.attribute??""):e.entityId.localeCompare(s.entityId))}async function Nt(r,t,e,s){let i=`{{ (${t}) }}`;try{return await r.connection.subscribeMessage(n=>e(String(n?.result??"")),{type:"render_template",template:i})}catch(n){return s(n instanceof Error?n:new Error(String(n))),async()=>{}}}function Pt(r){let t=r.trim();if(t===""||t==="None"||t==="none"||t==="null"||t==="False"||t==="false"||t==="0")return!1;if(t==="True"||t==="true")return!0;let e=Number(t);return Number.isNaN(e)?t.length>0:e!==0}function Ot(r,t){if(r.kind==="LEAF"){t.push(r);return}for(let e of r.children??[])Ot(e,t)}function Ut(r,t){if(r.kind==="LEAF"){let i=t.get(r);return i.loading?{node:r,value:!1,loading:!0}:i.error!==void 0?{node:r,value:!1,error:i.error}:{node:r,value:Pt(i.rendered??""),rendered:i.rendered}}let e=(r.children??[]).map(i=>Ut(i,t)),s;return r.kind==="AND"?s=e.every(i=>i.value):r.kind==="OR"?s=e.some(i=>i.value):s=!e[0].value,{node:r,value:s,children:e}}async function Ht(r,t,e){let s=[];Ot(t,s);let i=new Map;for(let a of s)i.set(a,{loading:!0});let n=()=>e(Ut(t,i));n();let o=[];return await Promise.all(s.map(async a=>{let l=await Nt(r,a.source,p=>{i.set(a,{loading:!1,rendered:p}),n()},p=>{i.set(a,{loading:!1,error:p.message}),n()});o.push(l)})),{dispose:async()=>{await Promise.all(o.map(a=>a().catch(()=>{})))}}}async function lt(r){return r.callWS({type:"config/entity_registry/list"})}async function Lt(r,t){return(await lt(r)).find(s=>s.entity_id===t)}var Mt=["state","value_template"];async function It(r,t){let e=await Lt(r,t);if(!e)throw new Error(`No entity registry entry found for "${t}".`);if(e.platform!=="template")throw new Error(`"${t}" is not a Template entity (platform: "${e.platform}"). Only entities created via Settings > Devices & Services > Helpers > Template are supported.`);if(!e.config_entry_id)throw new Error(`"${t}" has no config entry - it's likely a YAML-defined template sensor, which this card doesn't support. Only UI-created Template Helpers are supported.`);let s=await r.callApi("POST","config/config_entries/options/flow",{handler:e.config_entry_id});try{let o=(s.data_schema??[]).find(a=>Mt.includes(a.name))?.description?.suggested_value;if(typeof o!="string"||o.trim()==="")throw new Error(`Couldn't find the template field in "${t}"'s configuration (looked for: ${Mt.join(", ")}).`);return o}finally{await r.callApi("DELETE",`config/config_entries/options/flow/${s.flow_id}`).catch(()=>{})}}function le(r){switch(r){case"AND":return"AND";case"OR":return"OR";case"NOT":return"NOT";default:return""}}function ct(r,t=0){let{node:e,value:s,rendered:i,error:n,loading:o}=r,a=o?"tpl-node--loading":n?"tpl-node--error":s?"tpl-node--true":"tpl-node--false";if(e.kind==="LEAF")return u`
      <div class="tpl-node ${a}" style="--depth: ${t}">
        <span class="tpl-node__badge">${o?"\u2026":n?"!":s?"\u2713":"\u2717"}</span>
        <code class="tpl-node__source">${e.source}</code>
        ${o?u`<span class="tpl-node__meta">loading…</span>`:n?u`<span class="tpl-node__meta tpl-node__meta--error">${n}</span>`:u`<span class="tpl-node__meta">→ ${i}</span>`}
      </div>
    `;let l=r.children??[];return u`
    <div class="tpl-node ${a} tpl-node--group" style="--depth: ${t}">
      <span class="tpl-node__badge">${s?"\u2713":"\u2717"}</span>
      <span class="tpl-node__op">${le(e.kind)}</span>
    </div>
    <div class="tpl-children">
      ${l.map(p=>ct(p,t+1))}
    </div>
  `}function ce(r){return r===void 0?"\u2014":r===null?"null":typeof r=="object"?JSON.stringify(r):String(r)}function zt(r,t){return r.length===0?u`<div class="tpl-refs-empty">No states()/is_state()/state_attr() references found.</div>`:u`
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
        ${r.map(e=>{let s=t[e.entityId],i=s===void 0,n=e.attribute?s?.attributes?.[e.attribute]:s?.state,o=Array.from(new Set(e.usages.map(a=>a.fn))).join(", ");return u`
            <tr class=${i?"tpl-refs__row--missing":""}>
              <td><code>${e.entityId}</code></td>
              <td>${e.attribute?u`<code>${e.attribute}</code>`:"\u2014"}</td>
              <td>${i?"entity not found":ce(n)}</td>
              <td class="tpl-refs__used-as">${o}</td>
            </tr>
          `})}
      </tbody>
    </table>
  `}var x=class extends _{constructor(){super(...arguments);this.entityFilter=e=>!this.templateEntityIds||this.templateEntityIds.size===0||this.templateEntityIds.has(e.entity_id)}setConfig(e){this.config=e}willUpdate(){this.hass&&!this.templateEntityIds&&this.loadTemplateEntities()}async loadTemplateEntities(){if(this.hass){this.templateEntityIds=new Set;try{let e=await lt(this.hass);this.templateEntityIds=new Set(e.filter(s=>s.platform==="template").map(s=>s.entity_id))}catch{this.templateEntityIds=new Set}}}emit(e){if(!this.config)return;let s={...this.config,...e};this.config=s,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:s}}))}render(){return this.config?u`
      <div class="form">
        <label>
          Title (optional)
          <input
            type="text"
            .value=${this.config.title??""}
            @change=${e=>this.emit({title:e.target.value})}
          />
        </label>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this.config.entity??""}
          .label=${"Template Helper entity"}
          .entityFilter=${this.entityFilter}
          @value-changed=${e=>this.emit({entity:e.detail.value})}
        ></ha-entity-picker>
        <p class="tpl-hint">
          Only entities created via Settings &rarr; Devices &amp; Services &rarr; Helpers &rarr; Template are
          supported. The card reads that helper's template definition directly, so it always stays in sync -
          nothing to paste or keep updated manually.
        </p>
      </div>
    `:u``}};x.styles=O`
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
  `,g([N({attribute:!1})],x.prototype,"hass",2),g([$()],x.prototype,"config",2),g([$()],x.prototype,"templateEntityIds",2),x=g([G("ha-template-editor-card-editor")],x);var v=class extends _{constructor(){super(...arguments);this.references=[];this.parseFallback=!1;this.setupGeneration=0}setConfig(e){if(!e?.entity)throw new Error('ha-template-editor-card: "entity" is required in the card config.');this.config=e}static getConfigElement(){return document.createElement("ha-template-editor-card-editor")}static getStubConfig(){return{type:"custom:ha-template-editor-card",entity:"binary_sensor.example_template_helper"}}willUpdate(){this.config&&this.hass&&this.config.entity!==this.subscribedEntity&&this.setupLiveTree()}async setupLiveTree(){if(!this.config||!this.hass)return;let e=this.config.entity;this.subscribedEntity=e;let s=++this.setupGeneration,i=this.liveHandle;this.liveHandle=void 0,this.tree=void 0,this.references=[],this.templateText=void 0,this.globalError=void 0,i&&i.dispose();try{let n=await It(this.hass,e);if(s!==this.setupGeneration)return;this.templateText=n,this.references=Tt(Rt(n));let{ast:o,fallback:a}=Ct(n);this.parseFallback=a;let l=await Ht(this.hass,o,p=>{s===this.setupGeneration&&(this.tree=p)});if(s!==this.setupGeneration){l.dispose();return}this.liveHandle=l}catch(n){if(s!==this.setupGeneration)return;this.globalError=n instanceof Error?n.message:String(n)}}disconnectedCallback(){super.disconnectedCallback(),this.setupGeneration++,this.liveHandle?.dispose(),this.liveHandle=void 0}render(){if(!this.config)return u``;let e=this.config.title??"Template logic",s=this.hass?.states?.[this.config.entity]?.state;return u`
      <ha-card header=${e}>
        <div class="card-content">
          ${this.globalError?u`<div class="tpl-error">${this.globalError}</div>`:u`
                ${this.parseFallback?u`<div class="tpl-warning">
                      Couldn't fully parse this template's boolean structure - showing it as a
                      single evaluated expression instead.
                    </div>`:""}
                <div class="tpl-summary">
                  <span>Entity state:</span> <b>${s??"unknown"}</b>
                </div>
                ${this.templateText?u`<details class="tpl-source">
                      <summary>Template source (live-synced from ${this.config.entity})</summary>
                      <pre>${this.templateText}</pre>
                    </details>`:""}
                ${this.tree?ct(this.tree):u`<div>Setting up live subscriptions…</div>`}
                <h4 class="tpl-refs-title">Referenced entities &amp; attributes</h4>
                ${zt(this.references,this.hass?.states??{})}
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
    .tpl-source {
      margin-bottom: 12px;
      font-size: 12px;
    }
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
  `,g([N({attribute:!1})],v.prototype,"hass",2),g([$()],v.prototype,"config",2),g([$()],v.prototype,"tree",2),g([$()],v.prototype,"references",2),g([$()],v.prototype,"parseFallback",2),g([$()],v.prototype,"globalError",2),g([$()],v.prototype,"templateText",2),v=g([G("ha-template-editor-card")],v);window.customCards=window.customCards||[];window.customCards.push({type:"ha-template-editor-card",name:"Template Logic Editor",description:"Visualizes a template sensor's boolean logic tree and shows which sub-conditions are true/false."});export{v as HaTemplateEditorCard};
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
