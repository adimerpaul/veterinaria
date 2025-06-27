<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <div class="col-xs-12 col-sm-6 col-md-3" v-for="(card, index) in cards" :key="index">
        <q-card class="bg-primary text-white q-pa-none">
          <q-card-section class="text-center">
            <q-icon :name="card.icon" size="42px" />
            <div class="text-h6">{{ card.label }}</div>
            <div class="text-h4">{{ card.value }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-separator spaced />
    <div class="row q-mt-md">
      <div class="col-12">
        <apexchart type="line" height="350" :options="chartOptions" :series="series" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

export default defineComponent({
  name: 'IndexPage',
  components: {
    apexchart: VueApexCharts
  },
  data() {
    return {
      cards: [],
      chartOptions: {
        chart: { id: 'ventas-por-mes' },
        xaxis: { type: 'category', categories: [] },
        title: { text: 'Ventas por mes', align: 'left' }
      },
      series: [{ name: 'Ventas', data: [] }]
    };
  },
  mounted() {
    this.getResumen();
  },
  methods: {
    getResumen() {
      this.$axios.get('reportes/resumen')
        .then(res => {
          const data = res.data;
          this.cards = [
            { label: 'Usuarios', value: data.total_usuarios, icon: 'person' },
            { label: 'Productos', value: data.total_productos, icon: 'inventory' },
            { label: 'Ventas', value: data.total_ventas, icon: 'shopping_cart' },
            { label: 'Historial', value: data.total_historial, icon: 'history' }
          ];
          this.chartOptions = {
            ...this.chartOptions,
            xaxis: { ...this.chartOptions.xaxis, categories: data.ventas_por_mes.map(d => d.dia) }
          };
          this.series[0].data = data.ventas_por_mes.map(d => d.total);
        })
        .catch(err => {
          this.$alert.error(err.response?.data?.message || 'Error al obtener datos del resumen');
        });
    }
  }
});
</script>
