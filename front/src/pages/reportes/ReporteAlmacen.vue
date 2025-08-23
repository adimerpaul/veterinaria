<template>
  <q-page class="q-pa-sm">
    <q-card flat bordered>
      <q-card-section class="q-pa-sm">
        <div class="row items-end q-col-gutter-sm">
          <div class="col-12 col-md-2">
            <q-input v-model="fecha" type="date" label="Fecha" outlined dense />
          </div>
          <div class="col-12 col-md-3">
            <q-input
              v-model="search"
              label="Buscar (código/nombre)"
              outlined
              dense
              clearable
              @update:model-value="applyFilter"
            />
          </div>
          <div class="col-12 col-md-2">
            <q-btn
              color="primary"
              no-caps
              icon="search"
              label="Buscar"
              :loading="loading"
              class="full-width"
              @click="fetchData"
            />
          </div>
          <div class="col-6 col-md-2">
            <q-btn
              color="indigo"
              no-caps
              icon="print"
              label="Imprimir"
              class="full-width"
              @click="printReport"
            />
          </div>
          <div class="col-6 col-md-2">
            <q-btn
              color="green"
              no-caps
              icon="fa-solid fa-file-excel"
              label="Excel"
              class="full-width"
              @click="exportExcel"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card flat bordered class="q-mt-md">
      <q-card-section class="q-pa-sm">
        <div class="text-subtitle1 q-mb-sm">
          CONTROL DE ALMACÉN — {{ fechaDMY }}
        </div>

        <q-markup-table dense flat bordered wrap-cells>
          <thead>
          <tr class="bg-teal text-white">
            <th style="width:110px">Código</th>
            <th>Detalle</th>
            <th style="width:140px">Presentación</th>
            <th class="text-right" style="width:90px">PC</th>
            <th class="text-right" style="width:90px">PV</th>
            <th class="text-right" style="width:110px">Comprado</th>
            <th class="text-right" style="width:110px">Vendido</th>
            <th class="text-right" style="width:90px">Stock</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="row in rowsShown" :key="row.id">
            <td>{{ row.codigo }}</td>
            <td>{{ row.nombre }}</td>
            <td>{{ row.presentacion }} {{ row.contenido }}</td>
            <td class="text-right">{{ fmt(row.pc) }}</td>
            <td class="text-right">{{ fmt(row.pv) }}</td>
            <td class="text-right">{{ row.comprado }}</td>
            <td class="text-right">{{ row.vendido }}</td>
            <td class="text-right">{{ row.stock }}</td>
          </tr>
          </tbody>
          <tfoot>
          <tr class="bg-grey-2">
            <td colspan="5" class="text-right text-bold">Totales</td>
            <td class="text-right text-bold">{{ totalComprado }}</td>
            <td class="text-right text-bold">{{ totalVendido }}</td>
            <td class="text-right text-bold">{{ totalStock }}</td>
          </tr>
          </tfoot>
        </q-markup-table>
      </q-card-section>
    </q-card>

    <div id="printArea" class="hidden"></div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted, getCurrentInstance } from 'vue'
import moment from 'moment'
import { Excel } from 'src/addons/Excel.js'
import { Printd } from 'printd'

const { proxy } = getCurrentInstance()

const fecha    = ref(moment().format('YYYY-MM-DD'))
const search   = ref('')
const loading  = ref(false)
const rows     = ref([])
const rowsShown = ref([])

const fechaDMY = computed(() => moment(fecha.value).format('DD/MM/YYYY'))

onMounted(fetchData)

function fetchData () {
  loading.value = true
  // usa GET con params (ajustado a tu backend actual)
  proxy.$axios.get('/reportes/almacen-dia', { params: { fecha: fecha.value } })
    .then(res => {
      rows.value = res.data || []
      applyFilter()
    })
    .finally(() => { loading.value = false })
}

function applyFilter () {
  const s = (search.value || '').toLowerCase()
  if (!s) { rowsShown.value = rows.value; return }
  rowsShown.value = rows.value.filter(r =>
    (r.codigo || '').toLowerCase().includes(s) ||
    (r.nombre || '').toLowerCase().includes(s)
  )
}

function fmt (n) {
  if (n === null || n === undefined) return ''
  const num = Number(n)
  return isNaN(num) ? '' : num.toFixed(2)
}

const totalComprado = computed(() =>
  rowsShown.value.reduce((a, r) => a + (r.comprado || 0), 0)
)
const totalVendido = computed(() =>
  rowsShown.value.reduce((a, r) => a + (r.vendido || 0), 0)
)
const totalStock = computed(() =>
  rowsShown.value.reduce((a, r) => a + (Number(r.stock) || 0), 0)
)

function exportExcel () {
  const data = [{
    sheet: `Almacen_${fecha.value}`,
    columns: [
      { label: 'Código', value: 'codigo' },
      { label: 'Detalle', value: 'nombre' },
      { label: 'Presentación', value: row => `${row.presentacion || ''} ${row.contenido || ''}`.trim() },
      { label: 'PC', value: row => fmt(row.pc) },
      { label: 'PV', value: row => fmt(row.pv) },
      { label: 'Comprado', value: 'comprado' },
      { label: 'Vendido', value: 'vendido' },
      { label: 'Stock', value: 'stock' }
    ],
    content: rowsShown.value
  }]
  Excel.export(data, `Reporte_Almacen_${fecha.value}`)
}

/**
 * Impresión con printd
 * - Genera un HTML simple con estilos embebidos
 * - Llama a printd para abrir el diálogo de impresión
 */
function printReport () {
  const d = new Printd()

  const styles = `
    <style>
      * { box-sizing: border-box; }
      body { font-family: Arial, sans-serif; font-size: 12px; margin: 16px; }
      h3 { margin: 0 0 10px 0; }
      table { width: 100%; border-collapse: collapse; }
      th, td { border: 1px solid #000; padding: 4px; }
      thead tr { background: #009688; color: #fff; }
      tfoot tr { background: #eee; font-weight: bold; }
      .right { text-align: right; }
      @media print { @page { size: A4 portrait; margin: 12mm; } }
    </style>
  `

  const html = `
    <div>
      <h3>CONTROL DE ALMACÉN — ${fechaDMY.value}</h3>
      <table>
        <thead>
          <tr>
            <th>Código</th><th>Detalle</th><th>Presentación</th>
            <th class="right">PC</th><th class="right">PV</th>
            <th class="right">Comprado</th><th class="right">Vendido</th><th class="right">Stock</th>
          </tr>
        </thead>
        <tbody>
          ${rowsShown.value.map(r => `
            <tr>
              <td>${r.codigo || ''}</td>
              <td>${r.nombre || ''}</td>
              <td>${(r.presentacion || '') + ' ' + (r.contenido || '')}</td>
              <td class="right">${fmt(r.pc)}</td>
              <td class="right">${fmt(r.pv)}</td>
              <td class="right">${r.comprado || 0}</td>
              <td class="right">${r.vendido || 0}</td>
              <td class="right">${r.stock || 0}</td>
            </tr>`).join('')}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="5" class="right">Totales</td>
            <td class="right">${totalComprado.value}</td>
            <td class="right">${totalVendido.value}</td>
            <td class="right">${totalStock.value}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  `

  // inyectamos en #printArea
  const el = document.getElementById('printArea')
  el.innerHTML = html

  // ahora sí pasamos el nodo DOM, no un string
  d.print(el, [styles])
}

</script>

<style scoped>
.hidden { display: none; }
</style>
