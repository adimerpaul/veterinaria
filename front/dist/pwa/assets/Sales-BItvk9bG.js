import{i as N,g as at,r as y,V as lt,a0 as A,o as $,a,b as l,w as d,Q as O,e as P,ao as G,ak as F,c as w,al as U,f as D,W as B,$ as z,t as C,Z as R,_ as q,a1 as H,a2 as W,h as ot}from"./index-Bxzzzh3w.js";import{Q as K,b as it}from"./QSelect-CFRO6gX4.js";import{Q as X}from"./QForm-CiqTuq1d.js";import{Q as j,a as M}from"./format-BowtMuZ1.js";import{Q as L}from"./QItemLabel-DOqrTAYA.js";import{Q as J}from"./QList-DB4l0-9C.js";import{Q as st}from"./QMarkupTable-Bsdy-APE.js";import{Q as nt}from"./QPage-DrPVOnkl.js";import{Q as rt}from"./QSpace-Bmcwb303.js";import{h as b}from"./moment-C5S46NFB.js";var _={},tt;function dt(){if(tt)return _;tt=1,Object.defineProperty(_,"__esModule",{value:!0}),_.Printd=_.createIFrame=_.createLinkStyle=_.createStyle=void 0;var I=/^(((http[s]?)|file):)?(\/\/)+([0-9a-zA-Z-_.=?&].+)$/,n=/^((\.|\.\.)?\/)([0-9a-zA-Z-_.=?&]+\/)*([0-9a-zA-Z-_.=?&]+)$/,m=function(r){return I.test(r)||n.test(r)};function p(r,t){var o=r.createElement("style");return o.appendChild(r.createTextNode(t)),o}_.createStyle=p;function v(r,t){var o=r.createElement("link");return o.type="text/css",o.rel="stylesheet",o.href=t,o}_.createLinkStyle=v;function f(r){var t=window.document.createElement("iframe");return t.setAttribute("src","about:blank"),t.setAttribute("style","visibility:hidden;width:0;height:0;position:absolute;z-index:-9999;bottom:0;"),t.setAttribute("width","0"),t.setAttribute("height","0"),t.setAttribute("wmode","opaque"),r.appendChild(t),t}_.createIFrame=f;var c={parent:window.document.body,headElements:[],bodyElements:[]},h=function(){function r(t){this.isLoading=!1,this.hasEvents=!1,this.opts=[c,t||{}].reduce(function(o,u){return Object.keys(u).forEach(function(x){return o[x]=u[x]}),o},{}),this.iframe=f(this.opts.parent)}return r.prototype.getIFrame=function(){return this.iframe},r.prototype.print=function(t,o,u,x){if(!this.isLoading){var E=this.iframe,Q=E.contentDocument,V=E.contentWindow;if(!(!Q||!V)&&(this.iframe.src="about:blank",this.elCopy=t.cloneNode(!0),!!this.elCopy)){this.isLoading=!0,this.callback=x;var g=V.document;g.open(),g.write('<!DOCTYPE html><html><head><meta charset="utf-8"></head><body></body></html>'),this.addEvents();var S=this.opts,T=S.headElements,k=S.bodyElements;Array.isArray(T)&&T.forEach(function(i){return g.head.appendChild(i)}),Array.isArray(k)&&k.forEach(function(i){return g.body.appendChild(i)}),Array.isArray(o)&&o.forEach(function(i){i&&g.head.appendChild(m(i)?v(g,i):p(g,i))}),g.body.appendChild(this.elCopy),Array.isArray(u)&&u.forEach(function(i){if(i){var e=g.createElement("script");m(i)?e.src=i:e.innerText=i,g.body.appendChild(e)}}),g.close()}}},r.prototype.printURL=function(t,o){this.isLoading||(this.addEvents(),this.isLoading=!0,this.callback=o,this.iframe.src=t)},r.prototype.onBeforePrint=function(t){this.onbeforeprint=t},r.prototype.onAfterPrint=function(t){this.onafterprint=t},r.prototype.launchPrint=function(t){this.isLoading||t.print()},r.prototype.addEvents=function(){var t=this;if(!this.hasEvents){this.hasEvents=!0,this.iframe.addEventListener("load",function(){return t.onLoad()},!1);var o=this.iframe.contentWindow;o&&(this.onbeforeprint&&o.addEventListener("beforeprint",this.onbeforeprint),this.onafterprint&&o.addEventListener("afterprint",this.onafterprint))}},r.prototype.onLoad=function(){var t=this;if(this.iframe){this.isLoading=!1;var o=this.iframe,u=o.contentDocument,x=o.contentWindow;if(!u||!x)return;typeof this.callback=="function"?this.callback({iframe:this.iframe,element:this.elCopy,launchPrint:function(){return t.launchPrint(x)}}):this.launchPrint(x)}},r}();return _.Printd=h,_.default=h,_}var Z=dt();class et{static dateDmYHis(n){const p=["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Set","Oct","Nov","Dic"][b(String(n)).format("MM")-1];return n?b(String(n)).format("DD")+" "+p+" "+b(String(n)).format("YYYY")+" "+b(String(n)).format("hh:mm A"):""}static imprimirSalas(n,m,p,v){let f='<table class="table">',c=0;n.forEach(t=>{f+=`
        <tr style="border-top: 1px solid black; border-bottom: 1px solid black;">
          <td>${t.nombre}</td>
          <td>${t.sala}</td>
          <td>${t.horario}</td>
          <td>${t.estado}</td>
          <td class="text-right">${t.total}</td>
        </tr>
      `,c+=parseInt(t.total)}),f+=`
      <tr style="border-top: 1px solid black; border-bottom: 1px solid black;">
        <td class="text-right"></td>
        <td class="text-right"></td>
        <td class="text-right"></td>
        <td class="text-right text-bold">Total</td>
        <td class="text-right">${c.toFixed(2)}</td>
      </tr>
    `,f+="</table>";const h=`
    <style>
        .text-right {
            text-align: right;
        }
        .text-h6 {
            font-size: 10px;
        }
        .text-h5 {
            font-size: 12px;
        }
        .text-h4 {
            font-size: 14px;
        }
        .text-center {
            text-align: center;
        }
        .text-bold {
            font-weight: bold;
        }
        .table {
          width: 100%;
          border-collapse: collapse;
        }
    </style>
    <div>
      <div class="text-right text-h6">Fecha: ${b().format("DD/MM/YYYY HH:mm:ss")}</div>
      <div class="text-right text-h6">${N().user.name}</div>
      <div class="text-center text-bold">CONTROL SALAS</div>
      <div><span class="text-bold">Fecha</span> ${b(m).format("DD/MM/YYYY")} - ${b(p).format("DD/MM/YYYY")}</div>
      <div><span class="text-bold">Usuario:</span> ${v}</div>
      <div><span class="text-bold">Salas:</span> ${f}</div>
    </div>
    `;document.getElementById("myElement").innerHTML=h,new Z.Printd().print(document.getElementById("myElement"))}static imprimirProductos(n,m,p,v){let f='<div class="text-h5"><table class="table"><tr style="border-top: 1px solid black; border-bottom: 1px solid black;"><th>Nombre</th><th class="text-right">Precio</th><th class="text-right">Cantidad</th><th class="text-right">Total</th></tr>',c=0;n.forEach(t=>{console.log(t),f+=`
        <tr style="border-top: 1px solid black; border-bottom: 1px solid black;">
          <td>${t.productoName}</td>
          <td class="text-right">${parseInt(t.precio).toFixed(2)}</td>
          <td class="text-right">${t.cantidad}</td>
          <td class="text-right">${t.subtotal}</td>
        </tr>
      `,c+=parseInt(t.subtotal)}),f+=`
      <tr style="border-top: 1px solid black; border-bottom: 1px solid black;">
        <td class="text-right"></td>
        <td class="text-right"></td>
        <td class="text-right text-bold">Total</td>
        <td class="text-right">${c.toFixed(2)}</td>
      </tr>
    `,f+="</table></div>";const h=`
    <style>
        .text-right {
            text-align: right;
        }
        .text-h6 {
            font-size: 10px;
        }
        .text-h5 {
            font-size: 12px;
        }
        .text-h4 {
            font-size: 14px;
        }
        .text-center {
            text-align: center;
        }
        .text-bold {
            font-weight: bold;
        }
        .table {
          width: 100%;
          border-collapse: collapse;
        }
    </style>
    <div>
      <div class="text-right text-h6">Fecha: ${b().format("DD/MM/YYYY HH:mm:ss")}</div>
      <div class="text-right text-h6">${N().user.name}</div>
      <div class="text-center text-bold">CONTROL PRODUCTOS</div>
      <div><span class="text-bold">Fecha</span> ${b(m).format("DD/MM/YYYY")} - ${b(p).format("DD/MM/YYYY")}</div>
      <div><span class="text-bold">Usuario:</span> ${v}</div>
      <div>${f}</div>
    </div>
    `;document.getElementById("myElement").innerHTML=h,new Z.Printd().print(document.getElementById("myElement"))}static imprimirCaja(n,m,p,v){let f='<table style="border-collapse: collapse;border: 1px;width: 100%"><tr><th>N</th><th>Fecha</th><th>Nombre</th><th>Total</th></tr>',c=1,h=0;n.forEach(o=>{console.log(o),h+=parseFloat(o.total),f+=`
        <tr>
          <td>${c++}</td>
          <td>${this.dateDmYHis(o.fecha)}</td>
          <td>${o.nombre}</td>
          <td style="text-align: right">${o.total} Bs</td>
        </tr>
      `}),f+=`
      <tr>
        <td></td>
        <td></td>
        <td class="text-right text-bold">Total</td>
        <td style="text-align: right">${h.toFixed(2)} Bs</td>
      </tr>
    `;const r=`
    <style>
        .text-right {
            text-align: right;
        }
        .text-h6 {
            font-size: 10px;
        }
        .text-h5 {
            font-size: 12px;
        }
        .text-h4 {
            font-size: 14px;
        }
        .text-center {
            text-align: center;
        }
        .text-bold {
            font-weight: bold;
        }
    </style>
    <div>
      <div class="text-right text-h6">Fecha: ${b().format("DD/MM/YYYY HH:mm:ss")}</div>
      <div class="text-right text-h6">${N().user.name}</div>
      <div class="text-center text-bold">CONTROL CAJA</div>
      <div><span class="text-bold">Fecha</span> ${b(m).format("DD/MM/YYYY")} - ${b(p).format("DD/MM/YYYY")}</div>
      <div><span class="text-bold">Usuario:</span> ${v}</div>
      <div>
      <span class="text-bold">Cajas:</span>
      <div>
      ${f}
      </div>
      </div>
    </div>
    `;document.getElementById("myElement").innerHTML=r,new Z.Printd().print(document.getElementById("myElement"))}static numeroALetras(n){if(n=parseInt(n),isNaN(n)||n<0||n>1e6)return"Número fuera de rango";const m=["cero","uno","dos","tres","cuatro","cinco","seis","siete","ocho","nueve"],p=["","","veinte","treinta","cuarenta","cincuenta","sesenta","setenta","ochenta","noventa"],v={10:"diez",11:"once",12:"doce",13:"trece",14:"catorce",15:"quince",16:"dieciséis",17:"diecisiete",18:"dieciocho",19:"diecinueve"},f=["","cien","doscientos","trescientos","cuatrocientos","quinientos","seiscientos","setecientos","ochocientos","novecientos"];function c(u){if(u<10)return m[u];if(u>=10&&u<20)return v[u];if(u<100){const E=u%10;return`${p[Math.floor(u/10)]}${E>0?" y "+m[E]:""}`}if(u===100)return"cien";const x=u%100;return`${f[Math.floor(u/100)]}${x>0?" "+c(x):""}`}if(n===1e6)return"un millón";let h=Math.floor(n/1e3),r=n%1e3,t=h>0?h===1?"mil":`${c(h)} mil`:"",o=r>0?c(r):"";return(t+" "+o).trim()}}const ct={class:"row"},ut={class:"col-12 col-md-2"},ft={class:"col-12 col-md-2"},mt={class:"col-12 col-md-2"},pt={class:"col-12 col-md-2 flex flex-center"},ht={class:"col-12 col-md-2"},vt={class:"col-12 col-md-2 flex flex-center"},xt={class:"col-12 col-md-4"},bt={class:"col-12 col-md-2 flex flex-center"},gt={class:"row"},yt={class:"col-12 col-md-4 q-pa-xs"},$t={class:"text-weight-bold"},_t={class:"col-12 col-md-4 q-pa-xs"},Ct={class:"text-weight-bold"},Yt={class:"col-12 col-md-4 q-pa-xs"},Et={class:"text-weight-bold"},wt={key:1},kt={class:"text-right"},At={style:{"max-width":"350px","wrap-option":"wrap","line-height":"0.9"}},Nt={__name:"Sales",setup(I){const{proxy:n}=at(),m=y(b().format("YYYY-MM-DD")),p=y(b().format("YYYY-MM-DD")),v=y([]),f=y([]),c=y(!1),h=y(""),r=y([]),t=y(""),o=y("CAJA"),u=y(!1),x=y({});y([]);const E=y(["CAJA","PRODUCTOS"]);lt(()=>{k(),T()});function Q(){if(!t.value){n.$alert.error("Seleccione un usuario","Por favor");return}const i=r.value.find(e=>e.id===t.value);c.value=!0,n.$axios.post("/sales/imprimir",{user_id:t.value,fechaInicio:m.value,fechaFin:p.value,reporte:o.value}).then(e=>{o.value==="CAJA"&&et.imprimirCaja(e.data,m.value,p.value,i.name),o.value==="PRODUCTOS"&&et.imprimirProductos(e.data,m.value,p.value,i.name)}).finally(()=>{c.value=!1})}function V(){c.value=!0,n.$axios.post("/cajas",x.value).then(i=>{u.value=!1,n.$alert.success("Registrado correctamente",i.data)}).finally(()=>{c.value=!1})}function g(){if(!h.value){v.value=f.value;return}v.value=f.value.filter(i=>i.nombre.toLowerCase().includes(h.value.toLowerCase())||i.user?.name.toLowerCase().includes(h.value.toLowerCase()))}function S(i){n.$q.dialog({title:"Anular Venta",message:"¿Está seguro de anular la venta?",ok:"Sí",cancel:"No"}).onOk(()=>{c.value=!0,n.$axios.put(`/sales/${i}/anular`).then(()=>{k()}).finally(()=>{c.value=!1})})}function T(){r.value=[{id:"",name:"Todos"}],n.$axios.get("/users").then(i=>{i.data.forEach(e=>{r.value.push({id:e.id,name:e.name})})})}function k(){c.value=!0,n.$axios.get("/sales",{params:{fechaInicio:m.value,fechaFin:p.value,user_id:t.value}}).then(i=>{v.value=i.data,f.value=i.data}).finally(()=>{c.value=!1})}return(i,e)=>($(),A(H,null,[a(nt,{class:"q-pa-xs"},{default:d(()=>[a(O,{flat:"",bordered:""},{default:d(()=>[a(P,{class:"q-pa-xs"},{default:d(()=>[a(X,{onSubmit:G(k,["prevent"])},{default:d(()=>[l("div",ct,[l("div",ut,[a(F,{modelValue:m.value,"onUpdate:modelValue":e[0]||(e[0]=s=>m.value=s),label:"Fecha Inicio",type:"date",outlined:"",dense:""},null,8,["modelValue"])]),l("div",ft,[a(F,{modelValue:p.value,"onUpdate:modelValue":e[1]||(e[1]=s=>p.value=s),label:"Fecha Fin",type:"date",outlined:"",dense:""},null,8,["modelValue"])]),l("div",mt,[i.$store.user.role==="Admin"?($(),w(K,{key:0,modelValue:t.value,"onUpdate:modelValue":e[2]||(e[2]=s=>t.value=s),label:"Usuario",outlined:"",dense:"",options:r.value,"option-label":"name","option-value":"id","emit-value":"","map-options":""},null,8,["modelValue","options"])):U("",!0)]),l("div",pt,[a(D,{style:{width:"150px"},label:"Buscar",color:"primary",type:"submit",icon:"search","no-caps":"",loading:c.value},null,8,["loading"])]),l("div",ht,[i.$store.user.role==="Admin"?($(),w(K,{key:0,modelValue:o.value,"onUpdate:modelValue":e[3]||(e[3]=s=>o.value=s),label:"Tipo Reporte",outlined:"",dense:"",options:E.value},null,8,["modelValue","options"])):U("",!0)]),l("div",vt,[i.$store.user.role==="Admin"?($(),w(D,{key:0,style:{width:"150px"},label:"Imprimir",color:"indigo",icon:"print","no-caps":"",loading:c.value,onClick:Q},null,8,["loading"])):U("",!0)]),e[10]||(e[10]=l("div",{class:"col-12 col-md-12 flex flex-center"},null,-1)),l("div",xt,[a(F,{modelValue:h.value,"onUpdate:modelValue":[e[4]||(e[4]=s=>h.value=s),g],label:"Filtro",outlined:"",dense:"",clearable:""},null,8,["modelValue"])]),l("div",bt,[a(D,{style:{width:"150px"},label:"Venta",color:"positive",onClick:e[5]||(e[5]=s=>i.$router.push("/ventas/add")),"no-caps":"",icon:"add_circle_outline",loading:c.value},null,8,["loading"])]),e[11]||(e[11]=l("div",{class:"col-12 col-md-4 flex flex-center"},null,-1)),e[12]||(e[12]=l("div",{class:"col-12 col-md-2 flex flex-center"},null,-1))])]),_:1}),l("div",gt,[l("div",yt,[a(J,{bordered:"",padding:"",dense:""},{default:d(()=>[B(($(),w(j,{clickable:""},{default:d(()=>[a(M,{avatar:""},{default:d(()=>[a(z,{color:"indigo","text-color":"white",icon:"event"})]),_:1}),a(M,null,{default:d(()=>[a(L,{lines:"1"},{default:d(()=>[l("span",$t,C(v.value.length)+" ventas ",1)]),_:1}),a(L,{caption:"",lines:"2"},{default:d(()=>e[13]||(e[13]=[R(" Cantida de ventas ")])),_:1})]),_:1})]),_:1})),[[q]])]),_:1})]),l("div",_t,[a(J,{bordered:"",padding:"",dense:""},{default:d(()=>[B(($(),w(j,{clickable:""},{default:d(()=>[a(M,{avatar:""},{default:d(()=>[a(z,{color:"green","text-color":"white",icon:"attach_money"})]),_:1}),a(M,null,{default:d(()=>[a(L,{lines:"1"},{default:d(()=>[l("span",Ct," Bs "+C(v.value.filter(s=>!s.anulado).reduce((s,Y)=>s+parseFloat(Y.total),0).toFixed(2)),1)]),_:1}),a(L,{caption:"",lines:"2"},{default:d(()=>e[14]||(e[14]=[R(" Total de reservas ")])),_:1})]),_:1})]),_:1})),[[q]])]),_:1})]),l("div",Yt,[a(J,{bordered:"",padding:"",dense:""},{default:d(()=>[B(($(),w(j,{clickable:""},{default:d(()=>[a(M,{avatar:""},{default:d(()=>[a(z,{color:"red","text-color":"white",icon:"cancel"})]),_:1}),a(M,null,{default:d(()=>[a(L,{lines:"1"},{default:d(()=>[l("span",Et," Bs "+C(v.value.filter(s=>s.anulado).reduce((s,Y)=>s+parseFloat(Y.total),0).toFixed(2)),1)]),_:1}),a(L,{caption:"",lines:"2"},{default:d(()=>e[15]||(e[15]=[R(" Total de reservas canceladas ")])),_:1})]),_:1})]),_:1})),[[q]])]),_:1})])])]),_:1})]),_:1}),a(O,{flat:"",bordered:"",class:"q-mt-md"},{default:d(()=>[a(P,null,{default:d(()=>[a(st,{"wrap-cells":"",dense:"",flat:"",bordered:""},{default:d(()=>[e[16]||(e[16]=l("thead",null,[l("tr",null,[l("th",null,"Acciones"),l("th",null,"Fecha"),l("th",null,"Total"),l("th",null,"Nombre Cliente"),l("th",null,"Usuario"),l("th",null,"Detalle")])],-1)),l("tbody",null,[($(!0),A(H,null,W(v.value,s=>($(),A("tr",{key:s.id},[l("td",null,[s.anulado?($(),A("div",wt,[a(it,{color:"red","text-color":"white",label:"Anulada"})])):($(),w(D,{key:0,style:{width:"80px"},icon:"remove_circle_outline",color:"negative",dense:"",onClick:Y=>S(s.id),label:"Anular","no-caps":"",size:"10px"},null,8,["onClick"]))]),l("td",null,C(i.$filters.dateDmYHis(s.fecha)),1),l("td",kt,C(s.total),1),l("td",null,C(s.nombre),1),l("td",null,C(s.user?.username),1),l("td",null,[l("div",At,[($(!0),A(H,null,W(s.details,Y=>($(),A("span",{key:Y.id},C(Y.cantidad)+" "+C(Y.productoName)+", ",1))),128))])])]))),128))])]),_:1})]),_:1})]),_:1})]),_:1}),a(ot,{modelValue:u.value,"onUpdate:modelValue":e[9]||(e[9]=s=>u.value=s),persistent:""},{default:d(()=>[a(O,{flat:"",bordered:"",style:{width:"350px"}},{default:d(()=>[a(P,{class:"row items-center q-pb-none"},{default:d(()=>[e[17]||(e[17]=l("div",{class:"text-bold"}," Cerrar Caja ",-1)),a(rt),a(D,{flat:"",dense:"",icon:"close",onClick:e[6]||(e[6]=s=>u.value=!1)})]),_:1}),a(P,null,{default:d(()=>[a(X,{onSubmit:G(V,["prevent"])},{default:d(()=>[a(F,{modelValue:x.value.monto_final,"onUpdate:modelValue":e[7]||(e[7]=s=>x.value.monto_final=s),label:"Monto Final",type:"number",outlined:"",dense:"",hint:""},null,8,["modelValue"]),a(F,{type:"textarea",modelValue:x.value.observacion,"onUpdate:modelValue":e[8]||(e[8]=s=>x.value.observacion=s),label:"Observación",outlined:"",dense:"",hint:""},null,8,["modelValue"]),a(D,{label:"Cerrar Caja",color:"red",type:"submit",loading:c.value,"no-caps":"",icon:"point_of_sale",class:"q-mt-md"},null,8,["loading"])]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),e[18]||(e[18]=l("div",{id:"myElement",class:"hidden"},null,-1))],64))}};export{Nt as default};
