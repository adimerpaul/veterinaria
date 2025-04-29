<template>
  <q-page class="q-pa-xs">
    <div class="row">
      <div class="col-12">
        <!--        btn atras-->
        <q-btn label="Atras" color="primary" @click="$router.push('/ventas')" no-caps icon="arrow_back" size="10px" />
      </div>
      <div class="col-12 col-md-7">
        <q-card flat bordered class="q-ma-xs">
          <q-card-section>
            <q-form @submit.prevent="getProductos">
            <div class="row">
              <div class="col-12 col-md-7">
                <q-input v-model="buscarProducto" label="Buscar producto" outlined dense debounce="300" clearable />
              </div>
              <div class="col-12 col-md-3">
                <q-select v-model="filterTipo" label="Tipo" outlined dense :options="tipos" />
              </div>
              <div class="col-12 col-md-2 flex flex-center">
                <q-btn label="Buscar" color="primary" no-caps icon="search" size="10px" type="submit"/>
              </div>
            </div>
            </q-form>
            <div class="row">
              <div class="col-12 flex flex-center">
                <q-pagination
                  v-if="totalPages > 1"
                  v-model="currentPage"
                  :max="totalPages"
                  :max-pages="5"
                  boundary-numbers
                  color="black"
                  @update:model-value="getProductos"
                />
              </div>
            </div>
            <q-markup-table dense bordered flat>
              <thead>
                <tr>
                  <th>Cod</th>
                  <th>Nombre</th>
                  <th>Tipo</th>
                  <th>Precio</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in productos" @click="agregarAlCarrito(product)" :key="product.id" style="cursor: pointer">
                  <td>{{product.codigo}}</td>
                  <td>{{product.nombre}}</td>
                  <td>
<!--                    {{product.tipo}}-->
                    <q-chip dense :color="getColor(product.tipo)" size="10px">
                      {{ product.tipo }}
                    </q-chip>
                  </td>
                  <td class="text-right">{{product.precioVenta}}</td>
                  <td>{{product.stock}}</td>
                </tr>
              </tbody>
            </q-markup-table>
<!--            <pre>{{productos}}</pre>-->
<!--            [-->
<!--            {-->
<!--            "id": 19,-->
<!--            "codigo": "mace",-->
<!--            "nombre": "Acedan",-->
<!--            "presentacion": "caja",-->
<!--            "contenido": "10ml",-->
<!--            "tipo": "Producto",-->
<!--            "precioCompra": "15.00",-->
<!--            "precioVenta": "45.00",-->
<!--            "stock": 1,-->
<!--            "activo": true,-->
<!--            "createdAt": "2025-02-28T10:21:37.836Z",-->
<!--            "updatedAt": "2025-03-12T09:43:26.311Z",-->
<!--            "deletedAt": null-->
<!--            },-->
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-5">
        <q-card flat bordered class="q-ma-xs">
          <q-card-section>
            <div class="div">
              <div class="text-h6 row items-center">
                <div>Carrito</div>
                <q-space />
                <q-btn icon="delete" color="red" dense @click="carrito = []" :loading="loading" size="10px" label="Limpiar" no-caps />
              </div>
              <div class="text-caption">Productos agregados al carrito</div>
            </div>
            <q-markup-table wrap-cells dense flat bordered>
              <thead>
              <tr class="bg-primary text-white">
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Subtotal</th>
                <th>Acciones</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, index) in carrito" :key="index">
                <td>
<!--                  <q-btn icon="delete" color="red" dense @click="eliminarDelCarrito(index)" :loading="loading" size="10px" />-->
                  <div style="max-width: 150px; wrap-option: wrap; line-height: 0.9">
                    {{ item.nombre }}
                  </div>
                </td>
                <td>
                  <input v-model.number="item.cantidadVenta" type="number" style="width: 50px" min="1" />
                </td>
                <td>
