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
<!--          <th>#</th>-->
          <th>Peso</th>
          <th>Diagnóstico</th>
          <th>Pronóstico</th>
          <th>Tratamientos</th>
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
              <q-item clickable v-ripple @click="abrirDialogoTratamiento(h)" v-close-popup>
                <q-item-section avatar>
                  <q-icon name="add_circle_outline" />
                </q-item-section>
                <q-item-section>
                  Agregar Tratamiento
                </q-item-section>
              </q-item>
              <q-item clickable v-ripple @click="imprimirHistorial(h)" v-close-popup>
                <q-item-section avatar>
                  <q-icon name="print" />
                </q-item-section>
                <q-item-section>
                  Imprimir Historial
                </q-item-section>
              </q-item>
              <q-item clickable v-ripple @click="abrirWhatsapp(h)" v-close-popup>
                <q-item-section avatar>
                  <q-icon name="chat" />
                </q-item-section>
                <q-item-section>
                  Enviar WhatsApp
                </q-item-section>
              </q-item>
            </q-btn-dropdown>
          </td>
<!--          <td>{{ i + 1 }}</td>-->
          <td>{{ h.peso }}</td>
          <td>{{ h.diagnostico }}</td>
          <td>{{ h.pronostico }}</td>
          <td>
<!--            {{ h.tratamientos.length }}-->
            <ul>
              <li v-for="(t, i) in h.tratamientos" :key="t.id">
                {{ $filters.dateDmYHis(t.fecha) }}
<!--                icon eliminar-->
<!--                <span>-->
<!--                  <q-icon name="delete" @click="eliminarTratamiento(t)" class="cursor-pointer" size="xs" color="red" />-->
<!--                </span>-->
                <q-btn-dropdown label="Opciones" color="blue"  dense size="sm" no-caps>
                  <q-list>
                    <q-item clickable v-ripple @click="eliminarTratamiento(t)" v-close-popup>
                      <q-item-section avatar>
                        <q-icon name="delete" />
                      </q-item-section>
                      <q-item-section>
                        Eliminar
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple @click="imprimirTratamiento(t)" v-close-popup>
                      <q-item-section avatar>
                        <q-icon name="print" />
                      </q-item-section>
                      <q-item-section>
                        Imprimir
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </li>
            </ul>
          </td>
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
              <q-input v-model="historial.pulso" label="Pulso" outlined dense hint="" />
              </div>
              <div class="col-6 col-md-4">
              <q-select v-model="historial.cf" label="mc" outlined dense hint="" :options="['D', 'R', 'B', 'C','MC','O']" />
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
                <q-input v-model="historial.ecografia" label="Ecografía" outlined dense clearable>
                  <template v-slot:append>
                    <q-btn flat round dense icon="mic" @click="startRecognition('ecografia')" />
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-6">
                <q-input v-model="historial.diagnostico" label="Diagnóstico" outlined dense clearable>
                  <template v-slot:append>
                    <q-btn flat round dense icon="mic" @click="startRecognition('diagnostico')" />
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-6">
                <q-input v-model="historial.pronostico" label="Pronóstico" outlined dense clearable>
                  <template v-slot:append>
                    <q-btn flat round dense icon="mic" @click="startRecognition('pronostico')" />
                  </template>
                </q-input>
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
                <q-input v-model="tratamiento.observaciones" label="Observaciones" outlined dense hint="" >
                  <template v-slot:append>
                    <q-btn flat round dense icon="mic" @click="startRecognition('observaciones')" />
                  </template>
                </q-input>
              </div>
