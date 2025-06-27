<template>
  <q-page class="q-pa-xs">
    <q-card flat bordered>
      <q-card-section>
        <div class="row q-mb-md">
          <div class="col-6 col-md-3">
            <q-input
              v-model.number="dias"
              type="number"
              label="Días a consultar"
              dense
              outlined
              min="1"
            />
          </div>
          <div class="col-6 col-md-2 flex flex-center">
            <q-btn
              color="primary"
              label="Consultar"
              icon="search"
              no-caps
              @click="getProximasVacunas"
              :loading="loading"
            />
          </div>
        </div>
        <q-markup-table flat bordered dense wrap-cells>
          <thead class="bg-primary text-white">
          <tr>
            <th>Opciones</th>
            <th>Mascota</th>
            <th>Dueño</th>
            <th>Teléfono</th>
            <th>Próxima Vacuna</th>
            <th>Dias Restantes</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="vacuna in vacunas" :key="vacuna.id">
            <td>
              <q-btn
                icon="fa-brands fa-whatsapp"
                rounded
                label="Enviar"
                color="green"
                size="sm"
                no-caps
                @click="enviarPorWhatsapp(vacuna)"
                v-if="vacuna.mascota?.propietario_telefono"
              />
              <q-chip v-else color="grey" label="Sin Teléfono" size="sm" class="q-mr-sm" />
            </td>
            <td>
              <q-avatar size="40px" class="q-mr-sm">
                <q-img :src="`${$url}uploads/${vacuna.mascota.photo}`" />
              </q-avatar>
              {{ vacuna.mascota.nombre }} {{ vacuna.mascota.apellido }}
            </td>
            <td>
              {{ vacuna.mascota.propietario_nombre }}
            </td>
            <td>
              {{ vacuna.mascota.propietario_telefono }}
            </td>
            <td>
              {{ formatFecha(vacuna.fechaProximaVacuna) }}
            </td>
            <td>
              {{ Math.ceil((new Date(vacuna.fechaProximaVacuna) - new Date()) / (1000 * 60 * 60 * 24)) }} días
            </td>
          </tr>
          </tbody>
        </q-markup-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { date } from 'quasar'

export default {
  name: 'ProximasVacunasPage',
  data() {
    return {
      dias: 5,
      vacunas: [],
      loading: false
    }
  },
  mounted() {
    this.getProximasVacunas()
  },
  methods: {
    enviarPorWhatsapp(vacuna) {
      const telefono = vacuna.mascota.propietario_telefono;
      const nombreMascota = vacuna.mascota.nombre;
      const fecha = this.formatFecha(vacuna.fechaProximaVacuna);

      const mensaje = `Hola, este es un recordatorio de Clínica Veterinaria. La mascota ${nombreMascota} tiene una vacuna programada para el día ${fecha}.`;

      const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
      window.open(url, '_blank');
    },
    async getProximasVacunas() {
      this.loading = true
      try {
        const res = await this.$axios.get('/vacunas/proximas', {
          params: { dias: this.dias }
        })
        this.vacunas = res.data
      } catch (err) {
        this.$alert.error('Error al cargar vacunas próximas')
      } finally {
        this.loading = false
      }
    },
    formatFecha(fecha) {
      return date.formatDate(fecha, 'DD/MM/YYYY')
    },
    // async enviarRecordatorios() {
    //   this.loading = true
    //   try {
    //     await this.$axios.post('/vacunas/enviar-recordatorios', {
    //       dias: this.dias
    //     })
    //     this.$alert.success('Recordatorios enviados correctamente')
    //   } catch (err) {
    //     this.$alert.error('Error al enviar recordatorios')
    //   } finally {
    //     this.loading = false
    //   }
    // }
  }
}
</script>