<!--                  {{ item.precioVenta }} Bs-->
                  <input v-model.number="item.precioVenta" type="number" style="width: 80px" min="1" step="0.1" />
                </td>
                <td class="text-right">{{ (item.cantidadVenta * item.precioVenta).toFixed(2) }} Bs</td>
                <td>
                  <q-btn icon="delete" color="red" dense @click="eliminarDelCarrito(index)" :loading="loading" size="10px" />
                </td>
              </tr>
              </tbody>
              <tfoot>
              <tr>
                <td colspan="3" class="text-right text-bold">Total</td>
                <td class="text-bold text-right">{{ totalVenta }} Bs</td>
                <td></td>
              </tr>
              </tfoot>
            </q-markup-table>
            <q-btn label="Realizar Venta" color="positive" class="full-width q-mt-md" no-caps @click="realizarVenta"
                   :loading="loading"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-dialog v-model="dialogVenta">
      <q-card flat bordered style="max-width: 750px;">
        <q-card-section class="q-pb-none row items-center">
          <div class="text-bold">
            Realizar Venta
          </div>
          <q-space />
          <q-btn flat dense round icon="close" @click="dialogVenta = false" />
        </q-card-section>
        <q-card-section>
          <q-form @submit.prevent="realizarVentaPost">
            <div class="row">
              <div class="col-12 q-pa-xs">
                <div class="row">
                  <div class="col-8">
                    <q-select input-debounce="300" clearable use-input v-model="mascota" label="Mascota" outlined dense :options="mascotas" :option-label="m => m.id+'|'+m.nombre+'|'+m.propietario_nombre" :option-value="m => m.id"
                              @filter="mascotasFilter" :rules="[val => !!val || 'Campo requerido']">
<!--                      <template v-slot:after>-->
<!--                      </template>-->
                    </q-select>
                  </div>
                  <div class="col-2 flex flex-center">
                    <q-btn :loading="loading" dense color="green" label="Crear" no-caps icon="add_circle_outline" to="/mascotas/create" />
                  </div>
                  <div class="col-2 flex flex-center">
                    <q-btn :loading="loading" dense color="blue" label="historial" no-caps icon="history" @click="mascotaHistorial" v-if="mascota" />
                  </div>
                </div>
