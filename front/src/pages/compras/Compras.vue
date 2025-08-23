<template>
  <q-page class="q-pa-xs">
    <q-card flat bordered>
      <q-card-section class="q-pa-xs">
        <q-form @submit.prevent="getCompras">
          <div class="row">
            <div class="col-12 col-md-2">
              <q-input v-model="fechaInicio" label="Fecha Inicio" type="date" outlined dense />
            </div>
            <div class="col-12 col-md-2">
              <q-input v-model="fechaFin" label="Fecha Fin" type="date" outlined dense />
            </div>
            <div class="col-12 col-md-3" v-if="$store.user.role === 'Admin'">
              <q-select v-model="user" label="Usuario" outlined dense :options="users"
                        option-label="name" option-value="id" emit-value map-options/>
            </div>
            <div class="col-12 col-md-2 flex flex-center">
              <q-btn style="width:150px" label="Buscar" color="primary" type="submit" icon="search" no-caps :loading="loading"/>
            </div>
            <div class="col-12 col-md-2 flex flex-center">
              <q-btn label="Excel" color="green" icon="fa-solid fa-file-excel" no-caps :loading="loading" @click="excelExport"/>
            </div>
            <div class="col-12 col-md-3 q-mt-sm">
              <q-input v-model="filter" label="Filtro" outlined dense @update:modelValue="filtroCompras" clearable />
            </div>
            <div class="col-12 col-md-2 flex flex-center q-mt-sm">
              <q-btn style="width:150px" label="Nueva Compra" color="positive" no-caps icon="add_circle_outline" @click="$router.push('/compras/add')"/>
            </div>
          </div>
        </q-form>

        <div class="row q-mt-sm" v-if="$store.user.role === 'Admin'">
          <div class="col-12 col-md-4 q-pa-xs">
            <q-list bordered padding dense>
              <q-item>
                <q-item-section avatar><q-avatar color="indigo" text-color="white" icon="inventory_2"/></q-item-section>
                <q-item-section>
                  <q-item-label><b>{{ compras.length }}</b> compras</q-item-label>
                  <q-item-label caption>Cantidad de compras</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-list bordered padding dense>
              <q-item>
                <q-item-section avatar><q-avatar color="green" text-color="white" icon="attach_money"/></q-item-section>
                <q-item-section>
                  <q-item-label>
                    <b>Bs {{ compras.filter(c => !c.anulado).reduce((a,c)=>a+parseFloat(c.total),0).toFixed(2) }}</b>
                  </q-item-label>
                  <q-item-label caption>Total de compras</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-list bordered padding dense>
              <q-item>
                <q-item-section avatar><q-avatar color="red" text-color="white" icon="cancel"/></q-item-section>
                <q-item-section>
                  <q-item-label>
                    <b>Bs {{ compras.filter(c => c.anulado).reduce((a,c)=>a+parseFloat(c.total),0).toFixed(2) }}</b>
                  </q-item-label>
                  <q-item-label caption>Total de compras anuladas</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card flat bordered class="q-mt-md">
      <q-card-section>
        <q-markup-table dense flat bordered wrap-cells>
          <thead>
          <tr class="bg-teal text-white">
            <th>Acciones</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Proveedor</th>
            <th>Usuario</th>
            <th>Detalle</th>
            <th>Pago</th>
            <th>Comentario</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="c in compras" :key="c.id">
            <td>
              <q-btn-dropdown label="Opciones" no-caps dropdown-icon="more_vert" color="indigo" size="10px" v-if="!c.anulado">
                <q-list>
                  <!-- Puedes agregar imprimir si lo necesitas -->
                  <q-item clickable v-close-popup @click="anular(c.id)">
                    <q-item-section avatar><q-avatar icon="delete"/></q-item-section>
                    <q-item-section><q-item-label>Anular</q-item-label></q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
              <div v-else><q-chip color="red" text-color="white" label="Anulada"/></div>
            </td>
            <td>{{ $filters.dateDmYHis(c.fecha) }}</td>
            <td class="text-right">{{ c.total }}</td>
            <td>{{ c.proveedor }}</td>
            <td>{{ c.user?.username }}</td>
            <td>
              <div style="max-width: 350px; line-height:.95">
                  <span v-for="d in c.details" :key="d.id">
                    {{ d.cantidad }} {{ d.productoName }},
                  </span>
              </div>
            </td>
            <td>{{ c.pago }}</td>
            <td>
              <div style="max-width: 350px; line-height:.95">{{ c.comentario }}</div>
            </td>
          </tr>
          </tbody>
        </q-markup-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue';
import moment from 'moment';
import { Excel } from 'src/addons/Excel.js';

const { proxy } = getCurrentInstance();

const fechaInicio = ref(moment().format('YYYY-MM-DD'));
const fechaFin    = ref(moment().format('YYYY-MM-DD'));
const compras     = ref([]);
const comprasAll  = ref([]);
const loading     = ref(false);
const filter      = ref('');
const users       = ref([{ id: '', name: 'Todos' }]);
const user        = ref('');

onMounted(() => {
  getUsers();
  getCompras();
});

function getUsers() {
  proxy.$axios.get('/users').then(r => {
    r.data.forEach(u => users.value.push({ id: u.id, name: u.name }));
  });
}

function getCompras() {
  loading.value = true;
  proxy.$axios.get('/purchases', {
    params: { fechaInicio: fechaInicio.value, fechaFin: fechaFin.value, user_id: user.value }
  }).then(r => {
    compras.value = r.data;
    comprasAll.value = r.data;
  }).finally(() => loading.value = false);
}

function filtroCompras() {
  if (!filter.value) { compras.value = comprasAll.value; return; }
  const f = filter.value.toLowerCase();
  compras.value = comprasAll.value.filter(c =>
    (c.proveedor || '').toLowerCase().includes(f) ||
    (c.user?.name || '').toLowerCase().includes(f)
  );
}

function anular(id) {
  proxy.$q.dialog({
    title: 'Anular Compra',
    message: '¿Está seguro de anular la compra?',
    ok: 'Sí', cancel: 'No'
  }).onOk(() => {
    loading.value = true;
    proxy.$axios.put(`/purchases/${id}/anular`).then(() => {
      getCompras();
    }).finally(() => loading.value = false);
  });
}

function excelExport() {
  const data = [{
    sheet: 'Compras',
    columns: [
      { label: 'Fecha', value: row => moment(row.fecha).format('DD/MM/YYYY HH:mm') },
      { label: 'Proveedor', value: row => row.proveedor },
      { label: 'Usuario', value: row => row.user?.username },
      { label: 'Total', value: row => row.total },
      { label: 'Pago', value: row => row.pago },
      { label: 'Comentario', value: row => row.comentario },
      { label: 'Detalles', value: row => row.details.map(d => `${d.cantidad} ${d.productoName}`).join(', ') },
    ],
    content: compras.value
  }];
  Excel.export(data, 'Compras');
}
</script>
