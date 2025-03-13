<template>
  <q-page class="q-pa-xs">
    <q-card flat bordered>
      <q-form @submit="mascotaPost">
      <q-card-section>
        <q-card flat bordered>
          <q-card-section>
            <q-btn @click="$router.push({name: 'mascotas'})" label="Atrás" color="primary" icon="arrow_back" no-caps  size="10px" />
            <br>
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
                  :disable="razasDisponibles.length === 0"
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
                <label class="text-subtitle2">Dirección del Propietario</label>
                <q-input v-model="mascota.propietario_direccion" label="Dirección del Propietario" outlined dense
                         clearable/>
              </div>
              <div class="col-12 col-md-3 q-pa-xs">
                <label class="text-subtitle2">Teléfono del Propietario</label>
                <q-input v-model="mascota.propietario_telefono" label="Teléfono del Propietario" outlined dense clearable/>
              </div>
              <div class="col-12 col-md-3 q-pa-xs">
                <label class="text-subtitle2">Celular del Propietario</label>
                <q-select v-model="mascota.propietario_ciudad" label="Ciudad del Propietario" outlined dense
                          :options="ciudades"/>
              </div>
              <div class="col-12 text-right">
                <q-btn type="submit" label="Guardar" color="green" :loading="loading" :disable="loading" icon="save" no-caps/>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-card-section>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      loading: false,
      mascota: {
        nombre: '',
        especie: '',
        raza: '',
        sexo: 'Macho',
        fecha_nac: moment().format('YYYY-MM-DD'),
        senas_particulares: '',
        photo: '/defaultPet.jpg', // Imagen por defecto
        color: '',
        propietario_nombre: '',
        propietario_direccion: '',
        propietario_telefono: '',
        propietario_ciudad: 'Oruro',
        propietario_celular: '',
      },
      previewImage: null, // Previsualización de la imagen cargada
      file: null, // Archivo a subir
      especies: ['Perro', 'Gato', 'Conejo', 'Pez', 'Ave', 'Reptil', 'Otro'],
      razas: {
        Perro: ['Labrador', 'Bulldog', 'Pastor Alemán', 'Poodle', 'Husky', 'Chihuahua', 'Pug', 'Dálmata', 'Beagle', 'Otro'],
        Gato: ['Siames', 'Persa', 'Maine Coon', 'Bengalí', 'Otros'],
        Conejo: ['Cabeza de León', 'Belier', 'Holandés', 'Otros'],
        Pez: ['Betta', 'Goldfish', 'Tetra', 'Guppy', 'Otros'],
        Ave: ['Perico', 'Canario', 'Loro', 'Cacatúa', 'Otros'],
        Reptil: ['Iguana', 'Serpiente', 'Tortuga', 'Otros'],
        Otro: [],
      },
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
  created() {
    this.getMascota()
  },
  methods: {
    async getMascota() {
      const response = await this.$axios.get(`/mascotas/${this.$route.params.id}`);
      this.mascota = response.data;
      this.mascota.photo = this.$url + 'uploads/' + this.mascota.photo;
      console.log(this.mascota.photo)
    },
    actualizarRazas() {
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
      formData.append('propietario_nombre', this.mascota.propietario_nombre);
      formData.append('propietario_direccion', this.mascota.propietario_direccion);
      formData.append('propietario_telefono', this.mascota.propietario_telefono);
      formData.append('propietario_ciudad', this.mascota.propietario_ciudad);
      formData.append('propietario_celular', this.mascota.propietario_celular);
      try {
        await this.$axios.put('mascotas/' + this.$route.params.id, formData);
        this.$alert.success('Mascota creada', 'Éxito');
        this.$router.push({name: 'mascotas'});
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