<!--                <pre>{{mascotas}}</pre>-->
<!--                <pre>{{mascota}}</pre>-->
              </div>
              <div class="col-12">
                <q-markup-table wrap-cells dense flat bordered>
                  <thead>
                  <tr class="bg-primary text-white">
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Tipo</th>
                    <th>Precio</th>
                    <th>Subtotal</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(item, index) in carrito" :key="index">
                    <td>{{ item.nombre }}</td>
                    <td>{{ item.cantidadVenta }}</td>
                    <td>
                      <q-chip dense :color="getColor(item.tipo)" size="10px">
                        {{ item.tipo }}
                      </q-chip>
                    </td>
                    <td class="text-right">{{ item.precioVenta }} Bs</td>
                    <td class="text-right">{{ (item.cantidadVenta * item.precioVenta).toFixed(2) }} Bs</td>
                  </tr>
                  </tbody>
                  <tfoot>
                  <tr>
                    <td colspan="3" class="text-right text-bold">Total</td>
                    <td class="text-bold text-right">{{ totalVenta }} Bs</td>
                  </tr>
                  </tfoot>
                </q-markup-table>
              </div>
              <div class="col-12 q-pa-xs">
                <q-btn label="Realizar Venta" color="positive" class="full-width" type="submit" no-caps :loading="loading" />
              </div>
              <div class="col-12" v-if="historialCompra.length > 0">
                <div class="text-h6 row items-center">
                  Historial de Compras
                </div>
                <q-markup-table flat bordered dense>
                  <thead>
                    <tr>
                      <td>#</td>
                      <td>Fecha</td>
                      <td>Total</td>
                      <td>Anulado</td>
                      <td>Detalles</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in historialCompra" :key="index">
                      <td>{{ item.id }}</td>
                      <td>{{ item.fecha.slice(0, 10) }}</td>
                      <td>{{ item.total }}</td>
                      <td>{{ item.anulado ? 'Si' : 'No' }}</td>
                      <td>
                        <div style="max-width: 150px; wrap-option: wrap; line-height: 0.9">
                          <span v-for="(detail, index) in item.details" :key="index">
                            {{ detail.productoName }} ({{ detail.cantidad }})<br>
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </q-markup-table>
<!--                <pre>{{historialCompra}}</pre>-->
<!--                [-->
<!--                {-->
<!--                "id": 15,-->
<!--                "tipo": "Venta",-->
<!--                "fecha": "2025-03-19T09:38:17.000Z",-->
<!--                "fechaCreacion": "2025-03-19T09:38:17.000Z",-->
<!--                "facturado": false,-->
<!--                "nombre": "SN",-->
<!--                "ci": null,-->
<!--                "total": "533.00",-->
<!--                "anulado": true,-->
<!--                "createdAt": "2025-03-19T09:38:17.957Z",-->
<!--                "updatedAt": "2025-03-19T09:53:25.257Z",-->
<!--                "deletedAt": null,-->
<!--                "mascota": {-->
<!--                "id": 1,-->
<!--                "nombre": "SN",-->
<!--                "especie": "Otro",-->
<!--                "raza": "",-->
<!--                "sexo": "Macho",-->
<!--                "fecha_nac": "2000-01-01",-->
<!--                "edad": null,-->
<!--                "senas_particulares": "null",-->
<!--                "photo": "compressed-1742371183193-441920296.png",-->
<!--                "color": "Negro",-->
<!--                "propietario_nombre": "SN",-->
<!--                "propietario_ci": null,-->
<!--                "propietario_direccion": "",-->
<!--                "propietario_telefono": "",-->
<!--                "propietario_ciudad": "Oruro",-->
<!--                "propietario_celular": "a",-->
<!--                "createdAt": "2025-03-12T10:21:25.461Z",-->
<!--                "updatedAt": "2025-03-19T07:59:43.000Z",-->
<!--                "deletedAt": null-->
<!--                },-->
<!--                "user": {-->
<!--                "id": 2,-->
<!--                "name": "MVZ. ROGER PAUL HUARACHI TITO",-->
<!--                "role": "Admin",-->
<!--                "username": "Roger",-->
<!--                "password": "$2b$10$hLxScAvuENNvqjNTwS1p6u/TUd0Ej9Oae9iCAzZSHBqMlCI.fLO0a",-->
<!--                "agencia": "Oasis",-->
<!--                "createdAt": "2025-03-12T09:47:07.193Z",-->
<!--                "updatedAt": "2025-03-12T09:47:07.193Z",-->
<!--                "deletedAt": null-->
<!--                },-->
<!--                "details": [-->
<!--                {-->
<!--                "id": 26,-->
<!--                "fecha": "2025-03-19T09:38:17.000Z",-->
<!--                "productoName": "Peluquería Razas Grandes Mayores a 20 kg",-->
<!--                "subtotal": "325.00",-->
<!--                "precio": "325.00",-->
<!--                "cantidad": 1,-->
<!--                "anulado": true,-->
<!--                "createdAt": "2025-03-19T09:38:17.996Z",-->
<!--                "updatedAt": "2025-03-19T09:38:26.000Z",-->
<!--                "deletedAt": null-->
<!--                },-->
<!--                {-->
<!--                "id": 27,-->
<!--                "fecha": "2025-03-19T09:38:18.000Z",-->
<!--                "productoName": "Peluquería Razas Medianas Menores a 20 kg",-->
<!--                "subtotal": "208.00",-->
<!--                "precio": "208.00",-->
<!--                "cantidad": 1,-->
<!--                "anulado": true,-->
<!--                "createdAt": "2025-03-19T09:38:18.009Z",-->
<!--                "updatedAt": "2025-03-19T09:38:26.000Z",-->
<!--                "deletedAt": null-->
<!--                }-->
<!--                ]-->
<!--                },-->
<!--                {-->
<!--                "id": 16,-->
<!--                "tipo": "Venta",-->
<!--                "fecha": "2025-03-19T09:38:23.000Z",-->
<!--                "fechaCreacion": "2025-03-19T09:38:23.000Z",-->
<!--                "facturado": false,-->
<!--                "nombre": "SN",-->
<!--                "ci": null,-->
<!--                "total": "140.00",-->
<!--                "anulado": false,-->
<!--                "createdAt": "2025-03-19T09:38:23.893Z",-->
<!--                "updatedAt": "2025-03-19T09:53:25.245Z",-->
<!--                "deletedAt": null,-->
<!--                "mascota": {-->
<!--                "id": 1,-->
<!--                "nombre": "SN",-->
<!--                "especie": "Otro",-->
<!--                "raza": "",-->
<!--                "sexo": "Macho",-->
<!--                "fecha_nac": "2000-01-01",-->
<!--                "edad": null,-->
<!--                "senas_particulares": "null",-->
<!--                "photo": "compressed-1742371183193-441920296.png",-->
<!--                "color": "Negro",-->
<!--                "propietario_nombre": "SN",-->
<!--                "propietario_ci": null,-->
<!--                "propietario_direccion": "",-->
<!--                "propietario_telefono": "",-->
<!--                "propietario_ciudad": "Oruro",-->
<!--                "propietario_celular": "a",-->
<!--                "createdAt": "2025-03-12T10:21:25.461Z",-->
<!--                "updatedAt": "2025-03-19T07:59:43.000Z",-->
<!--                "deletedAt": null-->
<!--                },-->
<!--                "user": {-->
<!--                "id": 3,-->
<!--                "name": "LIC. MARLENE CANAVIRI JORGE",-->
<!--                "role": "Vendedor",-->
<!--                "username": "Marlene",-->
<!--                "password": "$2b$10$hLxScAvuENNvqjNTwS1p6u/TUd0Ej9Oae9iCAzZSHBqMlCI.fLO0a",-->
<!--                "agencia": "Oasis",-->
<!--                "createdAt": "2025-03-12T09:47:07.197Z",-->
<!--                "updatedAt": "2025-03-12T09:47:07.197Z",-->
<!--                "deletedAt": null-->
<!--                },-->
<!--                "details": [-->
<!--                {-->
<!--                "id": 28,-->
<!--                "fecha": "2025-03-19T09:38:23.000Z",-->
<!--                "productoName": "Adaptil",-->
<!--                "subtotal": "120.00",-->
<!--                "precio": "120.00",-->
<!--                "cantidad": 1,-->
<!--                "anulado": false,-->
<!--                "createdAt": "2025-03-19T09:38:23.926Z",-->
<!--                "updatedAt": "2025-03-19T09:38:23.926Z",-->
<!--                "deletedAt": null-->
<!--                },-->
<!--                {-->
<!--                "id": 29,-->
<!--                "fecha": "2025-03-19T09:38:23.000Z",-->
<!--                "productoName": "Acondicionador Farecs",-->
<!--                "subtotal": "20.00",-->
<!--                "precio": "20.00",-->
<!--                "cantidad": 1,-->
<!--                "anulado": false,-->
<!--                "createdAt": "2025-03-19T09:38:23.935Z",-->
<!--                "updatedAt": "2025-03-19T09:38:23.935Z",-->
<!--                "deletedAt": null-->
<!--                }-->
<!--                ]-->
<!--                },-->
<!--                {-->
<!--                "id": 19,-->
<!--                "tipo": "Venta",-->
<!--                "fecha": "2025-03-19T10:32:08.000Z",-->
<!--                "fechaCreacion": "2025-03-19T10:32:08.000Z",-->
<!--                "facturado": false,-->
<!--                "nombre": "SN",-->
<!--                "ci": null,-->
<!--                "total": "50.00",-->
<!--                "anulado": false,-->
<!--                "createdAt": "2025-03-19T10:32:08.324Z",-->
<!--                "updatedAt": "2025-03-19T10:32:08.324Z",-->
<!--                "deletedAt": null,-->
<!--                "mascota": {-->
<!--                "id": 1,-->
<!--                "nombre": "SN",-->
<!--                "especie": "Otro",-->
<!--                "raza": "",-->
<!--                "sexo": "Macho",-->
<!--                "fecha_nac": "2000-01-01",-->
<!--                "edad": null,-->
<!--                "senas_particulares": "null",-->
<!--                "photo": "compressed-1742371183193-441920296.png",-->
<!--                "color": "Negro",-->
<!--                "propietario_nombre": "SN",-->
<!--                "propietario_ci": null,-->
<!--                "propietario_direccion": "",-->
<!--                "propietario_telefono": "",-->
<!--                "propietario_ciudad": "Oruro",-->
<!--                "propietario_celular": "a",-->
<!--                "createdAt": "2025-03-12T10:21:25.461Z",-->
<!--                "updatedAt": "2025-03-19T07:59:43.000Z",-->
<!--                "deletedAt": null-->
<!--                },-->
<!--                "user": {-->
<!--                "id": 1,-->
<!--                "name": "ING. ADIMER PAUL CHAMBI AJATA",-->
<!--                "role": "Admin",-->
<!--                "username": "Adimer",-->
<!--                "password": "$2b$10$hLxScAvuENNvqjNTwS1p6u/TUd0Ej9Oae9iCAzZSHBqMlCI.fLO0a",-->
<!--                "agencia": "Clinica",-->
<!--                "createdAt": "2025-03-12T09:47:07.189Z",-->
<!--                "updatedAt": "2025-04-29T08:36:19.000Z",-->
<!--                "deletedAt": null-->
<!--                },-->
<!--                "details": [-->
<!--                {-->
<!--                "id": 33,-->
<!--                "fecha": "2025-03-19T10:32:08.000Z",-->
<!--                "productoName": "Acondicionador Miel 4 litros",-->
<!--                "subtotal": "50.00",-->
<!--                "precio": "10.00",-->
<!--                "cantidad": 5,-->
<!--                "anulado": false,-->
<!--                "createdAt": "2025-03-19T10:32:08.335Z",-->
<!--                "updatedAt": "2025-03-19T10:32:08.335Z",-->
<!--                "deletedAt": null-->
<!--                }-->
<!--                ]-->
<!--                },-->
<!--                {-->
<!--                "id": 21,-->
<!--                "tipo": "Venta",-->
<!--                "fecha": "2025-04-29T09:03:17.000Z",-->
<!--                "fechaCreacion": "2025-04-29T09:03:17.000Z",-->
<!--                "facturado": false,-->
<!--                "nombre": "SN",-->
<!--                "ci": null,-->
<!--                "total": "65.00",-->
<!--                "anulado": false,-->
<!--                "createdAt": "2025-04-29T09:03:17.597Z",-->
<!--                "updatedAt": "2025-04-29T09:03:17.597Z",-->
<!--                "deletedAt": null,-->
<!--                "mascota": {-->
<!--                "id": 1,-->
<!--                "nombre": "SN",-->
<!--                "especie": "Otro",-->
<!--                "raza": "",-->
<!--                "sexo": "Macho",-->
<!--                "fecha_nac": "2000-01-01",-->
<!--                "edad": null,-->
<!--                "senas_particulares": "null",-->
<!--                "photo": "compressed-1742371183193-441920296.png",-->
<!--                "color": "Negro",-->
<!--                "propietario_nombre": "SN",-->
<!--                "propietario_ci": null,-->
<!--                "propietario_direccion": "",-->
<!--                "propietario_telefono": "",-->
<!--                "propietario_ciudad": "Oruro",-->
<!--                "propietario_celular": "a",-->
<!--                "createdAt": "2025-03-12T10:21:25.461Z",-->
<!--                "updatedAt": "2025-03-19T07:59:43.000Z",-->
<!--                "deletedAt": null-->
<!--                },-->
<!--                "user": {-->
<!--                "id": 1,-->
<!--                "name": "ING. ADIMER PAUL CHAMBI AJATA",-->
<!--                "role": "Admin",-->
<!--                "username": "Adimer",-->
<!--                "password": "$2b$10$hLxScAvuENNvqjNTwS1p6u/TUd0Ej9Oae9iCAzZSHBqMlCI.fLO0a",-->
<!--                "agencia": "Clinica",-->
<!--                "createdAt": "2025-03-12T09:47:07.189Z",-->
<!--                "updatedAt": "2025-04-29T08:36:19.000Z",-->
<!--                "deletedAt": null-->
<!--                },-->
<!--                "details": [-->
<!--                {-->
<!--                "id": 35,-->
<!--                "fecha": "2025-04-29T09:03:17.000Z",-->
<!--                "productoName": "Acedan",-->
<!--                "subtotal": "45.00",-->
<!--                "precio": "45.00",-->
<!--                "cantidad": 1,-->
<!--                "anulado": false,-->
<!--                "createdAt": "2025-04-29T09:03:17.610Z",-->
<!--                "updatedAt": "2025-04-29T09:03:17.610Z",-->
<!--                "deletedAt": null-->
<!--                },-->
<!--                {-->
<!--                "id": 36,-->
<!--                "fecha": "2025-04-29T09:03:17.000Z",-->
<!--                "productoName": "Acondicionador Farecs",-->
<!--                "subtotal": "20.00",-->
<!--                "precio": "20.00",-->
<!--                "cantidad": 1,-->
<!--                "anulado": false,-->
<!--                "createdAt": "2025-04-29T09:03:17.618Z",-->
<!--                "updatedAt": "2025-04-29T09:03:17.618Z",-->
<!--                "deletedAt": null-->
<!--                }-->
<!--                ]-->
<!--                }-->
<!--                ]-->
              </div>
            </div>
