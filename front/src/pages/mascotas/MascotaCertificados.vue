<template>
  <div>
    <div class="row">
      <div class="col-12 text-right">
        <q-btn label="Crear certificado" color="green" icon="add_circle_outline" no-caps @click="dialogOpen" />
      </div>
    </div>
    <template v-if="mascota.documentos.length > 0">
<!--      <q-markup-table wrap-cells dense flat bordered>-->
<!--        <thead>-->
<!--        <tr class="bg-red text-white">-->
<!--          <td>#</td>-->
<!--          <th>Acciones</th>-->
<!--          <th>Tipo</th>-->
<!--          <th>Fecha</th>-->
<!--&lt;!&ndash;          <th>Producto</th>&ndash;&gt;-->
<!--&lt;!&ndash;          <th>Tipo</th>&ndash;&gt;-->
<!--          <th>Usuario</th>-->
<!--&lt;!&ndash;          <th>Detalle</th>&ndash;&gt;-->
<!--        </tr>-->
<!--        </thead>-->
<!--        <tbody>-->
<!--        <tr v-for="(venta,i) in mascota.productosEspeciales" :key="venta.id">-->
<!--          <td>{{ i + 1 }}</td>-->
<!--          <td>-->
<!--            &lt;!&ndash;          <q-btn style="width: 80px" icon="remove_circle_outline" color="negative" dense @click="anular(venta.id)" label="Anular" no-caps size="10px"&ndash;&gt;-->
<!--            &lt;!&ndash;                 v-if="!venta.anulado"&ndash;&gt;-->
<!--            &lt;!&ndash;          />&ndash;&gt;-->
<!--            <div v-if="venta.anulado">-->
<!--              <q-chip color="red" text-color="white" label="Anulada" />-->
<!--            </div>-->
<!--          </td>-->
<!--          <td>{{ $filters.dateDmYHis(venta.fecha) }}</td>-->
<!--          <td class="text-right">{{ venta.subtotal }}</td>-->
<!--          <td>{{ venta.productoName }}</td>-->
<!--          <td>-->
<!--            <q-chip dense :color="getColor(venta.producto?.tipo)" size="10px">-->
<!--              {{ venta.producto?.tipo }}-->
<!--            </q-chip>-->
<!--          </td>-->
<!--          <td>{{ venta.user?.username }}</td>-->
<!--&lt;!&ndash;          <td>&ndash;&gt;-->
<!--&lt;!&ndash;            <div style="max-width: 350px; wrap-option: wrap;line-height: 0.9;">&ndash;&gt;-->
<!--&lt;!&ndash;              <span  v-for="detail in venta.details" :key="detail.id">&ndash;&gt;-->
<!--&lt;!&ndash;                {{ detail.cantidad }} {{ detail.productoName }},&ndash;&gt;-->
<!--&lt;!&ndash;              </span>&ndash;&gt;-->
<!--&lt;!&ndash;            </div>&ndash;&gt;-->
<!--&lt;!&ndash;          </td>&ndash;&gt;-->
<!--        </tr>-->
<!--        </tbody>-->
<!--        <tfoot>-->
<!--        <tr>-->
<!--          <td colspan="3" class="text-right text-bold">Total</td>-->
<!--          <td class="text-right text-bold">{{ mascota.productosEspeciales.reduce((acc, venta) => acc + parseFloat(venta.subtotal), 0).toFixed(2) }}</td>-->
<!--          <td></td>-->
<!--          <td></td>-->
<!--          <td></td>-->
<!--        </tr>-->
<!--        </tfoot>-->
<!--      </q-markup-table>-->
    </template>
    <template v-else>
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 text-center">No hay certificados</div>
        </q-card-section>
      </q-card>
    </template>
    <q-dialog v-model="dialog" persistent>
      <q-card style="min-width: 650px">
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
          </div>
          <!--        <q-btn label="Guardar" color="green" @click="guardarCertificado" />-->
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
    }
  },
  methods: {
    dialogOpen() {
      this.dialog = true
      this.html = ''
      this.documento = ''
    },
    selectedDocument(value) {
      // console.log(value)
      this.html = ''
      if (value === 'CERTIFICADO DE AUTORIZACION QUIRURGICA') {
        this.html = Html.certificadoAutorizacionQuirurgica()
      }
    },
  },
}
</script>
