
<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-12 col-sm-4">
            <q-input v-model="fechaInicio" label="Fecha Inicio" type="date" outlined dense />
          </div>
          <div class="col-12 col-sm-4">
            <q-input v-model="fechaFin" label="Fecha Fin" type="date" outlined dense />
          </div>
          <div class="col-12 col-sm-4">
            <q-btn color="primary" label="Buscar" icon="search" @click="getVentas" :loading="loading" />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card class="q-mt-md">
      <q-card-section>
        <q-markup-table dense flat bordered wrap-cells>
          <thead>
            <tr class="bg-primary text-white">
              <th>Fecha</th>
              <th>Usuario</th>
              <th>Total</th>
              <th>Comentario</th>
              <th>Detalle</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="venta in ventas" :key="venta.id">
              <td>{{ formatDate(venta.fecha) }}</td>
              <td>{{ venta.user?.username }}</td>
              <td class="text-right">{{ venta.total.toFixed(2) }} Bs</td>
              <td>{{ venta.comentarioDoctor || '' }}</td>
              <td>
                <ul>
                  <li v-for="item in venta.oasisSalesDetalles" :key="item.id">
                    {{ item.cantidad }} × {{ item.productoName }} = {{ (item.precio * item.cantidad).toFixed(2) }} Bs
                  </li>
                </ul>
              </td>
              <td>
                <q-btn dense size="sm" icon="print" color="primary" @click="imprimirVenta(venta)" />
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-card-section>
    </q-card>

    <div id="myElement" class="hidden"></div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue';
import moment from 'moment';
import { Imprimir } from 'src/addons/Imprimir.js';

const { proxy } = getCurrentInstance();
const fechaInicio = ref(moment().format("YYYY-MM-DD"));
const fechaFin = ref(moment().format("YYYY-MM-DD"));
const ventas = ref([]);
const loading = ref(false);

function getVentas() {
  loading.value = true;
  proxy.$axios.get('/oasis-sales', {
    params: {
      fechaInicio: fechaInicio.value,
      fechaFin: fechaFin.value
    }
  }).then(res => {
    ventas.value = res.data;
  }).finally(() => {
    loading.value = false;
  });
}

function imprimirVenta(venta) {
  Imprimir.notaOasisVenta({ 
    sale: venta, 
    detalles: venta.oasisSalesDetalles 
  });
}

function formatDate(fecha) {
  return moment(fecha).format('DD/MM/YYYY HH:mm');
}

onMounted(() => {
  getVentas();
});
</script>
