<template>
  <div>
    <div class="text-right">
      <q-btn @click="abrirDialogo" label="Registrar Laboratorio" color="blue" icon="upload" no-caps />
    </div>

    <template v-if="mascota.laboratorios?.length">
      <q-markup-table wrap-cells dense flat bordered>
        <thead>
        <tr class="bg-blue-10 text-white">
          <th>#</th>
          <th>Fecha</th>
          <th>Archivo</th>
          <th>Observaciones</th>
          <th>Usuario</th>
          <th>Opción</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(lab, i) in mascota.laboratorios" :key="lab.id">
          <td>{{ i + 1 }}</td>
          <td>{{ $filters.date(lab.fecha, 'DD/MM/YYYY') }}</td>
          <td>
            <a :href="`${$url}uploads/${lab.src}`" target="_blank">
              <q-icon name="picture_as_pdf" color="red" size="md" />
              Ver PDF
            </a>
          </td>
          <td>{{ lab.observaciones }}</td>
          <td>{{ lab.user?.username }}</td>
          <td>
            <q-btn @click="eliminarLaboratorio(lab)" dense color="red" icon="delete" size="10px" no-caps label="Eliminar" />
          </td>
        </tr>
        </tbody>
      </q-markup-table>
    </template>

    <template v-else>
      <q-card flat bordered>
        <q-card-section class="text-center text-h6">No hay archivos de laboratorio</q-card-section>
      </q-card>
    </template>

    <q-dialog v-model="dialogo">
      <q-card style="max-width: 600px">
        <q-card-section>
          <q-form @submit.prevent="registrarLaboratorio">
            <div class="text-h6 text-center">Registrar Laboratorio</div>
            <q-input v-model="form.fecha" type="date" label="Fecha" dense outlined :rules="[v => !!v || 'Campo requerido']" />
            <q-input v-model="form.observaciones" label="Observaciones" dense outlined />
            <q-file v-model="archivo" accept=".pdf" label="Seleccionar PDF" dense outlined :rules="[v => !!v || 'Requerido']" />

            <div class="text-right q-mt-md">
              <q-btn flat label="Cancelar" color="red" icon="close" v-close-popup :loading="loading" />
              <q-btn type="submit" label="Guardar" color="blue" icon="save" :loading="loading" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'MascotaLaboratorios',
  props: {
    mascota: Object
  },
  data() {
    return {
      dialogo: false,
      archivo: null,
      loading: false,
      form: {
        fecha: moment().format('YYYY-MM-DD'),
        observaciones: '',
        mascotaId: null
      }
    };
  },
  methods: {
    abrirDialogo() {
      this.dialogo = true;
      this.archivo = null;
      this.form = {
        fecha: moment().format('YYYY-MM-DD'),
        observaciones: '',
        mascotaId: this.mascota.id
      };
    },
    registrarLaboratorio() {
      if (!this.archivo) {
        this.$alert.error('Debe seleccionar un archivo PDF');
        return;
      }

      this.loading = true;
      const formData = new FormData();
      formData.append('fecha', this.form.fecha);
      formData.append('observaciones', this.form.observaciones || '');
      formData.append('archivo', this.archivo);
      const user = JSON.parse(localStorage.getItem('user'));
      formData.append('userId', user?.id || 0);
      formData.append('mascotaId', this.mascota.id);

      this.$axios.post('/laboratorios', formData).then(() => {
        this.dialogo = false;
        this.$emit('getMascota');
        this.$alert.success('Laboratorio registrado correctamente');
      }).catch(() => {
        this.$alert.error('Error al registrar laboratorio');
      }).finally(() => {
        this.loading = false;
      });
    },
    eliminarLaboratorio(lab) {
      this.$alert.confirm('¿Desea eliminar este archivo?', 'Eliminar laboratorio')
        .onOk(() => {
          this.loading = true;
          this.$axios.delete(`/laboratorios/${lab.id}`)
            .then(() => {
              this.$emit('getMascota');
              this.$alert.success('Archivo eliminado');
            })
            .catch(() => {
              this.$alert.error('Error al eliminar archivo');
            })
            .finally(() => {
              this.loading = false;
            });
        });
    }
  }
}
</script>
