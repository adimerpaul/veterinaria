<template>
  <q-page class="q-pa-xs">
    <q-card flat bordered>
      <q-card-section class="q-pa-xs">
        <q-form @submit.prevent="getVentas">
          <div class="row">
            <div class="col-12 col-md-2">
              <q-input v-model="fechaInicio" label="Fecha Inicio" type="date" outlined dense />
            </div>
            <div class="col-12 col-md-2">
              <q-input v-model="fechaFin" label="Fecha Fin" type="date" outlined dense />
            </div>
            <div class="col-12 col-md-2">
              <q-select v-model="user" label="Usuario" outlined dense :options="users"
                        option-label="name" option-value="id" emit-value map-options
                        v-if="$store.user.role === 'Admin'"
              />
              <!--              <pre>{{user}}</pre>-->
            </div>
            <div class="col-12 col-md-2 flex flex-center">
              <q-btn style="width: 150px" label="Buscar" color="primary" type="submit" icon="search" no-caps :loading="loading" />
            </div>
            <div class="col-12 col-md-2">
              <q-select v-model="reporte" label="Tipo Reporte" outlined dense :options="reportes"
                        v-if="$store.user.role === 'Admin'"
              />
            </div>
            <div class="col-12 col-md-2 flex flex-center">
              <q-btn style="width: 150px" label="Imprimir" color="indigo" icon="print" no-caps :loading="loading"
                     @click="imprimir" v-if="$store.user.role === 'Admin'"
              />
            </div>
            <div class="col-12 col-md-12 flex flex-center">
            </div>
            <div class="col-12 col-md-4">
              <q-input v-model="filter" label="Filtro" outlined dense @update:modelValue="filtroVentas" clearable />
            </div>
            <div class="col-12 col-md-2 flex flex-center">
              <q-btn style="width: 150px" label="Venta" color="positive" @click="$router.push('/ventas/add')" no-caps icon="add_circle_outline"
                     :loading="loading"
              />
            </div>
            <div class="col-12 col-md-4 flex flex-center">
            </div>
            <div class="col-12 col-md-2 flex flex-center">
<!--              <q-btn style="width: 150px" label="Cerrar Caja" color="red" @click="cerraCaja" no-caps icon="point_of_sale"-->
<!--                     :loading="loading"-->
<!--              />-->
            </div>
          </div>
        </q-form>
        <div class="row">
          <div class="col-12 col-md-4 q-pa-xs">
            <q-list bordered padding dense>
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-avatar color="indigo" text-color="white" icon="event" />
                </q-item-section>
                <q-item-section>
                  <q-item-label lines="1">
                    <span class="text-weight-bold">
                      {{ventas.length}} ventas
                    </span>
                  </q-item-label>
                  <q-item-label caption lines="2">
                    Cantida de ventas
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-list bordered padding dense>
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-avatar color="green" text-color="white" icon="attach_money" />
                </q-item-section>
                <q-item-section>
                  <q-item-label lines="1">
                    <span class="text-weight-bold">
                      Bs {{ventas.filter(venta => !venta.anulado).reduce((acc, venta) => acc + parseFloat(venta.total), 0).toFixed(2)}}
                    </span>
                  </q-item-label>
                  <q-item-label caption lines="2">
                    Total de reservas
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <!--          total cancalado anulados-->
          <div class="col-12 col-md-4 q-pa-xs">
            <q-list bordered padding dense>
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-avatar color="red" text-color="white" icon="cancel" />
                </q-item-section>
                <q-item-section>
                  <q-item-label lines="1">
                    <span class="text-weight-bold">
                      Bs {{ventas.filter(venta => venta.anulado).reduce((acc, venta) => acc + parseFloat(venta.total), 0).toFixed(2)}}
                    </span>
                  </q-item-label>
                  <q-item-label caption lines="2">
                    Total de reservas canceladas
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card flat bordered class="q-mt-md">
      <q-card-section>
        <q-markup-table wrap-cells dense flat bordered>
          <thead>
          <tr>
            <th>Acciones</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Nombre Cliente</th>
            <th>Usuario</th>
            <th>Detalle</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="venta in ventas" :key="venta.id">
            <td>
              <q-btn style="width: 80px" icon="remove_circle_outline" color="negative" dense @click="anular(venta.id)" label="Anular" no-caps size="10px"
                     v-if="!venta.anulado"
              />
              <div v-else>
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
        </q-markup-table>
