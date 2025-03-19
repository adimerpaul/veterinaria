
import { Printd } from 'printd'

import moment from 'moment'
import {useCounterStore} from "stores/example-store";
export class Impresion {
  static dateDmYHis (value) {
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic']
    const mes = meses[moment(String(value)).format('MM') - 1]
    if (!value) return ''
    return moment(String(value)).format('DD') + ' ' + mes + ' ' + moment(String(value)).format('YYYY') + ' ' + moment(String(value)).format('hh:mm A')
  }
  static imprimirSalas (salas, fechaInicio, fechaFin, userFind) {
    // [
    //   {
    //     "id": 10,
    //     "nombre": "chamib",
    //     "numero_personas": 2,
    //     "observaciones": null,
    //     "estado": "Finalizado",
    //     "json": "{\"2-10\":\"9:00 a 9:30\",\"3-10\":\"9:30 a 10:00\",\"4-10\":\"10:00 a 10:30\",\"5-10\":\"10:30 a 11:00\",\"6-10\":\"11:00 a 11:30\"}",
    //     "sala": "Sala 11",
    //     "motivo_cancelacion": null,
    //     "total": "50.00",
    //     "adelanto": 20,
    //     "tiempo": "02:30",
    //     "horario": "9:00 - 11:30",
    //     "fecha": "2025-03-01",
    //     "fecha_confirmacion": "2025-03-01 07:16:00",
    //     "fecha_cancelacion": null,
    //     "user_id": 2,
    //     "user_cancelado_id": null,
    //     "color": "red"
    //   },
    //   {
    //     "id": 11,
    //     "nombre": "Angela",
    //     "numero_personas": 2,
    //     "observaciones": null,
    //     "estado": "Reservado",
    //     "json": "{\"4-8\":\"10:00 a 10:30\",\"5-8\":\"10:30 a 11:00\",\"6-8\":\"11:00 a 11:30\"}",
    //     "sala": "Sala 9",
    //     "motivo_cancelacion": null,
    //     "total": "30.00",
    //     "adelanto": 20,
    //     "tiempo": "01:30",
    //     "horario": "10:00 - 11:30",
    //     "fecha": "2025-03-01",
    //     "fecha_confirmacion": null,
    //     "fecha_cancelacion": null,
    //     "user_id": 2,
    //     "user_cancelado_id": null,
    //     "color": "yellow"
    //   },
    //   {
    //     "id": 12,
    //     "nombre": "sara",
    //     "numero_personas": 2,
    //     "observaciones": null,
    //     "estado": "Finalizado",
    //     "json": "{\"4-5\":\"10:00 a 10:30\",\"5-5\":\"10:30 a 11:00\",\"6-5\":\"11:00 a 11:30\"}",
    //     "sala": "Sala 6",
    //     "motivo_cancelacion": null,
    //     "total": "30.00",
    //     "adelanto": 20,
    //     "tiempo": "01:30",
    //     "horario": "10:00 - 11:30",
    //     "fecha": "2025-03-01",
    //     "fecha_confirmacion": "2025-03-01 07:15:56",
    //     "fecha_cancelacion": null,
    //     "user_id": 2,
    //     "user_cancelado_id": null,
    //     "color": "red"
    //   },
    //   {
    //     "id": 13,
    //     "nombre": "adalid",
    //     "numero_personas": 2,
    //     "observaciones": null,
    //     "estado": "Finalizado",
    //     "json": "{\"3-3\":\"9:30 a 10:00\",\"4-3\":\"10:00 a 10:30\",\"5-3\":\"10:30 a 11:00\",\"6-3\":\"11:00 a 11:30\"}",
    //     "sala": "Sala 4",
    //     "motivo_cancelacion": null,
    //     "total": "40.00",
    //     "adelanto": 20,
    //     "tiempo": "02:00",
    //     "horario": "9:30 - 11:30",
    //     "fecha": "2025-03-01",
    //     "fecha_confirmacion": "2025-03-01 07:16:07",
    //     "fecha_cancelacion": null,
    //     "user_id": 2,
    //     "user_cancelado_id": null,
    //     "color": "red"
    //   }
    // ]
    let textoSalas = '<table class="table">'
    let sumaTotal = 0
    salas.forEach((element) => {
      textoSalas += `
        <tr style="border-top: 1px solid black; border-bottom: 1px solid black;">
          <td>${element.nombre}</td>
          <td>${element.sala}</td>
          <td>${element.horario}</td>
          <td>${element.estado}</td>
          <td class="text-right">${element.total}</td>
        </tr>
      `
      sumaTotal += parseInt(element.total)
    })
    textoSalas += `
      <tr style="border-top: 1px solid black; border-bottom: 1px solid black;">
        <td class="text-right"></td>
        <td class="text-right"></td>
        <td class="text-right"></td>
        <td class="text-right text-bold">Total</td>
        <td class="text-right">${sumaTotal.toFixed(2)}</td>
      </tr>
    `
    textoSalas += '</table>'
    const cadena = `
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
      <div class="text-right text-h6">Fecha: ${moment().format('DD/MM/YYYY HH:mm:ss')}</div>
      <div class="text-right text-h6">${useCounterStore().user.name}</div>
      <div class="text-center text-bold">CONTROL SALAS</div>
      <div><span class="text-bold">Fecha</span> ${moment(fechaInicio).format('DD/MM/YYYY')} - ${moment(fechaFin).format('DD/MM/YYYY')}</div>
      <div><span class="text-bold">Usuario:</span> ${userFind}</div>
      <div><span class="text-bold">Salas:</span> ${textoSalas}</div>
    </div>
    `
    document.getElementById('myElement').innerHTML = cadena
    const d = new Printd()
    d.print(document.getElementById('myElement'))

  }
  static imprimirProductos (productos, fechaInicio, fechaFin, userFind) {

    // console.log(productosAll)
    let textoProductos = '<div class="text-h5"><table class="table">' +
      '<tr style="border-top: 1px solid black; border-bottom: 1px solid black;">' +
      '<th>Nombre</th>' +
      '<th class="text-right">Precio</th>' +
      '<th class="text-right">Cantidad</th>' +
      '<th class="text-right">Total</th>' +
      '</tr>'

    let sumaTotal = 0
    productos.forEach((element) => {
      console.log(element)
      textoProductos += `
        <tr style="border-top: 1px solid black; border-bottom: 1px solid black;">
          <td>${element.productoName}</td>
          <td class="text-right">${parseInt(element.precio).toFixed(2)}</td>
          <td class="text-right">${element.cantidad}</td>
          <td class="text-right">${element.subtotal}</td>
        </tr>
      `
      sumaTotal += parseInt(element.subtotal)
    })
    textoProductos += `
      <tr style="border-top: 1px solid black; border-bottom: 1px solid black;">
        <td class="text-right"></td>
        <td class="text-right"></td>
        <td class="text-right text-bold">Total</td>
        <td class="text-right">${sumaTotal.toFixed(2)}</td>
      </tr>
    `
    textoProductos += '</table></div>'

    const cadena = `
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
      <div class="text-right text-h6">Fecha: ${moment().format('DD/MM/YYYY HH:mm:ss')}</div>
      <div class="text-right text-h6">${useCounterStore().user.name}</div>
      <div class="text-center text-bold">CONTROL PRODUCTOS</div>
      <div><span class="text-bold">Fecha</span> ${moment(fechaInicio).format('DD/MM/YYYY')} - ${moment(fechaFin).format('DD/MM/YYYY')}</div>
      <div><span class="text-bold">Usuario:</span> ${userFind}</div>
      <div>${textoProductos}</div>
    </div>
    `
    document.getElementById('myElement').innerHTML = cadena
    const d = new Printd()
    d.print(document.getElementById('myElement'))
  }
  static imprimirCaja (sales, fechaInicio, fechaFin, userFind) {
    // console.log(sales)
    let textoCajas = '<table style="border-collapse: collapse;border: 1px;width: 100%"><tr><th>N</th><th>Fecha</th><th>Nombre</th><th>Total</th></tr>'
    let contador = 1
    let total = 0
    sales.forEach((sale) => {
      console.log(sale)
      total += parseFloat(sale.total)
      textoCajas += `
        <tr>
          <td>${contador++}</td>
          <td>${this.dateDmYHis(sale.fecha)}</td>
          <td>${sale.nombre}</td>
          <td style="text-align: right">${sale.total} Bs</td>
        </tr>
      `
    })
    textoCajas += `
      <tr>
        <td></td>
        <td></td>
        <td class="text-right text-bold">Total</td>
        <td style="text-align: right">${total.toFixed(2)} Bs</td>
      </tr>
    `

    const cadena = `
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
      <div class="text-right text-h6">Fecha: ${moment().format('DD/MM/YYYY HH:mm:ss')}</div>
      <div class="text-right text-h6">${useCounterStore().user.name}</div>
      <div class="text-center text-bold">CONTROL CAJA</div>
      <div><span class="text-bold">Fecha</span> ${moment(fechaInicio).format('DD/MM/YYYY')} - ${moment(fechaFin).format('DD/MM/YYYY')}</div>
      <div><span class="text-bold">Usuario:</span> ${userFind}</div>
      <div>
      <span class="text-bold">Cajas:</span>
      <div>
      ${textoCajas}
      </div>
      </div>
    </div>
    `
    document.getElementById('myElement').innerHTML = cadena
    const d = new Printd()
    d.print(document.getElementById('myElement'))
  }
  static numeroALetras(num) {
    num = parseInt(num);
    if (isNaN(num) || num < 0 || num > 1000000) return 'Número fuera de rango';

    const unidades = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
    const decenas = ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
    const especiales = {
      10: 'diez', 11: 'once', 12: 'doce', 13: 'trece', 14: 'catorce',
      15: 'quince', 16: 'dieciséis', 17: 'diecisiete', 18: 'dieciocho', 19: 'diecinueve'
    };
    const centenas = ['', 'cien', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

    function convertirCentenas(n) {
      if (n < 10) return unidades[n];
      if (n >= 10 && n < 20) return especiales[n];
      if (n < 100) {
        const unidad = n % 10;
        return `${decenas[Math.floor(n / 10)]}${unidad > 0 ? ' y ' + unidades[unidad] : ''}`;
      }
      if (n === 100) return 'cien';
      const dec = n % 100;
      return `${centenas[Math.floor(n / 100)]}${dec > 0 ? ' ' + convertirCentenas(dec) : ''}`;
    }

    if (num === 1000000) return 'un millón';

    let miles = Math.floor(num / 1000);
    let resto = num % 1000;
    let milesTexto = miles > 0 ? (miles === 1 ? 'mil' : `${convertirCentenas(miles)} mil`) : '';
    let restoTexto = resto > 0 ? convertirCentenas(resto) : '';

    return (milesTexto + ' ' + restoTexto).trim();
  }
}
