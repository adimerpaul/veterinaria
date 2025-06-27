<template>
  <div>
    <div class="text-right">
      <q-btn @click="dialogFotografiaClick" label="Registrar Fotografía" color="green" icon="add_a_photo" no-caps />
    </div>

    <template v-if="mascota.fotos?.length > 0">
      <q-markup-table wrap-cells dense flat bordered>
        <thead>
        <tr class="bg-black text-white">
          <th>Opción</th>
          <th>#</th>
          <th>Fecha</th>
          <th>Imagen</th>
          <th>Observaciones</th>
          <th>Usuario</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(foto, i) in mascota.fotos" :key="foto.id">
          <td>
            <q-btn @click="eliminarFotografia(foto)" color="red" icon="delete" dense size="10px" label="Eliminar" no-caps />
          </td>
          <td>{{ i + 1 }}</td>
          <td>{{ $filters.date(foto.fecha, 'DD/MM/YYYY') }}</td>
          <td>
<!--            <pre>-->
<!--              {{`${$url}uploads/${foto.imagen}`}}-->
<!--            </pre>-->
            <a :href="`${$url}uploads/${foto.imagen}`" target="_blank">
              <q-img :src="`${$url}uploads/${foto.imagen}`" style="width: 80px; height: 80px" />
            </a>
          </td>
          <td>{{ foto.observaciones }}</td>
          <td>{{ foto.user?.username || 'Sin usuario' }}</td>
        </tr>
        </tbody>
      </q-markup-table>
    </template>
    <template v-else>
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 text-center">No hay fotografías registradas</div>
        </q-card-section>
      </q-card>
    </template>
<!--    <pre>{{mascota.fotos}}</pre>-->

    <!-- Diálogo -->
    <q-dialog v-model="dialogFotografia">
      <q-card style="max-width: 600px">
        <q-card-section>
          <q-form @submit.prevent="fotografiaCreate">
            <div class="text-h6 text-center">Registrar Fotografía</div>
            <q-input v-model="fotografia.fecha" label="Fecha" type="date" outlined dense :rules="[val => !!val || 'Campo requerido']" />
            <q-input v-model="fotografia.observaciones" label="Descripción" outlined dense />
            <q-file outlined dense v-model="imagenFile" label="Seleccionar imagen" accept="image/*" />

            <div class="text-right q-mt-md">
              <q-btn @click="dialogFotografia = false" label="Cancelar" color="red" icon="cancel" no-caps :loading="loading" />
              <q-btn type="submit" color="green" icon="save" no-caps :loading="loading" label="Guardar" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: 'MascotaFotografias',
  props: {
    mascota: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      loading: false,
      dialogFotografia: false,
      imagenFile: null,
      fotografia: {
        fecha: moment().format('YYYY-MM-DD'),
        observaciones: '',
        mascotaId: null,
      },
    };
  },
  methods: {
    dialogFotografiaClick() {
      this.dialogFotografia = true;
      this.fotografia = {
        fecha: moment().format('YYYY-MM-DD'),
        observaciones: '',
        mascotaId: this.mascota.id
      };
      this.imagenFile = null;
    },
    fotografiaCreate() {
      if (!this.imagenFile) {
        this.$alert.error('Debe seleccionar una imagen');
        return;
      }

      this.loading = true;
      const formData = new FormData();
      formData.append('fecha', this.fotografia.fecha);
      formData.append('observaciones', this.fotografia.observaciones || '');
      formData.append('imagen', this.imagenFile);
      const user = JSON.parse(localStorage.getItem('user'));
      formData.append('userId', user?.id || 0);
      formData.append('mascotaId', this.mascota.id);


      this.$axios.post('/fotos', formData).then(() => {
        this.dialogFotografia = false;
        this.$emit('getMascota');
        this.$alert.success('Fotografía registrada correctamente');
      }).catch(() => {
        this.$alert.error('Error al registrar fotografía');
      }).finally(() => {
        this.loading = false;
      });
    },
    eliminarFotografia(foto) {
      this.$alert.confirm('¿Está seguro de eliminar esta fotografía?', 'Eliminar Foto')
        .onOk(() => {
          this.loading = true;
          this.$axios.delete(`/fotos/${foto.id}`)
            .then(() => {
              this.$emit('getMascota');
              this.$alert.success('Foto eliminada correctamente');
            })
            .catch(() => {
              this.$alert.error('Error al eliminar foto');
            })
            .finally(() => {
              this.loading = false;
            });
        });
    }
  }
};
</script>
