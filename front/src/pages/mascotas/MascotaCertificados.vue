<template>
  <div>
    <div class="row">
      <div class="col-12 text-right">
        <q-btn label="Crear certificado" color="green" icon="add_circle_outline" no-caps @click="dialogOpen" />
      </div>
    </div>
<!--    "documentos": [-->
<!--    {-->
<!--    "id": 7,-->
<!--    "nombre": "CERTIFICADO DE AUTORIZACION QUIRURGICA",-->
<!--    "html": "  <div>\n    <div style=\"text-align: center; font-weight: bold; color: blue; text-decoration: underline; font-size: 1.2em;\">\n      CERTIFICADO DE AUTORIZACIÓN QUIRÚRGICA\n    </div>\n    <div>\n      El Sr. Propietario responsable del paciente quirúrgico reconoce como correctos los siguientes datos identificados:\n    </div>\n    <div style=\"font-weight: bold;color: blue\">PROPIETARIO RESPONSABLE</div>\n    <div>\n      <span style=\"font-weight: bold\">Nombre y Apellidos:</span> angela sara\n      <span style=\"font-weight: bold\">C.I.:</span> 222\n      <span style=\"font-weight: bold\">Teléfono:</span> 69603027\n    </div>\n    <div style=\"font-weight: bold;color: blue\">VETERINARIOS RESPONSABLES</div>\n    <div><strong>Cirujano:</strong> ...................................................................................................................</div>\n    <div><strong>Cirujano 2 o instrumentista:</strong> ............................................................................</div>\n    <div><strong>Anestesista:</strong> ............................................................................................................</div>\n    <div style=\"font-weight: bold;color: blue\">PACIENTE QUIRÚRGICO</div>\n\n    <div>\n      <strong>Especie:</strong> Gato\n      <strong>Raza:</strong> Persa\n      <strong>Sexo:</strong> Macho\n      <strong>Edad:</strong> 5\n      <strong>Color:</strong> Dorado\n      <strong>Nombre:</strong> rosa la ruborosa <br>\n      <strong>Cirugía a realizar:</strong> ............................................................................................................. <br>\n      <strong>Costo Cirugía:</strong> ..........\n      <strong>Adelanto:</strong> ..........\n      <strong>Saldo:</strong> ..........\n    </div>\n    <div>El Señor. Propietario y/o tenedor responsable autoriza al profesional veterinario y a su equipo a realizar el acto quirúrgico indicado al paciente ya mencionado.</div>\n    <div>El Señor. Responsable otorga el consentimiento y autoriza al profesional en el párrafo precedente, dejado constancia de:</div>\n    <div>\n      Tengo pleno conocimiento de la cirugía a realizar a mi animal, quedando satisfactoriamente informado de los pormenores de la misma;\n      en lo que concierne al pre, intra y post operatorio., asi como los objetivos terapéuticos y/o exploratorios, dicho paciente ingresa con riesgo de :.............\n    </div>\n    <div>\n      Estoy consciente de posibles reacciones secundarias no previstas a cualquiera de los fármacos o líquidos administrados,\n      con posibles repercusion cardiaca, pulmonar, hepatica, renal y/o del sistema nervioso.\n    </div>\n    <div>\n      Conozco y acepto el riesgo que supone todo acto quirúrgico bajo anestesia general,\n      asi como las posibles complicaciones que puedan surgir en el dasarrollo de la misma.\n    </div>\n    <div>La veterinaria no se responsabiliza por posibles reacciones alérgicas o anafilácticas que el paciente pueda presentar antes, durante y después de la cirugía, asi como infeciones post quirurgicas y/o Sangrados improvistos.</div>\n    <div>Autorizo al profesional a modificar la conducta quirúrgica pre-establecida e informada cuando sugieren razones médico quirúrgicas.</div>\n    <div>\n      Autorizo, SI .......... NO ......... a realizar pruebas de : .............................................................................................................\n      a mi mascota, en caso de no apcetar deslindo responsabilidades al medico veterinario.por cualquier situación que surja intra y post operatorias.\n    </div>\n    <div>\n      El Propietario con su forma certifica haber leido y comprendido todo lo expuesto en este documento, y acepta las condiciones y riesgos que implica la cirugía.\n    </div>\n    <br>\n    <br>\n    <br>\n    <div>\n      <table style=\"width: 100%\">\n        <tr>\n          <td style=\"width: 40%\" valign=\"top\">\n            <div style=\"text-align: center;line-height: 0.9\">\n              ........................................<br>\n              Firma del propietario <br>\n              Nombre: angela sara <br>\n              C.I.: 222 <br>\n            </div>\n          </td>\n          <td style=\"width: 40%\" valign=\"top\">\n            <div style=\"text-align: center;line-height: 0.9\">\n              ........................................<br>\n              Firma Veterinario Responsable <br>\n&lt;!&ndash;              Nombre: xxxxxxxxxx <br>&ndash;&gt;\n&lt;!&ndash;              C.I.: xxxxxxxxxx <br>&ndash;&gt;\n            </div>\n          </td>\n          <td style=\"width: 20%\">\n            <div style=\"text-align: right\">\n            </div>\n          </td>\n        </tr>\n      </table>\n    </div>\n    <div style=\"text-align: center\">\n&lt;!&ndash;      Fecha de cirugía: xxxxxxx de: xxxxxxxxx de xxxxx&ndash;&gt;\n      Fecha de cirugía: 20 de Marzo de 2025\n    </div>\n  </div>",-->
<!--  "fechaCreacion": "2025-03-20T08:35:27.000Z",-->
<!--  "createdAt": "2025-03-20T08:35:27.192Z",-->
<!--  "updatedAt": "2025-03-20T08:35:27.192Z",-->
<!--  "deletedAt": null,-->
<!--  "user": {-->
<!--  "id": 1,-->
<!--  "name": "ING. ADIMER PAUL CHAMBI AJATA",-->
<!--  "role": "Admin",-->
<!--  "username": "Adimer",-->
<!--  "password": "$2b$10$hLxScAvuENNvqjNTwS1p6u/TUd0Ej9Oae9iCAzZSHBqMlCI.fLO0a",-->
<!--  "createdAt": "2025-03-12T09:47:07.189Z",-->
<!--  "updatedAt": "2025-03-12T09:47:07.189Z",-->
<!--  "deletedAt": null-->
<!--  }-->
<!--  }-->
<!--  ],-->
    <template v-if="mascota.documentos.length > 0">
      <q-markup-table wrap-cells dense flat bordered>
        <thead>
        <tr class="bg-red text-white">
          <td>#</td>
          <th>Acciones</th>
          <th>Tipo</th>
          <th>Fecha</th>
