<template>
  <div>
    <template v-if="mascota.sales.length > 0">
      <q-markup-table wrap-cells dense flat bordered>
        <thead>
        <tr class="bg-indigo text-white">
          <th>#</th>
          <th>Anulado</th>
          <th>Fecha</th>
          <th>Total</th>
          <th>Nombre Cliente</th>
          <th>Usuario</th>
          <th>Detalle</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(venta,i) in mascota.sales" :key="venta.id">
          <td>
            {{ i + 1 }}
          </td>
          <td>
            <!--          <q-btn style="width: 80px" icon="remove_circle_outline" color="negative" dense @click="anular(venta.id)" label="Anular" no-caps size="10px"-->
            <!--                 v-if="!venta.anulado"-->
            <!--          />-->
            <div v-if="venta.anulado">
              <q-chip color="red" text-color="white" label="Anulada" />
            </div>
          </td>
          <td>{{ $filters.dateDmYHis(venta.fecha) }}</td>
          <td class="text-right">{{ venta.total }}</td>
          <td>{{ venta.nombre }}</td>
          <td>{{ venta.user?.username }}</td>
          <td>
            <div style="max-width: 350px; wrap-option: wrap;line-height: 0.9;">
              <span  v-for="detail in venta.details" :key="detail.id">
                {{ detail.cantidad }} {{ detail.productoName }},
              </span>
            </div>
          </td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
          <td colspan="3" class="text-right text-bold">Total</td>
          <td class="text-right text-bold">{{ mascota.sales.reduce((acc, venta) => acc + parseFloat(venta.total), 0).toFixed(2) }}</td>
          <td colspan="3"></td>
        </tr>
        </tfoot>
      </q-markup-table>
    </template>
    <template v-else>
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 text-center">No hay ventas registradas</div>
        </q-card-section>
      </q-card>
    </template>
