<template>
  <div>
    <div class="text-right">
      <q-btn @click="abrirDialogoHistorial" label="Registrar Historial" color="green" icon="add_circle_outline" no-caps />
    </div>

    <template v-if="mascota.historiales.length">
      <q-markup-table wrap-cells dense flat bordered>
        <thead>
        <tr class="bg-blue text-white">
          <th>Acciones</th>
          <th>#</th>
          <th>Peso</th>
          <th>Diagnóstico</th>
          <th>Pronóstico</th>
          <th>Fecha</th>
          <th>Usuario</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(h, i) in mascota.historiales" :key="h.id">
          <td>
            <q-btn-dropdown label="Opciones" color="blue"  dense size="sm" no-caps>
              <q-item clickable v-ripple @click="editarHistorial(h)" v-close-popup>
                <q-item-section avatar>
                  <q-icon name="edit" />
                </q-item-section>
                <q-item-section>
                  Ver
                </q-item-section>
              </q-item>
<!--              item eleminar-->
              <q-item clickable v-ripple @click="eliminarHistorial(h)" v-close-popup>
                <q-item-section avatar>
                  <q-icon name="delete" />
                </q-item-section>
                <q-item-section>
                  Eliminar
                </q-item-section>
              </q-item>
<!--              agregar tratamiento-->
              <q-item clickable v-ripple @click="abrirDialogoTratamiento(h)" v-close-popup>
                <q-item-section avatar>
                  <q-icon name="add" />
                </q-item-section>
                <q-item-section>
                  Agregar Tratamiento
                </q-item-section>
              </q-item>
            </q-btn-dropdown>
          </td>
          <td>{{ i + 1 }}</td>
          <td>{{ h.peso }}</td>
          <td>{{ h.diagnostico }}</td>
          <td>{{ h.pronostico }}</td>
          <td>{{ $filters.dateDmYHis(h.fecha) }}</td>
          <td>
            {{h.user?.username}}
          </td>
        </tr>
        </tbody>
      </q-markup-table>
    </template>
<!--    <pre>{{mascota.historiales}}</pre>-->

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
    <q-dialog v-model="dialogTratamiento">
      <q-card style="width: 800px">
        <q-card-section>
          <q-form @submit.prevent="guardarTratamiento">
            <div class="text-h6 text-center">
              {{ tratamiento.id ? 'Editar Tratamiento' : 'Registrar Tratamiento' }}
            </div>
            <div class="row">
              <div class="col-12 col-md-6">
                <q-input v-model="tratamiento.observaciones" label="Observaciones" outlined dense hint="" />
              </div>
              <div class="col-12 col-md-6">
                <q-input v-model="tratamiento.comentario" label="Comentario" outlined dense hint="" />
              </div>
<!--              <div class="col-12 col-md-6">-->
<!--                <q-input v-model="tratamiento.fecha" label="Fecha" type="date" outlined dense hint="" />-->
<!--              </div>-->
              <div class="col-12 col-md-6">
                <q-input v-model="tratamiento.costo" label="Costo" type="number" outlined dense hint="" />
              </div>
              <div class="col-12 text-right">
                <q-btn flat label="Cancelar" color="negative" v-close-popup />
                <q-btn type="submit" label="Guardar" color="positive" :loading="loading" />
              </div>

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
      editando: false,
      dialogTratamiento: false,
      tratamiento: {}
    }
  },
  methods: {
    guardarTratamiento(){
      this.loading = true;
      this.$axios.post('/tratamientos', this.tratamiento).then(() => {
        this.$emit('getMascota');
        this.$alert.success('Tratamiento guardado correctamente');
        this.dialogTratamiento = false;
      }).catch(() => {
        this.$alert.error('Error al guardar el tratamiento');
      }).finally(() => {
        this.loading = false;
      });
    },
    abrirDialogoTratamiento(){
      this.dialogTratamiento = true;
      this.tratamiento = {
        observaciones: '',
        comentario: '',
        fecha: moment().format('YYYY-MM-DD'),
        costo: '',
        historialId: this.historial.id
      }
    },
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
    eliminarHistorial(hist) {
      this.$q.dialog({
        title: 'Eliminar Historial',
        message: '¿Está seguro de eliminar este historial?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.loading = true;
        this.$axios.delete(`/historiales/${hist.id}`).then(() => {
          this.$emit('getMascota');
          this.$alert.success('Historial eliminado correctamente');
        }).catch(() => {
          this.$alert.error('Error al eliminar el historial');
        }).finally(() => {
          this.loading = false;
        });
      });
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
