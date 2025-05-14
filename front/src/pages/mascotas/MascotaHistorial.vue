<template>
  <div>
    <div class="text-right">
      <q-btn @click="abrirDialogoHistorial" label="Registrar Historial" color="primary" icon="add_circle_outline" no-caps />
    </div>

    <template v-if="mascota.historiales.length">
      <q-markup-table wrap-cells dense flat bordered>
        <thead>
        <tr class="bg-primary text-white">
          <th>Acciones</th>
          <th>#</th>
          <th>Peso</th>
          <th>Diagnóstico</th>
          <th>Pronóstico</th>
          <th>Fecha</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(h, i) in mascota.historiales" :key="h.id">
          <td>
<!--            <q-btn @click="editarHistorial(h)" icon="edit" flat dense color="blue" size="sm" />-->
          </td>
          <td>{{ i + 1 }}</td>
          <td>{{ h.peso }}</td>
          <td>{{ h.diagnostico }}</td>
          <td>{{ h.pronostico }}</td>
          <td>{{ $filters.dateDmYHis(h.fecha) }}</td>
        </tr>
        </tbody>
      </q-markup-table>
    </template>
    <pre>{{mascota.historiales}}</pre>

    <q-dialog v-model="dialog">
      <q-card style="width: 800px">
        <q-card-section>
          <q-form @submit.prevent="guardarHistorial">
            <div class="text-h6 text-center">
              {{ historial.id ? 'Editar Historial' : 'Registrar Historial' }}
            </div>
            <div class="row">
              <div class="col-6 col-md-2">
                <q-input v-model="historial.peso" label="Peso" type="number" outlined dense hint="" />
              </div>
              <div class="col-6 col-md-2">
              <q-input v-model="historial.tr" label="TR" type="number" outlined dense hint="" />
              </div>
              <div class="col-6 col-md-2">
              <q-input v-model="historial.fc" label="FC" type="number" outlined dense hint="" />
              </div>
              <div class="col-6 col-md-2">
              <q-input v-model="historial.fr" label="FR" type="number" outlined dense hint="" />
              </div>
              <div class="col-6 col-md-2">
              <q-input v-model="historial.tllc" label="TLLC" type="number" outlined dense hint="" />
              </div>
              <div class="col-6 col-md-2">
              <q-input v-model="historial.thc" label="THC" type="number" outlined dense hint="" />
              </div>
              <div class="col-6 col-md-2">
              <q-input v-model="historial.apetito" label="Apetito" outlined dense hint="" />
              </div>
              <div class="col-6 col-md-2">
              <q-input v-model="historial.pulso" label="Pulso" type="number" outlined dense hint="" />
              </div>
              <div class="col-6 col-md-2">
              <q-select v-model="historial.cf" label="CF" outlined dense hint="" :options="['D', 'R', 'B', 'C','MC']" />
              </div>
              <div class="col-12 col-md-2">
              <q-checkbox v-model="historial.parvo" label="Parvo" outlined dense hint="" false-value="0" true-value="1" />
<!--                <pre>{{historial.parvo}}</pre>-->
              </div>
              <div class="col-12 col-md-2">
              <q-checkbox v-model="historial.hexa" label="Hexa" outlined dense hint="" false-value="0" true-value="1" />
<!--                <pre>{{historial.hexa}}</pre>-->
              </div>
              <div class="col-12 col-md-2">
              <q-checkbox v-model="historial.octa" label="Octa" outlined dense hint="" false-value="0" true-value="1" />
<!--                <pre>{{historial.octa}}</pre>-->
              </div>
              <div class="col-12 col-md-2">
              <q-checkbox v-model="historial.rabica" label="Rabica" outlined dense hint="" false-value="0" true-value="1" />
<!--                <pre>{{historial.rabica}}</pre>-->
              </div>
              <div class="col-12 col-md-2">
              <q-checkbox v-model="historial.triple" label="Triple" outlined dense hint="" false-value="0" true-value="1" />
<!--                <pre>{{historial.triple}}</pre>-->
              </div>
              <div class="col-12 col-md-4">
              <q-input v-model="historial.moucosidada" label="Mucosa" outlined dense hint="" />
              </div>
              <div class="col-12 col-md-4">
              <q-input v-model="historial.esterelizado" label="Esterelizado" outlined dense hint="" />
              </div>
              <div class="col-12 col-md-4">
              <q-input v-model="historial.desparacitacion" label="Desparacitación" outlined dense hint="" />
              </div>
              <div class="col-12 col-md-4">
              <q-input v-model="historial.rayox" label="Rayos X" outlined dense hint="" />
              </div>
              <div class="col-12 col-md-4">
              <q-input v-model="historial.laboratoti" label="Laboratorio" outlined dense hint="" />
              </div>
              <div class="col-12 col-md-6">
              <q-input v-model="historial.ecografia" label="Ecografía" outlined dense hint="" />
              </div>
              <div class="col-12 col-md-6">
              <q-input v-model="historial.diagnostico" label="Diagnóstico" outlined dense hint="" />
              </div>
              <div class="col-12 col-md-6">
              <q-input v-model="historial.pronostico" label="Pronóstico" outlined dense hint="" />
              </div>
            </div>
            <div class="text-right">
              <q-btn flat label="Cancelar" color="negative" v-close-popup />
              <q-btn type="submit" label="Guardar" color="positive" :loading="loading" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
export default {
  name: 'MascotaHistorial',
  props: {
    mascota: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dialog: false,
      loading: false,
      historial: {},
      editando: false
    }
  },
  methods: {
    abrirDialogoHistorial() {
      this.dialog = true;
      this.editando = false;
      this.historial = {
        peso: '',
        anamnesis: '',
        tr: '',
        fc: '',
        fr: '',
        tllc: '',
        thc: '',
        apetito: '',
        pulso: '',
        cf: '',
        parvo: '0',
        hexa: '0',
        octa: '0',
        rabica: '0',
        triple: '0',
        moucosidada: '',
        esterelizado: '',
        desparacitacion: '',
        rayox: '',
        laboratoti: '',
        ecografia: '',
        diagnostico: '',
        pronostico: '',
        mascotaId: this.mascota.id
      }
    },
    editarHistorial(hist) {
      this.dialog = true;
      this.editando = true;
      this.historial = { ...hist, mascotaId: this.mascota.id };
    },
    guardarHistorial() {
      this.loading = true;
      const request = this.editando
        ? this.$axios.put(`/historiales/${this.historial.id}`, this.historial)
        : this.$axios.post('/historiales', this.historial);

      request.then(() => {
        this.dialog = false;
        this.$emit('getMascota');
        this.$alert.success('Historial guardado correctamente');
      }).catch(() => {
        this.$alert.error('Error al guardar el historial');
      }).finally(() => {
        this.loading = false;
      });
    }
  }
}
</script>