<!--              <div class="col-12 col-md-6">-->
<!--                <q-input v-model="tratamiento.fecha" label="Fecha" type="date" outlined dense hint="" />-->
<!--              </div>-->
              <div class="col-12 col-md-6">
                <q-input v-model="tratamiento.costo" label="Costo" type="number" outlined dense hint="" />
              </div>
              <div class="col-12 col-md-12">
                <q-input v-model="tratamiento.comentario" label="Comentario" outlined dense hint="" type="textarea" rows="3">
                  <template v-slot:append>
                    <q-btn flat round dense icon="mic" @click="startRecognition('comentario')" />
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-6">

              </div>
              <div class="col-12 col-md-9">
                <q-select
                  v-model="medicamento"
                  label="Medicamento"
                  outlined
                  dense
                  hint=""
                  :options="medicamentos"
                  option-label="nombre"
                  option-value="id"
                  use-input
                  @filter="filterFn"
                  emit-value
                  clearable
                  map-options>
                  <template v-slot:option="scope">
                    <q-item v-bind="scope.itemProps">
                      <q-item-section>
                        <q-item-label>
                          {{ scope.opt.nombre }}
                          <span class="text-bold">{{ scope.opt.tipo }}</span>
                          <span>{{ scope.opt.precioVenta }} Bs</span>
<!--                          <pre>-->
<!--                            {{ scope.opt }}-->
<!--                          </pre>-->
                        </q-item-label>
                      </q-item-section>
<!--                      <q-item-section side>-->
<!--                        <q-btn @click.stop="agregarMedicamento(scope.opt)" icon="add_circle_outline" color="green" flat />-->
<!--                      </q-item-section>-->
                    </q-item>
                  </template>
<!--                  <template v-slot:selected-item="scope">-->
<!--                    <q-item v-bind="scope.itemProps">-->
<!--                      <q-item-section>-->
<!--                        <q-item-label>{{ scope.opt.nombre }}</q-item-label>-->
<!--                      </q-item-section>-->
<!--                      <q-item-section side>-->
<!--                        <q-btn @click.stop="agregarMedicamento(scope.opt)" icon="add" color="green" flat />-->
<!--                      </q-item-section>-->
<!--                    </q-item>-->
<!--                  </template>-->
                </q-select>
<!--                <pre>{{medicamento}}</pre>-->
              </div>
              <div class="col-12 col-md-3 text-center">
                <q-btn
                  icon="add_circle_outline"
                  color="green"
                  label="Agregar"
                  dense
                  @click="agregarMedicamento(medicamento)"
                  :disabled="!medicamento"
                  no-caps/>
              </div>
              <div class="col-12">
                <q-markup-table dense wrap-cells flat bordered >
                  <thead>
                  <tr class="bg-blue text-white">
                    <th>Medicamento</th>
                    <th>Tipo</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Acciones</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(m, i) in tratamiento.medicamentos" :key="i">
                    <td>{{ m.nombre }}</td>
                    <td>{{ m.tipo }}</td>
                    <td>
                      <q-input v-model.number="m.cantidad" type="number" outlined dense hint="" />
                    </td>
                    <td>
                      <q-input v-model.number="m.precio" type="number" outlined dense hint="" />
                    </td>
                    <td>
                      <q-btn icon="delete" color="red" flat @click="tratamiento.medicamentos.splice(i, 1)" />
                    </td>
                  </tr>
                  </tbody>
                  <tfoot>
                  <tr>
                    <td colspan="3" class="text-right">Total:</td>
                    <td>
                      {{ tratamiento.medicamentos?.reduce((acc, m) => acc + (m.precio * m.cantidad), 0).toFixed(2) }} Bs
                    </td>
                    <td></td>
                  </tr>
                  </tfoot>
                </q-markup-table>

              </div>
<!--              <pre>{{tratamiento}}</pre>-->
              <div class="col-12 text-right">
                <q-btn flat label="Cancelar" color="negative" v-close-popup />
                <q-btn type="submit" label="Guardar" color="positive" :loading="loading" />
              </div>
