<template>
<q-form @submit="mascotaPost">
<q-card flat bordered>
  <q-card-section>
    <label class="text-h6">Datos de la Mascota</label>
    <div class="row">
      <div class="col-12 col-md-3 q-pa-xs">
        <label class="text-subtitle2">Nombre</label>
        <q-input v-model="mascota.nombre" outlined dense clearable :rules="[val => !!val || 'Campo requerido']"/>
      </div>

      <div class="col-12 col-md-2 q-pa-xs">
        <label class="text-subtitle2">Especie</label>
        <q-select
          v-model="mascota.especie"
          label="Especie"
          outlined
          dense
          :options="especies"
          @update:model-value="actualizarRazas"
        />
      </div>

      <div class="col-12 col-md-2 q-pa-xs">
        <label class="text-subtitle2">Raza</label>
        <q-select
          v-model="mascota.raza"
          label="Raza"
          outlined
          dense
          :options="razasDisponibles"
        />
      </div>

      <div class="col-12 col-md-3 q-pa-xs">
        <label class="text-subtitle2">Sexo</label>
        <div>
          <q-radio v-model="mascota.sexo" val="Macho" label="Macho" />
          <q-radio v-model="mascota.sexo" val="Hembra" label="Hembra" />
        </div>
      </div>

      <div class="col-12 col-md-2 q-pa-xs">
        <label class="text-subtitle2">Fecha de Nacimiento</label>
        <q-input v-model="mascota.fecha_nac" label="Fecha de Nacimiento" outlined dense clearable type="date" />
      </div>

      <div class="col-12 col-md-2 q-pa-xs">
        <label class="text-subtitle2">Foto</label>
        <div>
          <q-img :src="previewImage || mascota.photo" width="80px" height="80px" @click="$refs.fileInput.click()">
            <q-icon name="camera_alt" class="absolute-bottom-right cursor-pointer"/>
          </q-img>
          <input type="file" @change="onFileChange" class="hidden" ref="fileInput" accept="image/*"/>
          <!--                  <pre>{{mascota.photo}}</pre>-->
          <!--                  <pre>{{previewImage}}</pre>-->
        </div>
      </div>

      <div class="col-12 col-md-3 q-pa-xs">
        <label class="text-subtitle2">Señas Particulares</label>
        <q-input v-model="mascota.senas_particulares" label="Señas Particulares" outlined dense clearable/>
      </div>

      <div class="col-12 col-md-2 q-pa-xs">
        <label class="text-subtitle2">Color</label>
        <q-select v-model="mascota.color" label="Color" outlined dense :options="colores" />
      </div>
      <div class="col-12 col-md-2 q-pa-xs">
        <label class="text-subtitle2">Edad</label>
        <q-input v-model="mascota.edad" label="Edad" outlined dense clearable/>
      </div>
    </div>
  </q-card-section>
</q-card>
<q-card flat bordered>
  <q-card-section>
    <label class="text-h6">Datos de la Mascota</label>
    <div class="row">
      <div class="col-12 col-md-3 q-pa-xs">
        <label class="text-subtitle2">Nombre del Propietario</label>
        <q-input v-model="mascota.propietario_nombre" label="Nombre del Propietario" outlined dense clearable :rules="[val => !!val || 'Campo requerido']"/>
      </div>
      <div class="col-12 col-md-3 q-pa-xs">
        <label class="text-subtitle2">CI del Propietario</label>
        <q-input v-model="mascota.propietario_ci" label="CI del Propietario" outlined dense clearable/>
      </div>
      <div class="col-12 col-md-3 q-pa-xs">
        <label class="text-subtitle2">Dirección del Propietario</label>
        <q-input v-model="mascota.propietario_direccion" label="Dirección del Propietario" outlined dense
                 clearable/>
      </div>
      <div class="col-12 col-md-3 q-pa-xs">
        <label class="text-subtitle2">Teléfono del Propietario</label>
        <q-input v-model="mascota.propietario_telefono" label="Teléfono del Propietario" outlined dense clearable/>
      </div>
      <div class="col-12 col-md-3 q-pa-xs">
        <label class="text-subtitle2">Ciudad del Propietario</label>
        <q-select v-model="mascota.propietario_ciudad" label="Ciudad del Propietario" outlined dense
                  :options="ciudades"/>
      </div>
      <div class="col-12 text-right">
        <q-btn type="submit" label="Guardar" color="green" :loading="loading" :disable="loading" icon="save" no-caps/>
      </div>
    </div>
  </q-card-section>