<!--            <q-input v-model="venta.nombre" label="Nombre Cliente" outlined dense :rules="[val => !!val || 'Campo requerido']" />-->
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import {ref, computed, getCurrentInstance, onMounted} from "vue";
import { useRouter } from 'vue-router';

const router = useRouter();

const { proxy } = getCurrentInstance();
const venta = ref({ nombre: "", fecha: new Date().toISOString().slice(0, 10) });
const productos = ref([]);
const productosAll = ref([]);
const carrito = ref([]);
let buscarProducto = ref("");
const dialogVenta = ref(false);
const loading = ref(false);
const currentPage = ref(1);
const totalPages = ref(1);
const filterTipo = ref('Todos');
const tipos = ['Todos','Cirugía', 'Laboratorio', 'Peluqueria', 'Producto', 'Tratamiento'];
const mascotas = ref([]);
const historialCompra = ref([]);
const mascota = ref(null);

onMounted(() => {
  getProductos();
  mascotasGet();
});
function mascotasGet() {
  proxy.$axios.get("mascotas", { params: { filter: '' } })
    .then(res => {
      mascotas.value = res.data.data;
    })
}
function mascotaHistorial() {
  console.log(mascota.value);
  loading.value = true;
  proxy.$axios.post("mascotas/historial", { mascotaId: mascota.value.id }).then(res => {
    console.log(res.data);
    historialCompra.value = res.data;
  }).finally(() => {
    loading .value= false;
  });
}
function getColor(tipo) {
  switch (tipo) {
    case 'Cirugía':
      return 'red';
    case 'Laboratorio':
      return 'blue';
    case 'Peluqueria':
      return 'green';
    case 'Producto':
      return 'orange';
    case 'Tratamiento':
      return 'purple';
    default:
      return 'grey';
  }
}
function getProductos() {
  proxy.$axios.get("/productos",{
    params: {
      filter: buscarProducto.value,
      page: currentPage.value,
      limit: 20, // Puedes cambiar el límite por página
      tipo: filterTipo.value === 'Todos' ? '' : filterTipo.value
    }
  }).then(response => {
    productos.value = response.data.data
    // this.productos = res.data.data;
    // this.totalPages = res.data.last_page;
    totalPages.value = response.data.last_page;
  });
}

