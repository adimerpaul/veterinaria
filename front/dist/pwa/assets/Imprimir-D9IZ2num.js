import{g as se}from"./_commonjsHelpers-D6-XlEtG.js";import{i as x}from"./index-Dz5GvxrM.js";import{h as Ft}from"./moment-C5S46NFB.js";var R={},Lt;function ge(){if(Lt)return R;Lt=1,Object.defineProperty(R,"__esModule",{value:!0}),R.Printd=R.createIFrame=R.createLinkStyle=R.createStyle=void 0;var a=/^(((http[s]?)|file):)?(\/\/)+([0-9a-zA-Z-_.=?&].+)$/,e=/^((\.|\.\.)?\/)([0-9a-zA-Z-_.=?&]+\/)*([0-9a-zA-Z-_.=?&]+)$/,r=function(i){return a.test(i)||e.test(i)};function n(i,l){var c=i.createElement("style");return c.appendChild(i.createTextNode(l)),c}R.createStyle=n;function t(i,l){var c=i.createElement("link");return c.type="text/css",c.rel="stylesheet",c.href=l,c}R.createLinkStyle=t;function o(i){var l=window.document.createElement("iframe");return l.setAttribute("src","about:blank"),l.setAttribute("style","visibility:hidden;width:0;height:0;position:absolute;z-index:-9999;bottom:0;"),l.setAttribute("width","0"),l.setAttribute("height","0"),l.setAttribute("wmode","opaque"),i.appendChild(l),l}R.createIFrame=o;var s={parent:window.document.body,headElements:[],bodyElements:[]},d=function(){function i(l){this.isLoading=!1,this.hasEvents=!1,this.opts=[s,l||{}].reduce(function(c,h){return Object.keys(h).forEach(function(f){return c[f]=h[f]}),c},{}),this.iframe=o(this.opts.parent)}return i.prototype.getIFrame=function(){return this.iframe},i.prototype.print=function(l,c,h,f){if(!this.isLoading){var u=this.iframe,g=u.contentDocument,p=u.contentWindow;if(!(!g||!p)&&(this.iframe.src="about:blank",this.elCopy=l.cloneNode(!0),!!this.elCopy)){this.isLoading=!0,this.callback=f;var F=p.document;F.open(),F.write('<!DOCTYPE html><html><head><meta charset="utf-8"></head><body></body></html>'),this.addEvents();var E=this.opts,L=E.headElements,N=E.bodyElements;Array.isArray(L)&&L.forEach(function(m){return F.head.appendChild(m)}),Array.isArray(N)&&N.forEach(function(m){return F.body.appendChild(m)}),Array.isArray(c)&&c.forEach(function(m){m&&F.head.appendChild(r(m)?t(F,m):n(F,m))}),F.body.appendChild(this.elCopy),Array.isArray(h)&&h.forEach(function(m){if(m){var I=F.createElement("script");r(m)?I.src=m:I.innerText=m,F.body.appendChild(I)}}),F.close()}}},i.prototype.printURL=function(l,c){this.isLoading||(this.addEvents(),this.isLoading=!0,this.callback=c,this.iframe.src=l)},i.prototype.onBeforePrint=function(l){this.onbeforeprint=l},i.prototype.onAfterPrint=function(l){this.onafterprint=l},i.prototype.launchPrint=function(l){this.isLoading||l.print()},i.prototype.addEvents=function(){var l=this;if(!this.hasEvents){this.hasEvents=!0,this.iframe.addEventListener("load",function(){return l.onLoad()},!1);var c=this.iframe.contentWindow;c&&(this.onbeforeprint&&c.addEventListener("beforeprint",this.onbeforeprint),this.onafterprint&&c.addEventListener("afterprint",this.onafterprint))}},i.prototype.onLoad=function(){var l=this;if(this.iframe){this.isLoading=!1;var c=this.iframe,h=c.contentDocument,f=c.contentWindow;if(!h||!f)return;typeof this.callback=="function"?this.callback({iframe:this.iframe,element:this.elCopy,launchPrint:function(){return l.launchPrint(f)}}):this.launchPrint(f)}},i}();return R.Printd=d,R.default=d,R}var O=ge(),H={},tt,It;function me(){return It||(It=1,tt=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),tt}var et={},U={},Rt;function q(){if(Rt)return U;Rt=1;let a;const e=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return U.getSymbolSize=function(n){if(!n)throw new Error('"version" cannot be null or undefined');if(n<1||n>40)throw new Error('"version" should be in range from 1 to 40');return n*4+17},U.getSymbolTotalCodewords=function(n){return e[n]},U.getBCHDigit=function(r){let n=0;for(;r!==0;)n++,r>>>=1;return n},U.setToSJISFunction=function(n){if(typeof n!="function")throw new Error('"toSJISFunc" is not a valid function.');a=n},U.isKanjiModeEnabled=function(){return typeof a<"u"},U.toSJIS=function(n){return a(n)},U}var nt={},St;function Tt(){return St||(St=1,function(a){a.L={bit:1},a.M={bit:0},a.Q={bit:3},a.H={bit:2};function e(r){if(typeof r!="string")throw new Error("Param is not a string");switch(r.toLowerCase()){case"l":case"low":return a.L;case"m":case"medium":return a.M;case"q":case"quartile":return a.Q;case"h":case"high":return a.H;default:throw new Error("Unknown EC Level: "+r)}}a.isValid=function(n){return n&&typeof n.bit<"u"&&n.bit>=0&&n.bit<4},a.from=function(n,t){if(a.isValid(n))return n;try{return e(n)}catch{return t}}}(nt)),nt}var rt,Pt;function pe(){if(Pt)return rt;Pt=1;function a(){this.buffer=[],this.length=0}return a.prototype={get:function(e){const r=Math.floor(e/8);return(this.buffer[r]>>>7-e%8&1)===1},put:function(e,r){for(let n=0;n<r;n++)this.putBit((e>>>r-n-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(e){const r=Math.floor(this.length/8);this.buffer.length<=r&&this.buffer.push(0),e&&(this.buffer[r]|=128>>>this.length%8),this.length++}},rt=a,rt}var ot,$t;function ve(){if($t)return ot;$t=1;function a(e){if(!e||e<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=e,this.data=new Uint8Array(e*e),this.reservedBit=new Uint8Array(e*e)}return a.prototype.set=function(e,r,n,t){const o=e*this.size+r;this.data[o]=n,t&&(this.reservedBit[o]=!0)},a.prototype.get=function(e,r){return this.data[e*this.size+r]},a.prototype.xor=function(e,r,n){this.data[e*this.size+r]^=n},a.prototype.isReserved=function(e,r){return this.reservedBit[e*this.size+r]},ot=a,ot}var it={},Dt;function ye(){return Dt||(Dt=1,function(a){const e=q().getSymbolSize;a.getRowColCoords=function(n){if(n===1)return[];const t=Math.floor(n/7)+2,o=e(n),s=o===145?26:Math.ceil((o-13)/(2*t-2))*2,d=[o-7];for(let i=1;i<t-1;i++)d[i]=d[i-1]-s;return d.push(6),d.reverse()},a.getPositions=function(n){const t=[],o=a.getRowColCoords(n),s=o.length;for(let d=0;d<s;d++)for(let i=0;i<s;i++)d===0&&i===0||d===0&&i===s-1||d===s-1&&i===0||t.push([o[d],o[i]]);return t}}(it)),it}var st={},xt;function Ee(){if(xt)return st;xt=1;const a=q().getSymbolSize,e=7;return st.getPositions=function(n){const t=a(n);return[[0,0],[t-e,0],[0,t-e]]},st}var at={},Ot;function Ce(){return Ot||(Ot=1,function(a){a.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const e={N1:3,N2:3,N3:40,N4:10};a.isValid=function(t){return t!=null&&t!==""&&!isNaN(t)&&t>=0&&t<=7},a.from=function(t){return a.isValid(t)?parseInt(t,10):void 0},a.getPenaltyN1=function(t){const o=t.size;let s=0,d=0,i=0,l=null,c=null;for(let h=0;h<o;h++){d=i=0,l=c=null;for(let f=0;f<o;f++){let u=t.get(h,f);u===l?d++:(d>=5&&(s+=e.N1+(d-5)),l=u,d=1),u=t.get(f,h),u===c?i++:(i>=5&&(s+=e.N1+(i-5)),c=u,i=1)}d>=5&&(s+=e.N1+(d-5)),i>=5&&(s+=e.N1+(i-5))}return s},a.getPenaltyN2=function(t){const o=t.size;let s=0;for(let d=0;d<o-1;d++)for(let i=0;i<o-1;i++){const l=t.get(d,i)+t.get(d,i+1)+t.get(d+1,i)+t.get(d+1,i+1);(l===4||l===0)&&s++}return s*e.N2},a.getPenaltyN3=function(t){const o=t.size;let s=0,d=0,i=0;for(let l=0;l<o;l++){d=i=0;for(let c=0;c<o;c++)d=d<<1&2047|t.get(l,c),c>=10&&(d===1488||d===93)&&s++,i=i<<1&2047|t.get(c,l),c>=10&&(i===1488||i===93)&&s++}return s*e.N3},a.getPenaltyN4=function(t){let o=0;const s=t.data.length;for(let i=0;i<s;i++)o+=t.data[i];return Math.abs(Math.ceil(o*100/s/5)-10)*e.N4};function r(n,t,o){switch(n){case a.Patterns.PATTERN000:return(t+o)%2===0;case a.Patterns.PATTERN001:return t%2===0;case a.Patterns.PATTERN010:return o%3===0;case a.Patterns.PATTERN011:return(t+o)%3===0;case a.Patterns.PATTERN100:return(Math.floor(t/2)+Math.floor(o/3))%2===0;case a.Patterns.PATTERN101:return t*o%2+t*o%3===0;case a.Patterns.PATTERN110:return(t*o%2+t*o%3)%2===0;case a.Patterns.PATTERN111:return(t*o%3+(t+o)%2)%2===0;default:throw new Error("bad maskPattern:"+n)}}a.applyMask=function(t,o){const s=o.size;for(let d=0;d<s;d++)for(let i=0;i<s;i++)o.isReserved(i,d)||o.xor(i,d,r(t,i,d))},a.getBestMask=function(t,o){const s=Object.keys(a.Patterns).length;let d=0,i=1/0;for(let l=0;l<s;l++){o(l),a.applyMask(l,t);const c=a.getPenaltyN1(t)+a.getPenaltyN2(t)+a.getPenaltyN3(t)+a.getPenaltyN4(t);a.applyMask(l,t),c<i&&(i=c,d=l)}return d}}(at)),at}var J={},Ut;function ae(){if(Ut)return J;Ut=1;const a=Tt(),e=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],r=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return J.getBlocksCount=function(t,o){switch(o){case a.L:return e[(t-1)*4+0];case a.M:return e[(t-1)*4+1];case a.Q:return e[(t-1)*4+2];case a.H:return e[(t-1)*4+3];default:return}},J.getTotalCodewordsCount=function(t,o){switch(o){case a.L:return r[(t-1)*4+0];case a.M:return r[(t-1)*4+1];case a.Q:return r[(t-1)*4+2];case a.H:return r[(t-1)*4+3];default:return}},J}var lt={},j={},zt;function we(){if(zt)return j;zt=1;const a=new Uint8Array(512),e=new Uint8Array(256);return function(){let n=1;for(let t=0;t<255;t++)a[t]=n,e[n]=t,n<<=1,n&256&&(n^=285);for(let t=255;t<512;t++)a[t]=a[t-255]}(),j.log=function(n){if(n<1)throw new Error("log("+n+")");return e[n]},j.exp=function(n){return a[n]},j.mul=function(n,t){return n===0||t===0?0:a[e[n]+e[t]]},j}var kt;function be(){return kt||(kt=1,function(a){const e=we();a.mul=function(n,t){const o=new Uint8Array(n.length+t.length-1);for(let s=0;s<n.length;s++)for(let d=0;d<t.length;d++)o[s+d]^=e.mul(n[s],t[d]);return o},a.mod=function(n,t){let o=new Uint8Array(n);for(;o.length-t.length>=0;){const s=o[0];for(let i=0;i<t.length;i++)o[i]^=e.mul(t[i],s);let d=0;for(;d<o.length&&o[d]===0;)d++;o=o.slice(d)}return o},a.generateECPolynomial=function(n){let t=new Uint8Array([1]);for(let o=0;o<n;o++)t=a.mul(t,new Uint8Array([1,e.exp(o)]));return t}}(lt)),lt}var dt,qt;function Ae(){if(qt)return dt;qt=1;const a=be();function e(r){this.genPoly=void 0,this.degree=r,this.degree&&this.initialize(this.degree)}return e.prototype.initialize=function(n){this.degree=n,this.genPoly=a.generateECPolynomial(this.degree)},e.prototype.encode=function(n){if(!this.genPoly)throw new Error("Encoder not initialized");const t=new Uint8Array(n.length+this.degree);t.set(n);const o=a.mod(t,this.genPoly),s=this.degree-o.length;if(s>0){const d=new Uint8Array(this.degree);return d.set(o,s),d}return o},dt=e,dt}var ct={},ut={},ft={},_t;function le(){return _t||(_t=1,ft.isValid=function(e){return!isNaN(e)&&e>=1&&e<=40}),ft}var S={},Vt;function de(){if(Vt)return S;Vt=1;const a="[0-9]+",e="[A-Z $%*+\\-./:]+";let r="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";r=r.replace(/u/g,"\\u");const n="(?:(?![A-Z0-9 $%*+\\-./:]|"+r+`)(?:.|[\r
]))+`;S.KANJI=new RegExp(r,"g"),S.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),S.BYTE=new RegExp(n,"g"),S.NUMERIC=new RegExp(a,"g"),S.ALPHANUMERIC=new RegExp(e,"g");const t=new RegExp("^"+r+"$"),o=new RegExp("^"+a+"$"),s=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return S.testKanji=function(i){return t.test(i)},S.testNumeric=function(i){return o.test(i)},S.testAlphanumeric=function(i){return s.test(i)},S}var Ht;function _(){return Ht||(Ht=1,function(a){const e=le(),r=de();a.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},a.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},a.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},a.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},a.MIXED={bit:-1},a.getCharCountIndicator=function(o,s){if(!o.ccBits)throw new Error("Invalid mode: "+o);if(!e.isValid(s))throw new Error("Invalid version: "+s);return s>=1&&s<10?o.ccBits[0]:s<27?o.ccBits[1]:o.ccBits[2]},a.getBestModeForData=function(o){return r.testNumeric(o)?a.NUMERIC:r.testAlphanumeric(o)?a.ALPHANUMERIC:r.testKanji(o)?a.KANJI:a.BYTE},a.toString=function(o){if(o&&o.id)return o.id;throw new Error("Invalid mode")},a.isValid=function(o){return o&&o.bit&&o.ccBits};function n(t){if(typeof t!="string")throw new Error("Param is not a string");switch(t.toLowerCase()){case"numeric":return a.NUMERIC;case"alphanumeric":return a.ALPHANUMERIC;case"kanji":return a.KANJI;case"byte":return a.BYTE;default:throw new Error("Unknown mode: "+t)}}a.from=function(o,s){if(a.isValid(o))return o;try{return n(o)}catch{return s}}}(ut)),ut}var Yt;function Te(){return Yt||(Yt=1,function(a){const e=q(),r=ae(),n=Tt(),t=_(),o=le(),s=7973,d=e.getBCHDigit(s);function i(f,u,g){for(let p=1;p<=40;p++)if(u<=a.getCapacity(p,g,f))return p}function l(f,u){return t.getCharCountIndicator(f,u)+4}function c(f,u){let g=0;return f.forEach(function(p){const F=l(p.mode,u);g+=F+p.getBitsLength()}),g}function h(f,u){for(let g=1;g<=40;g++)if(c(f,g)<=a.getCapacity(g,u,t.MIXED))return g}a.from=function(u,g){return o.isValid(u)?parseInt(u,10):g},a.getCapacity=function(u,g,p){if(!o.isValid(u))throw new Error("Invalid QR Code version");typeof p>"u"&&(p=t.BYTE);const F=e.getSymbolTotalCodewords(u),E=r.getTotalCodewordsCount(u,g),L=(F-E)*8;if(p===t.MIXED)return L;const N=L-l(p,u);switch(p){case t.NUMERIC:return Math.floor(N/10*3);case t.ALPHANUMERIC:return Math.floor(N/11*2);case t.KANJI:return Math.floor(N/13);case t.BYTE:default:return Math.floor(N/8)}},a.getBestVersionForData=function(u,g){let p;const F=n.from(g,n.M);if(Array.isArray(u)){if(u.length>1)return h(u,F);if(u.length===0)return 1;p=u[0]}else p=u;return i(p.mode,p.getLength(),F)},a.getEncodedBits=function(u){if(!o.isValid(u)||u<7)throw new Error("Invalid QR Code version");let g=u<<12;for(;e.getBCHDigit(g)-d>=0;)g^=s<<e.getBCHDigit(g)-d;return u<<12|g}}(ct)),ct}var ht={},jt;function Ne(){if(jt)return ht;jt=1;const a=q(),e=1335,r=21522,n=a.getBCHDigit(e);return ht.getEncodedBits=function(o,s){const d=o.bit<<3|s;let i=d<<10;for(;a.getBCHDigit(i)-n>=0;)i^=e<<a.getBCHDigit(i)-n;return(d<<10|i)^r},ht}var gt={},mt,Kt;function Be(){if(Kt)return mt;Kt=1;const a=_();function e(r){this.mode=a.NUMERIC,this.data=r.toString()}return e.getBitsLength=function(n){return 10*Math.floor(n/3)+(n%3?n%3*3+1:0)},e.prototype.getLength=function(){return this.data.length},e.prototype.getBitsLength=function(){return e.getBitsLength(this.data.length)},e.prototype.write=function(n){let t,o,s;for(t=0;t+3<=this.data.length;t+=3)o=this.data.substr(t,3),s=parseInt(o,10),n.put(s,10);const d=this.data.length-t;d>0&&(o=this.data.substr(t),s=parseInt(o,10),n.put(s,d*3+1))},mt=e,mt}var pt,Jt;function Me(){if(Jt)return pt;Jt=1;const a=_(),e=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function r(n){this.mode=a.ALPHANUMERIC,this.data=n}return r.getBitsLength=function(t){return 11*Math.floor(t/2)+6*(t%2)},r.prototype.getLength=function(){return this.data.length},r.prototype.getBitsLength=function(){return r.getBitsLength(this.data.length)},r.prototype.write=function(t){let o;for(o=0;o+2<=this.data.length;o+=2){let s=e.indexOf(this.data[o])*45;s+=e.indexOf(this.data[o+1]),t.put(s,11)}this.data.length%2&&t.put(e.indexOf(this.data[o]),6)},pt=r,pt}var vt,Gt;function Fe(){if(Gt)return vt;Gt=1;const a=_();function e(r){this.mode=a.BYTE,typeof r=="string"?this.data=new TextEncoder().encode(r):this.data=new Uint8Array(r)}return e.getBitsLength=function(n){return n*8},e.prototype.getLength=function(){return this.data.length},e.prototype.getBitsLength=function(){return e.getBitsLength(this.data.length)},e.prototype.write=function(r){for(let n=0,t=this.data.length;n<t;n++)r.put(this.data[n],8)},vt=e,vt}var yt,Zt;function Le(){if(Zt)return yt;Zt=1;const a=_(),e=q();function r(n){this.mode=a.KANJI,this.data=n}return r.getBitsLength=function(t){return t*13},r.prototype.getLength=function(){return this.data.length},r.prototype.getBitsLength=function(){return r.getBitsLength(this.data.length)},r.prototype.write=function(n){let t;for(t=0;t<this.data.length;t++){let o=e.toSJIS(this.data[t]);if(o>=33088&&o<=40956)o-=33088;else if(o>=57408&&o<=60351)o-=49472;else throw new Error("Invalid SJIS character: "+this.data[t]+`
Make sure your charset is UTF-8`);o=(o>>>8&255)*192+(o&255),n.put(o,13)}},yt=r,yt}var Et={exports:{}},Qt;function Ie(){return Qt||(Qt=1,function(a){var e={single_source_shortest_paths:function(r,n,t){var o={},s={};s[n]=0;var d=e.PriorityQueue.make();d.push(n,0);for(var i,l,c,h,f,u,g,p,F;!d.empty();){i=d.pop(),l=i.value,h=i.cost,f=r[l]||{};for(c in f)f.hasOwnProperty(c)&&(u=f[c],g=h+u,p=s[c],F=typeof s[c]>"u",(F||p>g)&&(s[c]=g,d.push(c,g),o[c]=l))}if(typeof t<"u"&&typeof s[t]>"u"){var E=["Could not find a path from ",n," to ",t,"."].join("");throw new Error(E)}return o},extract_shortest_path_from_predecessor_list:function(r,n){for(var t=[],o=n;o;)t.push(o),r[o],o=r[o];return t.reverse(),t},find_path:function(r,n,t){var o=e.single_source_shortest_paths(r,n,t);return e.extract_shortest_path_from_predecessor_list(o,t)},PriorityQueue:{make:function(r){var n=e.PriorityQueue,t={},o;r=r||{};for(o in n)n.hasOwnProperty(o)&&(t[o]=n[o]);return t.queue=[],t.sorter=r.sorter||n.default_sorter,t},default_sorter:function(r,n){return r.cost-n.cost},push:function(r,n){var t={value:r,cost:n};this.queue.push(t),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};a.exports=e}(Et)),Et.exports}var Xt;function Re(){return Xt||(Xt=1,function(a){const e=_(),r=Be(),n=Me(),t=Fe(),o=Le(),s=de(),d=q(),i=Ie();function l(E){return unescape(encodeURIComponent(E)).length}function c(E,L,N){const m=[];let I;for(;(I=E.exec(N))!==null;)m.push({data:I[0],index:I.index,mode:L,length:I[0].length});return m}function h(E){const L=c(s.NUMERIC,e.NUMERIC,E),N=c(s.ALPHANUMERIC,e.ALPHANUMERIC,E);let m,I;return d.isKanjiModeEnabled()?(m=c(s.BYTE,e.BYTE,E),I=c(s.KANJI,e.KANJI,E)):(m=c(s.BYTE_KANJI,e.BYTE,E),I=[]),L.concat(N,m,I).sort(function(A,b){return A.index-b.index}).map(function(A){return{data:A.data,mode:A.mode,length:A.length}})}function f(E,L){switch(L){case e.NUMERIC:return r.getBitsLength(E);case e.ALPHANUMERIC:return n.getBitsLength(E);case e.KANJI:return o.getBitsLength(E);case e.BYTE:return t.getBitsLength(E)}}function u(E){return E.reduce(function(L,N){const m=L.length-1>=0?L[L.length-1]:null;return m&&m.mode===N.mode?(L[L.length-1].data+=N.data,L):(L.push(N),L)},[])}function g(E){const L=[];for(let N=0;N<E.length;N++){const m=E[N];switch(m.mode){case e.NUMERIC:L.push([m,{data:m.data,mode:e.ALPHANUMERIC,length:m.length},{data:m.data,mode:e.BYTE,length:m.length}]);break;case e.ALPHANUMERIC:L.push([m,{data:m.data,mode:e.BYTE,length:m.length}]);break;case e.KANJI:L.push([m,{data:m.data,mode:e.BYTE,length:l(m.data)}]);break;case e.BYTE:L.push([{data:m.data,mode:e.BYTE,length:l(m.data)}])}}return L}function p(E,L){const N={},m={start:{}};let I=["start"];for(let y=0;y<E.length;y++){const A=E[y],b=[];for(let v=0;v<A.length;v++){const B=A[v],C=""+y+v;b.push(C),N[C]={node:B,lastCount:0},m[C]={};for(let T=0;T<I.length;T++){const w=I[T];N[w]&&N[w].node.mode===B.mode?(m[w][C]=f(N[w].lastCount+B.length,B.mode)-f(N[w].lastCount,B.mode),N[w].lastCount+=B.length):(N[w]&&(N[w].lastCount=B.length),m[w][C]=f(B.length,B.mode)+4+e.getCharCountIndicator(B.mode,L))}}I=b}for(let y=0;y<I.length;y++)m[I[y]].end=0;return{map:m,table:N}}function F(E,L){let N;const m=e.getBestModeForData(E);if(N=e.from(L,m),N!==e.BYTE&&N.bit<m.bit)throw new Error('"'+E+'" cannot be encoded with mode '+e.toString(N)+`.
 Suggested mode is: `+e.toString(m));switch(N===e.KANJI&&!d.isKanjiModeEnabled()&&(N=e.BYTE),N){case e.NUMERIC:return new r(E);case e.ALPHANUMERIC:return new n(E);case e.KANJI:return new o(E);case e.BYTE:return new t(E)}}a.fromArray=function(L){return L.reduce(function(N,m){return typeof m=="string"?N.push(F(m,null)):m.data&&N.push(F(m.data,m.mode)),N},[])},a.fromString=function(L,N){const m=h(L,d.isKanjiModeEnabled()),I=g(m),y=p(I,N),A=i.find_path(y.map,"start","end"),b=[];for(let v=1;v<A.length-1;v++)b.push(y.table[A[v]].node);return a.fromArray(u(b))},a.rawSplit=function(L){return a.fromArray(h(L,d.isKanjiModeEnabled()))}}(gt)),gt}var Wt;function Se(){if(Wt)return et;Wt=1;const a=q(),e=Tt(),r=pe(),n=ve(),t=ye(),o=Ee(),s=Ce(),d=ae(),i=Ae(),l=Te(),c=Ne(),h=_(),f=Re();function u(y,A){const b=y.size,v=o.getPositions(A);for(let B=0;B<v.length;B++){const C=v[B][0],T=v[B][1];for(let w=-1;w<=7;w++)if(!(C+w<=-1||b<=C+w))for(let M=-1;M<=7;M++)T+M<=-1||b<=T+M||(w>=0&&w<=6&&(M===0||M===6)||M>=0&&M<=6&&(w===0||w===6)||w>=2&&w<=4&&M>=2&&M<=4?y.set(C+w,T+M,!0,!0):y.set(C+w,T+M,!1,!0))}}function g(y){const A=y.size;for(let b=8;b<A-8;b++){const v=b%2===0;y.set(b,6,v,!0),y.set(6,b,v,!0)}}function p(y,A){const b=t.getPositions(A);for(let v=0;v<b.length;v++){const B=b[v][0],C=b[v][1];for(let T=-2;T<=2;T++)for(let w=-2;w<=2;w++)T===-2||T===2||w===-2||w===2||T===0&&w===0?y.set(B+T,C+w,!0,!0):y.set(B+T,C+w,!1,!0)}}function F(y,A){const b=y.size,v=l.getEncodedBits(A);let B,C,T;for(let w=0;w<18;w++)B=Math.floor(w/3),C=w%3+b-8-3,T=(v>>w&1)===1,y.set(B,C,T,!0),y.set(C,B,T,!0)}function E(y,A,b){const v=y.size,B=c.getEncodedBits(A,b);let C,T;for(C=0;C<15;C++)T=(B>>C&1)===1,C<6?y.set(C,8,T,!0):C<8?y.set(C+1,8,T,!0):y.set(v-15+C,8,T,!0),C<8?y.set(8,v-C-1,T,!0):C<9?y.set(8,15-C-1+1,T,!0):y.set(8,15-C-1,T,!0);y.set(v-8,8,1,!0)}function L(y,A){const b=y.size;let v=-1,B=b-1,C=7,T=0;for(let w=b-1;w>0;w-=2)for(w===6&&w--;;){for(let M=0;M<2;M++)if(!y.isReserved(B,w-M)){let D=!1;T<A.length&&(D=(A[T]>>>C&1)===1),y.set(B,w-M,D),C--,C===-1&&(T++,C=7)}if(B+=v,B<0||b<=B){B-=v,v=-v;break}}}function N(y,A,b){const v=new r;b.forEach(function(M){v.put(M.mode.bit,4),v.put(M.getLength(),h.getCharCountIndicator(M.mode,y)),M.write(v)});const B=a.getSymbolTotalCodewords(y),C=d.getTotalCodewordsCount(y,A),T=(B-C)*8;for(v.getLengthInBits()+4<=T&&v.put(0,4);v.getLengthInBits()%8!==0;)v.putBit(0);const w=(T-v.getLengthInBits())/8;for(let M=0;M<w;M++)v.put(M%2?17:236,8);return m(v,y,A)}function m(y,A,b){const v=a.getSymbolTotalCodewords(A),B=d.getTotalCodewordsCount(A,b),C=v-B,T=d.getBlocksCount(A,b),w=v%T,M=T-w,D=Math.floor(v/T),Y=Math.floor(C/T),ue=Y+1,Nt=D-Y,fe=new i(Nt);let Z=0;const K=new Array(T),Bt=new Array(T);let Q=0;const he=new Uint8Array(y.buffer);for(let V=0;V<T;V++){const W=V<M?Y:ue;K[V]=he.slice(Z,Z+W),Bt[V]=fe.encode(K[V]),Z+=W,Q=Math.max(Q,W)}const X=new Uint8Array(v);let Mt=0,P,$;for(P=0;P<Q;P++)for($=0;$<T;$++)P<K[$].length&&(X[Mt++]=K[$][P]);for(P=0;P<Nt;P++)for($=0;$<T;$++)X[Mt++]=Bt[$][P];return X}function I(y,A,b,v){let B;if(Array.isArray(y))B=f.fromArray(y);else if(typeof y=="string"){let D=A;if(!D){const Y=f.rawSplit(y);D=l.getBestVersionForData(Y,b)}B=f.fromString(y,D||40)}else throw new Error("Invalid data");const C=l.getBestVersionForData(B,b);if(!C)throw new Error("The amount of data is too big to be stored in a QR Code");if(!A)A=C;else if(A<C)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+C+`.
`);const T=N(A,b,B),w=a.getSymbolSize(A),M=new n(w);return u(M,A),g(M),p(M,A),E(M,b,0),A>=7&&F(M,A),L(M,T),isNaN(v)&&(v=s.getBestMask(M,E.bind(null,M,b))),s.applyMask(v,M),E(M,b,v),{modules:M,version:A,errorCorrectionLevel:b,maskPattern:v,segments:B}}return et.create=function(A,b){if(typeof A>"u"||A==="")throw new Error("No input text");let v=e.M,B,C;return typeof b<"u"&&(v=e.from(b.errorCorrectionLevel,e.M),B=l.from(b.version),C=s.from(b.maskPattern),b.toSJISFunc&&a.setToSJISFunction(b.toSJISFunc)),I(A,B,v,C)},et}var Ct={},wt={},te;function ce(){return te||(te=1,function(a){function e(r){if(typeof r=="number"&&(r=r.toString()),typeof r!="string")throw new Error("Color should be defined as hex string");let n=r.slice().replace("#","").split("");if(n.length<3||n.length===5||n.length>8)throw new Error("Invalid hex color: "+r);(n.length===3||n.length===4)&&(n=Array.prototype.concat.apply([],n.map(function(o){return[o,o]}))),n.length===6&&n.push("F","F");const t=parseInt(n.join(""),16);return{r:t>>24&255,g:t>>16&255,b:t>>8&255,a:t&255,hex:"#"+n.slice(0,6).join("")}}a.getOptions=function(n){n||(n={}),n.color||(n.color={});const t=typeof n.margin>"u"||n.margin===null||n.margin<0?4:n.margin,o=n.width&&n.width>=21?n.width:void 0,s=n.scale||4;return{width:o,scale:o?4:s,margin:t,color:{dark:e(n.color.dark||"#000000ff"),light:e(n.color.light||"#ffffffff")},type:n.type,rendererOpts:n.rendererOpts||{}}},a.getScale=function(n,t){return t.width&&t.width>=n+t.margin*2?t.width/(n+t.margin*2):t.scale},a.getImageWidth=function(n,t){const o=a.getScale(n,t);return Math.floor((n+t.margin*2)*o)},a.qrToImageData=function(n,t,o){const s=t.modules.size,d=t.modules.data,i=a.getScale(s,o),l=Math.floor((s+o.margin*2)*i),c=o.margin*i,h=[o.color.light,o.color.dark];for(let f=0;f<l;f++)for(let u=0;u<l;u++){let g=(f*l+u)*4,p=o.color.light;if(f>=c&&u>=c&&f<l-c&&u<l-c){const F=Math.floor((f-c)/i),E=Math.floor((u-c)/i);p=h[d[F*s+E]?1:0]}n[g++]=p.r,n[g++]=p.g,n[g++]=p.b,n[g]=p.a}}}(wt)),wt}var ee;function Pe(){return ee||(ee=1,function(a){const e=ce();function r(t,o,s){t.clearRect(0,0,o.width,o.height),o.style||(o.style={}),o.height=s,o.width=s,o.style.height=s+"px",o.style.width=s+"px"}function n(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}a.render=function(o,s,d){let i=d,l=s;typeof i>"u"&&(!s||!s.getContext)&&(i=s,s=void 0),s||(l=n()),i=e.getOptions(i);const c=e.getImageWidth(o.modules.size,i),h=l.getContext("2d"),f=h.createImageData(c,c);return e.qrToImageData(f.data,o,i),r(h,l,c),h.putImageData(f,0,0),l},a.renderToDataURL=function(o,s,d){let i=d;typeof i>"u"&&(!s||!s.getContext)&&(i=s,s=void 0),i||(i={});const l=a.render(o,s,i),c=i.type||"image/png",h=i.rendererOpts||{};return l.toDataURL(c,h.quality)}}(Ct)),Ct}var bt={},ne;function $e(){if(ne)return bt;ne=1;const a=ce();function e(t,o){const s=t.a/255,d=o+'="'+t.hex+'"';return s<1?d+" "+o+'-opacity="'+s.toFixed(2).slice(1)+'"':d}function r(t,o,s){let d=t+o;return typeof s<"u"&&(d+=" "+s),d}function n(t,o,s){let d="",i=0,l=!1,c=0;for(let h=0;h<t.length;h++){const f=Math.floor(h%o),u=Math.floor(h/o);!f&&!l&&(l=!0),t[h]?(c++,h>0&&f>0&&t[h-1]||(d+=l?r("M",f+s,.5+u+s):r("m",i,0),i=0,l=!1),f+1<o&&t[h+1]||(d+=r("h",c),c=0)):i++}return d}return bt.render=function(o,s,d){const i=a.getOptions(s),l=o.modules.size,c=o.modules.data,h=l+i.margin*2,f=i.color.light.a?"<path "+e(i.color.light,"fill")+' d="M0 0h'+h+"v"+h+'H0z"/>':"",u="<path "+e(i.color.dark,"stroke")+' d="'+n(c,l,i.margin)+'"/>',g='viewBox="0 0 '+h+" "+h+'"',F='<svg xmlns="http://www.w3.org/2000/svg" '+(i.width?'width="'+i.width+'" height="'+i.width+'" ':"")+g+' shape-rendering="crispEdges">'+f+u+`</svg>
`;return typeof d=="function"&&d(null,F),F},bt}var re;function De(){if(re)return H;re=1;const a=me(),e=Se(),r=Pe(),n=$e();function t(o,s,d,i,l){const c=[].slice.call(arguments,1),h=c.length,f=typeof c[h-1]=="function";if(!f&&!a())throw new Error("Callback required as last argument");if(f){if(h<2)throw new Error("Too few arguments provided");h===2?(l=d,d=s,s=i=void 0):h===3&&(s.getContext&&typeof l>"u"?(l=i,i=void 0):(l=i,i=d,d=s,s=void 0))}else{if(h<1)throw new Error("Too few arguments provided");return h===1?(d=s,s=i=void 0):h===2&&!s.getContext&&(i=d,d=s,s=void 0),new Promise(function(u,g){try{const p=e.create(d,i);u(o(p,s,i))}catch(p){g(p)}})}try{const u=e.create(d,i);l(null,o(u,s,i))}catch(u){l(u)}}return H.create=e.create,H.toCanvas=t.bind(null,r.render),H.toDataURL=t.bind(null,r.renderToDataURL),H.toString=t.bind(null,function(o,s,d){return n.render(o,d)}),H}var xe=De();const z=se(xe);var At,oe;function Oe(){if(oe)return At;oe=1;class a{constructor(){this.units=["cero","uno","dos","tres","cuatro","cinco","seis","siete","ocho","nueve"],this.tenToSixteen=["diez","once","doce","trece","catorce","quince","dieciséis"],this.tens=["treinta","cuarenta","cincuenta","sesenta","setenta","ochenta","noventa"]}convertirNroMesAtexto(r){switch(typeof r=="number"&&(r=String(r)),r=this.deleteZerosLeft(r),r){case"1":return"Enero";case"2":return"Febrero";case"3":return"Marzo";case"4":return"Abril";case"5":return"Mayo";case"6":return"Junio";case"7":return"Julio";case"8":return"Agosto";case"9":return"Septiembre";case"10":return"Octubre";case"11":return"Noviembre";case"12":return"Diciembre";default:throw"Numero de mes inválido"}}convertToText(r){if(typeof r=="number"&&(r=String(r)),r=this.deleteZerosLeft(r),!this.validateNumber(r))throw"Número inválido, no se puede convertir!";return this.getName(r)}deleteZerosLeft(r){let n=0,t=!0;for(n=0;n<r.length;n++)if(r.charAt(n)!=0){t=!1;break}return t?"0":r.substr(n)}validateNumber(r){return!(isNaN(r)||r===""||r.indexOf(".")>=0||r.indexOf("-")>=0)}getName(r){return r=this.deleteZerosLeft(r),r.length===1?this.getUnits(r):r.length===2?this.getTens(r):r.length===3?this.getHundreds(r):r.length<7?this.getThousands(r):r.length<13?this.getPeriod(r,6,"millón"):r.length<19?this.getPeriod(r,12,"billón"):"Número demasiado grande."}getUnits(r){let n=parseInt(r);return this.units[n]}getTens(r){let n=r.charAt(1);if(r<17)return this.tenToSixteen[r-10];if(r<20)return"dieci"+this.getUnits(n);switch(r){case"20":return"veinte";case"22":return"veintidós";case"23":return"veintitrés";case"26":return"veintiséis"}if(r<30)return"veinti"+this.getUnits(n);let t=this.tens[r.charAt(0)-3];return n>0&&(t+=" y "+this.getUnits(n)),t}getHundreds(r){let n="",t=r.charAt(0),o=r.substr(1);if(r==100)return"cien";switch(t){case"1":n="ciento";break;case"5":n="quinientos";break;case"7":n="setecientos";break;case"9":n="novecientos"}return n===""&&(n=this.getUnits(t)+"cientos"),o>0&&(n+=" "+this.getName(o)),n}getThousands(r){let n="mil",t=r.length-3,o=r.substr(0,t),s=r.substr(t);return o>1&&(n=this.getName(o).replace("uno","un")+" mil"),s>0&&(n+=" "+this.getName(s)),n}getPeriod(r,n,t){let o="un "+t,s=r.length-n,d=r.substr(0,s),i=r.substr(s);return d>1&&(o=this.getName(d).replace("uno","un")+" "+t.replace("ó","o")+"es"),i>0&&(o+=" "+this.getName(i)),o}}return At={conversorNumerosALetras:a},At}var Ue=Oe();const k=se(Ue);var G={},ie;function ze(){if(ie)return G;ie=1,Object.defineProperty(G,"__esModule",{value:!0});function a(i){switch(i){case 1:return"Un";case 2:return"Dos";case 3:return"Tres";case 4:return"Cuatro";case 5:return"Cinco";case 6:return"Seis";case 7:return"Siete";case 8:return"Ocho";case 9:return"Nueve";default:return""}}function e(i,l){return l>0?i+" y "+a(l):i}function r(i){var l=Math.floor(i/10),c=i-l*10;switch(l){case 1:switch(c){case 0:return"Diez";case 1:return"Once";case 2:return"Doce";case 3:return"Trece";case 4:return"Catorce";case 5:return"Quince";default:return"Dieci"+a(c).toLowerCase()}case 2:switch(c){case 0:return"Veinte";default:return"Veinti"+a(c).toLowerCase()}case 3:return e("Treinta",c);case 4:return e("Cuarenta",c);case 5:return e("Cincuenta",c);case 6:return e("Sesenta",c);case 7:return e("Setenta",c);case 8:return e("Ochenta",c);case 9:return e("Noventa",c);case 0:return a(c);default:return""}}function n(i){var l=Math.floor(i/100),c=i-l*100;switch(l){case 1:return c>0?"Ciento "+r(c):"Cien";case 2:return"Doscientos "+r(c);case 3:return"Trescientos "+r(c);case 4:return"Cuatrocientos "+r(c);case 5:return"Quinientos "+r(c);case 6:return"Seiscientos "+r(c);case 7:return"Setecientos "+r(c);case 8:return"Ochocientos "+r(c);case 9:return"Novecientos "+r(c);default:return r(c)}}function t(i,l,c,h){var f=Math.floor(i/l),u=i-f*l,g="";return f>0&&(f>1?g=n(f)+" "+h:g=c),u>0&&(g+=""),g}function o(i){var l=1e3,c=Math.floor(i/l),h=i-c*l,f=t(i,l,"Un Mil","Mil"),u=n(h);return f===""?u:(f+" "+u).trim()}function s(i){var l=1e6,c=Math.floor(i/l),h=i-c*l,f=t(i,l,"Un Millón de","Millones de"),u=o(h);return f===""?u:(f+" "+u).trim()}function d(i){var l={enteros:Math.floor(i),centavos:Math.round(i*100)-Math.floor(i)*100,letrasCentavos:"",letrasMonedaPlural:"Pesos",letrasMonedaSingular:"Peso",letrasMonedaCentavoPlural:"/100 M.N.",letrasMonedaCentavoSingular:"/100 M.N."};return l.centavos>=0&&(l.letrasCentavos=function(){return l.centavos>=1&l.centavos<=9?"0"+l.centavos+l.letrasMonedaCentavoSingular:l.centavos===0?"00"+l.letrasMonedaCentavoSingular:l.centavos+l.letrasMonedaCentavoPlural}()),l.enteros===0?("Cero "+l.letrasMonedaPlural+" "+l.letrasCentavos).trim():l.enteros===1?(s(l.enteros)+" "+l.letrasMonedaSingular+" "+l.letrasCentavos).trim():(s(l.enteros)+" "+l.letrasMonedaPlural+" "+l.letrasCentavos).trim()}return G.NumerosALetras=d,G}ze();class Ve{static factura(e){return console.log("factura",e),new Promise((r,n)=>{const t=k.conversorNumerosALetras,s=new t().convertToText(parseInt(e.total)),d={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}},i=x().env;console.log(i);const l=e.nombre+" "+e.numeroFactura;z.toDataURL(l,d).then(c=>{let h=`${this.head()}
  <div style='padding-left: 0.5cm;padding-right: 0.5cm'>
      <div class='titulo'>FACTURA <br>CON DERECHO A CREDITO FISCAL</div>
      <div class='titulo2'>${i.razon}<br>
      Casa Matriz<br>
      No. Punto de Venta 0<br>
${i.direccion}<br>
Tel. ${i.telefono}<br>
Oruro</div>
<hr>
<div class='titulo'>NIT</div>
<div class='titulo2'>${i.nit}</div>
<div class='titulo'>FACTURA N°</div>
<div class='titulo2'>${e.numeroFactura}</div>
<div class='titulo'>CÓD. AUTORIZACIÓN</div>
<div class='titulo2'>${e.cuf}</div>
<hr>
<table>
<tr><td class='titder'>NOMBRE/RAZÓN SOCIAL:</td><td class='contenido'>${e.nombre}</td>
</tr><tr><td class='titder'>NIT/CI/CEX:</td><td class='contenido'>${e.ci}</td></tr>
<tr><td class='titder'>COD. CLIENTE:</td ><td class='contenido'>${e.mascota.id}</td></tr>
<tr><td class='titder'>FECHA DE EMISIÓN:</td><td class='contenido'>${e.fecha}</td></tr>
</table><hr><div class='titulo'>DETALLE</div>`;e.details.forEach(u=>{h+=`<div style='font-size: 12px'><b>${u.producto?.id} ${u.producto?.nombre} </b></div>`,h+=`<div>${u.cantidad} ${parseFloat(u.precio).toFixed(2)} 0.00
                    <span style='float:right'>${parseFloat(u.subTotal).toFixed(2)}</span></div>`}),h+=`<hr>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>SUBTOTAL Bs</td><td class='conte2'>${parseFloat(e.total).toFixed(2)}</td></tr>
      <tr><td class='titder'>DESCUENTO Bs</td><td class='conte2'>0.00</td></tr>
      <tr><td class='titder'>TOTAL Bs</td><td class='conte2'>${parseFloat(e.total).toFixed(2)}</td></tr>
      <tr><td class='titder'>MONTO GIFT CARD Bs</td ><td class='conte2'>0.00</td></tr>
      <tr><td class='titder'>MONTO A PAGAR Bs</td><td class='conte2'>${parseFloat(e.total).toFixed(2)}</td></tr>
      <tr><td class='titder' style='font-size: 8px'>IMPORTE BASE CRÉDITO FISCAL Bs</td>
      <td class='conte2'>${parseFloat(e.total).toFixed(2)}</td></tr>
      </table>
      <br>
      <div>Son ${s} ${((parseFloat(e.total)-Math.floor(parseFloat(e.total)))*100).toFixed(2)} /100 Bolivianos</div><hr>
      <div class='titulo2' style='font-size: 9px'>
      ESTA FACTURA CONTRIBUYE AL DESARROLLO DEL PAÍS,<br>
      EL USO ILÍCITO SERÁ SANCIONADO PENALMENTE DE<br>
      ACUERDO A LEY<br><br>
      ${e.leyenda} <br><br>
      “Este documento es la Representación Gráfica de un<br>
      Documento Fiscal Digital emitido en una modalidad de<br>
      facturación en línea”</div><br>
      <div style='display: flex;justify-content: center;'> <img  src="${c}" ></div></div>
      </div>
</body>
</html>`,document.getElementById("myElement").innerHTML=h,new O.Printd().print(document.getElementById("myElement")),r(c)}).catch(c=>{n(c)})})}static formatDate(e){return e==null||e===""?"":Ft(e).format("DD/MM/YYYY HH:mm A")}static nota(e,r=!0){return console.log("factura",e),new Promise((n,t)=>{const o=k.conversorNumerosALetras,d=new o().convertToText(parseInt(e.total)),i={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}};x().env,z.toDataURL(`Fecha: ${e.fecha_emision} Monto: ${parseFloat(e.total).toFixed(2)}`,i).then(l=>{let c=`${this.head()}
  <!--div style='padding-left: 0.5cm;padding-right: 0.5cm'>
  <img src="logo.png" alt="logo" style="width: 100px; height: 50px; display: block; margin-left: auto; margin-right: auto;">
      <div class='titulo'>${e.tipo_venta==="EGRESO"?"NOTA DE EGRESO":"NOTA DE VENTA"}</div>
      <div class='titulo2'>${e.tipo_comprobante} <br>
      Casa Matriz<br>
      No. Punto de Venta 0<br>
Calle Beni Nro. 60, entre 6 de Octubre y Potosí.<br>
Tel. 25247993 - 76148555<br>
Oruro</div!-->
<html lang="es">
<head>
    <meta charset="UTF-8">
    <style>
   .mono {
    font-family: Monospace,serif !important;
    font-size: 18px !important;
  }
</style>
<title></title>
</head>
<body>
<div class="mono">
<hr>
<table>
<tr><td class='titder'>ID:</td><td class='titder'>${e.id}</td></tr>
<tr><td class='titder'>NOMBRE/RAZÓN SOCIAL:</td><td class='titder'>${e.nombre}</td></tr>
<tr><!-- td class='titder'>NIT/CI/CEX:</td><td class='contenido'>${e.mascota?e.mascota.id:""}</td --></tr>
<tr><td class='titder'>FECHA DE EMISIÓN:</td><td class='contenido'>${this.formatDate(e.fecha)}</td></tr>
</table><hr><div class='titulo'>DETALLE</div>`;e.details.forEach(h=>{console.log("r",h),c+=`<div style='font-size: 12px'><b> ${h.producto?.nombre} </b></div>`,c+=`<div>
                  <span style='font-size: 18px;font-weight: bold'>
                      ${h.cantidad}
                  </span>
                  <span>
                  ${parseFloat(h.precio).toFixed(2)}
                  </span>

                  <span style='float:right'>
                      ${parseFloat(h.subtotal).toFixed(2)}
                  </span>
                  </div>`}),c+=`<hr>
<div>${e.comentarioDoctor===""||e.comentarioDoctor===null||e.comentarioDoctor===void 0?"":"Comentario: "+e.comentarioDoctor}</div>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>SUBTOTAL Bs</td><td class='titder'>${parseFloat(e.total).toFixed(2)}</td></tr>

      </table>
      <br>
        <div>
        Son ${d} ${((parseFloat(e.total)-Math.floor(parseFloat(e.total)))*100).toFixed(2)} /100 Bolivianos
        </div><hr>
      </div>
      </div>
</body>
</html>`,document.getElementById("myElement").innerHTML=c,r&&new O.Printd().print(document.getElementById("myElement")),n(l)}).catch(l=>{t(l)})})}static notaOasisVenta(e){return console.log(e),new Promise((r,n)=>{try{const t=k.conversorNumerosALetras,o=new t,s=x().env,d=parseFloat(e.sale?.total||0),i=Math.floor(d),l=Math.round((d-i)*100),c=o.convertToText(i),h={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}};z.toDataURL(`Monto: ${d.toFixed(2)}`,h).then(f=>{let u=`${this.head()}
  <div style='padding-left: 0.5cm;padding-right: 0.5cm'>
    <img src="../../logo.png" alt="logo" style="width: 50px; height: 50px; display: block; margin-left: auto; margin-right: auto;">
    <div class='titulo'>NOTA DE VENTA OASIS</div>
    <div class='titulo2'>${s.razon}<br>${s.direccion}<br>Tel. ${s.telefono}<br>Oruro</div>
    <hr>
    <table>
      <tr><td class='titder'>CLIENTE:</td><td class='contenido'>${e.sale.nombre??""}</td></tr>
      <tr><td class='titder'>CI:</td><td class='contenido'>${e.sale.ci??""}</td></tr>
      <tr><td class='titder'>FECHA:</td><td class='contenido'>${this.formatDate(e.sale.fecha)}</td></tr>
    </table>
    <hr><div class='titulo'>DETALLE</div>`;(e.detalles||[]).forEach(p=>{u+=`<div style='font-size: 12px'><b>${p.productoName}</b></div>`,u+=`<div>
            <span style='font-size: 16px;font-weight: bold'>${p.cantidad}</span> × ${parseFloat(p.precio).toFixed(2)}
            <span style='float:right'>${parseFloat(p.precio*p.cantidad).toFixed(2)}</span>
          </div>`}),u+=`<hr>
    <table style='font-size: 10px;'>
      <tr><td class='titder' style='width: 60%'>TOTAL Bs</td><td class='conte2'>${d.toFixed(2)}</td></tr>
    </table>
    <br>
    <div>Son ${c} ${l.toString().padStart(2,"0")} /100 Bolivianos</div><hr>
    <div class='titulo2' style='font-size: 9px'>Gracias por su compra</div>
    <div style='display: flex;justify-content: center;'>
      <img src="${f}" style="width: 75px; height: 75px;">
    </div>
  </div>
</body>
</html>`,console.log(u),document.getElementById("myElement").innerHTML=u,new O.Printd().print(document.getElementById("myElement")),r(f)}).catch(f=>n(f))}catch(t){n(t)}})}static cotizacion(e,r,n,t,o=!0){return(t==null||t==="")&&(t=0),new Promise((s,d)=>{const i=k.conversorNumerosALetras,c=new i().convertToText(parseInt(n)),h=Ft().format("YYYY-MM-DD"),f={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}},u=x().env;z.toDataURL(`Fecha: ${h} Monto: ${parseFloat(n).toFixed(2)}`,f).then(g=>{let p=`${this.head()}
  <div style='padding-left: 0.5cm;padding-right: 0.5cm'>
  <img src="logo.png" alt="logo" style="width: 100px; height: 50px; display: block; margin-left: auto; margin-right: auto;">
      <div class='titulo'>COTIZACION</div>
      <div class='titulo2'>${u.razon} <br>
      Casa Matriz<br>
      No. Punto de Venta 0<br>
${u.direccion}<br>
Tel. ${u.telefono}<br>
Oruro</div>
<hr>
<table>
<tr><td class='titder'>NOMBRE/RAZÓN SOCIAL:</td><td class='contenido'>${r.nombre}</td>
<tr><td class='titder'>FECHA DE EMISIÓN:</td><td class='contenido'>${h}</td></tr>
</table><hr><div class='titulo'>DETALLE</div>`;e.forEach(F=>{p+=`<div style='font-size: 12px'><b> ${F.nombre} </b></div>`,p+=`<div><span style='font-size: 18px;font-weight: bold'>${F.cantidadVenta}</span> ${parseFloat(F.precioVenta).toFixed(2)} 0.00
                    <span style='float:right'>${parseFloat(F.precioVenta*F.cantidadVenta).toFixed(2)}</span></div>`}),p+=`<hr>
<div>${r.comentario===""||r.comentario===null||r.comentario===void 0?"":"Comentario: "+r.comentario}</div>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>SUBTOTAL Bs</td><td class='conte2'>${parseFloat(n).toFixed(2)}</td></tr>
      <tr><td class='titder' style='width: 60%'>Descuento Bs</td><td class='conte2'>${parseFloat(t).toFixed(2)}</td></tr>
      <tr><td class='titder' style='width: 60%'>TOTAL Bs</td><td class='conte2'>${parseFloat(n-t).toFixed(2)}</td></tr>
      </table>
      <br>
      <div>Son ${c} ${((parseFloat(n)-Math.floor(parseFloat(n)))*100).toFixed(2)} /100 Bolivianos</div><hr>
      <div style='display: flex;justify-content: center;'>
        <img  src="${g}" style="width: 75px; height: 75px; display: block; margin-left: auto; margin-right: auto;">
      </div></div>
      </div>
</body>
</html>`,document.getElementById("myElement").innerHTML=p,o&&new O.Printd().print(document.getElementById("myElement")),s(g)}).catch(g=>{d(g)})})}static notaCompra(e){return console.log("factura",e),new Promise((r,n)=>{const t=k.conversorNumerosALetras,s=new t().convertToText(parseInt(e.total)),d={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}},i=x().env;z.toDataURL(`Fecha: ${e.fecha_emision} Monto: ${parseFloat(e.total).toFixed(2)}`,d).then(async l=>{let c=`${this.head()}
  <div style='padding-left: 0.5cm;padding-right: 0.5cm'>
  <img src="logo.png" alt="logo" style="width: 100px; height: 50px; display: block; margin-left: auto; margin-right: auto;">
      <div class='titulo'>${e.tipo_venta==="EGRESO"?"NOTA DE EGRESO":"NOTA DE COMPRA"}</div>
      <div class='titulo2'>${i.razon} <br>
      Casa Matriz<br>
      No. Punto de Venta 0<br>
${i.direccion}<br>
Tel. ${i.telefono}<br>
Oruro</div>
<hr>
<table>
<tr><td class='titder'>NOMBRE/RAZÓN SOCIAL:</td><td class='contenido'>${e.client?e.client.nombre:""}</td>
</tr><tr><td class='titder'>NIT/CI/CEX:</td><td class='contenido'>${e.client?e.client.nit:""}</td></tr>
<!--<tr><td class='titder'>FECHA DE EMISIÓN:</td><td class='contenido'>${e.fecha_emision}</td></tr>-->
</table><hr><div class='titulo'>DETALLE</div>`;e.buy_details.forEach(f=>{c+=`<div style='font-size: 12px'><b>${f.nombre} </b></div>`,c+=`<div><span style='font-size: 14px;font-weight: bold'>${f.cantidad}</span> ${parseFloat(f.precio).toFixed(2)} 0.00
                    <span style='float:right'>${parseFloat(f.subtotal).toFixed(2)}</span></div>`}),c+=`<hr>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>SUBTOTAL Bs</td><td class='conte2'>${parseFloat(e.total).toFixed(2)}</td></tr>
      <tr><td class='titder' style='width: 60%'>Descuento Bs</td><td class='conte2'>${parseFloat(e.descuento).toFixed(2)}</td></tr>
      <tr><td class='titder' style='width: 60%'>TOTAL Bs</td><td class='conte2'>${parseFloat(e.total-e.descuento).toFixed(2)}</td></tr>
      </table>
      <br>
      <div>Son ${s} ${((parseFloat(e.total)-Math.floor(parseFloat(e.total)))*100).toFixed(2)} /100 Bolivianos</div><hr>
      <div style='display: flex;justify-content: center;'>
        <img  src="${l}" style="width: 75px; height: 75px; display: block; margin-left: auto; margin-right: auto;">
      </div></div>
      </div>
</body>
</html>`,document.getElementById("myElement").innerHTML=c,new O.Printd().print(document.getElementById("myElement")),r(l)}).catch(l=>{n(l)})})}static reportTotal(e,r){const n=e.filter(s=>s.tipoVenta==="Ingreso").reduce((s,d)=>s+d.montoTotal,0),t=e.filter(s=>s.tipoVenta==="Egreso").reduce((s,d)=>s+d.montoTotal,0),o=n-t;return console.log("montoTotal",o),new Promise((s,d)=>{const i=k.conversorNumerosALetras,l=new i,c=Math.abs(o),h=l.convertToText(parseInt(c)),f={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}},u=x().env;z.toDataURL(` Monto: ${parseFloat(o).toFixed(2)}`,f).then(g=>{let p=`${this.head()}
  <div style='padding-left: 0.5cm;padding-right: 0.5cm'>
  <img src="logo.png" alt="logo" style="width: 100px; height: 100px; display: block; margin-left: auto; margin-right: auto;">
      <div class='titulo'>title</div>
      <div class='titulo2'>${u.razon} <br>
      Casa Matriz<br>
      No. Punto de Venta 0<br>
${u.direccion}<br>
Tel. ${u.telefono}<br>
Oruro</div>
<hr>
<table>
</table><hr><div class='titulo'>DETALLE</div>`;e.forEach(E=>{p+=`<div style='font-size: 12px'><b> ${E.user.name} </b></div>`,p+=`<div> ${parseFloat(E.montoTotal).toFixed(2)} ${E.tipoVenta}
          <span style='float:right'> ${E.tipoVenta==="Egreso"?"-":""} ${parseFloat(E.montoTotal).toFixed(2)}</span></div>`}),p+=`<hr>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>SUBTOTAL Bs</td><td class='conte2'>${parseFloat(o).toFixed(2)}</td></tr>
      </table>
      <br>
      <div>Son ${h} ${((parseFloat(o)-Math.floor(parseFloat(o)))*100).toFixed(2)} /100 Bolivianos</div><hr>
      <div style='display: flex;justify-content: center;'>
        <img  src="${g}" style="width: 75px; height: 75px; display: block; margin-left: auto; margin-right: auto;">
      </div></div>
      </div>
</body>
</html>`,document.getElementById("myElement").innerHTML=p,new O.Printd().print(document.getElementById("myElement")),s(g)}).catch(g=>{d(g)})})}static reciboCompra(e){return new Promise((r,n)=>{const t=k.conversorNumerosALetras,s=new t().convertToText(parseInt(e.total)),d={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}},i=x().env;z.toDataURL(`Fecha: ${e.date} Monto: ${parseFloat(e.total).toFixed(2)}`,d).then(l=>{let c=`${this.head()}
    <div style='padding-left: 0.5cm;padding-right: 0.5cm'>
    <img src="logo.png" alt="logo" style="width: 100px; height: 100px; display: block; margin-left: auto; margin-right: auto;">
      <div class='titulo'>RECIBO DE COMPRA</div>
      <div class='titulo2'>${i.razon} <br>
      Casa Matriz<br>
      No. Punto de Venta 0<br>
    ${i.direccion}<br>
    Tel. ${i.telefono}<br>
    Oruro</div>
    <hr>
    <table>
    </table><hr><div class='titulo'>DETALLE</div>`;c+=`<div style='font-size: 12px'><b>${e.product_id} ${e.product.descripcion} </b></div>`,c+=`<div>${e.quantity} ${parseFloat(e.price).toFixed(2)} 0.00
          //           <span style='float:right'>${parseFloat(e.total).toFixed(2)}</span></div>`,c+=`<hr>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>SUBTOTAL Bs</td><td class='conte2'>${parseFloat(e.total).toFixed(2)}</td></tr>
      </table>
      <br>
      <div>Son ${s} ${((parseFloat(e.total)-Math.floor(parseFloat(e.total)))*100).toFixed(2)} /100 Bolivianos</div><hr>
      <div style='display: flex;justify-content: center;'>
        <img  src="${l}" style="width: 75px; height: 75px; display: block; margin-left: auto; margin-right: auto;">
      </div></div>
      </div>
    </body>
    </html>`,document.getElementById("myElement").innerHTML=c,new O.Printd().print(document.getElementById("myElement")),r(l)}).catch(l=>{n(l)})})}static reciboTranferencia(e,r,n,t){return console.log("producto",e,"de",r,"ha",n,"cantidad",t),new Promise((o,s)=>{const d=k.conversorNumerosALetras,l=new d().convertToText(parseInt(t)),c={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}},h=x().env;z.toDataURL(`de: ${r} A: ${n}`,c).then(f=>{let u=`${this.head()}
    <div style='padding-left: 0.5cm;padding-right: 0.5cm'>
    <img src="logo.png" alt="logo" style="width: 100px; height: 100px; display: block; margin-left: auto; margin-right: auto;">
      <div class='titulo'>RECIBO DE TRANSFERENCIA</div>
      <div class='titulo2'>${h.razon} <br>
      Casa Matriz<br>
      No. Punto de Venta 0<br>
    ${h.direccion}<br>
    Tel. ${h.telefono}<br>
    Oruro</div>
    <hr>
    <table>
    </table><hr><div class='titulo'>DETALLE</div>`;u+=`<div style='font-size: 12px'><b>Producto: ${e} de Sucursal${r} a ${n} </b></div>`,u+=`<hr>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>CANTIDAD </td><td class='conte2'>${t+""}</td></tr>
      </table>
      <br>
      <div>Son ${l+""} ${t+""} unidades</div><hr>
      <div style='display: flex;justify-content: center;'>
        <img  src="${f}" style="width: 75px; height: 75px; display: block; margin-left: auto; margin-right: auto;">
      </div></div>
      </div>
    </body>
    </html>`,document.getElementById("myElement").innerHTML=u,new O.Printd().print(document.getElementById("myElement")),o(f)}).catch(f=>{s(f)})})}static head(){return`<html>
<style>
      .titulo{
      font-size: 12px;
      text-align: center;
      font-weight: bold;
      }
      .titulo2{
      font-size: 10px;
      text-align: center;
      }
            .titulo3{
      font-size: 10px;
      text-align: center;
      width:70%;
      }
            .contenido{
      font-size: 10px;
      text-align: left;
      }
      .conte2{
      font-size: 10px;
      text-align: right;
      }
      .titder{
      font-size: 12px;
      text-align: right;
      font-weight: bold;
      }
      hr{
  border-top: 1px dashed   ;
}
  table{
    width:100%
  }
  h1 {
    color: black;
    font-family: sans-serif;
  }
  </style>
<body>
<div style="width: 300px;">`}}export{Ve as I};
