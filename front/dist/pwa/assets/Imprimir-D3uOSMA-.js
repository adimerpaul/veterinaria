import{g as se}from"./_commonjsHelpers-gnU0ypJ3.js";import{i as U}from"./index-CrC-fP_I.js";import{h as Lt}from"./moment-C5S46NFB.js";var R={},Ft;function ge(){if(Ft)return R;Ft=1,Object.defineProperty(R,"__esModule",{value:!0}),R.Printd=R.createIFrame=R.createLinkStyle=R.createStyle=void 0;var s=/^(((http[s]?)|file):)?(\/\/)+([0-9a-zA-Z-_.=?&].+)$/,e=/^((\.|\.\.)?\/)([0-9a-zA-Z-_.=?&]+\/)*([0-9a-zA-Z-_.=?&]+)$/,r=function(i){return s.test(i)||e.test(i)};function n(i,l){var d=i.createElement("style");return d.appendChild(i.createTextNode(l)),d}R.createStyle=n;function t(i,l){var d=i.createElement("link");return d.type="text/css",d.rel="stylesheet",d.href=l,d}R.createLinkStyle=t;function o(i){var l=window.document.createElement("iframe");return l.setAttribute("src","about:blank"),l.setAttribute("style","visibility:hidden;width:0;height:0;position:absolute;z-index:-9999;bottom:0;"),l.setAttribute("width","0"),l.setAttribute("height","0"),l.setAttribute("wmode","opaque"),i.appendChild(l),l}R.createIFrame=o;var a={parent:window.document.body,headElements:[],bodyElements:[]},c=function(){function i(l){this.isLoading=!1,this.hasEvents=!1,this.opts=[a,l||{}].reduce(function(d,h){return Object.keys(h).forEach(function(f){return d[f]=h[f]}),d},{}),this.iframe=o(this.opts.parent)}return i.prototype.getIFrame=function(){return this.iframe},i.prototype.print=function(l,d,h,f){if(!this.isLoading){var u=this.iframe,m=u.contentDocument,E=u.contentWindow;if(!(!m||!E)&&(this.iframe.src="about:blank",this.elCopy=l.cloneNode(!0),!!this.elCopy)){this.isLoading=!0,this.callback=f;var L=E.document;L.open(),L.write('<!DOCTYPE html><html><head><meta charset="utf-8"></head><body></body></html>'),this.addEvents();var y=this.opts,F=y.headElements,B=y.bodyElements;Array.isArray(F)&&F.forEach(function(g){return L.head.appendChild(g)}),Array.isArray(B)&&B.forEach(function(g){return L.body.appendChild(g)}),Array.isArray(d)&&d.forEach(function(g){g&&L.head.appendChild(r(g)?t(L,g):n(L,g))}),L.body.appendChild(this.elCopy),Array.isArray(h)&&h.forEach(function(g){if(g){var I=L.createElement("script");r(g)?I.src=g:I.innerText=g,L.body.appendChild(I)}}),L.close()}}},i.prototype.printURL=function(l,d){this.isLoading||(this.addEvents(),this.isLoading=!0,this.callback=d,this.iframe.src=l)},i.prototype.onBeforePrint=function(l){this.onbeforeprint=l},i.prototype.onAfterPrint=function(l){this.onafterprint=l},i.prototype.launchPrint=function(l){this.isLoading||l.print()},i.prototype.addEvents=function(){var l=this;if(!this.hasEvents){this.hasEvents=!0,this.iframe.addEventListener("load",function(){return l.onLoad()},!1);var d=this.iframe.contentWindow;d&&(this.onbeforeprint&&d.addEventListener("beforeprint",this.onbeforeprint),this.onafterprint&&d.addEventListener("afterprint",this.onafterprint))}},i.prototype.onLoad=function(){var l=this;if(this.iframe){this.isLoading=!1;var d=this.iframe,h=d.contentDocument,f=d.contentWindow;if(!h||!f)return;typeof this.callback=="function"?this.callback({iframe:this.iframe,element:this.elCopy,launchPrint:function(){return l.launchPrint(f)}}):this.launchPrint(f)}},i}();return R.Printd=c,R.default=c,R}var O=ge(),H={},tt,It;function me(){return It||(It=1,tt=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),tt}var et={},x={},Rt;function z(){if(Rt)return x;Rt=1;let s;const e=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return x.getSymbolSize=function(n){if(!n)throw new Error('"version" cannot be null or undefined');if(n<1||n>40)throw new Error('"version" should be in range from 1 to 40');return n*4+17},x.getSymbolTotalCodewords=function(n){return e[n]},x.getBCHDigit=function(r){let n=0;for(;r!==0;)n++,r>>>=1;return n},x.setToSJISFunction=function(n){if(typeof n!="function")throw new Error('"toSJISFunc" is not a valid function.');s=n},x.isKanjiModeEnabled=function(){return typeof s<"u"},x.toSJIS=function(n){return s(n)},x}var nt={},St;function Tt(){return St||(St=1,function(s){s.L={bit:1},s.M={bit:0},s.Q={bit:3},s.H={bit:2};function e(r){if(typeof r!="string")throw new Error("Param is not a string");switch(r.toLowerCase()){case"l":case"low":return s.L;case"m":case"medium":return s.M;case"q":case"quartile":return s.Q;case"h":case"high":return s.H;default:throw new Error("Unknown EC Level: "+r)}}s.isValid=function(n){return n&&typeof n.bit<"u"&&n.bit>=0&&n.bit<4},s.from=function(n,t){if(s.isValid(n))return n;try{return e(n)}catch{return t}}}(nt)),nt}var rt,Pt;function pe(){if(Pt)return rt;Pt=1;function s(){this.buffer=[],this.length=0}return s.prototype={get:function(e){const r=Math.floor(e/8);return(this.buffer[r]>>>7-e%8&1)===1},put:function(e,r){for(let n=0;n<r;n++)this.putBit((e>>>r-n-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(e){const r=Math.floor(this.length/8);this.buffer.length<=r&&this.buffer.push(0),e&&(this.buffer[r]|=128>>>this.length%8),this.length++}},rt=s,rt}var ot,Dt;function ve(){if(Dt)return ot;Dt=1;function s(e){if(!e||e<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=e,this.data=new Uint8Array(e*e),this.reservedBit=new Uint8Array(e*e)}return s.prototype.set=function(e,r,n,t){const o=e*this.size+r;this.data[o]=n,t&&(this.reservedBit[o]=!0)},s.prototype.get=function(e,r){return this.data[e*this.size+r]},s.prototype.xor=function(e,r,n){this.data[e*this.size+r]^=n},s.prototype.isReserved=function(e,r){return this.reservedBit[e*this.size+r]},ot=s,ot}var it={},$t;function ye(){return $t||($t=1,function(s){const e=z().getSymbolSize;s.getRowColCoords=function(n){if(n===1)return[];const t=Math.floor(n/7)+2,o=e(n),a=o===145?26:Math.ceil((o-13)/(2*t-2))*2,c=[o-7];for(let i=1;i<t-1;i++)c[i]=c[i-1]-a;return c.push(6),c.reverse()},s.getPositions=function(n){const t=[],o=s.getRowColCoords(n),a=o.length;for(let c=0;c<a;c++)for(let i=0;i<a;i++)c===0&&i===0||c===0&&i===a-1||c===a-1&&i===0||t.push([o[c],o[i]]);return t}}(it)),it}var st={},xt;function Ee(){if(xt)return st;xt=1;const s=z().getSymbolSize,e=7;return st.getPositions=function(n){const t=s(n);return[[0,0],[t-e,0],[0,t-e]]},st}var at={},Ut;function Ce(){return Ut||(Ut=1,function(s){s.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const e={N1:3,N2:3,N3:40,N4:10};s.isValid=function(t){return t!=null&&t!==""&&!isNaN(t)&&t>=0&&t<=7},s.from=function(t){return s.isValid(t)?parseInt(t,10):void 0},s.getPenaltyN1=function(t){const o=t.size;let a=0,c=0,i=0,l=null,d=null;for(let h=0;h<o;h++){c=i=0,l=d=null;for(let f=0;f<o;f++){let u=t.get(h,f);u===l?c++:(c>=5&&(a+=e.N1+(c-5)),l=u,c=1),u=t.get(f,h),u===d?i++:(i>=5&&(a+=e.N1+(i-5)),d=u,i=1)}c>=5&&(a+=e.N1+(c-5)),i>=5&&(a+=e.N1+(i-5))}return a},s.getPenaltyN2=function(t){const o=t.size;let a=0;for(let c=0;c<o-1;c++)for(let i=0;i<o-1;i++){const l=t.get(c,i)+t.get(c,i+1)+t.get(c+1,i)+t.get(c+1,i+1);(l===4||l===0)&&a++}return a*e.N2},s.getPenaltyN3=function(t){const o=t.size;let a=0,c=0,i=0;for(let l=0;l<o;l++){c=i=0;for(let d=0;d<o;d++)c=c<<1&2047|t.get(l,d),d>=10&&(c===1488||c===93)&&a++,i=i<<1&2047|t.get(d,l),d>=10&&(i===1488||i===93)&&a++}return a*e.N3},s.getPenaltyN4=function(t){let o=0;const a=t.data.length;for(let i=0;i<a;i++)o+=t.data[i];return Math.abs(Math.ceil(o*100/a/5)-10)*e.N4};function r(n,t,o){switch(n){case s.Patterns.PATTERN000:return(t+o)%2===0;case s.Patterns.PATTERN001:return t%2===0;case s.Patterns.PATTERN010:return o%3===0;case s.Patterns.PATTERN011:return(t+o)%3===0;case s.Patterns.PATTERN100:return(Math.floor(t/2)+Math.floor(o/3))%2===0;case s.Patterns.PATTERN101:return t*o%2+t*o%3===0;case s.Patterns.PATTERN110:return(t*o%2+t*o%3)%2===0;case s.Patterns.PATTERN111:return(t*o%3+(t+o)%2)%2===0;default:throw new Error("bad maskPattern:"+n)}}s.applyMask=function(t,o){const a=o.size;for(let c=0;c<a;c++)for(let i=0;i<a;i++)o.isReserved(i,c)||o.xor(i,c,r(t,i,c))},s.getBestMask=function(t,o){const a=Object.keys(s.Patterns).length;let c=0,i=1/0;for(let l=0;l<a;l++){o(l),s.applyMask(l,t);const d=s.getPenaltyN1(t)+s.getPenaltyN2(t)+s.getPenaltyN3(t)+s.getPenaltyN4(t);s.applyMask(l,t),d<i&&(i=d,c=l)}return c}}(at)),at}var J={},Ot;function ae(){if(Ot)return J;Ot=1;const s=Tt(),e=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],r=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return J.getBlocksCount=function(t,o){switch(o){case s.L:return e[(t-1)*4+0];case s.M:return e[(t-1)*4+1];case s.Q:return e[(t-1)*4+2];case s.H:return e[(t-1)*4+3];default:return}},J.getTotalCodewordsCount=function(t,o){switch(o){case s.L:return r[(t-1)*4+0];case s.M:return r[(t-1)*4+1];case s.Q:return r[(t-1)*4+2];case s.H:return r[(t-1)*4+3];default:return}},J}var lt={},j={},qt;function we(){if(qt)return j;qt=1;const s=new Uint8Array(512),e=new Uint8Array(256);return function(){let n=1;for(let t=0;t<255;t++)s[t]=n,e[n]=t,n<<=1,n&256&&(n^=285);for(let t=255;t<512;t++)s[t]=s[t-255]}(),j.log=function(n){if(n<1)throw new Error("log("+n+")");return e[n]},j.exp=function(n){return s[n]},j.mul=function(n,t){return n===0||t===0?0:s[e[n]+e[t]]},j}var kt;function be(){return kt||(kt=1,function(s){const e=we();s.mul=function(n,t){const o=new Uint8Array(n.length+t.length-1);for(let a=0;a<n.length;a++)for(let c=0;c<t.length;c++)o[a+c]^=e.mul(n[a],t[c]);return o},s.mod=function(n,t){let o=new Uint8Array(n);for(;o.length-t.length>=0;){const a=o[0];for(let i=0;i<t.length;i++)o[i]^=e.mul(t[i],a);let c=0;for(;c<o.length&&o[c]===0;)c++;o=o.slice(c)}return o},s.generateECPolynomial=function(n){let t=new Uint8Array([1]);for(let o=0;o<n;o++)t=s.mul(t,new Uint8Array([1,e.exp(o)]));return t}}(lt)),lt}var ct,zt;function Ae(){if(zt)return ct;zt=1;const s=be();function e(r){this.genPoly=void 0,this.degree=r,this.degree&&this.initialize(this.degree)}return e.prototype.initialize=function(n){this.degree=n,this.genPoly=s.generateECPolynomial(this.degree)},e.prototype.encode=function(n){if(!this.genPoly)throw new Error("Encoder not initialized");const t=new Uint8Array(n.length+this.degree);t.set(n);const o=s.mod(t,this.genPoly),a=this.degree-o.length;if(a>0){const c=new Uint8Array(this.degree);return c.set(o,a),c}return o},ct=e,ct}var dt={},ut={},ft={},_t;function le(){return _t||(_t=1,ft.isValid=function(e){return!isNaN(e)&&e>=1&&e<=40}),ft}var S={},Vt;function ce(){if(Vt)return S;Vt=1;const s="[0-9]+",e="[A-Z $%*+\\-./:]+";let r="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";r=r.replace(/u/g,"\\u");const n="(?:(?![A-Z0-9 $%*+\\-./:]|"+r+`)(?:.|[\r
]))+`;S.KANJI=new RegExp(r,"g"),S.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),S.BYTE=new RegExp(n,"g"),S.NUMERIC=new RegExp(s,"g"),S.ALPHANUMERIC=new RegExp(e,"g");const t=new RegExp("^"+r+"$"),o=new RegExp("^"+s+"$"),a=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return S.testKanji=function(i){return t.test(i)},S.testNumeric=function(i){return o.test(i)},S.testAlphanumeric=function(i){return a.test(i)},S}var Ht;function _(){return Ht||(Ht=1,function(s){const e=le(),r=ce();s.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},s.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},s.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},s.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},s.MIXED={bit:-1},s.getCharCountIndicator=function(o,a){if(!o.ccBits)throw new Error("Invalid mode: "+o);if(!e.isValid(a))throw new Error("Invalid version: "+a);return a>=1&&a<10?o.ccBits[0]:a<27?o.ccBits[1]:o.ccBits[2]},s.getBestModeForData=function(o){return r.testNumeric(o)?s.NUMERIC:r.testAlphanumeric(o)?s.ALPHANUMERIC:r.testKanji(o)?s.KANJI:s.BYTE},s.toString=function(o){if(o&&o.id)return o.id;throw new Error("Invalid mode")},s.isValid=function(o){return o&&o.bit&&o.ccBits};function n(t){if(typeof t!="string")throw new Error("Param is not a string");switch(t.toLowerCase()){case"numeric":return s.NUMERIC;case"alphanumeric":return s.ALPHANUMERIC;case"kanji":return s.KANJI;case"byte":return s.BYTE;default:throw new Error("Unknown mode: "+t)}}s.from=function(o,a){if(s.isValid(o))return o;try{return n(o)}catch{return a}}}(ut)),ut}var Yt;function Te(){return Yt||(Yt=1,function(s){const e=z(),r=ae(),n=Tt(),t=_(),o=le(),a=7973,c=e.getBCHDigit(a);function i(f,u,m){for(let E=1;E<=40;E++)if(u<=s.getCapacity(E,m,f))return E}function l(f,u){return t.getCharCountIndicator(f,u)+4}function d(f,u){let m=0;return f.forEach(function(E){const L=l(E.mode,u);m+=L+E.getBitsLength()}),m}function h(f,u){for(let m=1;m<=40;m++)if(d(f,m)<=s.getCapacity(m,u,t.MIXED))return m}s.from=function(u,m){return o.isValid(u)?parseInt(u,10):m},s.getCapacity=function(u,m,E){if(!o.isValid(u))throw new Error("Invalid QR Code version");typeof E>"u"&&(E=t.BYTE);const L=e.getSymbolTotalCodewords(u),y=r.getTotalCodewordsCount(u,m),F=(L-y)*8;if(E===t.MIXED)return F;const B=F-l(E,u);switch(E){case t.NUMERIC:return Math.floor(B/10*3);case t.ALPHANUMERIC:return Math.floor(B/11*2);case t.KANJI:return Math.floor(B/13);case t.BYTE:default:return Math.floor(B/8)}},s.getBestVersionForData=function(u,m){let E;const L=n.from(m,n.M);if(Array.isArray(u)){if(u.length>1)return h(u,L);if(u.length===0)return 1;E=u[0]}else E=u;return i(E.mode,E.getLength(),L)},s.getEncodedBits=function(u){if(!o.isValid(u)||u<7)throw new Error("Invalid QR Code version");let m=u<<12;for(;e.getBCHDigit(m)-c>=0;)m^=a<<e.getBCHDigit(m)-c;return u<<12|m}}(dt)),dt}var ht={},jt;function Be(){if(jt)return ht;jt=1;const s=z(),e=1335,r=21522,n=s.getBCHDigit(e);return ht.getEncodedBits=function(o,a){const c=o.bit<<3|a;let i=c<<10;for(;s.getBCHDigit(i)-n>=0;)i^=e<<s.getBCHDigit(i)-n;return(c<<10|i)^r},ht}var gt={},mt,Kt;function Ne(){if(Kt)return mt;Kt=1;const s=_();function e(r){this.mode=s.NUMERIC,this.data=r.toString()}return e.getBitsLength=function(n){return 10*Math.floor(n/3)+(n%3?n%3*3+1:0)},e.prototype.getLength=function(){return this.data.length},e.prototype.getBitsLength=function(){return e.getBitsLength(this.data.length)},e.prototype.write=function(n){let t,o,a;for(t=0;t+3<=this.data.length;t+=3)o=this.data.substr(t,3),a=parseInt(o,10),n.put(a,10);const c=this.data.length-t;c>0&&(o=this.data.substr(t),a=parseInt(o,10),n.put(a,c*3+1))},mt=e,mt}var pt,Jt;function Me(){if(Jt)return pt;Jt=1;const s=_(),e=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function r(n){this.mode=s.ALPHANUMERIC,this.data=n}return r.getBitsLength=function(t){return 11*Math.floor(t/2)+6*(t%2)},r.prototype.getLength=function(){return this.data.length},r.prototype.getBitsLength=function(){return r.getBitsLength(this.data.length)},r.prototype.write=function(t){let o;for(o=0;o+2<=this.data.length;o+=2){let a=e.indexOf(this.data[o])*45;a+=e.indexOf(this.data[o+1]),t.put(a,11)}this.data.length%2&&t.put(e.indexOf(this.data[o]),6)},pt=r,pt}var vt,Gt;function Le(){if(Gt)return vt;Gt=1;const s=_();function e(r){this.mode=s.BYTE,typeof r=="string"?this.data=new TextEncoder().encode(r):this.data=new Uint8Array(r)}return e.getBitsLength=function(n){return n*8},e.prototype.getLength=function(){return this.data.length},e.prototype.getBitsLength=function(){return e.getBitsLength(this.data.length)},e.prototype.write=function(r){for(let n=0,t=this.data.length;n<t;n++)r.put(this.data[n],8)},vt=e,vt}var yt,Zt;function Fe(){if(Zt)return yt;Zt=1;const s=_(),e=z();function r(n){this.mode=s.KANJI,this.data=n}return r.getBitsLength=function(t){return t*13},r.prototype.getLength=function(){return this.data.length},r.prototype.getBitsLength=function(){return r.getBitsLength(this.data.length)},r.prototype.write=function(n){let t;for(t=0;t<this.data.length;t++){let o=e.toSJIS(this.data[t]);if(o>=33088&&o<=40956)o-=33088;else if(o>=57408&&o<=60351)o-=49472;else throw new Error("Invalid SJIS character: "+this.data[t]+`
Make sure your charset is UTF-8`);o=(o>>>8&255)*192+(o&255),n.put(o,13)}},yt=r,yt}var Et={exports:{}},Qt;function Ie(){return Qt||(Qt=1,function(s){var e={single_source_shortest_paths:function(r,n,t){var o={},a={};a[n]=0;var c=e.PriorityQueue.make();c.push(n,0);for(var i,l,d,h,f,u,m,E,L;!c.empty();){i=c.pop(),l=i.value,h=i.cost,f=r[l]||{};for(d in f)f.hasOwnProperty(d)&&(u=f[d],m=h+u,E=a[d],L=typeof a[d]>"u",(L||E>m)&&(a[d]=m,c.push(d,m),o[d]=l))}if(typeof t<"u"&&typeof a[t]>"u"){var y=["Could not find a path from ",n," to ",t,"."].join("");throw new Error(y)}return o},extract_shortest_path_from_predecessor_list:function(r,n){for(var t=[],o=n;o;)t.push(o),r[o],o=r[o];return t.reverse(),t},find_path:function(r,n,t){var o=e.single_source_shortest_paths(r,n,t);return e.extract_shortest_path_from_predecessor_list(o,t)},PriorityQueue:{make:function(r){var n=e.PriorityQueue,t={},o;r=r||{};for(o in n)n.hasOwnProperty(o)&&(t[o]=n[o]);return t.queue=[],t.sorter=r.sorter||n.default_sorter,t},default_sorter:function(r,n){return r.cost-n.cost},push:function(r,n){var t={value:r,cost:n};this.queue.push(t),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};s.exports=e}(Et)),Et.exports}var Xt;function Re(){return Xt||(Xt=1,function(s){const e=_(),r=Ne(),n=Me(),t=Le(),o=Fe(),a=ce(),c=z(),i=Ie();function l(y){return unescape(encodeURIComponent(y)).length}function d(y,F,B){const g=[];let I;for(;(I=y.exec(B))!==null;)g.push({data:I[0],index:I.index,mode:F,length:I[0].length});return g}function h(y){const F=d(a.NUMERIC,e.NUMERIC,y),B=d(a.ALPHANUMERIC,e.ALPHANUMERIC,y);let g,I;return c.isKanjiModeEnabled()?(g=d(a.BYTE,e.BYTE,y),I=d(a.KANJI,e.KANJI,y)):(g=d(a.BYTE_KANJI,e.BYTE,y),I=[]),F.concat(B,g,I).sort(function(A,b){return A.index-b.index}).map(function(A){return{data:A.data,mode:A.mode,length:A.length}})}function f(y,F){switch(F){case e.NUMERIC:return r.getBitsLength(y);case e.ALPHANUMERIC:return n.getBitsLength(y);case e.KANJI:return o.getBitsLength(y);case e.BYTE:return t.getBitsLength(y)}}function u(y){return y.reduce(function(F,B){const g=F.length-1>=0?F[F.length-1]:null;return g&&g.mode===B.mode?(F[F.length-1].data+=B.data,F):(F.push(B),F)},[])}function m(y){const F=[];for(let B=0;B<y.length;B++){const g=y[B];switch(g.mode){case e.NUMERIC:F.push([g,{data:g.data,mode:e.ALPHANUMERIC,length:g.length},{data:g.data,mode:e.BYTE,length:g.length}]);break;case e.ALPHANUMERIC:F.push([g,{data:g.data,mode:e.BYTE,length:g.length}]);break;case e.KANJI:F.push([g,{data:g.data,mode:e.BYTE,length:l(g.data)}]);break;case e.BYTE:F.push([{data:g.data,mode:e.BYTE,length:l(g.data)}])}}return F}function E(y,F){const B={},g={start:{}};let I=["start"];for(let v=0;v<y.length;v++){const A=y[v],b=[];for(let p=0;p<A.length;p++){const N=A[p],C=""+v+p;b.push(C),B[C]={node:N,lastCount:0},g[C]={};for(let T=0;T<I.length;T++){const w=I[T];B[w]&&B[w].node.mode===N.mode?(g[w][C]=f(B[w].lastCount+N.length,N.mode)-f(B[w].lastCount,N.mode),B[w].lastCount+=N.length):(B[w]&&(B[w].lastCount=N.length),g[w][C]=f(N.length,N.mode)+4+e.getCharCountIndicator(N.mode,F))}}I=b}for(let v=0;v<I.length;v++)g[I[v]].end=0;return{map:g,table:B}}function L(y,F){let B;const g=e.getBestModeForData(y);if(B=e.from(F,g),B!==e.BYTE&&B.bit<g.bit)throw new Error('"'+y+'" cannot be encoded with mode '+e.toString(B)+`.
 Suggested mode is: `+e.toString(g));switch(B===e.KANJI&&!c.isKanjiModeEnabled()&&(B=e.BYTE),B){case e.NUMERIC:return new r(y);case e.ALPHANUMERIC:return new n(y);case e.KANJI:return new o(y);case e.BYTE:return new t(y)}}s.fromArray=function(F){return F.reduce(function(B,g){return typeof g=="string"?B.push(L(g,null)):g.data&&B.push(L(g.data,g.mode)),B},[])},s.fromString=function(F,B){const g=h(F,c.isKanjiModeEnabled()),I=m(g),v=E(I,B),A=i.find_path(v.map,"start","end"),b=[];for(let p=1;p<A.length-1;p++)b.push(v.table[A[p]].node);return s.fromArray(u(b))},s.rawSplit=function(F){return s.fromArray(h(F,c.isKanjiModeEnabled()))}}(gt)),gt}var Wt;function Se(){if(Wt)return et;Wt=1;const s=z(),e=Tt(),r=pe(),n=ve(),t=ye(),o=Ee(),a=Ce(),c=ae(),i=Ae(),l=Te(),d=Be(),h=_(),f=Re();function u(v,A){const b=v.size,p=o.getPositions(A);for(let N=0;N<p.length;N++){const C=p[N][0],T=p[N][1];for(let w=-1;w<=7;w++)if(!(C+w<=-1||b<=C+w))for(let M=-1;M<=7;M++)T+M<=-1||b<=T+M||(w>=0&&w<=6&&(M===0||M===6)||M>=0&&M<=6&&(w===0||w===6)||w>=2&&w<=4&&M>=2&&M<=4?v.set(C+w,T+M,!0,!0):v.set(C+w,T+M,!1,!0))}}function m(v){const A=v.size;for(let b=8;b<A-8;b++){const p=b%2===0;v.set(b,6,p,!0),v.set(6,b,p,!0)}}function E(v,A){const b=t.getPositions(A);for(let p=0;p<b.length;p++){const N=b[p][0],C=b[p][1];for(let T=-2;T<=2;T++)for(let w=-2;w<=2;w++)T===-2||T===2||w===-2||w===2||T===0&&w===0?v.set(N+T,C+w,!0,!0):v.set(N+T,C+w,!1,!0)}}function L(v,A){const b=v.size,p=l.getEncodedBits(A);let N,C,T;for(let w=0;w<18;w++)N=Math.floor(w/3),C=w%3+b-8-3,T=(p>>w&1)===1,v.set(N,C,T,!0),v.set(C,N,T,!0)}function y(v,A,b){const p=v.size,N=d.getEncodedBits(A,b);let C,T;for(C=0;C<15;C++)T=(N>>C&1)===1,C<6?v.set(C,8,T,!0):C<8?v.set(C+1,8,T,!0):v.set(p-15+C,8,T,!0),C<8?v.set(8,p-C-1,T,!0):C<9?v.set(8,15-C-1+1,T,!0):v.set(8,15-C-1,T,!0);v.set(p-8,8,1,!0)}function F(v,A){const b=v.size;let p=-1,N=b-1,C=7,T=0;for(let w=b-1;w>0;w-=2)for(w===6&&w--;;){for(let M=0;M<2;M++)if(!v.isReserved(N,w-M)){let $=!1;T<A.length&&($=(A[T]>>>C&1)===1),v.set(N,w-M,$),C--,C===-1&&(T++,C=7)}if(N+=p,N<0||b<=N){N-=p,p=-p;break}}}function B(v,A,b){const p=new r;b.forEach(function(M){p.put(M.mode.bit,4),p.put(M.getLength(),h.getCharCountIndicator(M.mode,v)),M.write(p)});const N=s.getSymbolTotalCodewords(v),C=c.getTotalCodewordsCount(v,A),T=(N-C)*8;for(p.getLengthInBits()+4<=T&&p.put(0,4);p.getLengthInBits()%8!==0;)p.putBit(0);const w=(T-p.getLengthInBits())/8;for(let M=0;M<w;M++)p.put(M%2?17:236,8);return g(p,v,A)}function g(v,A,b){const p=s.getSymbolTotalCodewords(A),N=c.getTotalCodewordsCount(A,b),C=p-N,T=c.getBlocksCount(A,b),w=p%T,M=T-w,$=Math.floor(p/T),Y=Math.floor(C/T),ue=Y+1,Bt=$-Y,fe=new i(Bt);let Z=0;const K=new Array(T),Nt=new Array(T);let Q=0;const he=new Uint8Array(v.buffer);for(let V=0;V<T;V++){const W=V<M?Y:ue;K[V]=he.slice(Z,Z+W),Nt[V]=fe.encode(K[V]),Z+=W,Q=Math.max(Q,W)}const X=new Uint8Array(p);let Mt=0,P,D;for(P=0;P<Q;P++)for(D=0;D<T;D++)P<K[D].length&&(X[Mt++]=K[D][P]);for(P=0;P<Bt;P++)for(D=0;D<T;D++)X[Mt++]=Nt[D][P];return X}function I(v,A,b,p){let N;if(Array.isArray(v))N=f.fromArray(v);else if(typeof v=="string"){let $=A;if(!$){const Y=f.rawSplit(v);$=l.getBestVersionForData(Y,b)}N=f.fromString(v,$||40)}else throw new Error("Invalid data");const C=l.getBestVersionForData(N,b);if(!C)throw new Error("The amount of data is too big to be stored in a QR Code");if(!A)A=C;else if(A<C)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+C+`.
`);const T=B(A,b,N),w=s.getSymbolSize(A),M=new n(w);return u(M,A),m(M),E(M,A),y(M,b,0),A>=7&&L(M,A),F(M,T),isNaN(p)&&(p=a.getBestMask(M,y.bind(null,M,b))),a.applyMask(p,M),y(M,b,p),{modules:M,version:A,errorCorrectionLevel:b,maskPattern:p,segments:N}}return et.create=function(A,b){if(typeof A>"u"||A==="")throw new Error("No input text");let p=e.M,N,C;return typeof b<"u"&&(p=e.from(b.errorCorrectionLevel,e.M),N=l.from(b.version),C=a.from(b.maskPattern),b.toSJISFunc&&s.setToSJISFunction(b.toSJISFunc)),I(A,N,p,C)},et}var Ct={},wt={},te;function de(){return te||(te=1,function(s){function e(r){if(typeof r=="number"&&(r=r.toString()),typeof r!="string")throw new Error("Color should be defined as hex string");let n=r.slice().replace("#","").split("");if(n.length<3||n.length===5||n.length>8)throw new Error("Invalid hex color: "+r);(n.length===3||n.length===4)&&(n=Array.prototype.concat.apply([],n.map(function(o){return[o,o]}))),n.length===6&&n.push("F","F");const t=parseInt(n.join(""),16);return{r:t>>24&255,g:t>>16&255,b:t>>8&255,a:t&255,hex:"#"+n.slice(0,6).join("")}}s.getOptions=function(n){n||(n={}),n.color||(n.color={});const t=typeof n.margin>"u"||n.margin===null||n.margin<0?4:n.margin,o=n.width&&n.width>=21?n.width:void 0,a=n.scale||4;return{width:o,scale:o?4:a,margin:t,color:{dark:e(n.color.dark||"#000000ff"),light:e(n.color.light||"#ffffffff")},type:n.type,rendererOpts:n.rendererOpts||{}}},s.getScale=function(n,t){return t.width&&t.width>=n+t.margin*2?t.width/(n+t.margin*2):t.scale},s.getImageWidth=function(n,t){const o=s.getScale(n,t);return Math.floor((n+t.margin*2)*o)},s.qrToImageData=function(n,t,o){const a=t.modules.size,c=t.modules.data,i=s.getScale(a,o),l=Math.floor((a+o.margin*2)*i),d=o.margin*i,h=[o.color.light,o.color.dark];for(let f=0;f<l;f++)for(let u=0;u<l;u++){let m=(f*l+u)*4,E=o.color.light;if(f>=d&&u>=d&&f<l-d&&u<l-d){const L=Math.floor((f-d)/i),y=Math.floor((u-d)/i);E=h[c[L*a+y]?1:0]}n[m++]=E.r,n[m++]=E.g,n[m++]=E.b,n[m]=E.a}}}(wt)),wt}var ee;function Pe(){return ee||(ee=1,function(s){const e=de();function r(t,o,a){t.clearRect(0,0,o.width,o.height),o.style||(o.style={}),o.height=a,o.width=a,o.style.height=a+"px",o.style.width=a+"px"}function n(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}s.render=function(o,a,c){let i=c,l=a;typeof i>"u"&&(!a||!a.getContext)&&(i=a,a=void 0),a||(l=n()),i=e.getOptions(i);const d=e.getImageWidth(o.modules.size,i),h=l.getContext("2d"),f=h.createImageData(d,d);return e.qrToImageData(f.data,o,i),r(h,l,d),h.putImageData(f,0,0),l},s.renderToDataURL=function(o,a,c){let i=c;typeof i>"u"&&(!a||!a.getContext)&&(i=a,a=void 0),i||(i={});const l=s.render(o,a,i),d=i.type||"image/png",h=i.rendererOpts||{};return l.toDataURL(d,h.quality)}}(Ct)),Ct}var bt={},ne;function De(){if(ne)return bt;ne=1;const s=de();function e(t,o){const a=t.a/255,c=o+'="'+t.hex+'"';return a<1?c+" "+o+'-opacity="'+a.toFixed(2).slice(1)+'"':c}function r(t,o,a){let c=t+o;return typeof a<"u"&&(c+=" "+a),c}function n(t,o,a){let c="",i=0,l=!1,d=0;for(let h=0;h<t.length;h++){const f=Math.floor(h%o),u=Math.floor(h/o);!f&&!l&&(l=!0),t[h]?(d++,h>0&&f>0&&t[h-1]||(c+=l?r("M",f+a,.5+u+a):r("m",i,0),i=0,l=!1),f+1<o&&t[h+1]||(c+=r("h",d),d=0)):i++}return c}return bt.render=function(o,a,c){const i=s.getOptions(a),l=o.modules.size,d=o.modules.data,h=l+i.margin*2,f=i.color.light.a?"<path "+e(i.color.light,"fill")+' d="M0 0h'+h+"v"+h+'H0z"/>':"",u="<path "+e(i.color.dark,"stroke")+' d="'+n(d,l,i.margin)+'"/>',m='viewBox="0 0 '+h+" "+h+'"',L='<svg xmlns="http://www.w3.org/2000/svg" '+(i.width?'width="'+i.width+'" height="'+i.width+'" ':"")+m+' shape-rendering="crispEdges">'+f+u+`</svg>
`;return typeof c=="function"&&c(null,L),L},bt}var re;function $e(){if(re)return H;re=1;const s=me(),e=Se(),r=Pe(),n=De();function t(o,a,c,i,l){const d=[].slice.call(arguments,1),h=d.length,f=typeof d[h-1]=="function";if(!f&&!s())throw new Error("Callback required as last argument");if(f){if(h<2)throw new Error("Too few arguments provided");h===2?(l=c,c=a,a=i=void 0):h===3&&(a.getContext&&typeof l>"u"?(l=i,i=void 0):(l=i,i=c,c=a,a=void 0))}else{if(h<1)throw new Error("Too few arguments provided");return h===1?(c=a,a=i=void 0):h===2&&!a.getContext&&(i=c,c=a,a=void 0),new Promise(function(u,m){try{const E=e.create(c,i);u(o(E,a,i))}catch(E){m(E)}})}try{const u=e.create(c,i);l(null,o(u,a,i))}catch(u){l(u)}}return H.create=e.create,H.toCanvas=t.bind(null,r.render),H.toDataURL=t.bind(null,r.renderToDataURL),H.toString=t.bind(null,function(o,a,c){return n.render(o,c)}),H}var xe=$e();const q=se(xe);var At,oe;function Ue(){if(oe)return At;oe=1;class s{constructor(){this.units=["cero","uno","dos","tres","cuatro","cinco","seis","siete","ocho","nueve"],this.tenToSixteen=["diez","once","doce","trece","catorce","quince","dieciséis"],this.tens=["treinta","cuarenta","cincuenta","sesenta","setenta","ochenta","noventa"]}convertirNroMesAtexto(r){switch(typeof r=="number"&&(r=String(r)),r=this.deleteZerosLeft(r),r){case"1":return"Enero";case"2":return"Febrero";case"3":return"Marzo";case"4":return"Abril";case"5":return"Mayo";case"6":return"Junio";case"7":return"Julio";case"8":return"Agosto";case"9":return"Septiembre";case"10":return"Octubre";case"11":return"Noviembre";case"12":return"Diciembre";default:throw"Numero de mes inválido"}}convertToText(r){if(typeof r=="number"&&(r=String(r)),r=this.deleteZerosLeft(r),!this.validateNumber(r))throw"Número inválido, no se puede convertir!";return this.getName(r)}deleteZerosLeft(r){let n=0,t=!0;for(n=0;n<r.length;n++)if(r.charAt(n)!=0){t=!1;break}return t?"0":r.substr(n)}validateNumber(r){return!(isNaN(r)||r===""||r.indexOf(".")>=0||r.indexOf("-")>=0)}getName(r){return r=this.deleteZerosLeft(r),r.length===1?this.getUnits(r):r.length===2?this.getTens(r):r.length===3?this.getHundreds(r):r.length<7?this.getThousands(r):r.length<13?this.getPeriod(r,6,"millón"):r.length<19?this.getPeriod(r,12,"billón"):"Número demasiado grande."}getUnits(r){let n=parseInt(r);return this.units[n]}getTens(r){let n=r.charAt(1);if(r<17)return this.tenToSixteen[r-10];if(r<20)return"dieci"+this.getUnits(n);switch(r){case"20":return"veinte";case"22":return"veintidós";case"23":return"veintitrés";case"26":return"veintiséis"}if(r<30)return"veinti"+this.getUnits(n);let t=this.tens[r.charAt(0)-3];return n>0&&(t+=" y "+this.getUnits(n)),t}getHundreds(r){let n="",t=r.charAt(0),o=r.substr(1);if(r==100)return"cien";switch(t){case"1":n="ciento";break;case"5":n="quinientos";break;case"7":n="setecientos";break;case"9":n="novecientos"}return n===""&&(n=this.getUnits(t)+"cientos"),o>0&&(n+=" "+this.getName(o)),n}getThousands(r){let n="mil",t=r.length-3,o=r.substr(0,t),a=r.substr(t);return o>1&&(n=this.getName(o).replace("uno","un")+" mil"),a>0&&(n+=" "+this.getName(a)),n}getPeriod(r,n,t){let o="un "+t,a=r.length-n,c=r.substr(0,a),i=r.substr(a);return c>1&&(o=this.getName(c).replace("uno","un")+" "+t.replace("ó","o")+"es"),i>0&&(o+=" "+this.getName(i)),o}}return At={conversorNumerosALetras:s},At}var Oe=Ue();const k=se(Oe);var G={},ie;function qe(){if(ie)return G;ie=1,Object.defineProperty(G,"__esModule",{value:!0});function s(i){switch(i){case 1:return"Un";case 2:return"Dos";case 3:return"Tres";case 4:return"Cuatro";case 5:return"Cinco";case 6:return"Seis";case 7:return"Siete";case 8:return"Ocho";case 9:return"Nueve";default:return""}}function e(i,l){return l>0?i+" y "+s(l):i}function r(i){var l=Math.floor(i/10),d=i-l*10;switch(l){case 1:switch(d){case 0:return"Diez";case 1:return"Once";case 2:return"Doce";case 3:return"Trece";case 4:return"Catorce";case 5:return"Quince";default:return"Dieci"+s(d).toLowerCase()}case 2:switch(d){case 0:return"Veinte";default:return"Veinti"+s(d).toLowerCase()}case 3:return e("Treinta",d);case 4:return e("Cuarenta",d);case 5:return e("Cincuenta",d);case 6:return e("Sesenta",d);case 7:return e("Setenta",d);case 8:return e("Ochenta",d);case 9:return e("Noventa",d);case 0:return s(d);default:return""}}function n(i){var l=Math.floor(i/100),d=i-l*100;switch(l){case 1:return d>0?"Ciento "+r(d):"Cien";case 2:return"Doscientos "+r(d);case 3:return"Trescientos "+r(d);case 4:return"Cuatrocientos "+r(d);case 5:return"Quinientos "+r(d);case 6:return"Seiscientos "+r(d);case 7:return"Setecientos "+r(d);case 8:return"Ochocientos "+r(d);case 9:return"Novecientos "+r(d);default:return r(d)}}function t(i,l,d,h){var f=Math.floor(i/l),u=i-f*l,m="";return f>0&&(f>1?m=n(f)+" "+h:m=d),u>0&&(m+=""),m}function o(i){var l=1e3,d=Math.floor(i/l),h=i-d*l,f=t(i,l,"Un Mil","Mil"),u=n(h);return f===""?u:(f+" "+u).trim()}function a(i){var l=1e6,d=Math.floor(i/l),h=i-d*l,f=t(i,l,"Un Millón de","Millones de"),u=o(h);return f===""?u:(f+" "+u).trim()}function c(i){var l={enteros:Math.floor(i),centavos:Math.round(i*100)-Math.floor(i)*100,letrasCentavos:"",letrasMonedaPlural:"Pesos",letrasMonedaSingular:"Peso",letrasMonedaCentavoPlural:"/100 M.N.",letrasMonedaCentavoSingular:"/100 M.N."};return l.centavos>=0&&(l.letrasCentavos=function(){return l.centavos>=1&l.centavos<=9?"0"+l.centavos+l.letrasMonedaCentavoSingular:l.centavos===0?"00"+l.letrasMonedaCentavoSingular:l.centavos+l.letrasMonedaCentavoPlural}()),l.enteros===0?("Cero "+l.letrasMonedaPlural+" "+l.letrasCentavos).trim():l.enteros===1?(a(l.enteros)+" "+l.letrasMonedaSingular+" "+l.letrasCentavos).trim():(a(l.enteros)+" "+l.letrasMonedaPlural+" "+l.letrasCentavos).trim()}return G.NumerosALetras=c,G}qe();class Ve{static factura(e){return console.log("factura",e),new Promise((r,n)=>{const t=k.conversorNumerosALetras,a=new t().convertToText(parseInt(e.total)),c={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}},i=U().env;console.log(i);const l=e.nombre+" "+e.numeroFactura;q.toDataURL(l,c).then(d=>{let h=`${this.head()}
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
      <div>Son ${a} ${((parseFloat(e.total)-Math.floor(parseFloat(e.total)))*100).toFixed(2)} /100 Bolivianos</div><hr>
      <div class='titulo2' style='font-size: 9px'>
      ESTA FACTURA CONTRIBUYE AL DESARROLLO DEL PAÍS,<br>
      EL USO ILÍCITO SERÁ SANCIONADO PENALMENTE DE<br>
      ACUERDO A LEY<br><br>
      ${e.leyenda} <br><br>
      “Este documento es la Representación Gráfica de un<br>
      Documento Fiscal Digital emitido en una modalidad de<br>
      facturación en línea”</div><br>
      <div style='display: flex;justify-content: center;'> <img  src="${d}" ></div></div>
      </div>
</body>
</html>`,document.getElementById("myElement").innerHTML=h,new O.Printd().print(document.getElementById("myElement")),r(d)}).catch(d=>{n(d)})})}static formatDate(e){return e==null||e===""?"":Lt(e).format("DD/MM/YYYY HH:mm A")}static nota(e,r=!0){return console.log("factura",e),new Promise((n,t)=>{const o=k.conversorNumerosALetras,c=new o().convertToText(parseInt(e.total)),i={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}};U().env,q.toDataURL(`Fecha: ${e.fecha_emision} Monto: ${parseFloat(e.total).toFixed(2)}`,i).then(l=>{let d=`${this.head()}
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
</table><hr><div class='titulo'>DETALLE</div>`;e.details.forEach(h=>{console.log("r",h),d+=`<div style='font-size: 12px'><b> ${h.producto?.nombre} </b></div>`,d+=`<div>
                  <span style='font-size: 18px;font-weight: bold'>
                      ${h.cantidad}
                  </span>
                  <span>
                  ${parseFloat(h.precio).toFixed(2)}
                  </span>

                  <span style='float:right'>
                      ${parseFloat(h.subtotal).toFixed(2)}
                  </span>
                  </div>`}),d+=`<hr>
<div>${e.comentarioDoctor===""||e.comentarioDoctor===null||e.comentarioDoctor===void 0?"":"Comentario: "+e.comentarioDoctor}</div>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>SUBTOTAL Bs</td><td class='titder'>${parseFloat(e.total).toFixed(2)}</td></tr>

      </table>
      <br>
        <div>
        Son ${c} ${((parseFloat(e.total)-Math.floor(parseFloat(e.total)))*100).toFixed(2)} /100 Bolivianos
        </div><hr>
      </div>
      </div>
</body>
</html>`,document.getElementById("myElement").innerHTML=d,r&&new O.Printd().print(document.getElementById("myElement")),n(l)}).catch(l=>{t(l)})})}static cotizacion(e,r,n,t,o=!0){return(t==null||t==="")&&(t=0),new Promise((a,c)=>{const i=k.conversorNumerosALetras,d=new i().convertToText(parseInt(n)),h=Lt().format("YYYY-MM-DD"),f={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}},u=U().env;q.toDataURL(`Fecha: ${h} Monto: ${parseFloat(n).toFixed(2)}`,f).then(m=>{let E=`${this.head()}
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
</table><hr><div class='titulo'>DETALLE</div>`;e.forEach(L=>{E+=`<div style='font-size: 12px'><b> ${L.nombre} </b></div>`,E+=`<div><span style='font-size: 18px;font-weight: bold'>${L.cantidadVenta}</span> ${parseFloat(L.precioVenta).toFixed(2)} 0.00
                    <span style='float:right'>${parseFloat(L.precioVenta*L.cantidadVenta).toFixed(2)}</span></div>`}),E+=`<hr>
<div>${r.comentario===""||r.comentario===null||r.comentario===void 0?"":"Comentario: "+r.comentario}</div>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>SUBTOTAL Bs</td><td class='conte2'>${parseFloat(n).toFixed(2)}</td></tr>
      <tr><td class='titder' style='width: 60%'>Descuento Bs</td><td class='conte2'>${parseFloat(t).toFixed(2)}</td></tr>
      <tr><td class='titder' style='width: 60%'>TOTAL Bs</td><td class='conte2'>${parseFloat(n-t).toFixed(2)}</td></tr>
      </table>
      <br>
      <div>Son ${d} ${((parseFloat(n)-Math.floor(parseFloat(n)))*100).toFixed(2)} /100 Bolivianos</div><hr>
      <div style='display: flex;justify-content: center;'>
        <img  src="${m}" style="width: 75px; height: 75px; display: block; margin-left: auto; margin-right: auto;">
      </div></div>
      </div>
</body>
</html>`,document.getElementById("myElement").innerHTML=E,o&&new O.Printd().print(document.getElementById("myElement")),a(m)}).catch(m=>{c(m)})})}static notaCompra(e){return console.log("factura",e),new Promise((r,n)=>{const t=k.conversorNumerosALetras,a=new t().convertToText(parseInt(e.total)),c={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}},i=U().env;q.toDataURL(`Fecha: ${e.fecha_emision} Monto: ${parseFloat(e.total).toFixed(2)}`,c).then(async l=>{let d=`${this.head()}
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
</table><hr><div class='titulo'>DETALLE</div>`;e.buy_details.forEach(f=>{d+=`<div style='font-size: 12px'><b>${f.nombre} </b></div>`,d+=`<div><span style='font-size: 14px;font-weight: bold'>${f.cantidad}</span> ${parseFloat(f.precio).toFixed(2)} 0.00
                    <span style='float:right'>${parseFloat(f.subtotal).toFixed(2)}</span></div>`}),d+=`<hr>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>SUBTOTAL Bs</td><td class='conte2'>${parseFloat(e.total).toFixed(2)}</td></tr>
      <tr><td class='titder' style='width: 60%'>Descuento Bs</td><td class='conte2'>${parseFloat(e.descuento).toFixed(2)}</td></tr>
      <tr><td class='titder' style='width: 60%'>TOTAL Bs</td><td class='conte2'>${parseFloat(e.total-e.descuento).toFixed(2)}</td></tr>
      </table>
      <br>
      <div>Son ${a} ${((parseFloat(e.total)-Math.floor(parseFloat(e.total)))*100).toFixed(2)} /100 Bolivianos</div><hr>
      <div style='display: flex;justify-content: center;'>
        <img  src="${l}" style="width: 75px; height: 75px; display: block; margin-left: auto; margin-right: auto;">
      </div></div>
      </div>
</body>
</html>`,document.getElementById("myElement").innerHTML=d,new O.Printd().print(document.getElementById("myElement")),r(l)}).catch(l=>{n(l)})})}static reportTotal(e,r){const n=e.filter(a=>a.tipoVenta==="Ingreso").reduce((a,c)=>a+c.montoTotal,0),t=e.filter(a=>a.tipoVenta==="Egreso").reduce((a,c)=>a+c.montoTotal,0),o=n-t;return console.log("montoTotal",o),new Promise((a,c)=>{const i=k.conversorNumerosALetras,l=new i,d=Math.abs(o),h=l.convertToText(parseInt(d)),f={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}},u=U().env;q.toDataURL(` Monto: ${parseFloat(o).toFixed(2)}`,f).then(m=>{let E=`${this.head()}
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
</table><hr><div class='titulo'>DETALLE</div>`;e.forEach(y=>{E+=`<div style='font-size: 12px'><b> ${y.user.name} </b></div>`,E+=`<div> ${parseFloat(y.montoTotal).toFixed(2)} ${y.tipoVenta}
          <span style='float:right'> ${y.tipoVenta==="Egreso"?"-":""} ${parseFloat(y.montoTotal).toFixed(2)}</span></div>`}),E+=`<hr>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>SUBTOTAL Bs</td><td class='conte2'>${parseFloat(o).toFixed(2)}</td></tr>
      </table>
      <br>
      <div>Son ${h} ${((parseFloat(o)-Math.floor(parseFloat(o)))*100).toFixed(2)} /100 Bolivianos</div><hr>
      <div style='display: flex;justify-content: center;'>
        <img  src="${m}" style="width: 75px; height: 75px; display: block; margin-left: auto; margin-right: auto;">
      </div></div>
      </div>
</body>
</html>`,document.getElementById("myElement").innerHTML=E,new O.Printd().print(document.getElementById("myElement")),a(m)}).catch(m=>{c(m)})})}static reciboCompra(e){return new Promise((r,n)=>{const t=k.conversorNumerosALetras,a=new t().convertToText(parseInt(e.total)),c={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}},i=U().env;q.toDataURL(`Fecha: ${e.date} Monto: ${parseFloat(e.total).toFixed(2)}`,c).then(l=>{let d=`${this.head()}
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
    </table><hr><div class='titulo'>DETALLE</div>`;d+=`<div style='font-size: 12px'><b>${e.product_id} ${e.product.descripcion} </b></div>`,d+=`<div>${e.quantity} ${parseFloat(e.price).toFixed(2)} 0.00
          //           <span style='float:right'>${parseFloat(e.total).toFixed(2)}</span></div>`,d+=`<hr>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>SUBTOTAL Bs</td><td class='conte2'>${parseFloat(e.total).toFixed(2)}</td></tr>
      </table>
      <br>
      <div>Son ${a} ${((parseFloat(e.total)-Math.floor(parseFloat(e.total)))*100).toFixed(2)} /100 Bolivianos</div><hr>
      <div style='display: flex;justify-content: center;'>
        <img  src="${l}" style="width: 75px; height: 75px; display: block; margin-left: auto; margin-right: auto;">
      </div></div>
      </div>
    </body>
    </html>`,document.getElementById("myElement").innerHTML=d,new O.Printd().print(document.getElementById("myElement")),r(l)}).catch(l=>{n(l)})})}static reciboTranferencia(e,r,n,t){return console.log("producto",e,"de",r,"ha",n,"cantidad",t),new Promise((o,a)=>{const c=k.conversorNumerosALetras,l=new c().convertToText(parseInt(t)),d={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}},h=U().env;q.toDataURL(`de: ${r} A: ${n}`,d).then(f=>{let u=`${this.head()}
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
    </html>`,document.getElementById("myElement").innerHTML=u,new O.Printd().print(document.getElementById("myElement")),o(f)}).catch(f=>{a(f)})})}static head(){return`<html>
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