const totalVenta = computed(() => {
  return carrito.value.reduce((acc, item) => acc + (item.cantidadVenta * item.precioVenta), 0).toFixed(2);
});

// function buscarProductos() {
//   productos.value = productosAll.value.filter(p => p.nombre.toLowerCase().includes(buscarProducto.value.toLowerCase()));
// }

function agregarAlCarrito(producto) {
  const item = carrito.value.find(p => p.id === producto.id);
  if (item) {
    item.cantidadVenta++;
  } else {
    carrito.value.push({ ...producto, cantidadVenta: 1, precioVenta: producto.precioVenta });
  }
}

function eliminarDelCarrito(index) {
  carrito.value.splice(index, 1);
}

function realizarVenta() {
  // if (carrito.value.length === 0) {
  //   proxy.$q.notify({ color: "negative", message: "El carrito está vacío" });
  //   return;
  // }
  // proxy.$axios.post("/ventas", { ...venta.value, total: totalVenta.value, productos: carrito.value }).then(() => {
  //   carrito.value = [];
  //   venta.value = { nombre: "", fecha: new Date().toISOString().slice(0, 10) };
  //   proxy.$q.notify({ color: "positive", message: "Venta realizada con éxito" });
  // });
  if (carrito.value.length === 0) {
    proxy.$alert.error("El carrito está vacío", "Error");
    return;
  }
  dialogVenta.value = true;
  // venta.value = { nombre: "SN", };
  mascota.value = {
    "id": 1,
    "nombre": "SN",
    "propietario_nombre": "SN"
  };
}
function mascotasFilter(val, update) {
  if (val === '') {
    update(() => {
      proxy.$axios.get("mascotas", { params: { filter: '' } })
        .then(res => {
          mascotas.value = res.data.data;
        })
    })
    return
  }

  update(() => {
    // const needle = val.toLowerCase()
    // options.value = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
    proxy.$axios.get("mascotas", { params: { filter: val } })
      .then(res => {
        mascotas.value = res.data.data;
      })
  })
}
function realizarVentaPost() {
  if (carrito.value.length === 0) {
    proxy.$alert.error("El carrito está vacío");
    return;
  }
  loading.value = true;
  proxy.$axios.post("/sales", { mascota:mascota.value, total: totalVenta.value, productos: carrito.value }).then(async () => {
    // carrito.value = [];
    // venta.value = {nombre: "", fecha: new Date().toISOString().slice(0, 10)};
    // dialogVenta.value = false;
    proxy.$alert.success("Venta realizada con éxito", "Éxito");
    router.push("/ventas");
    // await getProductos();
    // buscarProducto.value = "";
  }).catch((res) => {
    proxy.$alert.error(res.response.data.message, "Error");
  }).finally(() => {
    loading.value = false;
  });
}
</script>
