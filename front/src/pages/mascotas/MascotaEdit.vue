<template>
  <q-page class="q-pa-xs">
    <q-card flat bordered>
      <q-card-section>
        <div class="row">
          <div class="col-12 col-md-2 q-pa-xs">
            <q-btn @click="$router.push({name: 'mascotas'})" label="Atrás" color="primary" icon="arrow_back" no-caps  size="10px" />
          </div>
          <div class="col-6 col-md-2" style="line-height: 0.8">
              <div class="text-caption text-bold">
                Nombre:
              </div>
            {{ mascota.nombre }}
          </div>
          <div class="col-6 col-md-2" style="line-height: 0.8">
              <div class="text-caption text-bold">
                Especie:
              </div>
            {{ mascota.especie }}
          </div>
          <div class="col-6 col-md-2" style="line-height: 0.8">
              <div class="text-caption text-bold">
                Raza:
              </div>
            {{ mascota.raza }}
          </div>
          <div class="col-6 col-md-2" style="line-height: 0.8">
              <div class="text-caption text-bold">
                Sexo:
              </div>
            {{ mascota.sexo }}
          </div>
        </div>
        <q-card flat bordered>
          <q-tabs
            v-model="tab"
            dense
            align="justify"
            narrow-indicator
          >
            <q-tab name="mascota" :class="{'bg-blue text-white': tab === 'mascota'}">
              <q-btn flat dense no-caps icon="pets" label="Mascota" :color="tab === 'mascota' ? 'white' : 'black'" />
            </q-tab>
            <q-tab name="ventas" :class="{'bg-indigo text-white': tab === 'ventas'}">
              <q-btn flat dense no-caps icon="shopping_cart" label="Ventas" :color="tab === 'ventas' ? 'white' : 'black'" />
            </q-tab>
            <q-tab name="complementos" :class="{'bg-green text-white': tab === 'complementos'}">
              <q-btn flat dense no-caps icon="local_hospital" label="Complementos" :color="tab === 'complementos' ? 'white' : 'black'" />
            </q-tab>
<!--            <q-tab name="examen" :class="{'bg-orange text-white': tab === 'examen'}">-->
<!--              <q-btn flat dense no-caps icon="assignment" label="Examen" :color="tab === 'examen' ? 'white' : 'black'" />-->
<!--            </q-tab>-->
            <q-tab name="certificados" :class="{'bg-red text-white': tab === 'certificados'}">
              <q-btn flat dense no-caps icon="receipt" label="Certificados" :color="tab === 'certificados' ? 'white' : 'black'" />
            </q-tab>
<!--            <q-tab name="derivacion" :class="{'bg-purple text-white': tab === 'derivacion'}">-->
<!--              <q-btn flat dense no-caps icon="swap_calls" label="Derivación" :color="tab === 'derivacion' ? 'white' : 'black'" />-->
<!--            </q-tab>-->
          </q-tabs>
        </q-card>
        <q-card flat bordered>
          <q-tab-panels v-model="tab">
            <q-tab-panel name="mascota" animated>
              <MascotaUpdate :mascota="mascota" :razas="razas" @getMascota="getMascota"/>
            </q-tab-panel>
            <q-tab-panel name="ventas" animated>
              <MascotaSales :mascota="mascota" @getMascota="getMascota"/>
            </q-tab-panel>
            <q-tab-panel name="complementos" animated>
              <MascotaComplementos :mascota="mascota" @getMascota="getMascota"/>
            </q-tab-panel>
            <q-tab-panel name="certificados" animated>
              <MascotaCertificados :mascota="mascota" @getMascota="getMascota"/>
            </q-tab-panel>
          </q-tab-panels>
<!--          <pre>{{ mascota }}</pre>-->
        </q-card>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import moment from "moment";
import MascotaUpdate from "pages/mascotas/MascotaUpdate.vue";
import MascotaSales from "pages/mascotas/MascotaSales.vue";
import MascotaComplementos from "pages/mascotas/MascotaComplemetos.vue";
import MascotaCertificados from "pages/mascotas/MascotaCertificados.vue";

export default {
  components: {MascotaCertificados, MascotaComplementos, MascotaSales, MascotaUpdate},
  data() {
    return {
      tab: 'mascota',
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
      razas: {
        Perro: ['Labrador', 'Bulldog', 'Pastor Alemán', 'Poodle', 'Husky', 'Chihuahua', 'Pug', 'Dálmata', 'Beagle', 'Otro'],
        Gato: ['Siames', 'Persa', 'Maine Coon', 'Bengalí', 'Otros'],
        Conejo: ['Cabeza de León', 'Belier', 'Holandés', 'Otros'],
        Pez: ['Betta', 'Goldfish', 'Tetra', 'Guppy', 'Otros'],
        Ave: ['Perico', 'Canario', 'Loro', 'Cacatúa', 'Otros'],
        Reptil: ['Iguana', 'Serpiente', 'Tortuga', 'Otros'],
        Otro: [],
      },
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
      this.razasDisponibles = this.razas[this.mascota.especie] || [];
    },
  }
}
</script>