<!--              <div class="col-12">-->
<!--                <pre>-->
<!--                  {{ tratamiento }}-->
<!--                </pre>-->
<!--              </div>-->

            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import moment from "moment";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { imprimirTratamientoPDF, imprimirHistorialPDF } from '../../utils/pdf'
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
      tratamiento: {},
      medicamentos: [],
      medicamentosAll: [],
      medicamento: '',
      recognition: null,
      activeField: null
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
        if (this.activeField && this.historial[this.activeField] !== undefined) {
          this.historial[this.activeField] += text;
        }
      };

      this.recognition.onerror = (event) => {
        console.error('Error de reconocimiento de voz:', event.error);
      };
    } else {
      console.warn('Reconocimiento de voz no soportado en este navegador.');
    }
    this.$axios.get('/productos/all').then(res => {
      this.medicamentos = res.data;
      this.medicamentosAll = res.data;
    }).catch(() => {
      this.$alert.error('Error al cargar los medicamentos');
    });
  },
  methods: {
    startRecognition(field) {
      if (this.recognition) {
        this.activeField = field;
        this.recognition.onresult = (event) => {
          const text = event.results[0][0].transcript;
          // Detecta si el campo está en historial o tratamiento
          if (this.historial && this.historial.hasOwnProperty(field)) {
            this.historial[field] += text;
          } else if (this.tratamiento && this.tratamiento.hasOwnProperty(field)) {
            this.tratamiento[field] += text;
          }
        };
        this.recognition.start();
      } else {
        this.$q.notify({
          color: 'negative',
          message: 'Reconocimiento de voz no soportado por el navegador.',
        });
      }
    },
    agregarMedicamento(medicamentoId) {
      const medicamento = this.medicamentos.find(m => m.id === medicamentoId);
      if (this.tratamiento.medicamentos && this.tratamiento.medicamentos.length > 0) {
        const exists = this.tratamiento.medicamentos.find(m => m.id === medicamento.id);
        if (exists) {
          this.$alert.error('El medicamento ya está agregado');
          return;
        }
      } else {
        this.tratamiento.medicamentos = [];
      }
      // this.tratamiento.medicamentos.push(medicamento);
      this.tratamiento.medicamentos.push({
        cantidad: 1,
        precio: medicamento.precioVenta,
        ...medicamento
      });
      this.medicamento = '';
    },
    filterFn(val, update) {
      if (val === '') {
        update(() => {
          this.medicamentos = this.medicamentosAll;
        });
        return;
      }
      const needle = val.toLowerCase();
      update(() => {
        // this.medicamentos = this.medicamentosAll.filter((item) => {
        //   return item.nombre.toLowerCase().indexOf(needle) > -1;
        // }); filtrar tambien por tipo
        this.medicamentos = this.medicamentosAll.filter((item) => {
          return item.nombre.toLowerCase().indexOf(needle) > -1 || item.tipo.toLowerCase().indexOf(needle) > -1;
        });
      });
    },
    imprimirTratamiento(t) {
      imprimirTratamientoPDF(t, this.mascota);
    },
    eliminarTratamiento(t) {
      this.$q.dialog({
        title: 'Eliminar Tratamiento',
        message: '¿Está seguro de eliminar este tratamiento?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.loading = true;
        this.$axios.delete(`/tratamientos/${t.id}`).then(() => {
          this.$emit('getMascota');
          this.$alert.success('Tratamiento eliminado correctamente');
        }).catch(() => {
          this.$alert.error('Error al eliminar el tratamiento');
        }).finally(() => {
          this.loading = false;
        });
      });
    },
    guardarTratamiento(){
      this.loading = true;
      console.log(this.tratamiento)
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
    abrirDialogoTratamiento(h){
      this.dialogTratamiento = true;
      this.tratamiento = {
        observaciones: '',
        comentario: '',
        fecha: moment().format('YYYY-MM-DD'),
        costo: '',
        historialId: h.id
      }
    },
    abrirWhatsapp(t) {
      // console.log(t)
      const mensaje = `Hola, ${this.mascota.propietario_nombre || 'dueño'}\n\n` +
        `Le informamos que se ha registrado un tratamiento para su mascota ${this.mascota.nombre}.\n` +
        `Detalles del tratamiento:\n` +
        `Fecha: ${moment(t.fecha).format('DD/MM/YYYY')}\n` +
        `Observaciones: ${t.observaciones || '-'}`;
      const url = `https://api.whatsapp.com/send?phone=${this.mascota.propietario_telefono}&text=${encodeURIComponent(mensaje)}`;
      window.open(url, '_blank');
    },
    imprimirHistorial(hist) {
      imprimirHistorialPDF(hist, this.mascota);
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
