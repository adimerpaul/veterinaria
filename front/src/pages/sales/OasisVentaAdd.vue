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
                <div>
                  Carrito
                  <q-btn icon="history" color="blue" dense @click="recuperarTratamiento" :loading="loading" size="10px" label="Recuperar Tratamiento" no-caps />
                </div>
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
<!--                textarea comentario doctor-->
                <q-input v-model="venta.comentarioDoctor" label="Comentario Doctor" outlined dense type="textarea" rows="2" />
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
              </div>
            </div>
<!--            <q-input v-model="venta.nombre" label="Nombre Cliente" outlined dense :rules="[val => !!val || 'Campo requerido']" />-->
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
<!--    recuperarTratamientoDialog-->
    <q-dialog v-model="recuperarTratamientoDialog">
      <q-card flat bordered style="width: 650px;">
        <q-card-section class="q-pb-none row items-center">
          <div class="text-bold">
            Recuperar Tratamiento
          </div>
          <q-space />
          <q-btn flat dense round icon="close" @click="recuperarTratamientoDialog = false" />
        </q-card-section>
        <q-card-section>
          <div class="text-caption">Seleccione una fecha para recuperar el tratamiento</div>
<!--          recuperarTratamientoFecha-->
          <q-input v-model="recuperarTratamientoFecha" type="date" outlined dense :rules="[val => !!val || 'Campo requerido']" >
            <template v-slot:append>
              <q-btn dense color="green" label="Buscar" no-caps icon="search" @click="buscarTratamiento" :loading="loading" />
            </template>
          </q-input>
          <div class="text-caption q-mt-md">
            Tratamientos realizados el {{ recuperarTratamientoFecha }}:
          </div>
          <q-markup-table flat bordered dense>
            <thead>
            <tr>
              <th>#</th>
              <th>Fecha</th>
              <th>Doctor</th>
              <th>Costo</th>
              <th>Medicamentos</th>
              <th>Opciones</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in historialTratamientos" :key="index">
              <td>{{ item.id }}</td>
              <td>{{ item.fecha.slice(0, 10) }}</td>
              <td>{{ item.user?.username || 'Desconocido' }}</td>
              <td>{{ item.costo }} Bs</td>
              <td>
                <div style="max-width: 200px; white-space: normal; line-height: 1.2">
                  <span v-for="(med, idx) in item.tratamientoMedicamentos" :key="idx">
                    {{ med.medicamento }} ({{ med.cantidad }} x {{ med.precio }} Bs) <br />
                  </span>
                </div>
              </td>
              <td>
                <q-btn label="Recuperar" no-caps dense color="green" icon="add_circle_outline" @click="agregarAcarritoTratemiento(item)"/>
              </td>
            </tr>
            </tbody>
          </q-markup-table>

        </q-card-section>
      </q-card>

    </q-dialog>
  </q-page>
  <div id="myElement"></div>
</template>

<script setup>
import {ref, computed, getCurrentInstance, onMounted} from "vue";
import { useRouter } from 'vue-router';
import {Imprimir} from "src/addons/Imprimir.js";
import moment from "moment";

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
const recuperarTratamientoDialog = ref(false);
const recuperarTratamientoFecha = ref(moment().format('YYYY-MM-DD'));
const historialTratamientos = ref([])

onMounted(() => {
  getProductos();
  mascotasGet();
});
function agregarAcarritoTratemiento(tratamiento) {
  if (!tratamiento?.tratamientoMedicamentos || tratamiento.tratamientoMedicamentos.length === 0) {
    proxy.$alert.error("Este tratamiento no tiene medicamentos.");
    return;
  }

  tratamiento.tratamientoMedicamentos.forEach((med) => {
    const existingItem = carrito.value.find(p => p.nombre === med.medicamento);
    if (existingItem) {
      existingItem.cantidadVenta += med.cantidad;
    } else {
      carrito.value.push({
        nombre: med.medicamento,
        cantidadVenta: med.cantidad,
        precioVenta: med.precio,
        tipo: 'Tratamiento', // Opcional: para usar getColor()
      });
    }
  });

  proxy.$alert.success("Tratamiento agregado al carrito.");
  recuperarTratamientoDialog.value = false;
}
function buscarTratamiento() {
  if (!recuperarTratamientoFecha.value) {
    proxy.$alert.error("Seleccione una fecha", "Error");
    return;
  }
  loading.value = true;
  proxy.$axios.get("tratamientos", {
    params:{
     fecha: recuperarTratamientoFecha.value
    }
  }).then(res => {
    // console.log(res.data);
    historialTratamientos.value = res.data;
  }).finally(() => {
    loading.value = false;
  });
}
function recuperarTratamiento(){
  recuperarTratamientoDialog.value = true;
  recuperarTratamientoFecha.value = moment().format('YYYY-MM-DD');
  buscarTratamiento()
}
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
  proxy.$axios.post("/sales", {
    mascota:mascota.value,
    total: parseFloat(totalVenta.value),
    productos: carrito.value,
    comentarioDoctor: venta.value.comentarioDoctor,
  }).then(async (res) => {
    // carrito.value = [];
    // venta.value = {nombre: "", fecha: new Date().toISOString().slice(0, 10)};
    // dialogVenta.value = false;
    proxy.$alert.success("Venta realizada con éxito", "Éxito");
    router.push("/ventas");
    // await getProductos();
    // buscarProducto.value = "";
    Imprimir.nota(res.data.sale);
  }).catch((res) => {
    proxy.$alert.error(res.response.data.message, "Error");
  }).finally(() => {
    loading.value = false;
  });
}
</script>
