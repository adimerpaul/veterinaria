<template>
  <div>
    <template v-if="!loading">
      <q-markup-table wrap-cells dense flat bordered>
        <thead>
        <tr class="bg-green text-white">
          <td>#</td>
          <th>Anulado</th>
          <th>Fecha</th>
          <th>Total</th>
          <th>Producto</th>
          <th>Tipo</th>
          <th>Usuario</th>
<!--          <th>Detalle</th>-->
        </tr>
        </thead>
        <tbody>
        <tr v-for="(venta,i) in productosEspeciales" :key="venta.id">
          <td>{{ i + 1 }}</td>
          <td>
            <!--          <q-btn style="width: 80px" icon="remove_circle_outline" color="negative" dense @click="anular(venta.id)" label="Anular" no-caps size="10px"-->
            <!--                 v-if="!venta.anulado"-->
            <!--          />-->
            <div v-if="venta.anulado">
              <q-chip color="red" text-color="white" label="Anulada" />
            </div>
          </td>
          <td>{{ $filters.dateDmYHis(venta.fecha) }}</td>
          <td class="text-right">{{ venta.subtotal }}</td>
          <td>{{ venta.productoName }}</td>
          <td>
            <q-chip dense :color="getColor(venta.producto?.tipo)" size="10px">
              {{ venta.producto?.tipo }}
            </q-chip>
          </td>
          <td>{{ venta.user?.username }}</td>
<!--          <td>-->
<!--            <div style="max-width: 350px; wrap-option: wrap;line-height: 0.9;">-->
<!--              <span  v-for="detail in venta.details" :key="detail.id">-->
<!--                {{ detail.cantidad }} {{ detail.productoName }},-->
<!--              </span>-->
<!--            </div>-->
<!--          </td>-->
        </tr>
        </tbody>
        <tfoot>
        <tr>
          <td colspan="3" class="text-right text-bold">Total</td>
          <td class="text-right text-bold">{{ productosEspeciales.reduce((acc, venta) => acc + parseFloat(venta.subtotal), 0).toFixed(2) }}</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        </tfoot>
      </q-markup-table>
    </template>
    <template v-else>
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 text-center">Cargando complementos...</div>
        </q-card-section>
      </q-card>
    </template>
  </div>
</template>
<script>
import moment from "moment/moment.js";

export default {
  name: 'MascotaComplementos',
  props: {
    mascota: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      productosEspeciales: [],
    }
  },
  mounted() {
    this.complementosGet();
  },
  methods: {
    async complementosGet() {
      this.loading = true;
      this.$axios.get(`/mascotas/${this.mascota.id}/productos-especiales`)
        .then(response => {
          this.productosEspeciales = response.data;
        })
        .catch(error => {
          console.error("Error fetching productos especiales:", error);
          this.$alert.error("Error al cargar los complementos de la mascota.");
        });
      this.loading = false;
    },
    getColor(tipo) {
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
    },
  },
}
</script>
