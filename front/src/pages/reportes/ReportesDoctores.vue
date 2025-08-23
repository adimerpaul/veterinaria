<template>
  <q-page class="q-pa-md bg-grey-2">
    <q-card>
      <q-card-section class="row q-gutter-sm">
        <q-input v-model="fecha" label="Selecciona Fecha" type="date" outlined dense class="col-4" />
        <q-btn label="Buscar" color="primary" @click="cargarReporte" :loading="loading" />
        <q-btn
          label="Exportar PDF"
          color="deep-orange"
          icon="picture_as_pdf"
          @click="exportarPDF"
          :disable="Object.keys(reporte).length === 0"
        />
      </q-card-section>

      <q-separator />

      <q-card-section v-if="Object.keys(reporte).length > 0">
        <div v-for="(registros, doctor) in reporte" :key="doctor" class="q-mb-md">
          <div class="text-h6 text-primary">{{ doctor }}</div>
          <q-markup-table dense bordered flat class="bg-white">
            <thead>
            <tr class="text-center">
              <th style="width: 90px">Nro Ficha</th>
              <th>Detalle</th>
              <th style="width: 60px">Cant</th>
              <th style="width: 110px">Bs</th>
              <th style="min-width: 260px">Medicamentos / Productos</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(r, i) in registros" :key="i">
              <td class="text-center">{{ r.nroFicha }}</td>
              <td class="text-left">
                <div style="max-width:320px;white-space:normal;line-height:1.1">
                  {{ r.detalle || '—' }}
                </div>
              </td>
              <td class="text-center">1</td>
              <td class="text-right">{{ Number(r.costo || 0).toFixed(2) }}</td>
              <td class="text-left">
                <div style="max-width:420px;white-space:normal;line-height:1.1">
                  <template v-if="r.medicamentos && r.medicamentos.length">
                    <div v-for="(m, idx) in r.medicamentos" :key="idx" class="q-mb-xs">
                      • {{ m.medicamento }}
                      <span v-if="m.productoNombre"> ({{ m.productoNombre }})</span>
                      — {{ m.cantidad }} x {{ Number(m.precio || 0).toFixed(2) }} =
                      <b>{{ Number(m.total || (m.cantidad * m.precio) || 0).toFixed(2) }}</b>
                    </div>
                  </template>
                  <span v-else class="text-grey">Sin medicamentos</span>
                </div>
              </td>
            </tr>

            <tr class="bg-blue-1 text-bold">
              <td colspan="2" class="text-right">TOTAL</td>
              <td class="text-center">{{ registros.length }}</td>
              <td class="text-right">
                {{ registros.reduce((acc, r) => acc + Number(r.costo || 0), 0).toFixed(2) }}
              </td>
              <td></td>
            </tr>
            </tbody>
          </q-markup-table>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import {getCurrentInstance, onMounted, ref} from 'vue'
import { imprimirReporteTratamientosPorDoctor } from 'src/utils/imprimirReporteTratamientosPorDoctor'
import moment from "moment";

const { proxy } = getCurrentInstance()

const fecha = ref(moment().format('YYYY-MM-DD'))
const reporte = ref({})
const loading = ref(false)

// mounted iniciar conylta
onMounted(() => {
  cargarReporte()
})
const cargarReporte = async () => {
  if (!fecha.value) return
  loading.value = true
  try {
    // Usa el endpoint del ReportesController que ya incluye medicamentos
    const { data } = await proxy.$axios.get('/reportes/tratamientos-por-doctor', { params: { fecha: fecha.value } })
    reporte.value = data || {}
  } finally {
    loading.value = false
  }
}

const exportarPDF = () => {
  // Si tu util ya soporta 'medicamentos', perfecto.
  // Si no, puedes adaptar la impresión para recorrer r.medicamentos.
  imprimirReporteTratamientosPorDoctor(reporte.value, fecha.value)
}
</script>
