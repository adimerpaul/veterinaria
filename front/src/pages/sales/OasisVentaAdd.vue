<template>
  <q-page class="q-pa-xs">
    <div class="row">
      <div class="col-12">
        <q-btn label="Atras" color="primary" @click="$router.push('/oasis-ventas')" no-caps icon="arrow_back" size="10px" />
      </div>
      <div class="col-12 col-md-7">
        <q-card flat bordered class="q-ma-xs">
          <q-card-section>
            <q-form @submit.prevent="getProductos">
              <div class="row">
                <div class="col-12 col-md-7">
                  <q-input v-model="buscarProducto" label="Buscar oasis producto" outlined dense debounce="300" clearable />
                </div>
                <div class="col-12 col-md-2 flex flex-center">
                  <q-btn label="Buscar" color="primary" no-caps icon="search" size="10px" type="submit" />
                </div>
              </div>
            </q-form>
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
              <tr v-for="product in productos" :key="product.id" @click="agregarAlCarrito(product)" style="cursor: pointer">
                <td>{{ product.codigo }}</td>
                <td>
<!--                  wrap d 100px-->
                  <div style="max-width: 120px; white-space: wrap;line-height: 0.9;">
                    {{ product.nombre }}
                  </div>
                </td>
                <td><q-chip dense :color="getColor(product.tipo)" size="10px">{{ product.tipo }}</q-chip></td>
                <td class="text-right">{{ product.precioVenta }}</td>
                <td>{{ product.stock }}</td>
              </tr>
              </tbody>
            </q-markup-table>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-5">
        <q-card flat bordered class="q-ma-xs">
          <q-card-section>
            <div class="text-h6">Carrito</div>
            <q-markup-table wrap-cells dense flat bordered>
              <thead>
              <tr class="bg-primary text-white">
                <th>Producto</th>
                <th>Cant</th>
                <th>Precio</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, index) in carrito" :key="index">
                <td>{{ item.nombre }}</td>
                <td><input v-model.number="item.cantidadVenta" type="number" min="1" style="width: 50px" /></td>
                <td><input v-model.number="item.precioVenta" type="number" step="0.01" style="width: 70px" /></td>
                <td class="text-right">{{ (item.cantidadVenta * item.precioVenta).toFixed(2) }}</td>
                <td><q-btn icon="delete" dense color="red" size="10px" @click="carrito.splice(index, 1)" /></td>
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
            <q-btn label="Realizar Venta" color="positive" class="full-width q-mt-sm" @click="dialogVenta = true" :loading="loading" no-caps />
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-dialog v-model="dialogVenta">
      <q-card style="width: 400px">
        <q-card-section>
          <div class="text-h6">Confirmar Venta</div>
          <div class="row">
            <div class="col-12">
              <q-input v-model="ci" label="CI" outlined dense hint="Ingrese CI " :rules="[val => val.length >= 5 || 'CI debe tener al menos 5 caracteres']" />
              <q-input v-model="nombre" label="Nombre " outlined dense hint="Ingrese nombre " :rules="[val => val.length > 0 || 'Nombre es requerido']" />
              <q-input v-model="comentario" label="Comentario " outlined dense hint="" type="textarea" />
            </div>
          </div>
          <div>Total: <strong>{{ totalVenta }} Bs</strong></div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn label="Confirmar" color="positive" @click="realizarVentaPost" :loading="loading" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div id="myElement" class="hidden"></div>
  </q-page>
</template>

<script setup>
import { ref, computed, getCurrentInstance, onMounted } from 'vue';
import { Imprimir } from 'src/addons/Imprimir.js';
import {generarPdfVentaOasis} from "src/utils/GenerarPdfOasis.js";

const { proxy } = getCurrentInstance();
const buscarProducto = ref('');
const productos = ref([]);
const carrito = ref([]);
const loading = ref(false);
const dialogVenta = ref(false);
const ci = ref('');
const nombre = ref('');
const comentario = ref('');

const totalVenta = computed(() => carrito.value.reduce((acc, item) => acc + item.cantidadVenta * item.precioVenta, 0).toFixed(2));

function getColor(tipo) {
  switch (tipo) {
    case 'Cirugía': return 'red';
    case 'Laboratorio': return 'blue';
    case 'Peluqueria': return 'green';
    case 'Producto': return 'orange';
    case 'Tratamiento': return 'purple';
    default: return 'grey';
  }
}

function getProductos() {
  proxy.$axios.get('/oasis-productos', {
    params: { filter: buscarProducto.value }
  }).then(res => {
    productos.value = res.data;
  });
}

function agregarAlCarrito(producto) {
  const item = carrito.value.find(p => p.id === producto.id);
  if (item) {
    item.cantidadVenta++;
  } else {
    carrito.value.push({ ...producto, cantidadVenta: 1 });
  }
}

function realizarVentaPost() {
  if (carrito.value.length === 0) {
    proxy.$alert.error('El carrito está vacío');
    return;
  }
  loading.value = true;
  proxy.$axios.post('/oasis-sales', {
    productos: carrito.value,
    total: parseFloat(totalVenta.value),
    ci: ci.value,
    nombre: nombre.value,
    comentario: comentario.value
  }).then((res) => {
    proxy.$alert.success('Venta registrada');
    // Imprimir.notaOasisVenta(res.data);
    generarPdfVentaOasis(res.data)
    carrito.value = [];
    getProductos();
    dialogVenta.value = false;
  }).catch((err) => {
    proxy.$alert.error(err.response?.data?.message || 'Error al registrar venta');
  }).finally(() => {
    loading.value = false;
  });
}

onMounted(() => {
  getProductos();
});
</script>
