<template>
  <q-page class="">
    <q-card>
<!--      <q-card-section>-->
<!--        <div class="row items-center q-col-gutter-md">-->
<!--          <div class="col-12 col-md-8">-->
<!--&lt;!&ndash;            <q-slider&ndash;&gt;-->
<!--&lt;!&ndash;              v-model="dias"&ndash;&gt;-->
<!--&lt;!&ndash;              :min="1"&ndash;&gt;-->
<!--&lt;!&ndash;              :max="30"&ndash;&gt;-->
<!--&lt;!&ndash;              label-always&ndash;&gt;-->
<!--&lt;!&ndash;              color="green"&ndash;&gt;-->
<!--&lt;!&ndash;              label="Días hacia adelante"&ndash;&gt;-->
<!--&lt;!&ndash;              @change="getProximasVacunas"&ndash;&gt;-->
<!--&lt;!&ndash;            />&ndash;&gt;-->
<!--          </div>-->
<!--          <div class="col-12 col-md-4 text-right">-->
<!--&lt;!&ndash;            <q-btn&ndash;&gt;-->
<!--&lt;!&ndash;              icon="send"&ndash;&gt;-->
<!--&lt;!&ndash;              color="primary"&ndash;&gt;-->
<!--&lt;!&ndash;              label="Enviar Recordatorios"&ndash;&gt;-->
<!--&lt;!&ndash;              @click="enviarRecordatorios"&ndash;&gt;-->
<!--&lt;!&ndash;              :loading="loading"&ndash;&gt;-->
<!--&lt;!&ndash;            />&ndash;&gt;-->
<!--          </div>-->
<!--        </div>-->
<!--      </q-card-section>-->

<!--      <q-separator />-->

      <q-card-section>
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
<!--        <pre>{{vacunas}}</pre>-->
<!--        [-->
<!--        {-->
<!--        "id": 13,-->
<!--        "fechaVacuna": "2025-05-13",-->
<!--        "fechaProximaVacuna": "2025-05-27",-->
<!--        "nombreVacuna": "ghjkl",-->
<!--        "dosis": null,-->
<!--        "observaciones": "fghjkl",-->
<!--        "createdAt": "2025-05-13T09:49:05.074Z",-->
<!--        "updatedAt": "2025-05-13T09:49:05.074Z",-->
<!--        "deletedAt": null,-->
<!--        "user": {-->
<!--        "id": 1,-->
<!--        "name": "ING. ADIMER PAUL CHAMBI AJATA",-->
<!--        "role": "Admin",-->
<!--        "username": "Adimer",-->
<!--        "password": "$2b$10$hLxScAvuENNvqjNTwS1p6u/TUd0Ej9Oae9iCAzZSHBqMlCI.fLO0a",-->
<!--        "agencia": "Clinica",-->
<!--        "createdAt": "2025-03-12T09:47:07.189Z",-->
<!--        "updatedAt": "2025-04-29T08:36:19.000Z",-->
<!--        "deletedAt": null-->
<!--        },-->
<!--        "mascota": {-->
<!--        "id": 7,-->
<!--        "nombre": "chapi",-->
<!--        "apellido": "",-->
<!--        "especie": "Perro",-->
<!--        "raza": "Dálmata",-->
<!--        "sexo": "Macho",-->
<!--        "fecha_nac": "2025-03-20",-->
<!--        "edad": "3 meses",-->
<!--        "senas_particulares": "de colore blanco y negro",-->
<!--        "photo": "compressed-1746004712324-976691490.png",-->
<!--        "color": "Tricolor",-->
<!--        "propietario_nombre": "Adimer Paul Chambi Ajata",-->
<!--        "propietario_ci": "22323",-->
<!--        "propietario_direccion": "avenida dn y tartawoski, avenida salamanca y tartawoski",-->
<!--        "propietario_telefono": "69603027",-->
<!--        "propietario_ciudad": "Oruro",-->
<!--        "propietario_celular": "",-->
<!--        "createdAt": "2025-03-13T08:29:11.651Z",-->
<!--        "updatedAt": "2025-05-13T09:53:45.000Z",-->
<!--        "deletedAt": null-->
<!--        }-->
<!--        }-->
<!--        ]-->
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

      const url = `https://wa.me/591${telefono}?text=${encodeURIComponent(mensaje)}`;
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