</q-card>
</q-form>
</template>
<script>
import moment from "moment/moment.js";

export default {
  name: 'MascotaUpdate',
  props: {
    mascota: {
      type: Object,
      required: true,
    },
    razas: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      previewImage: null, // Previsualización de la imagen cargada
      file: null, // Archivo a subir
      especies: ['Perro', 'Gato', 'Conejo', 'Pez', 'Ave', 'Reptil', 'Otro'],
      // razas: {
      //   Perro: ['Labrador', 'Bulldog', 'Pastor Alemán', 'Poodle', 'Husky', 'Chihuahua', 'Pug', 'Dálmata', 'Beagle', 'Otro'],
      //   Gato: ['Siames', 'Persa', 'Maine Coon', 'Bengalí', 'Otros'],
      //   Conejo: ['Cabeza de León', 'Belier', 'Holandés', 'Otros'],
      //   Pez: ['Betta', 'Goldfish', 'Tetra', 'Guppy', 'Otros'],
      //   Ave: ['Perico', 'Canario', 'Loro', 'Cacatúa', 'Otros'],
      //   Reptil: ['Iguana', 'Serpiente', 'Tortuga', 'Otros'],
      //   Otro: [],
      // },
      colores: [
        'Negro',
        'Blanco',
        'Gris',
        'Marrón',
        'Beige',
        'Dorado',
        'Plateado',
        'Rojo',
        'Canela',
        'Crema',
        'Azul',
        'Verde',
        'Amarillo',
        'Naranja',
        'Chocolate',
        'Albino',
        'Pardo',
        'Caramelo',
        'Atigrado',
        'Manchado',
        'Bicolor',
        'Tricolor',
        'Merle',
        'Brindle',
        'Ahumado',
        'Moteado',
        'Otros',
      ],
      razasDisponibles: [],
      ciudades: [
        'La Paz',
        'Cochabamba',
        'Santa Cruz',
        'Oruro',
        'Potosí',
        'Chuquisaca',
        'Tarija',
        'Beni',
        'Pando'
      ]
    }
  },
  methods: {
    actualizarRazas() {
      // console.log('actualizarRazas', this.mascota.especie);
      this.razasDisponibles = this.razas[this.mascota.especie] || [];
      this.mascota.raza = ''; // Reset raza cuando cambia la especie
    },

    onFileChange(event) {
      const file = event.target.files[0];
      if (!file) return;

      this.file = file; // Guarda el archivo para enviarlo al backend

      // Crear una vista previa de la imagen
      const reader = new FileReader();
      reader.onload = e => {
        this.previewImage = e.target.result;
        this.mascota.photo = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    async mascotaPost() {
      this.loading = true;
      const formData = new FormData();
      formData.append('nombre', this.mascota.nombre);
      formData.append('especie', this.mascota.especie);
      formData.append('raza', this.mascota.raza);
      formData.append('sexo', this.mascota.sexo);
      formData.append('fecha_nac', this.mascota.fecha_nac);
      formData.append('senas_particulares', this.mascota.senas_particulares);
      formData.append('photo', this.file);
      formData.append('color', this.mascota.color);
      formData.append('edad', this.mascota.edad);
      formData.append('propietario_nombre', this.mascota.propietario_nombre);
      formData.append('propietario_ci', this.mascota.propietario_ci);
      formData.append('propietario_direccion', this.mascota.propietario_direccion);
      formData.append('propietario_telefono', this.mascota.propietario_telefono);
      formData.append('propietario_ciudad', this.mascota.propietario_ciudad);
      formData.append('propietario_celular', this.mascota.propietario_celular);
      try {
        await this.$axios.put('mascotas/' + this.$route.params.id, formData);
        this.$alert.success('Mascota actualizada correctamente', 'Éxito');
        // this.$router.push({name: 'mascotas'});
        // this.getMascota();
        this.$emit('getMascota');
      } catch (e) {
        console.error(e);
        this.$alert.error('Error al crear la mascota', 'Error');
      } finally {
        this.loading = false;
      }
    },
  }
}
</script>
