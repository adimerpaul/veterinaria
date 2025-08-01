<template>
  <q-page class="q-pa-md bg-grey-2">
    <q-card>
      <q-card-section class="row q-gutter-sm">
        <q-input v-model="fecha" label="Selecciona Fecha" type="date" outlined dense class="col-4" />
        <q-btn label="Buscar" color="primary" @click="cargarReporte" />
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
          <q-markup-table dense bordered flat class="bg-white text-center">
            <thead>
            <tr>
              <th>Nro Ficha</th>
              <th>Detalle</th>
              <th>Cant</th>
              <th>Bs</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(r, i) in registros" :key="i">
              <td>{{ r.nroFicha }}</td>
              <td>{{ r.detalle }}</td>
              <td>1</td>
              <td>{{ r.costo }}</td>
            </tr>
            <tr class="bg-blue-1 text-bold">
              <td colspan="2">TOTAL</td>
              <td>{{ registros.length }}</td>
              <td>{{ registros.reduce((acc, r) => acc + Number(r.costo), 0) }}</td>
            </tr>
            </tbody>
          </q-markup-table>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import {getCurrentInstance, ref} from 'vue'
import { imprimirReporteTratamientosPorDoctor } from 'src/utils/imprimirReporteTratamientosPorDoctor'
import moment from "moment";
const { proxy } = getCurrentInstance()

const fecha = ref(moment().format('YYYY-MM-DD'))
const reporte = ref({})

const cargarReporte = async () => {
  if (!fecha.value) return
  const { data } = await proxy.$axios.get('/tratamientos/reporte-por-doctor', { params: { fecha: fecha.value } })
  reporte.value = data
}

const exportarPDF = () => {
  imprimirReporteTratamientosPorDoctor(reporte.value, fecha.value)
}

</script>