<!--        <pre>{{ventas}}</pre>-->
<!--        [-->
<!--        {-->
<!--        "id": 11,-->
<!--        "tipo": "Venta",-->
<!--        "fecha": "2025-03-19T08:26:14.000Z",-->
<!--        "fechaCreacion": "2025-03-19T08:26:14.000Z",-->
<!--        "facturado": false,-->
<!--        "nombre": "SN",-->
<!--        "ci": null,-->
<!--        "total": "292.50",-->
<!--        "anulado": false,-->
<!--        "createdAt": "2025-03-19T08:26:14.522Z",-->
<!--        "updatedAt": "2025-03-19T08:26:14.522Z",-->
<!--        "deletedAt": null,-->
<!--        "mascota": {-->
<!--        "id": 1,-->
<!--        "nombre": "SN",-->
<!--        "especie": "Otro",-->
<!--        "raza": "",-->
<!--        "sexo": "Macho",-->
<!--        "fecha_nac": "2000-01-01",-->
<!--        "senas_particulares": "null",-->
<!--        "photo": "compressed-1742371183193-441920296.png",-->
<!--        "color": "Negro",-->
<!--        "propietario_nombre": "SN",-->
<!--        "propietario_direccion": "",-->
<!--        "propietario_telefono": "",-->
<!--        "propietario_ciudad": "Oruro",-->
<!--        "propietario_celular": "a",-->
<!--        "createdAt": "2025-03-12T10:21:25.461Z",-->
<!--        "updatedAt": "2025-03-19T07:59:43.000Z",-->
<!--        "deletedAt": null-->
<!--        },-->
<!--        "user": {-->
<!--        "id": 1,-->
<!--        "name": "ING. ADIMER PAUL CHAMBI AJATA",-->
<!--        "role": "Admin",-->
<!--        "username": "Adimer",-->
<!--        "password": "$2b$10$hLxScAvuENNvqjNTwS1p6u/TUd0Ej9Oae9iCAzZSHBqMlCI.fLO0a",-->
<!--        "createdAt": "2025-03-12T09:47:07.189Z",-->
<!--        "updatedAt": "2025-03-12T09:47:07.189Z",-->
<!--        "deletedAt": null-->
<!--        },-->
<!--        "details": [-->
<!--        {-->
<!--        "id": 19,-->
<!--        "fecha": "2025-03-19T08:26:14.000Z",-->
<!--        "productoName": "Desparasitaciones mayor a 10 kg",-->
<!--        "subtotal": "292.50",-->
<!--        "cantidad": 5,-->
<!--        "anulado": false,-->
<!--        "createdAt": "2025-03-19T08:26:14.528Z",-->
<!--        "updatedAt": "2025-03-19T08:26:14.528Z",-->
<!--        "deletedAt": null-->
<!--        }-->
<!--        ]-->
<!--        },-->
      </q-card-section>
    </q-card>
  </q-page>
  <!--  dialogCaja-->
  <q-dialog v-model="dialogCaja" persistent>
    <q-card flat bordered style="width: 350px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-bold">
          Cerrar Caja
        </div>
        <q-space />
        <q-btn flat dense icon="close" @click="dialogCaja = false" />
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="cerraCajaSubmit">
          <!--          <q-input v-model="caja.monto_inicial" label="Monto Inicial" type="number" outlined dense hint="" />-->
          <q-input v-model="caja.monto_final" label="Monto Final" type="number" outlined dense hint="" />
          <q-input type="textarea" v-model="caja.observacion" label="Observación" outlined dense hint="" />
          <q-btn label="Cerrar Caja" color="red" type="submit" :loading="loading" no-caps icon="point_of_sale" class="q-mt-md" />
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!--  myElement-->
  <div id="myElement" class="hidden"></div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from "vue";
import moment from "moment";
import {Impresion} from "src/addons/Impresion.js";

const { proxy } = getCurrentInstance();
const fechaInicio = ref(moment().format("YYYY-MM-DD"));
const fechaFin = ref(moment().format("YYYY-MM-DD"));
const ventas = ref([]);
const ventasAll = ref([]);
const loading = ref(false);
const filter = ref("");
const users = ref([]);
const user = ref('');
const reporte = ref('CAJA');
const dialogCaja = ref(false);
const caja = ref({});
const productos = ref([]);
const reportes = ref([
  'CAJA',
  'PRODUCTOS',
]);

onMounted(() => {
  getVentas();
  getUsers();
  // getProductos();
});

// function getProductos() {
//   proxy.$axios.get("/productos").then(response => {
//     productos.value = response.data;
//   });
// }

function imprimir() {
  if (!user.value) {
    proxy.$alert.error("Seleccione un usuario", "Por favor");
    return;
  }
  const userFind = users.value.find(usuario => usuario.id === user.value);
  loading.value = true;
  proxy.$axios.post("/sales/imprimir", {
    user_id: user.value,
    fechaInicio: fechaInicio.value,
    fechaFin: fechaFin.value,
    reporte: reporte.value
  }).then((res) => {
    if (reporte.value === 'CAJA') {
      Impresion.imprimirCaja(res.data,fechaInicio.value,fechaFin.value,userFind.name);
    }
    if (reporte.value === 'PRODUCTOS') {
      Impresion.imprimirProductos(res.data,fechaInicio.value,fechaFin.value,userFind.name);
    }
  }).finally(() => {
    loading.value = false;
  });
}

function cerraCaja() {
  dialogCaja.value = true;
  caja.value = {
    monto_inicial: 0,
    monto_final: 0,
    observacion: ''
  };
}
function cerraCajaSubmit() {
  loading.value = true;
  proxy.$axios.post("/cajas", caja.value).then((res) => {
    dialogCaja.value = false;
    // getVentas();
    proxy.$alert.success("Registrado correctamente", res.data);
  }).finally(() => {
    loading.value = false;
  });
}
function filtroVentas() {
  if (!filter.value) {
    ventas.value = ventasAll.value;
    return;
  }
  ventas.value = ventasAll.value.filter(venta => {
    return (
      venta.nombre.toLowerCase().includes(filter.value.toLowerCase()) ||
      venta.user?.name.toLowerCase().includes(filter.value.toLowerCase())
      //    texto de detalle
    );
  });
}

function anular(id) {
  proxy.$q.dialog({
    title: "Anular Venta",
    message: "¿Está seguro de anular la venta?",
    ok: "Sí",
    cancel: "No"
  }).onOk(() => {
    loading.value = true;
    proxy.$axios.put(`/sales/${id}/anular`).then(() => {
      getVentas();
    }).finally(() => {
      loading.value = false;
    });
  });
}
function getUsers() {
  // users todos
  users.value = [
    { id: '', name: 'Todos' }
  ]
  proxy.$axios.get("/users").then(response => {
    // users.value = response.data;
    response.data.forEach(user => {
      users.value.push({ id: user.id, name: user.name });
    });
  });
}
function getVentas() {
  loading.value = true;
  proxy.$axios.get("/sales", {
    params: { fechaInicio: fechaInicio.value, fechaFin: fechaFin.value, user_id: user.value }
  }).then(response => {
    ventas.value = response.data;
    // for (let venta of ventas.value) {
    //   const find = users.value.find(usuario => usuario.id === venta.user_id);
    //   if (!find) {
    //     users.value.push({ id: venta.user_id, name: venta.user?.name });
    //   }
    // }
    // if (ventas.value.length > 0) {
    //   user.value = ventas.value[0].user_id;
    // }
    ventasAll.value = response.data;
  }).finally(() => {
    loading.value = false;
  });
}

function verDetalles(id) {
  proxy.$router.push(`/ventas/${id}`);
}
</script>
