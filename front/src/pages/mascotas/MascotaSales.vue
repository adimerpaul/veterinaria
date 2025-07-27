<template>
  <div>
    <template v-if="!loading">
      <q-markup-table wrap-cells dense flat bordered>
        <thead>
        <tr class="bg-indigo text-white">
          <th>#</th>
          <th>Anulado</th>
          <th>Fecha</th>
          <th>Total</th>
          <th>Nombre Cliente</th>
          <th>Usuario</th>
          <th>Detalle</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(venta,i) in sales" :key="venta.id">
          <td>
            {{ i + 1 }}
          </td>
          <td>
            <!--          <q-btn style="width: 80px" icon="remove_circle_outline" color="negative" dense @click="anular(venta.id)" label="Anular" no-caps size="10px"-->
            <!--                 v-if="!venta.anulado"-->
            <!--          />-->
            <div v-if="venta.anulado">
              <q-chip color="red" text-color="white" label="Anulada" />
            </div>
          </td>
          <td>{{ $filters.dateDmYHis(venta.fecha) }}</td>
          <td class="text-right">{{ venta.total }}</td>
          <td>{{ venta.nombre }}</td>
          <td>{{ venta.user?.username }}</td>
          <td>
            <div style="max-width: 350px; wrap-option: wrap;line-height: 0.9;">
              <span  v-for="detail in venta.details" :key="detail.id">
                {{ detail.cantidad }} {{ detail.productoName }},
              </span>
            </div>
          </td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
          <td colspan="3" class="text-right text-bold">Total</td>
          <td class="text-right text-bold">{{ sales.reduce((acc, venta) => acc + parseFloat(venta.total), 0).toFixed(2) }}</td>
          <td colspan="3"></td>
        </tr>
        </tfoot>
      </q-markup-table>
    </template>
    <template v-else>
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 text-center">Cargando ventas...</div>
        </q-card-section>
      </q-card>
    </template>
  </div>
</template>
<script>
import moment from "moment/moment.js";

export default {
  name: 'MascotaSales',
  props: {
    mascota: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      sales:[],
    };
  },
  mounted() {
    this.getSales();
  },
  methods: {
    getSales() {
      this.loading = true;
      this.$axios.get(`/mascotas/${this.mascota.id}/sales`)
        .then(response => {
          this.sales = response.data;
        })
        .catch(error => {
          this.$alert.error("Error al obtener las ventas de la mascota.");
        })
        .finally(() => {
          this.loading = false;
        });
    },
  }
}
</script>
