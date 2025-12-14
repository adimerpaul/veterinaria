import{c as g,Q as y}from"./numeroaletras-B5rgbfjP.js";import{i as b}from"./index-DxB2cEa_.js";import{p as $}from"./index-ByRWkf4M.js";import{h as x}from"./moment-C5S46NFB.js";class L{static factura(t){return console.log("factura",t),new Promise((c,s)=>{const o=g.conversorNumerosALetras,r=new o().convertToText(parseInt(t.total)),l={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}},d=b().env;console.log(d);const a=t.nombre+" "+t.numeroFactura;y.toDataURL(a,l).then(e=>{let i=`${this.head()}
  <div style='padding-left: 0.5cm;padding-right: 0.5cm'>
      <div class='titulo'>FACTURA <br>CON DERECHO A CREDITO FISCAL</div>
      <div class='titulo2'>${d.razon}<br>
      Casa Matriz<br>
      No. Punto de Venta 0<br>
${d.direccion}<br>
Tel. ${d.telefono}<br>
Oruro</div>
<hr>
<div class='titulo'>NIT</div>
<div class='titulo2'>${d.nit}</div>
<div class='titulo'>FACTURA N°</div>
<div class='titulo2'>${t.numeroFactura}</div>
<div class='titulo'>CÓD. AUTORIZACIÓN</div>
<div class='titulo2'>${t.cuf}</div>
<hr>
<table>
<tr><td class='titder'>NOMBRE/RAZÓN SOCIAL:</td><td class='contenido'>${t.nombre}</td>
</tr><tr><td class='titder'>NIT/CI/CEX:</td><td class='contenido'>${t.ci}</td></tr>
<tr><td class='titder'>COD. CLIENTE:</td ><td class='contenido'>${t.mascota.id}</td></tr>
<tr><td class='titder'>FECHA DE EMISIÓN:</td><td class='contenido'>${t.fecha}</td></tr>
</table><hr><div class='titulo'>DETALLE</div>`;t.details.forEach(n=>{i+=`<div style='font-size: 12px'><b>${n.producto?.id} ${n.producto?.nombre} </b></div>`,i+=`<div>${n.cantidad} ${parseFloat(n.precio).toFixed(2)} 0.00
                    <span style='float:right'>${parseFloat(n.subTotal).toFixed(2)}</span></div>`}),i+=`<hr>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>SUBTOTAL Bs</td><td class='conte2'>${parseFloat(t.total).toFixed(2)}</td></tr>
      <tr><td class='titder'>DESCUENTO Bs</td><td class='conte2'>0.00</td></tr>
      <tr><td class='titder'>TOTAL Bs</td><td class='conte2'>${parseFloat(t.total).toFixed(2)}</td></tr>
      <tr><td class='titder'>MONTO GIFT CARD Bs</td ><td class='conte2'>0.00</td></tr>
      <tr><td class='titder'>MONTO A PAGAR Bs</td><td class='conte2'>${parseFloat(t.total).toFixed(2)}</td></tr>
      <tr><td class='titder' style='font-size: 8px'>IMPORTE BASE CRÉDITO FISCAL Bs</td>
      <td class='conte2'>${parseFloat(t.total).toFixed(2)}</td></tr>
      </table>
      <br>
      <div>Son ${r} ${((parseFloat(t.total)-Math.floor(parseFloat(t.total)))*100).toFixed(2)} /100 Bolivianos</div><hr>
      <div class='titulo2' style='font-size: 9px'>
      ESTA FACTURA CONTRIBUYE AL DESARROLLO DEL PAÍS,<br>
      EL USO ILÍCITO SERÁ SANCIONADO PENALMENTE DE<br>
      ACUERDO A LEY<br><br>
      ${t.leyenda} <br><br>
      “Este documento es la Representación Gráfica de un<br>
      Documento Fiscal Digital emitido en una modalidad de<br>
      facturación en línea”</div><br>
      <div style='display: flex;justify-content: center;'> <img  src="${e}" ></div></div>
      </div>
</body>
</html>`,document.getElementById("myElement").innerHTML=i,new $.Printd().print(document.getElementById("myElement")),c(e)}).catch(e=>{s(e)})})}static formatDate(t){return t==null||t===""?"":x(t).format("DD/MM/YYYY HH:mm A")}static nota(t,c=!0){return console.log("factura",t),new Promise((s,o)=>{const m=g.conversorNumerosALetras,l=new m().convertToText(parseInt(t.total)),d={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}};b().env,y.toDataURL(`Fecha: ${t.fecha_emision} Monto: ${parseFloat(t.total).toFixed(2)}`,d).then(a=>{let e=`${this.head()}
  <!--div style='padding-left: 0.5cm;padding-right: 0.5cm'>
  <img src="logo.png" alt="logo" style="width: 100px; height: 50px; display: block; margin-left: auto; margin-right: auto;">
      <div class='titulo'>${t.tipo_venta==="EGRESO"?"NOTA DE EGRESO":"NOTA DE VENTA"}</div>
      <div class='titulo2'>${t.tipo_comprobante} <br>
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
<tr><td class='titder'>ID:</td><td class='titder'>${t.id}</td></tr>
<tr><td class='titder'>NOMBRE/RAZÓN SOCIAL:</td><td class='titder'>${t.nombre}</td></tr>
<tr><!-- td class='titder'>NIT/CI/CEX:</td><td class='contenido'>${t.mascota?t.mascota.id:""}</td --></tr>
<tr><td class='titder'>FECHA DE EMISIÓN:</td><td class='contenido'>${this.formatDate(t.fecha)}</td></tr>
</table><hr><div class='titulo'>DETALLE</div>`;t.details.forEach(i=>{console.log("r",i),e+=`<div style='font-size: 12px'><b> ${i.producto?.nombre} </b></div>`,e+=`<div>
                  <span style='font-size: 18px;font-weight: bold'>
                      ${i.cantidad}
                  </span>
                  <span>
                  ${parseFloat(i.precio).toFixed(2)}
                  </span>

                  <span style='float:right'>
                      ${parseFloat(i.subtotal).toFixed(2)}
                  </span>
                  </div>`}),e+=`<hr>
<div>${t.comentarioDoctor===""||t.comentarioDoctor===null||t.comentarioDoctor===void 0?"":"Comentario: "+t.comentarioDoctor}</div>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>SUBTOTAL Bs</td><td class='titder'>${parseFloat(t.total).toFixed(2)}</td></tr>

      </table>
      <br>
        <div>
        Son ${l} ${((parseFloat(t.total)-Math.floor(parseFloat(t.total)))*100).toFixed(2)} /100 Bolivianos
        </div><hr>
      </div>
      </div>
</body>
</html>`,document.getElementById("myElement").innerHTML=e,c&&new $.Printd().print(document.getElementById("myElement")),s(a)}).catch(a=>{o(a)})})}static notaOasisVenta(t){return console.log(t),new Promise((c,s)=>{try{const o=g.conversorNumerosALetras,m=new o,r=b().env,l=parseFloat(t.sale?.total||0),d=Math.floor(l),a=Math.round((l-d)*100),e=m.convertToText(d),i={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}};y.toDataURL(`Monto: ${l.toFixed(2)}`,i).then(p=>{let n=`${this.head()}
  <div style='padding-left: 0.5cm;padding-right: 0.5cm'>
    <img src="../../logo.png" alt="logo" style="width: 50px; height: 50px; display: block; margin-left: auto; margin-right: auto;">
    <div class='titulo'>NOTA DE VENTA OASIS</div>
    <div class='titulo2'><br>${r.direccion}<br>Tel. 75703582<br>Oruro</div>
    <hr>
    <table>
      <tr><td class='titder'>CLIENTE:</td><td class='contenido'>${t.sale.nombre??""}</td></tr>
      <tr><td class='titder'>CI:</td><td class='contenido'>${t.sale.ci??""}</td></tr>
      <tr><td class='titder'>FECHA:</td><td class='contenido'>${this.formatDate(t.sale.fecha)}</td></tr>
    </table>
    <hr><div class='titulo'>DETALLE</div>`;(t.detalles||[]).forEach(v=>{n+=`<div style='font-size: 12px'><b>${v.productoName}</b></div>`,n+=`<div>
            <span style='font-size: 16px;font-weight: bold'>${v.cantidad}</span> × ${parseFloat(v.precio).toFixed(2)}
            <span style='float:right'>${parseFloat(v.precio*v.cantidad).toFixed(2)}</span>
          </div>`}),n+=`<hr>
    <table style='font-size: 10px;'>
      <tr><td class='titder' style='width: 60%'>TOTAL Bs</td><td class='conte2'>${l.toFixed(2)}</td></tr>
    </table>
    <br>
    <div>Son ${e} ${a.toString().padStart(2,"0")} /100 Bolivianos</div><hr>
    <div class='titulo2' style='font-size: 9px'>Gracias por su compra</div>
    <div style='display: flex;justify-content: center;'>
      <img src="${p}" style="width: 75px; height: 75px;">
    </div>
  </div>
</body>
</html>`,console.log(n),document.getElementById("myElement").innerHTML=n,new $.Printd().print(document.getElementById("myElement")),c(p)}).catch(p=>s(p))}catch(o){s(o)}})}static cotizacion(t,c,s,o,m=!0){return(o==null||o==="")&&(o=0),new Promise((r,l)=>{const d=g.conversorNumerosALetras,e=new d().convertToText(parseInt(s)),i=x().format("YYYY-MM-DD"),p={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}},n=b().env;y.toDataURL(`Fecha: ${i} Monto: ${parseFloat(s).toFixed(2)}`,p).then(h=>{let v=`${this.head()}
  <div style='padding-left: 0.5cm;padding-right: 0.5cm'>
  <img src="logo.png" alt="logo" style="width: 100px; height: 50px; display: block; margin-left: auto; margin-right: auto;">
      <div class='titulo'>COTIZACION</div>
      <div class='titulo2'>${n.razon} <br>
      Casa Matriz<br>
      No. Punto de Venta 0<br>
${n.direccion}<br>
Tel. ${n.telefono}<br>
Oruro</div>
<hr>
<table>
<tr><td class='titder'>NOMBRE/RAZÓN SOCIAL:</td><td class='contenido'>${c.nombre}</td>
<tr><td class='titder'>FECHA DE EMISIÓN:</td><td class='contenido'>${i}</td></tr>
</table><hr><div class='titulo'>DETALLE</div>`;t.forEach(F=>{v+=`<div style='font-size: 12px'><b> ${F.nombre} </b></div>`,v+=`<div><span style='font-size: 18px;font-weight: bold'>${F.cantidadVenta}</span> ${parseFloat(F.precioVenta).toFixed(2)} 0.00
                    <span style='float:right'>${parseFloat(F.precioVenta*F.cantidadVenta).toFixed(2)}</span></div>`}),v+=`<hr>
<div>${c.comentario===""||c.comentario===null||c.comentario===void 0?"":"Comentario: "+c.comentario}</div>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>SUBTOTAL Bs</td><td class='conte2'>${parseFloat(s).toFixed(2)}</td></tr>
      <tr><td class='titder' style='width: 60%'>Descuento Bs</td><td class='conte2'>${parseFloat(o).toFixed(2)}</td></tr>
      <tr><td class='titder' style='width: 60%'>TOTAL Bs</td><td class='conte2'>${parseFloat(s-o).toFixed(2)}</td></tr>
      </table>
      <br>
      <div>Son ${e} ${((parseFloat(s)-Math.floor(parseFloat(s)))*100).toFixed(2)} /100 Bolivianos</div><hr>
      <div style='display: flex;justify-content: center;'>
        <img  src="${h}" style="width: 75px; height: 75px; display: block; margin-left: auto; margin-right: auto;">
      </div></div>
      </div>
</body>
</html>`,document.getElementById("myElement").innerHTML=v,m&&new $.Printd().print(document.getElementById("myElement")),r(h)}).catch(h=>{l(h)})})}static notaCompra(t){return console.log("factura",t),new Promise((c,s)=>{const o=g.conversorNumerosALetras,r=new o().convertToText(parseInt(t.total)),l={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}},d=b().env;y.toDataURL(`Fecha: ${t.fecha_emision} Monto: ${parseFloat(t.total).toFixed(2)}`,l).then(async a=>{let e=`${this.head()}
  <div style='padding-left: 0.5cm;padding-right: 0.5cm'>
  <img src="logo.png" alt="logo" style="width: 100px; height: 50px; display: block; margin-left: auto; margin-right: auto;">
      <div class='titulo'>${t.tipo_venta==="EGRESO"?"NOTA DE EGRESO":"NOTA DE COMPRA"}</div>
      <div class='titulo2'>${d.razon} <br>
      Casa Matriz<br>
      No. Punto de Venta 0<br>
${d.direccion}<br>
Tel. ${d.telefono}<br>
Oruro</div>
<hr>
<table>
<tr><td class='titder'>NOMBRE/RAZÓN SOCIAL:</td><td class='contenido'>${t.client?t.client.nombre:""}</td>
</tr><tr><td class='titder'>NIT/CI/CEX:</td><td class='contenido'>${t.client?t.client.nit:""}</td></tr>
<!--<tr><td class='titder'>FECHA DE EMISIÓN:</td><td class='contenido'>${t.fecha_emision}</td></tr>-->
</table><hr><div class='titulo'>DETALLE</div>`;t.buy_details.forEach(p=>{e+=`<div style='font-size: 12px'><b>${p.nombre} </b></div>`,e+=`<div><span style='font-size: 14px;font-weight: bold'>${p.cantidad}</span> ${parseFloat(p.precio).toFixed(2)} 0.00
                    <span style='float:right'>${parseFloat(p.subtotal).toFixed(2)}</span></div>`}),e+=`<hr>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>SUBTOTAL Bs</td><td class='conte2'>${parseFloat(t.total).toFixed(2)}</td></tr>
      <tr><td class='titder' style='width: 60%'>Descuento Bs</td><td class='conte2'>${parseFloat(t.descuento).toFixed(2)}</td></tr>
      <tr><td class='titder' style='width: 60%'>TOTAL Bs</td><td class='conte2'>${parseFloat(t.total-t.descuento).toFixed(2)}</td></tr>
      </table>
      <br>
      <div>Son ${r} ${((parseFloat(t.total)-Math.floor(parseFloat(t.total)))*100).toFixed(2)} /100 Bolivianos</div><hr>
      <div style='display: flex;justify-content: center;'>
        <img  src="${a}" style="width: 75px; height: 75px; display: block; margin-left: auto; margin-right: auto;">
      </div></div>
      </div>
</body>
</html>`,document.getElementById("myElement").innerHTML=e,new $.Printd().print(document.getElementById("myElement")),c(a)}).catch(a=>{s(a)})})}static reportTotal(t,c){const s=t.filter(r=>r.tipoVenta==="Ingreso").reduce((r,l)=>r+l.montoTotal,0),o=t.filter(r=>r.tipoVenta==="Egreso").reduce((r,l)=>r+l.montoTotal,0),m=s-o;return console.log("montoTotal",m),new Promise((r,l)=>{const d=g.conversorNumerosALetras,a=new d,e=Math.abs(m),i=a.convertToText(parseInt(e)),p={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}},n=b().env;y.toDataURL(` Monto: ${parseFloat(m).toFixed(2)}`,p).then(h=>{let v=`${this.head()}
  <div style='padding-left: 0.5cm;padding-right: 0.5cm'>
  <img src="logo.png" alt="logo" style="width: 100px; height: 100px; display: block; margin-left: auto; margin-right: auto;">
      <div class='titulo'>title</div>
      <div class='titulo2'>${n.razon} <br>
      Casa Matriz<br>
      No. Punto de Venta 0<br>
${n.direccion}<br>
Tel. ${n.telefono}<br>
Oruro</div>
<hr>
<table>
</table><hr><div class='titulo'>DETALLE</div>`;t.forEach(E=>{v+=`<div style='font-size: 12px'><b> ${E.user.name} </b></div>`,v+=`<div> ${parseFloat(E.montoTotal).toFixed(2)} ${E.tipoVenta}
          <span style='float:right'> ${E.tipoVenta==="Egreso"?"-":""} ${parseFloat(E.montoTotal).toFixed(2)}</span></div>`}),v+=`<hr>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>SUBTOTAL Bs</td><td class='conte2'>${parseFloat(m).toFixed(2)}</td></tr>
      </table>
      <br>
      <div>Son ${i} ${((parseFloat(m)-Math.floor(parseFloat(m)))*100).toFixed(2)} /100 Bolivianos</div><hr>
      <div style='display: flex;justify-content: center;'>
        <img  src="${h}" style="width: 75px; height: 75px; display: block; margin-left: auto; margin-right: auto;">
      </div></div>
      </div>
</body>
</html>`,document.getElementById("myElement").innerHTML=v,new $.Printd().print(document.getElementById("myElement")),r(h)}).catch(h=>{l(h)})})}static reciboCompra(t){return new Promise((c,s)=>{const o=g.conversorNumerosALetras,r=new o().convertToText(parseInt(t.total)),l={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}},d=b().env;y.toDataURL(`Fecha: ${t.date} Monto: ${parseFloat(t.total).toFixed(2)}`,l).then(a=>{let e=`${this.head()}
    <div style='padding-left: 0.5cm;padding-right: 0.5cm'>
    <img src="logo.png" alt="logo" style="width: 100px; height: 100px; display: block; margin-left: auto; margin-right: auto;">
      <div class='titulo'>RECIBO DE COMPRA</div>
      <div class='titulo2'>${d.razon} <br>
      Casa Matriz<br>
      No. Punto de Venta 0<br>
    ${d.direccion}<br>
    Tel. ${d.telefono}<br>
    Oruro</div>
    <hr>
    <table>
    </table><hr><div class='titulo'>DETALLE</div>`;e+=`<div style='font-size: 12px'><b>${t.product_id} ${t.product.descripcion} </b></div>`,e+=`<div>${t.quantity} ${parseFloat(t.price).toFixed(2)} 0.00
          //           <span style='float:right'>${parseFloat(t.total).toFixed(2)}</span></div>`,e+=`<hr>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>SUBTOTAL Bs</td><td class='conte2'>${parseFloat(t.total).toFixed(2)}</td></tr>
      </table>
      <br>
      <div>Son ${r} ${((parseFloat(t.total)-Math.floor(parseFloat(t.total)))*100).toFixed(2)} /100 Bolivianos</div><hr>
      <div style='display: flex;justify-content: center;'>
        <img  src="${a}" style="width: 75px; height: 75px; display: block; margin-left: auto; margin-right: auto;">
      </div></div>
      </div>
    </body>
    </html>`,document.getElementById("myElement").innerHTML=e,new $.Printd().print(document.getElementById("myElement")),c(a)}).catch(a=>{s(a)})})}static reciboTranferencia(t,c,s,o){return console.log("producto",t,"de",c,"ha",s,"cantidad",o),new Promise((m,r)=>{const l=g.conversorNumerosALetras,a=new l().convertToText(parseInt(o)),e={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}},i=b().env;y.toDataURL(`de: ${c} A: ${s}`,e).then(p=>{let n=`${this.head()}
    <div style='padding-left: 0.5cm;padding-right: 0.5cm'>
    <img src="logo.png" alt="logo" style="width: 100px; height: 100px; display: block; margin-left: auto; margin-right: auto;">
      <div class='titulo'>RECIBO DE TRANSFERENCIA</div>
      <div class='titulo2'>${i.razon} <br>
      Casa Matriz<br>
      No. Punto de Venta 0<br>
    ${i.direccion}<br>
    Tel. ${i.telefono}<br>
    Oruro</div>
    <hr>
    <table>
    </table><hr><div class='titulo'>DETALLE</div>`;n+=`<div style='font-size: 12px'><b>Producto: ${t} de Sucursal${c} a ${s} </b></div>`,n+=`<hr>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>CANTIDAD </td><td class='conte2'>${o+""}</td></tr>
      </table>
      <br>
      <div>Son ${a+""} ${o+""} unidades</div><hr>
      <div style='display: flex;justify-content: center;'>
        <img  src="${p}" style="width: 75px; height: 75px; display: block; margin-left: auto; margin-right: auto;">
      </div></div>
      </div>
    </body>
    </html>`,document.getElementById("myElement").innerHTML=n,new $.Printd().print(document.getElementById("myElement")),m(p)}).catch(p=>{r(p)})})}static head(){return`<html>
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
<div style="width: 300px;">`}}export{L as I};
