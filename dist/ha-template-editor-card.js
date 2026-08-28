var Mt=Object.defineProperty;var Lt=Object.getOwnPropertyDescriptor;var y=(n,t,e,s)=>{for(var r=s>1?void 0:s?Lt(t,e):t,i=n.length-1,o;i>=0;i--)(o=n[i])&&(r=(s?o(t,e,r):o(r))||r);return s&&r&&Mt(t,e,r),r};var q=globalThis,B=q.ShadowRoot&&(q.ShadyCSS===void 0||q.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Z=Symbol(),pt=new WeakMap,N=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==Z)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(B&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=pt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&pt.set(e,t))}return t}toString(){return this.cssText}},ht=n=>new N(typeof n=="string"?n:n+"",void 0,Z),O=(n,...t)=>{let e=n.length===1?n[0]:t.reduce((s,r,i)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+n[i+1],n[0]);return new N(e,n,Z)},dt=(n,t)=>{if(B)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),r=q.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=e.cssText,n.appendChild(s)}},Y=B?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return ht(e)})(n):n;var{is:Ht,defineProperty:It,getOwnPropertyDescriptor:zt,getOwnPropertyNames:jt,getOwnPropertySymbols:Dt,getPrototypeOf:qt}=Object,V=globalThis,ut=V.trustedTypes,Bt=ut?ut.emptyScript:"",Vt=V.reactiveElementPolyfillSupport,U=(n,t)=>n,M={toAttribute(n,t){switch(t){case Boolean:n=n?Bt:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},F=(n,t)=>!Ht(n,t),ft={attribute:!0,type:String,converter:M,reflect:!1,useDefault:!1,hasChanged:F};Symbol.metadata??=Symbol("metadata"),V.litPropertyMetadata??=new WeakMap;var v=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=ft){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),r=this.getPropertyDescriptor(t,s,e);r!==void 0&&It(this.prototype,t,r)}}static getPropertyDescriptor(t,e,s){let{get:r,set:i}=zt(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:r,set(o){let l=r?.call(this);i?.call(this,o),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ft}static _$Ei(){if(this.hasOwnProperty(U("elementProperties")))return;let t=qt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(U("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(U("properties"))){let e=this.properties,s=[...jt(e),...Dt(e)];for(let r of s)this.createProperty(r,e[r])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,r]of e)this.elementProperties.set(s,r)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let r=this._$Eu(e,s);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let r of s)e.unshift(Y(r))}else t!==void 0&&e.push(Y(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return dt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,s);if(r!==void 0&&s.reflect===!0){let i=(s.converter?.toAttribute!==void 0?s.converter:M).toAttribute(e,s.type);this._$Em=t,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(t,e){let s=this.constructor,r=s._$Eh.get(t);if(r!==void 0&&this._$Em!==r){let i=s.getPropertyOptions(r),o=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:M;this._$Em=r;let l=o.fromAttribute(e,i.type);this[r]=l??this._$Ej?.get(r)??l,this._$Em=null}}requestUpdate(t,e,s,r=!1,i){if(t!==void 0){let o=this.constructor;if(r===!1&&(i=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??F)(i,e)||s.useDefault&&s.reflect&&i===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:r,wrapped:i},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),i!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),r===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,i]of this._$Ep)this[r]=i;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[r,i]of s){let{wrapped:o}=i,l=this[r];o!==!0||this._$AL.has(r)||l===void 0||this.C(r,void 0,i,l)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};v.elementStyles=[],v.shadowRootOptions={mode:"open"},v[U("elementProperties")]=new Map,v[U("finalized")]=new Map,Vt?.({ReactiveElement:v}),(V.reactiveElementVersions??=[]).push("2.1.2");var rt=globalThis,mt=n=>n,W=rt.trustedTypes,gt=W?W.createPolicy("lit-html",{createHTML:n=>n}):void 0,At="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,xt="?"+A,Ft=`<${xt}>`,S=document,H=()=>S.createComment(""),I=n=>n===null||typeof n!="object"&&typeof n!="function",nt=Array.isArray,Wt=n=>nt(n)||typeof n?.[Symbol.iterator]=="function",G=`[ 	
\f\r]`,L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,yt=/-->/g,$t=/>/g,E=RegExp(`>|${G}(?:([^\\s"'>=/]+)(${G}*=${G}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),_t=/'/g,vt=/"/g,Et=/^(?:script|style|textarea|title)$/i,it=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),u=it(1),ce=it(2),pe=it(3),k=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),bt=new WeakMap,w=S.createTreeWalker(S,129);function wt(n,t){if(!nt(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return gt!==void 0?gt.createHTML(t):t}var Kt=(n,t)=>{let e=n.length-1,s=[],r,i=t===2?"<svg>":t===3?"<math>":"",o=L;for(let l=0;l<e;l++){let a=n[l],h,d,c=-1,f=0;for(;f<a.length&&(o.lastIndex=f,d=o.exec(a),d!==null);)f=o.lastIndex,o===L?d[1]==="!--"?o=yt:d[1]!==void 0?o=$t:d[2]!==void 0?(Et.test(d[2])&&(r=RegExp("</"+d[2],"g")),o=E):d[3]!==void 0&&(o=E):o===E?d[0]===">"?(o=r??L,c=-1):d[1]===void 0?c=-2:(c=o.lastIndex-d[2].length,h=d[1],o=d[3]===void 0?E:d[3]==='"'?vt:_t):o===vt||o===_t?o=E:o===yt||o===$t?o=L:(o=E,r=void 0);let p=o===E&&n[l+1].startsWith("/>")?" ":"";i+=o===L?a+Ft:c>=0?(s.push(h),a.slice(0,c)+At+a.slice(c)+A+p):a+A+(c===-2?l:p)}return[wt(n,i+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},z=class n{constructor({strings:t,_$litType$:e},s){let r;this.parts=[];let i=0,o=0,l=t.length-1,a=this.parts,[h,d]=Kt(t,e);if(this.el=n.createElement(h,s),w.currentNode=this.el.content,e===2||e===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(r=w.nextNode())!==null&&a.length<l;){if(r.nodeType===1){if(r.hasAttributes())for(let c of r.getAttributeNames())if(c.endsWith(At)){let f=d[o++],p=r.getAttribute(c).split(A),g=/([.?@])?(.*)/.exec(f);a.push({type:1,index:i,name:g[2],strings:p,ctor:g[1]==="."?X:g[1]==="?"?tt:g[1]==="@"?et:T}),r.removeAttribute(c)}else c.startsWith(A)&&(a.push({type:6,index:i}),r.removeAttribute(c));if(Et.test(r.tagName)){let c=r.textContent.split(A),f=c.length-1;if(f>0){r.textContent=W?W.emptyScript:"";for(let p=0;p<f;p++)r.append(c[p],H()),w.nextNode(),a.push({type:2,index:++i});r.append(c[f],H())}}}else if(r.nodeType===8)if(r.data===xt)a.push({type:2,index:i});else{let c=-1;for(;(c=r.data.indexOf(A,c+1))!==-1;)a.push({type:7,index:i}),c+=A.length-1}i++}}static createElement(t,e){let s=S.createElement("template");return s.innerHTML=t,s}};function R(n,t,e=n,s){if(t===k)return t;let r=s!==void 0?e._$Co?.[s]:e._$Cl,i=I(t)?void 0:t._$litDirective$;return r?.constructor!==i&&(r?._$AO?.(!1),i===void 0?r=void 0:(r=new i(n),r._$AT(n,e,s)),s!==void 0?(e._$Co??=[])[s]=r:e._$Cl=r),r!==void 0&&(t=R(n,r._$AS(n,t.values),r,s)),t}var Q=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,r=(t?.creationScope??S).importNode(e,!0);w.currentNode=r;let i=w.nextNode(),o=0,l=0,a=s[0];for(;a!==void 0;){if(o===a.index){let h;a.type===2?h=new j(i,i.nextSibling,this,t):a.type===1?h=new a.ctor(i,a.name,a.strings,this,t):a.type===6&&(h=new st(i,this,t)),this._$AV.push(h),a=s[++l]}o!==a?.index&&(i=w.nextNode(),o++)}return w.currentNode=S,r}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},j=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,r){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=R(this,t,e),I(t)?t===m||t==null||t===""?(this._$AH!==m&&this._$AR(),this._$AH=m):t!==this._$AH&&t!==k&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Wt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==m&&I(this._$AH)?this._$AA.nextSibling.data=t:this.T(S.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,r=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=z.createElement(wt(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===r)this._$AH.p(e);else{let i=new Q(r,this),o=i.u(this.options);i.p(e),this.T(o),this._$AH=i}}_$AC(t){let e=bt.get(t.strings);return e===void 0&&bt.set(t.strings,e=new z(t)),e}k(t){nt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,r=0;for(let i of t)r===e.length?e.push(s=new n(this.O(H()),this.O(H()),this,this.options)):s=e[r],s._$AI(i),r++;r<e.length&&(this._$AR(s&&s._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=mt(t).nextSibling;mt(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},T=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,r,i){this.type=1,this._$AH=m,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=i,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=m}_$AI(t,e=this,s,r){let i=this.strings,o=!1;if(i===void 0)t=R(this,t,e,0),o=!I(t)||t!==this._$AH&&t!==k,o&&(this._$AH=t);else{let l=t,a,h;for(t=i[0],a=0;a<i.length-1;a++)h=R(this,l[s+a],e,a),h===k&&(h=this._$AH[a]),o||=!I(h)||h!==this._$AH[a],h===m?t=m:t!==m&&(t+=(h??"")+i[a+1]),this._$AH[a]=h}o&&!r&&this.j(t)}j(t){t===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},X=class extends T{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===m?void 0:t}},tt=class extends T{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==m)}},et=class extends T{constructor(t,e,s,r,i){super(t,e,s,r,i),this.type=5}_$AI(t,e=this){if((t=R(this,t,e,0)??m)===k)return;let s=this._$AH,r=t===m&&s!==m||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,i=t!==m&&(s===m||r);r&&this.element.removeEventListener(this.name,this,s),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},st=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){R(this,t)}};var Jt=rt.litHtmlPolyfillSupport;Jt?.(z,j),(rt.litHtmlVersions??=[]).push("3.3.3");var St=(n,t,e)=>{let s=e?.renderBefore??t,r=s._$litPart$;if(r===void 0){let i=e?.renderBefore??null;s._$litPart$=r=new j(t.insertBefore(H(),i),i,void 0,e??{})}return r._$AI(n),r};var ot=globalThis,_=class extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=St(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return k}};_._$litElement$=!0,_.finalized=!0,ot.litElementHydrateSupport?.({LitElement:_});var Zt=ot.litElementPolyfillSupport;Zt?.({LitElement:_});(ot.litElementVersions??=[]).push("4.2.2");var K=n=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(n,t)}):customElements.define(n,t)};var Yt={attribute:!0,type:String,converter:M,reflect:!1,hasChanged:F},Gt=(n=Yt,t,e)=>{let{kind:s,metadata:r}=e,i=globalThis.litPropertyMetadata.get(r);if(i===void 0&&globalThis.litPropertyMetadata.set(r,i=new Map),s==="setter"&&((n=Object.create(n)).wrapped=!0),i.set(e.name,n),s==="accessor"){let{name:o}=e;return{set(l){let a=t.get.call(this);t.set.call(this,l),this.requestUpdate(o,a,n,!0,l)},init(l){return l!==void 0&&this.C(o,void 0,n,l),l}}}if(s==="setter"){let{name:o}=e;return function(l){let a=this[o];t.call(this,l),this.requestUpdate(o,a,n,!0,l)}}throw Error("Unsupported decorator location: "+s)};function P(n){return(t,e)=>typeof e=="object"?Gt(n,t,e):((s,r,i)=>{let o=r.hasOwnProperty(i);return r.constructor.createProperty(i,s),o?Object.getOwnPropertyDescriptor(r,i):void 0})(n,t,e)}function b(n){return P({...n,state:!0,attribute:!1})}var Qt=/^(and|or|not)$/;function Xt(n){return/[A-Za-z0-9_.\]]/.test(n)}function kt(n){let t=[],e=0,s=-1,r="",i=l=>{let a=r.trim();a.length>0&&t.push({type:"ATOM",value:a,start:s,end:l}),r="",s=-1},o=(l,a)=>{r.length===0&&(s=a),r+=l};for(;e<n.length;){let l=n[e];if(l==="'"||l==='"'){let d=l,c=e+1,f=l;for(;c<n.length&&n[c]!==d;){if(n[c]==="\\"&&c+1<n.length){f+=n[c]+n[c+1],c+=2;continue}f+=n[c],c+=1}c<n.length&&(f+=n[c],c+=1),r.length===0&&(s=e),r+=f,e=c;continue}if(l==="("){let d=r.length>0?r[r.length-1]:"";if(Xt(d)){let f=1,p=e+1,g="(";for(;p<n.length&&f>0;){let x=n[p];if(x==="'"||x==='"'){let Ut=x;for(g+=x,p+=1;p<n.length&&n[p]!==Ut;){if(n[p]==="\\"&&p+1<n.length){g+=n[p]+n[p+1],p+=2;continue}g+=n[p],p+=1}p<n.length&&(g+=n[p],p+=1);continue}x==="("&&(f+=1),x===")"&&(f-=1),g+=x,p+=1}r+=g,e=p;continue}else{i(e),t.push({type:"LPAREN",value:"(",start:e,end:e+1}),e+=1;continue}}if(l===")"){i(e),t.push({type:"RPAREN",value:")",start:e,end:e+1}),e+=1;continue}if(/\s/.test(l)){if(e+=1,r.length===0)continue;o(" ",e-1);continue}o(l,e),e+=1;let a=n[e]??"";if(e>=n.length||/[\s()]/.test(a)){let d=r.trim().split(/\s+/),c=d[d.length-1];if(Qt.test(c)){let f=r.length-c.length,p=r.slice(0,f).trim();p.length>0&&t.push({type:"ATOM",value:p,start:s,end:e-c.length});let g=c.toUpperCase();t.push({type:g,value:c,start:e-c.length,end:e}),r="",s=-1}}}return i(n.length),t.push({type:"EOF",value:"",start:n.length,end:n.length}),t}var at=class{constructor(t){this.pos=0;this.src=t,this.tokens=kt(t)}peek(){return this.tokens[this.pos]}advance(){return this.tokens[this.pos++]}sourceBetween(t,e){return this.src.slice(t.start,e.end).trim()}parse(){let t=this.parseOr();if(this.peek().type!=="EOF")throw new Error(`Unexpected token '${this.peek().value}' at position ${this.peek().start}`);return t}parseOr(){let t=this.peek(),e=[this.parseAnd()];for(;this.peek().type==="OR";)this.advance(),e.push(this.parseAnd());if(e.length===1)return e[0];let s=this.tokens[this.pos-1];return{kind:"OR",source:this.sourceBetween(t,s),children:e}}parseAnd(){let t=this.peek(),e=[this.parseNot()];for(;this.peek().type==="AND";)this.advance(),e.push(this.parseNot());if(e.length===1)return e[0];let s=this.tokens[this.pos-1];return{kind:"AND",source:this.sourceBetween(t,s),children:e}}parseNot(){if(this.peek().type==="NOT"){let t=this.advance(),e=this.parseNot();return{kind:"NOT",source:`not ${e.source}`,children:[e]}}return this.parsePrimary()}parsePrimary(){let t=this.peek();if(t.type==="LPAREN"){this.advance();let e=this.parseOr(),s=this.peek();if(s.type!=="RPAREN")throw new Error(`Expected ')' at position ${s.start}`);return this.advance(),e}if(t.type==="ATOM")return this.advance(),{kind:"LEAF",source:t.value};throw new Error(`Unexpected token '${t.value}' at position ${t.start}`)}};function te(n){let t=n.trim(),e=t.match(/^\{\{\s*([\s\S]*?)\s*\}\}$/);return e?e[1].trim():t}function Ct(n){let t=te(n);try{return{ast:new at(t).parse(),fallback:!1}}catch{return{ast:{kind:"LEAF",source:t},fallback:!0}}}var ee=/\b(states|is_state|state_attr|is_state_attr)\(\s*(['"])((?:\\.|(?!\2).)*)\2\s*(?:,\s*(['"])((?:\\.|(?!\4).)*)\4\s*)?(?:,\s*(['"])((?:\\.|(?!\6).)*)\6\s*)?\)/g;function D(n){return n.replace(/\\(.)/g,"$1")}function Rt(n){let t=[],e=new RegExp(ee.source,"g"),s;for(;(s=e.exec(n))!==null;){let[r,i,,o,,l,,a]=s,h=D(o);i==="states"?t.push({raw:r,fn:"states",entityId:h}):i==="is_state"?t.push({raw:r,fn:"is_state",entityId:h,compareValue:l?D(l):void 0}):i==="state_attr"?t.push({raw:r,fn:"state_attr",entityId:h,attribute:l?D(l):void 0}):i==="is_state_attr"&&t.push({raw:r,fn:"is_state_attr",entityId:h,attribute:l?D(l):void 0,compareValue:a?D(a):void 0})}return t}function Tt(n){let t=new Map;for(let e of n){let s=`${e.entityId}\0${e.attribute??""}`,r=t.get(s);r||(r={entityId:e.entityId,attribute:e.attribute,usages:[]},t.set(s,r)),r.usages.push(e)}return Array.from(t.values()).sort((e,s)=>e.entityId===s.entityId?(e.attribute??"").localeCompare(s.attribute??""):e.entityId.localeCompare(s.entityId))}async function Pt(n,t){let e=`{{ (${t}) }}`;return new Promise((s,r)=>{let i,o=!1,l=setTimeout(()=>{o||(o=!0,i?.().catch(()=>{}),r(new Error("Template render timed out")))},8e3);n.connection.subscribeMessage(a=>{o||(o=!0,clearTimeout(l),s(String(a?.result??"")),i?.().catch(()=>{}))},{type:"render_template",template:e}).then(a=>{i=a,o&&i().catch(()=>{})}).catch(a=>{o||(o=!0,clearTimeout(l),r(a instanceof Error?a:new Error(String(a))))})})}function Nt(n){let t=n.trim();if(t===""||t==="None"||t==="none"||t==="null"||t==="False"||t==="false"||t==="0")return!1;if(t==="True"||t==="true")return!0;let e=Number(t);return Number.isNaN(e)?t.length>0:e!==0}async function lt(n,t){if(t.kind==="LEAF")try{let r=await Pt(n,t.source);return{node:t,value:Nt(r),rendered:r}}catch(r){return{node:t,value:!1,error:r instanceof Error?r.message:String(r)}}let e=await Promise.all((t.children??[]).map(r=>lt(n,r))),s;return t.kind==="AND"?s=e.every(r=>r.value):t.kind==="OR"?s=e.some(r=>r.value):s=!e[0].value,{node:t,value:s,children:e}}function se(n){switch(n){case"AND":return"AND";case"OR":return"OR";case"NOT":return"NOT";default:return""}}function ct(n,t=0){let{node:e,value:s,rendered:r,error:i}=n,o=i?"tpl-node--error":s?"tpl-node--true":"tpl-node--false";if(e.kind==="LEAF")return u`
      <div class="tpl-node ${o}" style="--depth: ${t}">
        <span class="tpl-node__badge">${i?"!":s?"\u2713":"\u2717"}</span>
        <code class="tpl-node__source">${e.source}</code>
        ${i?u`<span class="tpl-node__meta tpl-node__meta--error">${i}</span>`:u`<span class="tpl-node__meta">→ ${r}</span>`}
      </div>
    `;let l=n.children??[];return u`
    <div class="tpl-node ${o} tpl-node--group" style="--depth: ${t}">
      <span class="tpl-node__badge">${s?"\u2713":"\u2717"}</span>
      <span class="tpl-node__op">${se(e.kind)}</span>
    </div>
    <div class="tpl-children">
      ${l.map(a=>ct(a,t+1))}
    </div>
  `}function re(n){return n===void 0?"\u2014":n===null?"null":typeof n=="object"?JSON.stringify(n):String(n)}function Ot(n,t){return n.length===0?u`<div class="tpl-refs-empty">No states()/is_state()/state_attr() references found.</div>`:u`
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
        ${n.map(e=>{let s=t[e.entityId],r=s===void 0,i=e.attribute?s?.attributes?.[e.attribute]:s?.state,o=Array.from(new Set(e.usages.map(l=>l.fn))).join(", ");return u`
            <tr class=${r?"tpl-refs__row--missing":""}>
              <td><code>${e.entityId}</code></td>
              <td>${e.attribute?u`<code>${e.attribute}</code>`:"\u2014"}</td>
              <td>${r?"entity not found":re(i)}</td>
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
  `,y([P({attribute:!1})],C.prototype,"hass",2),y([b()],C.prototype,"config",2),C=y([K("ha-template-editor-card-editor")],C);var $=class extends _{constructor(){super(...arguments);this.references=[];this.loading=!1;this.parseFallback=!1}setConfig(e){if(!e?.template)throw new Error('ha-template-editor-card: "template" is required in the card config.');this.config=e}static getConfigElement(){return document.createElement("ha-template-editor-card-editor")}static getStubConfig(){return{type:"custom:ha-template-editor-card",template:"{{ is_state('binary_sensor.front_door', 'on') and states('sensor.mode') == 'home' }}"}}willUpdate(e){e.has("config")&&this.config&&(this.references=Tt(Rt(this.config.template)),this.refresh())}async refresh(){if(!(!this.config||!this.hass)){this.loading=!0,this.globalError=void 0;try{let{ast:e,fallback:s}=Ct(this.config.template);this.parseFallback=s,this.tree=await lt(this.hass,e)}catch(e){this.globalError=e instanceof Error?e.message:String(e)}finally{this.loading=!1}}}updated(e){e.has("hass")&&!this.refreshTimer&&(this.refreshTimer=setInterval(()=>void this.refresh(),1e4))}disconnectedCallback(){super.disconnectedCallback(),this.refreshTimer&&clearInterval(this.refreshTimer)}render(){if(!this.config)return u``;let e=this.config.title??"Template logic",s=this.config.entity?this.hass?.states?.[this.config.entity]?.state:void 0;return u`
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
                ${this.tree?ct(this.tree):u`<div>Loading…</div>`}
                ${this.loading?u`<div class="tpl-loading">Refreshing…</div>`:""}
                <h4 class="tpl-refs-title">Referenced entities &amp; attributes</h4>
                ${Ot(this.references,this.hass?.states??{})}
              `}
        </div>
      </ha-card>
    `}};$.styles=O`
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
  `,y([P({attribute:!1})],$.prototype,"hass",2),y([b()],$.prototype,"config",2),y([b()],$.prototype,"tree",2),y([b()],$.prototype,"references",2),y([b()],$.prototype,"loading",2),y([b()],$.prototype,"parseFallback",2),y([b()],$.prototype,"globalError",2),$=y([K("ha-template-editor-card")],$);window.customCards=window.customCards||[];window.customCards.push({type:"ha-template-editor-card",name:"Template Logic Editor",description:"Visualizes a template sensor's boolean logic tree and shows which sub-conditions are true/false."});export{$ as HaTemplateEditorCard};
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
