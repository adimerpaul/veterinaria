import{g as L,r as u,k as h,a1 as Q,c as Y,o as f,w as r,a as s,b as t,Q as V,e as w,at as A,f as v,t as o,a7 as D,a9 as B,aa as S}from"./index-Cnkfwu2V.js";import{Q as q}from"./QMarkupTable-BKUCw7Jj.js";import{Q as R}from"./QPage-BmTFFvxK.js";import{h as P}from"./moment-C5S46NFB.js";import{E as T}from"./Excel-CKQ98bqC.js";import{p as I}from"./index-ByRWkf4M.js";import{_ as F}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./_commonjsHelpers-D6-XlEtG.js";import"./_commonjs-dynamic-modules-TDtrdbi3.js";const O={class:"row items-end q-col-gutter-sm"},z={class:"col-12 col-md-2"},U={class:"col-12 col-md-3"},j={class:"col-12 col-md-2"},H={class:"col-6 col-md-2"},G={class:"col-6 col-md-2"},J={class:"text-subtitle1 q-mb-sm"},K={class:"text-right"},W={class:"text-right"},X={class:"text-right"},Z={class:"text-right"},tt={class:"text-right"},et={class:"bg-grey-2"},lt={class:"text-right text-bold"},at={class:"text-right text-bold"},ot={class:"text-right text-bold"},st={__name:"ReporteAlmacen",setup(dt){const{proxy:M}=L(),n=u(P().format("YYYY-MM-DD")),p=u(""),m=u(!1),g=u([]),i=u([]),b=h(()=>P(n.value).format("DD/MM/YYYY"));Q(x);function x(){m.value=!0,M.$axios.get("/reportes/almacen-dia",{params:{fecha:n.value}}).then(l=>{g.value=l.data||[],_()}).finally(()=>{m.value=!1})}function _(){const l=(p.value||"").toLowerCase();if(!l){i.value=g.value;return}i.value=g.value.filter(e=>(e.codigo||"").toLowerCase().includes(l)||(e.nombre||"").toLowerCase().includes(l))}function c(l){if(l==null)return"";const e=Number(l);return isNaN(e)?"":e.toFixed(2)}const y=h(()=>i.value.reduce((l,e)=>l+(e.comprado||0),0)),C=h(()=>i.value.reduce((l,e)=>l+(e.vendido||0),0)),k=h(()=>i.value.reduce((l,e)=>l+(Number(e.stock)||0),0));function N(){const l=[{sheet:`Almacen_${n.value}`,columns:[{label:"Código",value:"codigo"},{label:"Detalle",value:"nombre"},{label:"Presentación",value:e=>`${e.presentacion||""} ${e.contenido||""}`.trim()},{label:"PC",value:e=>c(e.pc)},{label:"PV",value:e=>c(e.pv)},{label:"Comprado",value:"comprado"},{label:"Vendido",value:"vendido"},{label:"Stock",value:"stock"}],content:i.value}];T.export(l,`Reporte_Almacen_${n.value}`)}function E(){const l=new I.Printd,e=`
    <style>
      * { box-sizing: border-box; }
      body { font-family: Arial, sans-serif; font-size: 12px; margin: 16px; }
      h3 { margin: 0 0 10px 0; }
      table { width: 100%; border-collapse: collapse; }
      th, td { border: 1px solid #000; padding: 4px; }
      thead tr { background: #009688; color: #fff; }
      tfoot tr { background: #eee; font-weight: bold; }
      .right { text-align: right; }
      @media print { @page { size: A4 portrait; margin: 12mm; } }
    </style>
  `,a=`
    <div>
      <h3>CONTROL DE ALMACÉN — ${b.value}</h3>
      <table>
        <thead>
          <tr>
            <th>Código</th><th>Detalle</th><th>Presentación</th>
            <th class="right">PC</th><th class="right">PV</th>
            <th class="right">Comprado</th><th class="right">Vendido</th><th class="right">Stock</th>
          </tr>
        </thead>
        <tbody>
          ${i.value.map(d=>`
            <tr>
              <td>${d.codigo||""}</td>
              <td>${d.nombre||""}</td>
              <td>${(d.presentacion||"")+" "+(d.contenido||"")}</td>
              <td class="right">${c(d.pc)}</td>
              <td class="right">${c(d.pv)}</td>
              <td class="right">${d.comprado||0}</td>
              <td class="right">${d.vendido||0}</td>
              <td class="right">${d.stock||0}</td>
            </tr>`).join("")}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="5" class="right">Totales</td>
            <td class="right">${y.value}</td>
            <td class="right">${C.value}</td>
            <td class="right">${k.value}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  `,$=document.getElementById("printArea");$.innerHTML=a,l.print($,[e])}return(l,e)=>(f(),Y(R,{class:"q-pa-sm"},{default:r(()=>[s(V,{flat:"",bordered:""},{default:r(()=>[s(w,{class:"q-pa-sm"},{default:r(()=>[t("div",O,[t("div",z,[s(A,{modelValue:n.value,"onUpdate:modelValue":e[0]||(e[0]=a=>n.value=a),type:"date",label:"Fecha",outlined:"",dense:""},null,8,["modelValue"])]),t("div",U,[s(A,{modelValue:p.value,"onUpdate:modelValue":[e[1]||(e[1]=a=>p.value=a),_],label:"Buscar (código/nombre)",outlined:"",dense:"",clearable:""},null,8,["modelValue"])]),t("div",j,[s(v,{color:"primary","no-caps":"",icon:"search",label:"Buscar",loading:m.value,class:"full-width",onClick:x},null,8,["loading"])]),t("div",H,[s(v,{color:"indigo","no-caps":"",icon:"print",label:"Imprimir",class:"full-width",onClick:E})]),t("div",G,[s(v,{color:"green","no-caps":"",icon:"fa-solid fa-file-excel",label:"Excel",class:"full-width",onClick:N})])])]),_:1})]),_:1}),s(V,{flat:"",bordered:"",class:"q-mt-md"},{default:r(()=>[s(w,{class:"q-pa-sm"},{default:r(()=>[t("div",J," CONTROL DE ALMACÉN — "+o(b.value),1),s(q,{dense:"",flat:"",bordered:"","wrap-cells":""},{default:r(()=>[e[3]||(e[3]=t("thead",null,[t("tr",{class:"bg-teal text-white"},[t("th",{style:{width:"110px"}},"Código"),t("th",null,"Detalle"),t("th",{style:{width:"140px"}},"Presentación"),t("th",{class:"text-right",style:{width:"90px"}},"PC"),t("th",{class:"text-right",style:{width:"90px"}},"PV"),t("th",{class:"text-right",style:{width:"110px"}},"Comprado"),t("th",{class:"text-right",style:{width:"110px"}},"Vendido"),t("th",{class:"text-right",style:{width:"90px"}},"Stock")])],-1)),t("tbody",null,[(f(!0),D(B,null,S(i.value,a=>(f(),D("tr",{key:a.id},[t("td",null,o(a.codigo),1),t("td",null,o(a.nombre),1),t("td",null,o(a.presentacion)+" "+o(a.contenido),1),t("td",K,o(c(a.pc)),1),t("td",W,o(c(a.pv)),1),t("td",X,o(a.comprado),1),t("td",Z,o(a.vendido),1),t("td",tt,o(a.stock),1)]))),128))]),t("tfoot",null,[t("tr",et,[e[2]||(e[2]=t("td",{colspan:"5",class:"text-right text-bold"},"Totales",-1)),t("td",lt,o(y.value),1),t("td",at,o(C.value),1),t("td",ot,o(k.value),1)])])]),_:1})]),_:1})]),_:1}),e[4]||(e[4]=t("div",{id:"printArea",class:"hidden"},null,-1))]),_:1}))}},ft=F(st,[["__scopeId","data-v-272f9313"]]);export{ft as default};
