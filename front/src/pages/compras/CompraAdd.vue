<template>
  <q-page class="q-pa-xs">
    <div class="row">
      <div class="col-12">
        <q-btn label="Atrás" color="primary" no-caps icon="arrow_back" size="10px" @click="$router.push('/compras')"/>
      </div>

      <!-- Listado de productos -->
      <div class="col-12 col-md-7">
        <q-card flat bordered class="q-ma-xs">
          <q-card-section>
            <q-form @submit.prevent="getProductos">
              <div class="row">
                <div class="col-12 col-md-8">
                  <q-input v-model="buscarProducto" label="Buscar producto" outlined dense debounce="300" clearable/>
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
                <th>P. Compra</th>
                <th>Stock</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="p in productos" :key="p.id" @click="agregarAlCarrito(p)" style="cursor:pointer">
                <td>{{ p.codigo }}</td>
                <td>{{ p.nombre }}</td>
                <td><q-chip dense color="teal" size="10px">{{ p.tipo }}</q-chip></td>
                <td class="text-right">{{ p.precioCompra }}</td>
                <td>{{ p.stock }}</td>
              </tr>
              </tbody>
            </q-markup-table>
          </q-card-section>
        </q-card>
      </div>

      <!-- Carrito -->
      <div class="col-12 col-md-5">
        <q-card flat bordered class="q-ma-xs">
          <q-card-section>
            <div class="row items-center">
              <div class="text-h6">Carrito</div>
              <q-space/>
              <q-btn icon="delete" color="red" dense :loading="loading" size="10px" label="Limpiar" no-caps @click="carrito = []"/>
            </div>
            <q-markup-table dense flat bordered wrap-cells class="q-mt-sm">
              <thead>
              <tr class="bg-teal text-white">
                <th>Producto</th>
                <th>Cant.</th>
                <th>P. Compra</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(it, idx) in carrito" :key="idx">
                <td style="max-width:180px; line-height:.95">{{ it.nombre }}</td>
                <td><input v-model.number="it.cantidadCompra" type="number" min="1" style="width:60px"/></td>
                <td><input v-model.number="it.precioCompra" type="number" step="0.1" min="0" style="width:90px"/></td>
                <td class="text-right">{{ (it.cantidadCompra * it.precioCompra).toFixed(2) }} Bs</td>
                <td><q-btn icon="delete" color="red" dense size="10px" @click="eliminarDelCarrito(idx)"/></td>
              </tr>
              </tbody>
              <tfoot>
              <tr>
                <td colspan="3" class="text-right text-bold">Total</td>
                <td class="text-right text-bold">{{ totalCompra }} Bs</td>
                <td></td>
              </tr>
              </tfoot>
            </q-markup-table>

            <q-btn class="full-width q-mt-md" color="positive" no-caps label="Registrar Compra" :loading="loading" @click="abrirDialog"/>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Dialog confirmar -->
    <q-dialog v-model="dialogCompra">
      <q-card flat bordered style="max-width:750px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-bold">Registrar Compra</div>
          <q-space/><q-btn flat dense round icon="close" @click="dialogCompra=false"/>
        </q-card-section>
        <q-card-section>
          <q-form @submit.prevent="registrarCompra">
            <div class="row q-col-gutter-sm">
              <div class="col-12 col-md-6">
                <q-input v-model="form.proveedor" label="Proveedor" outlined dense :rules="[v=>!!v || 'Requerido']"/>
              </div>
              <div class="col-6 col-md-3">
                <q-select v-model="form.pago" :options="['Efectivo','Transferencia','Qr']" label="Pago" outlined dense/>
              </div>
              <div class="col-12">
                <q-input v-model="form.comentario" label="Comentario" type="textarea" rows="2" outlined dense/>
              </div>

              <div class="col-12">
                <q-markup-table dense flat bordered>
                  <thead>
                  <tr class="bg-teal text-white">
                    <th>Producto</th><th>Cant.</th><th>P. Compra</th><th>Subtotal</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(it, idx) in carrito" :key="idx">
                    <td>{{ it.nombre }}</td>
                    <td>{{ it.cantidadCompra }}</td>
                    <td class="text-right">{{ it.precioCompra }} Bs</td>
                    <td class="text-right">{{ (it.cantidadCompra * it.precioCompra).toFixed(2) }} Bs</td>
                  </tr>
                  </tbody>
                  <tfoot>
                  <tr>
                    <td colspan="3" class="text-right text-bold">Total</td>
                    <td class="text-right text-bold">{{ totalCompra }} Bs</td>
                  </tr>
                  </tfoot>
                </q-markup-table>
              </div>

              <div class="col-12 q-pa-xs">
                <q-btn class="full-width" color="positive" type="submit" no-caps label="Confirmar Compra" :loading="loading"/>
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted, getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance();

const productos    = ref([]);
const currentPage  = ref(1);
const totalPages   = ref(1);
const buscarProducto = ref('');
const carrito      = ref([]);
const loading      = ref(false);
const dialogCompra = ref(false);

const form = ref({
  proveedor: 'SN',
  pago: 'Efectivo',
  comentario: ''
});

onMounted(() => { getProductos(); });

function getProductos() {
  proxy.$axios.get('/productos', {
    params: { filter: buscarProducto.value, page: currentPage.value, limit: 20 }
  }).then(r => {
    productos.value  = r.data.data;
    totalPages.value = r.data.last_page;
  });
}

function agregarAlCarrito(p) {
  const it = carrito.value.find(x => x.id === p.id);
  if (it) it.cantidadCompra++;
  else carrito.value.push({
    ...p,
    cantidadCompra: 1,
    precioCompra: parseFloat(p.precioCompra ?? 0) || 0
  });
}
function eliminarDelCarrito(i) { carrito.value.splice(i,1); }
const totalCompra = computed(() =>
  carrito.value.reduce((a,it)=>a + (it.cantidadCompra * it.precioCompra), 0).toFixed(2)
);

function abrirDialog() {
  if (carrito.value.length === 0) { proxy.$alert.error('El carrito está vacío'); return; }
  dialogCompra.value = true;
}

function registrarCompra() {
  if (carrito.value.length === 0) { proxy.$alert.error('El carrito está vacío'); return; }
  loading.value = true;
  proxy.$axios.post('/purchases', {
    proveedor: form.value.proveedor,
    pago: form.value.pago,
    comentario: form.value.comentario,
    total: parseFloat(totalCompra.value),
    productos: carrito.value.map(i => ({
      id: i.id,
      cantidad: i.cantidadCompra,
      precio: i.precioCompra
    }))
  }).then(res => {
    proxy.$alert.success('Compra registrada con éxito');
    dialogCompra.value = false;
    carrito.value = [];
    form.value = { proveedor: 'SN', pago: 'Efectivo', comentario: '' };
    proxy.$router.push('/compras');
  }).catch(err => {
    proxy.$alert.error(err.response?.data?.message || 'Error al registrar compra');
  }).finally(()=> loading.value = false);
}
</script>
