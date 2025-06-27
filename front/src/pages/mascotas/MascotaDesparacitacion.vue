<template>
  <div>
    <div class="text-right">
      <q-btn @click="dialogDesparasitacionClick" label="Registrar Desparasitación" color="green" icon="add_circle_outline" no-caps />
    </div>
    <template v-if="mascota.desparacitaciones.length > 0">
      <q-markup-table wrap-cells dense flat bordered>
        <thead>
        <tr class="bg-indigo text-white">
          <td>Opción</td>
          <td>#</td>
          <th>Fecha</th>
          <th>Medicamntos</th>
          <th>Paso</th>
          <th>Usuario</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(desparasitacion, i) in mascota.desparacitaciones" :key="desparasitacion.id">
          <td>
<!--            <q-btn @click="eliminarDesparasitacion(desparasitacion)" color="red" icon="delete" no-caps dense size="10px" label="Eliminar" />-->
<!--            opciones-->
            <q-btn-dropdown color="indigo" label="Opciones" no-caps dense>
              <q-list>
                <q-item clickable @click="imprimirDesparasitacion(desparasitacion)">
                  <q-item-section>Imprimir</q-item-section>
                </q-item>
                <q-item clickable @click="eliminarDesparasitacion(desparasitacion)">
                  <q-item-section>Eliminar</q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </td>
          <td>{{ i + 1 }}</td>
          <td>{{ desparasitacion.fecha }}</td>
          <td>{{ desparasitacion.medicamentos }}</td>
          <td>{{ desparasitacion.peso }}</td>
          <td>{{ desparasitacion.user?.username }}</td>
        </tr>
        </tbody>
      </q-markup-table>
    </template>
    <template v-else>
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 text-center">No hay desparasitaciones registradas</div>
        </q-card-section>
      </q-card>
    </template>

    <q-dialog v-model="dialogDesparasitacion">
      <q-card style="max-width: 760px">
        <q-card-section>
          <q-form @submit.prevent="desparasitacionCreate">
            <div class="text-h6 text-center">Registrar Desparasitación</div>
            <div class="q-pa-xs">
              <q-input v-model="desparasitacion.fecha" label="Fecha" type="date" outlined dense clearable :rules="[val => !!val || 'Campo requerido']"/>
              <q-input v-model="desparasitacion.peso" label="Peso" outlined dense clearable :rules="[val => !!val || 'Campo requerido']"/>
<!--              <q-input v-model="desparasitacion.medicamentos" label="Medicamentos" outlined dense clearable/>-->
              <q-input
                v-model="desparasitacion.medicamentos"
                label="Medicamentos"
                outlined
                dense
                clearable
              >
                <template v-slot:append>
                  <q-btn flat icon="mic" @click="startRecognition" :loading="recognitionActive" />
                </template>
              </q-input>
            </div>
            <div class="text-right">
              <q-btn @click="dialogDesparasitacion = false" label="Cancelar" color="red" icon="cancel" no-caps :loading="loading" />
              <q-btn type="submit" color="green" icon="save" no-caps :loading="loading" label="Guardar" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import moment from "moment/moment.js";
import {imprimirDesparasitacionPDF} from "src/utils/pdf.js";

export default {
  name: 'MascotaDesparasitacion',
  props: {
    mascota: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      recognitionActive: false,
      dialogDesparasitacion: false,
      desparasitacion: {
        fecha: moment().format('YYYY-MM-DD'),
        paso: '',
        mascotaId: this.mascota.id,
      },
    }
  },
  mounted() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.lang = 'es-ES';
      this.recognition.interimResults = false;
      this.recognition.continuous = false;

      this.recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        this.desparasitacion.medicamentos += (this.desparasitacion.medicamentos ? ' ' : '') + text;
        this.recognitionActive = false;
      };

      this.recognition.onstart = () => {
        this.recognitionActive = true;
      };

      this.recognition.onend = () => {
        this.recognitionActive = false;
      };

      this.recognition.onerror = () => {
        this.recognitionActive = false;
      };
    }
  },
  methods: {
    imprimirDesparasitacion(desparasitacion) {
      imprimirDesparasitacionPDF(desparasitacion, this.mascota);
    },
    startRecognition() {
      if (this.recognition) {
        this.recognition.start();
      } else {
        this.$q.notify({
          color: 'negative',
          message: 'Reconocimiento de voz no soportado por el navegador.',
        });
      }
    },
    eliminarDesparasitacion(desparasitacion) {
      this.$alert.confirm('¿Está seguro de eliminar la desparasitación?', 'Eliminar Registro').onOk(() => {
        this.loading = true;
        this.$axios.delete(`/desparacitaciones/${desparasitacion.id}`)
          .then(() => {
            this.$emit('getMascota');
            this.$alert.success('Registro eliminado correctamente', 'Eliminar Registro');
          })
          .catch(error => {
            this.$alert.error('Error al eliminar', 'Eliminar Registro');
            console.error(error);
          })
          .finally(() => {
            this.loading = false;
          });
      });
    },
    desparasitacionCreate() {
      this.loading = true;
      this.$axios.post('/desparacitaciones', this.desparasitacion)
        .then(() => {
          this.$emit('getMascota');
          this.dialogDesparasitacion = false;
          this.$alert.success('Desparasitación registrada correctamente', 'Registro');
        })
        .catch(error => {
          this.$alert.error('Error al registrar', 'Registro');
          console.error(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    dialogDesparasitacionClick() {
      this.dialogDesparasitacion = true;
      this.desparasitacion = {
        fecha: moment().format('YYYY-MM-DD'),
        paso: '',
        medicamentos: '',
        mascotaId: this.mascota.id,
      }
    },
  },
}
</script>