<!--    <pre>{{mascota}}</pre>-->
<!--    {-->
<!--    "id": 8,-->
<!--    "nombre": "rosa la ruborosa",-->
<!--    "especie": "Gato",-->
<!--    "raza": "Persa",-->
<!--    "sexo": "Macho",-->
<!--    "fecha_nac": "2025-03-13",-->
<!--    "senas_particulares": "oreja blanca",-->
<!--    "photo": "http://localhost:3000/uploads/compressed-1742038298987-736175321.png",-->
<!--    "color": "Dorado",-->
<!--    "propietario_nombre": "angela sara",-->
<!--    "propietario_direccion": "bbbb",-->
<!--    "propietario_telefono": "69603027",-->
<!--    "propietario_ciudad": "Oruro",-->
<!--    "propietario_celular": "",-->
<!--    "createdAt": "2025-03-13T08:29:24.217Z",-->
<!--    "updatedAt": "2025-03-15T11:31:39.000Z",-->
<!--    "deletedAt": null,-->
<!--    "sales": [-->
<!--    {-->
<!--    "id": 14,-->
<!--    "tipo": "Venta",-->
<!--    "fecha": "2025-03-19T09:38:09.000Z",-->
<!--    "fechaCreacion": "2025-03-19T09:38:09.000Z",-->
<!--    "facturado": false,-->
<!--    "nombre": "angela sara",-->
<!--    "ci": null,-->
<!--    "total": "520.00",-->
<!--    "anulado": false,-->
<!--    "createdAt": "2025-03-19T09:38:09.696Z",-->
<!--    "updatedAt": "2025-03-19T09:53:25.273Z",-->
<!--    "deletedAt": null,-->
<!--    "user": {-->
<!--    "id": 3,-->
<!--    "name": "LIC. MARLENE CANAVIRI JORGE",-->
<!--    "role": "Vendedor",-->
<!--    "username": "Marlene",-->
<!--    "password": "$2b$10$hLxScAvuENNvqjNTwS1p6u/TUd0Ej9Oae9iCAzZSHBqMlCI.fLO0a",-->
<!--    "createdAt": "2025-03-12T09:47:07.197Z",-->
<!--    "updatedAt": "2025-03-12T09:47:07.197Z",-->
<!--    "deletedAt": null-->
<!--    },-->
<!--    "details": [-->
<!--    {-->
<!--    "id": 24,-->
<!--    "fecha": "2025-03-19T09:38:09.000Z",-->
<!--    "productoName": "Citología",-->
<!--    "subtotal": "260.00",-->
<!--    "precio": "260.00",-->
<!--    "cantidad": 1,-->
<!--    "anulado": false,-->
<!--    "createdAt": "2025-03-19T09:38:09.724Z",-->
<!--    "updatedAt": "2025-03-19T09:38:09.724Z",-->
<!--    "deletedAt": null-->
<!--    },-->
<!--    {-->
<!--    "id": 25,-->
<!--    "fecha": "2025-03-19T09:38:09.000Z",-->
<!--    "productoName": "Dermatológicos",-->
<!--    "subtotal": "260.00",-->
<!--    "precio": "260.00",-->
<!--    "cantidad": 1,-->
<!--    "anulado": false,-->
<!--    "createdAt": "2025-03-19T09:38:09.731Z",-->
<!--    "updatedAt": "2025-03-19T09:38:09.731Z",-->
<!--    "deletedAt": null-->
<!--    }-->
<!--    ]-->
<!--    },-->
<!--    {-->
<!--    "id": 17,-->
<!--    "tipo": "Venta",-->
<!--    "fecha": "2025-03-19T09:46:06.000Z",-->
<!--    "fechaCreacion": "2025-03-19T09:46:06.000Z",-->
<!--    "facturado": false,-->
<!--    "nombre": "angela sara",-->
<!--    "ci": null,-->
<!--    "total": "52.00",-->
<!--    "anulado": false,-->
<!--    "createdAt": "2025-03-19T09:46:06.110Z",-->
<!--    "updatedAt": "2025-03-19T09:53:25.265Z",-->
<!--    "deletedAt": null,-->
<!--    "user": {-->
<!--    "id": 2,-->
<!--    "name": "MVZ. ROGER PAUL HUARACHI TITO",-->
<!--    "role": "Admin",-->
<!--    "username": "Roger",-->
<!--    "password": "$2b$10$hLxScAvuENNvqjNTwS1p6u/TUd0Ej9Oae9iCAzZSHBqMlCI.fLO0a",-->
<!--    "createdAt": "2025-03-12T09:47:07.193Z",-->
<!--    "updatedAt": "2025-03-12T09:47:07.193Z",-->
<!--    "deletedAt": null-->
<!--    },-->
<!--    "details": [-->
<!--    {-->
<!--    "id": 30,-->
<!--    "fecha": "2025-03-19T09:46:06.000Z",-->
<!--    "productoName": "Corte de Uñas",-->
<!--    "subtotal": "52.00",-->
<!--    "precio": "52.00",-->
<!--    "cantidad": 1,-->
<!--    "anulado": false,-->
<!--    "createdAt": "2025-03-19T09:46:06.139Z",-->
<!--    "updatedAt": "2025-03-19T09:46:06.139Z",-->
<!--    "deletedAt": null-->
<!--    }-->
<!--    ]-->
<!--    },-->
<!--    {-->
<!--    "id": 18,-->
<!--    "tipo": "Venta",-->
<!--    "fecha": "2025-03-19T09:51:32.000Z",-->
<!--    "fechaCreacion": "2025-03-19T09:51:32.000Z",-->
<!--    "facturado": false,-->
<!--    "nombre": "angela sara",-->
<!--    "ci": null,-->
<!--    "total": "2277.00",-->
<!--    "anulado": false,-->
<!--    "createdAt": "2025-03-19T09:51:32.610Z",-->
<!--    "updatedAt": "2025-03-19T09:51:32.610Z",-->
<!--    "deletedAt": null,-->
<!--    "user": {-->
<!--    "id": 1,-->
<!--    "name": "ING. ADIMER PAUL CHAMBI AJATA",-->
<!--    "role": "Admin",-->
<!--    "username": "Adimer",-->
<!--    "password": "$2b$10$hLxScAvuENNvqjNTwS1p6u/TUd0Ej9Oae9iCAzZSHBqMlCI.fLO0a",-->
<!--    "createdAt": "2025-03-12T09:47:07.189Z",-->
<!--    "updatedAt": "2025-03-12T09:47:07.189Z",-->
<!--    "deletedAt": null-->
<!--    },-->
<!--    "details": [-->
<!--    {-->
<!--    "id": 31,-->
<!--    "fecha": "2025-03-19T09:51:32.000Z",-->
<!--    "productoName": "Cesáreas",-->
<!--    "subtotal": "1105.00",-->
<!--    "precio": "1105.00",-->
<!--    "cantidad": 1,-->
<!--    "anulado": false,-->
<!--    "createdAt": "2025-03-19T09:51:32.648Z",-->
<!--    "updatedAt": "2025-03-19T09:51:32.648Z",-->
<!--    "deletedAt": null-->
<!--    },-->
<!--    {-->
<!--    "id": 32,-->
<!--    "fecha": "2025-03-19T09:51:32.000Z",-->
<!--    "productoName": "Ectrópion",-->
<!--    "subtotal": "1172.00",-->
<!--    "precio": "586.00",-->
<!--    "cantidad": 2,-->
<!--    "anulado": false,-->
<!--    "createdAt": "2025-03-19T09:51:32.662Z",-->
<!--    "updatedAt": "2025-03-19T09:51:32.662Z",-->
<!--    "deletedAt": null-->
<!--    }-->
<!--    ]-->
<!--    }-->
<!--    ]-->
<!--    }-->
<!--    {-->
<!--    "id": 8,-->
<!--    "nombre": "rosa la ruborosa",-->
<!--    "especie": "Gato",-->
<!--    "raza": "Persa",-->
<!--    "sexo": "Macho",-->
<!--    "fecha_nac": "2025-03-13",-->
<!--    "senas_particulares": "oreja blanca",-->
<!--    "photo": "http://localhost:3000/uploads/compressed-1742038298987-736175321.png",-->
<!--    "color": "Dorado",-->
<!--    "propietario_nombre": "angela sara",-->
<!--    "propietario_direccion": "bbbb",-->
<!--    "propietario_telefono": "69603027",-->
<!--    "propietario_ciudad": "Oruro",-->
<!--    "propietario_celular": "",-->
<!--    "createdAt": "2025-03-13T08:29:24.217Z",-->
<!--    "updatedAt": "2025-03-15T11:31:39.000Z",-->
<!--    "deletedAt": null,-->
<!--    "sales": [-->
<!--    {-->
<!--    "id": 14,-->
<!--    "tipo": "Venta",-->
<!--    "fecha": "2025-03-19T09:38:09.000Z",-->
<!--    "fechaCreacion": "2025-03-19T09:38:09.000Z",-->
<!--    "facturado": false,-->
<!--    "nombre": "angela sara",-->
<!--    "ci": null,-->
<!--    "total": "520.00",-->
<!--    "anulado": false,-->
<!--    "createdAt": "2025-03-19T09:38:09.696Z",-->
<!--    "updatedAt": "2025-03-19T09:53:25.273Z",-->
<!--    "deletedAt": null,-->
<!--    "user": {-->
<!--    "id": 3,-->
<!--    "name": "LIC. MARLENE CANAVIRI JORGE",-->
<!--    "role": "Vendedor",-->
<!--    "username": "Marlene",-->
<!--    "password": "$2b$10$hLxScAvuENNvqjNTwS1p6u/TUd0Ej9Oae9iCAzZSHBqMlCI.fLO0a",-->
<!--    "createdAt": "2025-03-12T09:47:07.197Z",-->
<!--    "updatedAt": "2025-03-12T09:47:07.197Z",-->
<!--    "deletedAt": null-->
<!--    },-->
<!--    "details": [-->
<!--    {-->
<!--    "id": 24,-->
<!--    "fecha": "2025-03-19T09:38:09.000Z",-->
<!--    "productoName": "Citología",-->
<!--    "subtotal": "260.00",-->
<!--    "precio": "260.00",-->
<!--    "cantidad": 1,-->
<!--    "anulado": false,-->
<!--    "createdAt": "2025-03-19T09:38:09.724Z",-->
<!--    "updatedAt": "2025-03-19T09:38:09.724Z",-->
<!--    "deletedAt": null-->
<!--    },-->
<!--    {-->
<!--    "id": 25,-->
<!--    "fecha": "2025-03-19T09:38:09.000Z",-->
<!--    "productoName": "Dermatológicos",-->
<!--    "subtotal": "260.00",-->
<!--    "precio": "260.00",-->
<!--    "cantidad": 1,-->
<!--    "anulado": false,-->
<!--    "createdAt": "2025-03-19T09:38:09.731Z",-->
<!--    "updatedAt": "2025-03-19T09:38:09.731Z",-->
<!--    "deletedAt": null-->
<!--    }-->
<!--    ]-->
<!--    },-->
<!--    {-->
<!--    "id": 17,-->
<!--    "tipo": "Venta",-->
<!--    "fecha": "2025-03-19T09:46:06.000Z",-->
<!--    "fechaCreacion": "2025-03-19T09:46:06.000Z",-->
<!--    "facturado": false,-->
<!--    "nombre": "angela sara",-->
<!--    "ci": null,-->
<!--    "total": "52.00",-->
<!--    "anulado": false,-->
<!--    "createdAt": "2025-03-19T09:46:06.110Z",-->
<!--    "updatedAt": "2025-03-19T09:53:25.265Z",-->
<!--    "deletedAt": null,-->
<!--    "user": {-->
<!--    "id": 2,-->
<!--    "name": "MVZ. ROGER PAUL HUARACHI TITO",-->
<!--    "role": "Admin",-->
<!--    "username": "Roger",-->
<!--    "password": "$2b$10$hLxScAvuENNvqjNTwS1p6u/TUd0Ej9Oae9iCAzZSHBqMlCI.fLO0a",-->
<!--    "createdAt": "2025-03-12T09:47:07.193Z",-->
<!--    "updatedAt": "2025-03-12T09:47:07.193Z",-->
<!--    "deletedAt": null-->
<!--    },-->
<!--    "details": [-->
<!--    {-->
<!--    "id": 30,-->
<!--    "fecha": "2025-03-19T09:46:06.000Z",-->
<!--    "productoName": "Corte de Uñas",-->
<!--    "subtotal": "52.00",-->
<!--    "precio": "52.00",-->
<!--    "cantidad": 1,-->
<!--    "anulado": false,-->
<!--    "createdAt": "2025-03-19T09:46:06.139Z",-->
<!--    "updatedAt": "2025-03-19T09:46:06.139Z",-->
<!--    "deletedAt": null-->
<!--    }-->
<!--    ]-->
<!--    },-->
<!--    {-->
<!--    "id": 18,-->
<!--    "tipo": "Venta",-->
<!--    "fecha": "2025-03-19T09:51:32.000Z",-->
<!--    "fechaCreacion": "2025-03-19T09:51:32.000Z",-->
<!--    "facturado": false,-->
<!--    "nombre": "angela sara",-->
<!--    "ci": null,-->
<!--    "total": "2277.00",-->
<!--    "anulado": false,-->
<!--    "createdAt": "2025-03-19T09:51:32.610Z",-->
<!--    "updatedAt": "2025-03-19T09:51:32.610Z",-->
<!--    "deletedAt": null,-->
<!--    "user": {-->
<!--    "id": 1,-->
<!--    "name": "ING. ADIMER PAUL CHAMBI AJATA",-->
<!--    "role": "Admin",-->
<!--    "username": "Adimer",-->
<!--    "password": "$2b$10$hLxScAvuENNvqjNTwS1p6u/TUd0Ej9Oae9iCAzZSHBqMlCI.fLO0a",-->
<!--    "createdAt": "2025-03-12T09:47:07.189Z",-->
<!--    "updatedAt": "2025-03-12T09:47:07.189Z",-->
<!--    "deletedAt": null-->
<!--    },-->
<!--    "details": [-->
<!--    {-->
<!--    "id": 31,-->
<!--    "fecha": "2025-03-19T09:51:32.000Z",-->
<!--    "productoName": "Cesáreas",-->
<!--    "subtotal": "1105.00",-->
<!--    "precio": "1105.00",-->
<!--    "cantidad": 1,-->
<!--    "anulado": false,-->
<!--    "createdAt": "2025-03-19T09:51:32.648Z",-->
<!--    "updatedAt": "2025-03-19T09:51:32.648Z",-->
<!--    "deletedAt": null-->
<!--    },-->
<!--    {-->
<!--    "id": 32,-->
<!--    "fecha": "2025-03-19T09:51:32.000Z",-->
<!--    "productoName": "Ectrópion",-->
<!--    "subtotal": "1172.00",-->
<!--    "precio": "586.00",-->
<!--    "cantidad": 2,-->
<!--    "anulado": false,-->
<!--    "createdAt": "2025-03-19T09:51:32.662Z",-->
<!--    "updatedAt": "2025-03-19T09:51:32.662Z",-->
<!--    "deletedAt": null-->
<!--    }-->
<!--    ]-->
<!--    }-->
<!--    ]-->
<!--    }-->
  </div>
</template>
<script>
import moment from "moment/moment.js";

export default {
  name: 'MascotaHistorial',
  props: {
    mascota: {
      type: Object,
      required: true,
    },
  }
}
</script>