<!--          <th>Producto</th>-->
<!--          <th>Tipo</th>-->
          <th>Usuario</th>
<!--          <th>Detalle</th>-->
        </tr>
        </thead>
        <tbody>
        <tr v-for="(documento, index) in mascota.documentos" :key="documento.id">
          <td>{{ index + 1 }}</td>
          <td>
            <q-btn-dropdown dense color="primary" size="sm" label="Opciones" no-caps>
              <q-item clickable v-ripple @click="verCertificado(documento)" v-close-popup>
                <q-item-section avatar>
                  <q-icon name="visibility" />
                </q-item-section>
                <q-item-section>Ver</q-item-section>
              </q-item>
              <q-item clickable v-ripple @click="imprimirCertificado(documento)" v-close-popup>
                <q-item-section avatar>
                  <q-icon name="print" />
                </q-item-section>
                <q-item-section>Imprimir</q-item-section>
              </q-item>
            </q-btn-dropdown>
          </td>
          <td>{{ documento.nombre }}</td>
          <td>{{ moment(documento.fechaCreacion).format('DD/MM/YYYY HH:mm') }}</td>
          <td>{{ documento.user?.username }}</td>
        </tr>
        </tbody>
      </q-markup-table>
    </template>
    <template v-else>
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 text-center">No hay certificados</div>
        </q-card-section>
      </q-card>
    </template>
    <q-dialog v-model="dialog" persistent>
      <q-card style="max-width: 850px">
        <q-card-section class="text-bold row items-center q-pb-none">
          <div>
            Crear certificado
          </div>
          <q-space />
          <q-btn flat round dense icon="close" @click="dialog = false" />
        </q-card-section>
        <q-card-section>
          <div class="row">
            <div class="col-12">
              <q-select
                v-model="documento"
                :options="documentos"
                label="Tipo de documento"
                outlined
                @update:modelValue="selectedDocument"
              />
            </div>
            <div class="col-12">
              <q-editor
                v-model="html"
                :options="{
                  toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    ['link', 'image'],
                    ['clean']
                  ]
                }"
              />
            </div>
            <div class="col-12 text-right q-pa-xs" >
              <q-btn :label="opcion" :color="opcion === 'Crear' ? 'green' : 'primary'" @click="guardarCertificado" />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import moment from "moment/moment.js";
import {Html} from "src/addons/Html.js";

export default {
  name: 'MascotaCertificados',
  props: {
    mascota: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
      documentos: ['CERTIFICADO DE AUTORIZACION QUIRURGICA', 'AUTORIZACION DE EUTANASIA', 'ANESTECIA Y RESTRO DE RECUPERACION'],
      documento: '',
      html: '',
      moment: moment,
      opcion : '',
      documentoId : '',
    }
  },
  methods: {
    imprimirCertificado(documento) {
      const url = '/imprimir/'+documento.id
      window.open(url, '_blank')
    },
    verCertificado(documento) {
      this.dialog = true
      this.documento = documento.nombre
      this.html = documento.html
      this.opcion = 'Actualizar'
      this.documentoId = documento.id
    },
    guardarCertificado() {
      if (!this.html) {
        this.$alert.error('El contenido del certificado no puede estar vacio','Error')
        return
      }
      this.dialog = false
      if (this.opcion === 'Actualizar') {
        this.$axios.put(`documentos/${this.documentoId}`, {
          html: this.html,
        }).then(response => {
          console.log(response)
          this.$emit('getMascota')
        })
        return false
      }else if (this.opcion === 'Crear') {
        this.$axios.post('documentos', {
          mascota_id: this.mascota.id,
          nombre: this.documento,
          html: this.html,
        }).then(response => {
          console.log(response)
          this.$emit('getMascota')
        })
        return false
      }
    },
    dialogOpen() {
      this.dialog = true
      this.html = ''
      this.documento = ''
      this.opcion = 'Crear'
    },
    selectedDocument(value) {
      // console.log(value)
      this.html = ''
      if (value === 'CERTIFICADO DE AUTORIZACION QUIRURGICA') {
        this.html = Html.certificadoAutorizacionQuirurgica(this.mascota)
      }
    },
  },
}
</script>
