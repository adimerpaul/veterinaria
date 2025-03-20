import{j as D,k,l as P,m as se,b1 as Te,L as re,g as O,O as ce,b2 as Ce,r as p,ar as de,J as fe,x as Se,b3 as Me,G as J,E as Z,U as He,s as H,V as pe,v as Q,z as We,a6 as K,b4 as ee,A as Be,b5 as Pe,K as Le,a4 as Ae,ay as Re,M as ze,at as $e,P as Fe,az as _e,R as Ke,aA as je,b6 as De,b7 as te,b8 as Oe,F as Qe,b9 as Ie,a5 as Ve,ba as Ne,bb as Ue,av as Xe,aC as Ye}from"./index-Bxzzzh3w.js";const st=D({name:"QItemSection",props:{avatar:Boolean,thumbnail:Boolean,side:Boolean,top:Boolean,noWrap:Boolean},setup(e,{slots:t}){const l=k(()=>`q-item__section column q-item__section--${e.avatar===!0||e.side===!0||e.thumbnail===!0?"side":"main"}`+(e.top===!0?" q-item__section--top justify-start":" justify-center")+(e.avatar===!0?" q-item__section--avatar":"")+(e.thumbnail===!0?" q-item__section--thumbnail":"")+(e.noWrap===!0?" q-item__section--nowrap":""));return()=>P("div",{class:l.value},se(t.default))}}),rt=D({name:"QItem",props:{...re,...Te,tag:{type:String,default:"div"},active:{type:Boolean,default:null},clickable:Boolean,dense:Boolean,insetLevel:Number,tabindex:[String,Number],focused:Boolean,manualFocus:Boolean},emits:["click","keyup"],setup(e,{slots:t,emit:l}){const{proxy:{$q:n}}=O(),o=ce(e,n),{hasLink:d,linkAttrs:a,linkClass:v,linkTag:h,navigateOnClick:c}=Ce(),f=p(null),m=p(null),b=k(()=>e.clickable===!0||d.value===!0||e.tag==="label"),i=k(()=>e.disable!==!0&&b.value===!0),s=k(()=>"q-item q-item-type row no-wrap"+(e.dense===!0?" q-item--dense":"")+(o.value===!0?" q-item--dark":"")+(d.value===!0&&e.active===null?v.value:e.active===!0?` q-item--active${e.activeClass!==void 0?` ${e.activeClass}`:""}`:"")+(e.disable===!0?" disabled":"")+(i.value===!0?" q-item--clickable q-link cursor-pointer "+(e.manualFocus===!0?"q-manual-focusable":"q-focusable q-hoverable")+(e.focused===!0?" q-manual-focusable--focused":""):"")),C=k(()=>e.insetLevel===void 0?null:{["padding"+(n.lang.rtl===!0?"Right":"Left")]:16+e.insetLevel*56+"px"});function w(r){i.value===!0&&(m.value!==null&&(r.qKeyEvent!==!0&&document.activeElement===f.value?m.value.focus():document.activeElement===m.value&&f.value.focus()),c(r))}function S(r){if(i.value===!0&&de(r,[13,32])===!0){fe(r),r.qKeyEvent=!0;const x=new MouseEvent("click",r);x.qKeyEvent=!0,f.value.dispatchEvent(x)}l("keyup",r)}function W(){const r=Se(t.default,[]);return i.value===!0&&r.unshift(P("div",{class:"q-focus-helper",tabindex:-1,ref:m})),r}return()=>{const r={ref:f,class:s.value,style:C.value,role:"listitem",onClick:w,onKeyup:S};return i.value===!0?(r.tabindex=e.tabindex||"0",Object.assign(r,a.value)):b.value===!0&&(r["aria-disabled"]="true"),P(h.value,r,W())}}});function Ge(){if(window.getSelection!==void 0){const e=window.getSelection();e.empty!==void 0?e.empty():e.removeAllRanges!==void 0&&(e.removeAllRanges(),Me.is.mobile!==!0&&e.addRange(document.createRange()))}else document.selection!==void 0&&document.selection.empty()}const Je={target:{type:[Boolean,String,Element],default:!0},noParentEvent:Boolean},Ze={...Je,contextMenu:Boolean};function et({showing:e,avoidEmit:t,configureAnchorEl:l}){const{props:n,proxy:o,emit:d}=O(),a=p(null);let v=null;function h(i){return a.value===null?!1:i===void 0||i.touches===void 0||i.touches.length<=1}const c={};l===void 0&&(Object.assign(c,{hide(i){o.hide(i)},toggle(i){o.toggle(i),i.qAnchorHandled=!0},toggleKey(i){de(i,13)===!0&&c.toggle(i)},contextClick(i){o.hide(i),J(i),He(()=>{o.show(i),i.qAnchorHandled=!0})},prevent:J,mobileTouch(i){if(c.mobileCleanup(i),h(i)!==!0)return;o.hide(i),a.value.classList.add("non-selectable");const s=i.target;Z(c,"anchor",[[s,"touchmove","mobileCleanup","passive"],[s,"touchend","mobileCleanup","passive"],[s,"touchcancel","mobileCleanup","passive"],[a.value,"contextmenu","prevent","notPassive"]]),v=setTimeout(()=>{v=null,o.show(i),i.qAnchorHandled=!0},300)},mobileCleanup(i){a.value.classList.remove("non-selectable"),v!==null&&(clearTimeout(v),v=null),e.value===!0&&i!==void 0&&Ge()}}),l=function(i=n.contextMenu){if(n.noParentEvent===!0||a.value===null)return;let s;i===!0?o.$q.platform.is.mobile===!0?s=[[a.value,"touchstart","mobileTouch","passive"]]:s=[[a.value,"mousedown","hide","passive"],[a.value,"contextmenu","contextClick","notPassive"]]:s=[[a.value,"click","toggle","passive"],[a.value,"keyup","toggleKey","passive"]],Z(c,"anchor",s)});function f(){We(c,"anchor")}function m(i){for(a.value=i;a.value.classList.contains("q-anchor--skip");)a.value=a.value.parentNode;l()}function b(){if(n.target===!1||n.target===""||o.$el.parentNode===null)a.value=null;else if(n.target===!0)m(o.$el.parentNode);else{let i=n.target;if(typeof n.target=="string")try{i=document.querySelector(n.target)}catch{i=void 0}i!=null?(a.value=i.$el||i,l()):(a.value=null,console.error(`Anchor: target "${n.target}" not found`))}}return H(()=>n.contextMenu,i=>{a.value!==null&&(f(),l(i))}),H(()=>n.target,()=>{a.value!==null&&f(),b()}),H(()=>n.noParentEvent,i=>{a.value!==null&&(i===!0?f():l())}),pe(()=>{b(),t!==!0&&n.modelValue===!0&&a.value===null&&d("update:modelValue",!1)}),Q(()=>{v!==null&&clearTimeout(v),f()}),{anchorEl:a,canShow:h,anchorEvents:c}}function tt(e,t){const l=p(null);let n;function o(v,h){const c=`${h!==void 0?"add":"remove"}EventListener`,f=h!==void 0?h:n;v!==window&&v[c]("scroll",f,K.passive),window[c]("scroll",f,K.passive),n=h}function d(){l.value!==null&&(o(l.value),l.value=null)}const a=H(()=>e.noParentEvent,()=>{l.value!==null&&(d(),t())});return Q(a),{localScrollTarget:l,unconfigureScrollTarget:d,changeScrollEvent:o}}const{notPassiveCapture:L}=K,T=[];function A(e){const t=e.target;if(t===void 0||t.nodeType===8||t.classList.contains("no-pointer-events")===!0)return;let l=ee.length-1;for(;l>=0;){const n=ee[l].$;if(n.type.name==="QTooltip"){l--;continue}if(n.type.name!=="QDialog")break;if(n.props.seamless!==!0)return;l--}for(let n=T.length-1;n>=0;n--){const o=T[n];if((o.anchorEl.value===null||o.anchorEl.value.contains(t)===!1)&&(t===document.body||o.innerRef.value!==null&&o.innerRef.value.contains(t)===!1))e.qClickOutside=!0,o.onClickOutside(e);else return}}function nt(e){T.push(e),T.length===1&&(document.addEventListener("mousedown",A,L),document.addEventListener("touchstart",A,L))}function ne(e){const t=T.findIndex(l=>l===e);t!==-1&&(T.splice(t,1),T.length===0&&(document.removeEventListener("mousedown",A,L),document.removeEventListener("touchstart",A,L)))}let le,oe;function ie(e){const t=e.split(" ");return t.length!==2?!1:["top","center","bottom"].includes(t[0])!==!0?(console.error("Anchor/Self position must start with one of top/center/bottom"),!1):["left","middle","right","start","end"].includes(t[1])!==!0?(console.error("Anchor/Self position must end with one of left/middle/right/start/end"),!1):!0}function lt(e){return e?!(e.length!==2||typeof e[0]!="number"||typeof e[1]!="number"):!0}const j={"start#ltr":"left","start#rtl":"right","end#ltr":"right","end#rtl":"left"};["left","middle","right"].forEach(e=>{j[`${e}#ltr`]=e,j[`${e}#rtl`]=e});function ae(e,t){const l=e.split(" ");return{vertical:l[0],horizontal:j[`${l[1]}#${t===!0?"rtl":"ltr"}`]}}function ot(e,t){let{top:l,left:n,right:o,bottom:d,width:a,height:v}=e.getBoundingClientRect();return t!==void 0&&(l-=t[1],n-=t[0],d+=t[1],o+=t[0],a+=t[0],v+=t[1]),{top:l,bottom:d,height:v,left:n,right:o,width:a,middle:n+(o-n)/2,center:l+(d-l)/2}}function it(e,t,l){let{top:n,left:o}=e.getBoundingClientRect();return n+=t.top,o+=t.left,l!==void 0&&(n+=l[1],o+=l[0]),{top:n,bottom:n+1,height:1,left:o,right:o+1,width:1,middle:o,center:n}}function at(e,t){return{top:0,center:t/2,bottom:t,left:0,middle:e/2,right:e}}function ue(e,t,l,n){return{top:e[l.vertical]-t[n.vertical],left:e[l.horizontal]-t[n.horizontal]}}function ve(e,t=0){if(e.targetEl===null||e.anchorEl===null||t>5)return;if(e.targetEl.offsetHeight===0||e.targetEl.offsetWidth===0){setTimeout(()=>{ve(e,t+1)},10);return}const{targetEl:l,offset:n,anchorEl:o,anchorOrigin:d,selfOrigin:a,absoluteOffset:v,fit:h,cover:c,maxHeight:f,maxWidth:m}=e;if(Be.is.ios===!0&&window.visualViewport!==void 0){const M=document.body.style,{offsetLeft:y,offsetTop:q}=window.visualViewport;y!==le&&(M.setProperty("--q-pe-left",y+"px"),le=y),q!==oe&&(M.setProperty("--q-pe-top",q+"px"),oe=q)}const{scrollLeft:b,scrollTop:i}=l,s=v===void 0?ot(o,c===!0?[0,0]:n):it(o,v,n);Object.assign(l.style,{top:0,left:0,minWidth:null,minHeight:null,maxWidth:m,maxHeight:f,visibility:"visible"});const{offsetWidth:C,offsetHeight:w}=l,{elWidth:S,elHeight:W}=h===!0||c===!0?{elWidth:Math.max(s.width,C),elHeight:c===!0?Math.max(s.height,w):w}:{elWidth:C,elHeight:w};let r={maxWidth:m,maxHeight:f};(h===!0||c===!0)&&(r.minWidth=s.width+"px",c===!0&&(r.minHeight=s.height+"px")),Object.assign(l.style,r);const x=at(S,W);let g=ue(s,x,d,a);if(v===void 0||n===void 0)_(g,s,x,d,a);else{const{top:M,left:y}=g;_(g,s,x,d,a);let q=!1;if(g.top!==M){q=!0;const E=2*n[1];s.center=s.top-=E,s.bottom-=E+2}if(g.left!==y){q=!0;const E=2*n[0];s.middle=s.left-=E,s.right-=E+2}q===!0&&(g=ue(s,x,d,a),_(g,s,x,d,a))}r={top:g.top+"px",left:g.left+"px"},g.maxHeight!==void 0&&(r.maxHeight=g.maxHeight+"px",s.height>g.maxHeight&&(r.minHeight=r.maxHeight)),g.maxWidth!==void 0&&(r.maxWidth=g.maxWidth+"px",s.width>g.maxWidth&&(r.minWidth=r.maxWidth)),Object.assign(l.style,r),l.scrollTop!==i&&(l.scrollTop=i),l.scrollLeft!==b&&(l.scrollLeft=b)}function _(e,t,l,n,o){const d=l.bottom,a=l.right,v=Pe(),h=window.innerHeight-v,c=document.body.clientWidth;if(e.top<0||e.top+d>h)if(o.vertical==="center")e.top=t[n.vertical]>h/2?Math.max(0,h-d):0,e.maxHeight=Math.min(d,h);else if(t[n.vertical]>h/2){const f=Math.min(h,n.vertical==="center"?t.center:n.vertical===o.vertical?t.bottom:t.top);e.maxHeight=Math.min(d,f),e.top=Math.max(0,f-d)}else e.top=Math.max(0,n.vertical==="center"?t.center:n.vertical===o.vertical?t.top:t.bottom),e.maxHeight=Math.min(d,h-e.top);if(e.left<0||e.left+a>c)if(e.maxWidth=Math.min(a,c),o.horizontal==="middle")e.left=t[n.horizontal]>c/2?Math.max(0,c-a):0;else if(t[n.horizontal]>c/2){const f=Math.min(c,n.horizontal==="middle"?t.middle:n.horizontal===o.horizontal?t.right:t.left);e.maxWidth=Math.min(a,f),e.left=Math.max(0,f-e.maxWidth)}else e.left=Math.max(0,n.horizontal==="middle"?t.middle:n.horizontal===o.horizontal?t.left:t.right),e.maxWidth=Math.min(a,c-e.left)}const ct=D({name:"QMenu",inheritAttrs:!1,props:{...Ze,...ze,...re,...Re,persistent:Boolean,autoClose:Boolean,separateClosePopup:Boolean,noRouteDismiss:Boolean,noRefocus:Boolean,noFocus:Boolean,fit:Boolean,cover:Boolean,square:Boolean,anchor:{type:String,validator:ie},self:{type:String,validator:ie},offset:{type:Array,validator:lt},scrollTarget:Ae,touchPosition:Boolean,maxHeight:{type:String,default:null},maxWidth:{type:String,default:null}},emits:[...Le,"click","escapeKey"],setup(e,{slots:t,emit:l,attrs:n}){let o=null,d,a,v;const h=O(),{proxy:c}=h,{$q:f}=c,m=p(null),b=p(!1),i=k(()=>e.persistent!==!0&&e.noRouteDismiss!==!0),s=ce(e,f),{registerTick:C,removeTick:w}=$e(),{registerTimeout:S}=Fe(),{transitionProps:W,transitionStyle:r}=_e(e),{localScrollTarget:x,changeScrollEvent:g,unconfigureScrollTarget:M}=tt(e,Y),{anchorEl:y,canShow:q}=et({showing:b}),{hide:E}=Ke({showing:b,canShow:q,handleShow:xe,handleHide:ye,hideOnRouteChange:i,processOnMount:!0}),{showPortal:I,hidePortal:V,renderPortal:he}=je(h,m,qe,"menu"),R={anchorEl:y,innerRef:m,onClickOutside(u){if(e.persistent!==!0&&b.value===!0)return E(u),(u.type==="touchstart"||u.target.classList.contains("q-dialog__backdrop"))&&fe(u),!0}},N=k(()=>ae(e.anchor||(e.cover===!0?"center middle":"bottom start"),f.lang.rtl)),me=k(()=>e.cover===!0?N.value:ae(e.self||"top start",f.lang.rtl)),ge=k(()=>(e.square===!0?" q-menu--square":"")+(s.value===!0?" q-menu--dark q-dark":"")),be=k(()=>e.autoClose===!0?{onClick:ke}:{}),U=k(()=>b.value===!0&&e.persistent!==!0);H(U,u=>{u===!0?(De($),nt(R)):(te($),ne(R))});function z(){Ye(()=>{let u=m.value;u&&u.contains(document.activeElement)!==!0&&(u=u.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]")||u.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]")||u.querySelector("[autofocus], [data-autofocus]")||u,u.focus({preventScroll:!0}))})}function xe(u){if(o=e.noRefocus===!1?document.activeElement:null,Oe(G),I(),Y(),d=void 0,u!==void 0&&(e.touchPosition||e.contextMenu)){const F=Qe(u);if(F.left!==void 0){const{top:Ee,left:we}=y.value.getBoundingClientRect();d={left:F.left-we,top:F.top-Ee}}}a===void 0&&(a=H(()=>f.screen.width+"|"+f.screen.height+"|"+e.self+"|"+e.anchor+"|"+f.lang.rtl,B)),e.noFocus!==!0&&document.activeElement.blur(),C(()=>{B(),e.noFocus!==!0&&z()}),S(()=>{f.platform.is.ios===!0&&(v=e.autoClose,m.value.click()),B(),I(!0),l("show",u)},e.transitionDuration)}function ye(u){w(),V(),X(!0),o!==null&&(u===void 0||u.qClickOutside!==!0)&&(((u&&u.type.indexOf("key")===0?o.closest('[tabindex]:not([tabindex^="-"])'):void 0)||o).focus(),o=null),S(()=>{V(!0),l("hide",u)},e.transitionDuration)}function X(u){d=void 0,a!==void 0&&(a(),a=void 0),(u===!0||b.value===!0)&&(Ie(G),M(),ne(R),te($)),u!==!0&&(o=null)}function Y(){(y.value!==null||e.scrollTarget!==void 0)&&(x.value=Ve(y.value,e.scrollTarget),g(x.value,B))}function ke(u){v!==!0?(Ne(c,u),l("click",u)):v=!1}function G(u){U.value===!0&&e.noFocus!==!0&&Ue(m.value,u.target)!==!0&&z()}function $(u){l("escapeKey"),E(u)}function B(){ve({targetEl:m.value,offset:e.offset,anchorEl:y.value,anchorOrigin:N.value,selfOrigin:me.value,absoluteOffset:d,fit:e.fit,cover:e.cover,maxHeight:e.maxHeight,maxWidth:e.maxWidth})}function qe(){return P(Xe,W.value,()=>b.value===!0?P("div",{role:"menu",...n,ref:m,tabindex:-1,class:["q-menu q-position-engine scroll"+ge.value,n.class],style:[n.style,r.value],...be.value},se(t.default)):null)}return Q(X),Object.assign(c,{focus:z,updatePosition:B}),he}});function dt(e,t,l){return l<=t?t:Math.min(l,Math.max(t,e))}function ft(e,t,l){if(l<=t)return t;const n=l-t+1;let o=t+(e-t)%n;return o<t&&(o=n+o),o===0?0:o}export{rt as Q,st as a,dt as b,Ge as c,ie as d,tt as e,et as f,nt as g,ct as h,ft as n,ae as p,ne as r,ve as s,Je as u,lt as v};
