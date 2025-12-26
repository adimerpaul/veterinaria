<template>
  <q-page class="q-pa-xs">
    <q-card flat bordered>
      <q-card-section class="q-pa-xs">
        <q-form @submit.prevent="getVentas">
          <div class="row">
            <div class="col-12 col-md-2">
              <q-input v-model="fechaInicio" label="Fecha Inicio" type="date" outlined dense />
            </div>
            <div class="col-12 col-md-2">
              <q-input v-model="fechaFin" label="Fecha Fin" type="date" outlined dense />
            </div>
            <div class="col-12 col-md-2">
              <q-select
                v-model="user"
                label="Usuario"
                outlined
                dense
                :options="users"
                option-label="name"
                option-value="id"
                emit-value
                map-options
                v-if="$store.user.role === 'Admin'"
              />
            </div>
            <div class="col-12 col-md-2 flex flex-center">
              <q-btn style="width: 150px" label="Buscar" color="primary" type="submit" icon="search" no-caps :loading="loading" />
            </div>

            <div class="col-12 col-md-2 flex flex-center">
              <q-btn
                style="width: 150px"
                label="Imprimir"
                color="indigo"
                icon="print"
                no-caps
                :loading="loading"
                @click="printReport"
                v-if="$store.user.role === 'Admin'"
              />
            </div>
            <div class="col-12 col-md-2 flex flex-center">
              <q-btn label="Excel" color="green" icon="fa-solid fa-file-excel" no-caps :loading="loading" @click="excelExport" />
            </div>

            <div class="col-12 col-md-4 q-mt-sm">
              <q-input v-model="filter" label="Filtro" outlined dense @update:modelValue="filtroVentas" clearable />
            </div>
            <div class="col-12 col-md-2 flex flex-center q-mt-sm">
              <q-btn
                style="width: 150px"
                label="Venta"
                color="positive"
                @click="$router.push('/ventas/add')"
                no-caps
                icon="add_circle_outline"
                :loading="loading"
              />
            </div>
          </div>
        </q-form>

        <div class="row q-mt-sm">
          <div class="col-12 col-md-4 q-pa-xs" v-if="$store.user.role === 'Admin'">
            <q-list bordered padding dense>
              <q-item>
                <q-item-section avatar>
                  <q-avatar color="indigo" text-color="white" icon="event" />
                </q-item-section>
                <q-item-section>
                  <q-item-label><b>{{ ventas.length }}</b> ventas</q-item-label>
                  <q-item-label caption>Cantidad de ventas</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="col-12 col-md-4 q-pa-xs" v-if="$store.user.role === 'Admin'">
            <q-list bordered padding dense>
              <q-item>
                <q-item-section avatar>
                  <q-avatar color="green" text-color="white" icon="attach_money" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    <b>Bs {{ ventas.filter(v => !v.anulado).reduce((acc, v) => acc + parseFloat(v.total), 0).toFixed(2) }}</b>
                  </q-item-label>
                  <q-item-label caption>Total de ventas (vigentes)</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="col-12 col-md-4 q-pa-xs" v-if="$store.user.role === 'Admin'">
            <q-list bordered padding dense>
              <q-item>
                <q-item-section avatar>
                  <q-avatar color="red" text-color="white" icon="cancel" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    <b>Bs {{ ventas.filter(v => v.anulado).reduce((acc, v) => acc + parseFloat(v.total), 0).toFixed(2) }}</b>
                  </q-item-label>
                  <q-item-label caption>Total de ventas anuladas</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card flat bordered class="q-mt-md">
      <q-card-section>
        <q-markup-table wrap-cells dense flat bordered>
          <thead>
          <tr class="bg-orange text-white">
            <th>Acciones</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Nombre Cliente</th>
            <th>Usuario</th>
            <th>Detalle</th>
            <th>Comentario Doctor</th>
            <th>Pago</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="venta in ventas" :key="venta.id">
            <td>
              <q-btn-dropdown
                label="Opciones"
                no-caps
                dropdown-icon="more_vert"
                color="indigo"
                size="10px"
                v-if="!venta.anulado"
              >
                <q-list>
                  <q-item clickable v-ripple @click="imprimirVenta(venta)" v-close-popup>
                    <q-item-section avatar><q-avatar icon="print" /></q-item-section>
                    <q-item-section><q-item-label>Imprimir</q-item-label></q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable v-ripple @click="anular(venta.id)" v-if="!venta.anulado" v-close-popup>
                    <q-item-section avatar><q-avatar icon="delete" /></q-item-section>
                    <q-item-section><q-item-label>Anular</q-item-label></q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
              <div v-else>
                <q-chip color="red" text-color="white" label="Anulada" />
              </div>
            </td>
            <td>{{ $filters.dateDmYHis(venta.fecha) }}</td>
            <td class="text-right">{{ venta.total }}</td>
            <td>
              {{ venta.nombre }}<br />
              {{ venta.mascota?.nombre }}
            </td>
            <td>{{ venta.user?.username }}</td>
            <td>
              <div style="max-width: 350px; wrap-option: wrap; line-height: 0.9;">
                  <span v-for="detail in venta.details" :key="detail.id">
                    {{ detail.cantidad }} {{ detail.productoName }},
                  </span>
              </div>
            </td>
            <td>
              <div style="max-width: 350px; wrap-option: wrap; line-height: 0.9;">
                {{ venta.comentarioDoctor }}
              </div>
            </td>
            <td>{{ venta.pago }}</td>
          </tr>
          </tbody>
        </q-markup-table>
      </q-card-section>
    </q-card>
  </q-page>

  <!-- Dialog Cerrar Caja -->
  <q-dialog v-model="dialogCaja" persistent>
    <q-card flat bordered style="width: 350px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-bold">Cerrar Caja</div>
        <q-space />
        <q-btn flat dense icon="close" @click="dialogCaja = false" />
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="cerraCajaSubmit">
          <q-input v-model="caja.monto_final" label="Monto Final" type="number" outlined dense />
          <q-input type="textarea" v-model="caja.observacion" label="Observación" outlined dense />
          <q-btn label="Cerrar Caja" color="red" type="submit" :loading="loading" no-caps icon="point_of_sale" class="q-mt-md" />
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>

  <!-- Área oculta para imprimir con printd -->
  <div id="myElement" class="hidden"></div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from "vue";
import moment from "moment";
import { Impresion } from "src/addons/Impresion.js";
import { Imprimir } from "src/addons/Imprimir.js";
import { Excel } from "src/addons/Excel.js";
import { Printd } from "printd";

const { proxy } = getCurrentInstance();
const fechaInicio = ref(moment().format("YYYY-MM-DD"));
const fechaFin = ref(moment().format("YYYY-MM-DD"));
const ventas = ref([]);
const ventasAll = ref([]);
const loading = ref(false);
const filter = ref("");
const users = ref([]);
const user = ref("");
const reporte = ref("CAJA");
const dialogCaja = ref(false);
const caja = ref({});
const productos = ref([]);
const reportes = ref(["CAJA", "PRODUCTOS"]);

onMounted(() => {
  getVentas();
  getUsers();
});

function imprimir() {
  if (!user.value) {
    proxy.$alert.error("Seleccione un usuario", "Por favor");
    return;
  }
  const userFind = users.value.find((usuario) => usuario.id === user.value);
  loading.value = true;
  proxy.$axios
    .post("/sales/imprimir", {
      user_id: user.value,
      fechaInicio: fechaInicio.value,
      fechaFin: fechaFin.value,
      reporte: reporte.value,
    })
    .then((res) => {
      if (reporte.value === "CAJA") {
        Impresion.imprimirCaja(res.data, fechaInicio.value, fechaFin.value, userFind.name);
      }
      if (reporte.value === "PRODUCTOS") {
        Impresion.imprimirProductos(res.data, fechaInicio.value, fechaFin.value, userFind.name);
      }
    })
    .finally(() => {
      loading.value = false;
    });
}

function cerraCaja() {
  dialogCaja.value = true;
  caja.value = {
    monto_inicial: 0,
    monto_final: 0,
    observacion: "",
  };
}
function cerraCajaSubmit() {
  loading.value = true;
  proxy.$axios
    .post("/cajas", caja.value)
    .then((res) => {
      dialogCaja.value = false;
      proxy.$alert.success("Registrado correctamente", res.data);
    })
    .finally(() => {
      loading.value = false;
    });
}

function filtroVentas() {
  if (!filter.value) {
    ventas.value = ventasAll.value;
    return;
  }
  ventas.value = ventasAll.value.filter((venta) => {
    return (
      (venta.nombre || "").toLowerCase().includes(filter.value.toLowerCase()) ||
      (venta.user?.name || "").toLowerCase().includes(filter.value.toLowerCase())
    );
  });
}

function imprimirVenta(venta) {
  // console.log(venta);
  Imprimir.nota(venta);
}

function excelExport() {
  // EXCLUIR ANULADAS
  const ventasNoAnuladas = ventas.value.filter((v) => !v.anulado);

  const data = [
    {
      sheet: "Ventas",
      columns: [
        { label: "Fecha", value: (row) => moment(row.fecha).format("DD/MM/YYYY HH:mm") },
        { label: "Cliente", value: (row) => row.nombre },
        { label: "Mascota", value: (row) => row.mascota?.nombre || "" },
        { label: "Usuario", value: (row) => row.user?.username || "" },
        { label: "Total", value: (row) => row.total },
        { label: "Comentario Doctor", value: (row) => row.comentarioDoctor || "" },
        {
          label: "Detalles",
          value: (row) => (row.details || []).map((detail) => `${detail.cantidad} ${detail.productoName}`).join(", "),
        },
      ],
      content: ventasNoAnuladas.map((venta) => ({
        fecha: venta.fecha,
        nombre: venta.nombre,
        mascota: venta.mascota,
        user: venta.user,
        total: venta.total,
        comentarioDoctor: venta.comentarioDoctor,
        details: venta.details,
      })),
    },
  ];
  Excel.export(data, "Ventas");
}

// Imprimir reporte del rango con printd (excluye anuladas)
function printReport() {
  const d = new Printd();

  const ventasNoAnuladas = ventas.value.filter((v) => !v.anulado);
  const total = ventasNoAnuladas.reduce((acc, v) => acc + parseFloat(v.total || 0), 0);

  const styles = `
    <style>
      * { box-sizing: border-box; }
      body { font-family: Arial, sans-serif; font-size: 12px; margin: 16px; }
      h3 { margin: 0 0 10px 0; }
      .meta { margin-bottom: 10px; }
      table { width: 100%; border-collapse: collapse; }
      th, td { border: 1px solid #000; padding: 4px; vertical-align: top; }
      thead tr { background: #e65100; color: #fff; }
      tfoot tr { background: #eee; font-weight: bold; }
      .right { text-align: right; }
      .small { font-size: 11px; }
      @media print { @page { size: A4 portrait; margin: 12mm; } }
    </style>
  `;

  const html = `
    <div>
      <h3>REPORTE DE VENTAS</h3>
      <div class="meta small">
        Rango: ${moment(fechaInicio.value).format("DD/MM/YYYY")} - ${moment(fechaFin.value).format("DD/MM/YYYY")}
        ${user.value ? ` | Usuario: ${(users.value.find(u => u.id === user.value) || {}).name || ''}` : ''}
      </div>
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Cliente</th>
            <th>Usuario</th>
            <th>Detalle</th>
            <th class="right">Total (Bs)</th>
            <th>Pago</th>
            <th>Comentario</th>
          </tr>
        </thead>
        <tbody>
          ${
    ventasNoAnuladas.map(v => `
              <tr>
                <td>${moment(v.fecha).format("DD/MM/YYYY HH:mm")}</td>
                <td>${(v.nombre || '')}${v.mascota?.nombre ? ' / ' + v.mascota.nombre : ''}</td>
                <td>${v.user?.username || ''}</td>
                <td class="small">
                  ${(v.details || []).map(d => `${d.cantidad} ${d.productoName}`).join(', ')}
                </td>
                <td class="right">${Number(v.total || 0).toFixed(2)}</td>
                <td>${v.pago || ''}</td>
                <td class="small">${v.comentarioDoctor || ''}</td>
              </tr>
            `).join('')
  }
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4" class="right">TOTAL</td>
            <td class="right">${total.toFixed(2)}</td>
            <td colspan="2"></td>
          </tr>
        </tfoot>
      </table>
    </div>
  `;

  // Inyectar en un contenedor oculto para pasar un nodo a printd
  const el = document.getElementById("printArea");
  el.innerHTML = html;

  d.print(el, [styles]);
}

function anular(id) {
  proxy.$q
    .dialog({
      title: "Anular Venta",
      message: "¿Está seguro de anular la venta?",
      ok: "Sí",
      cancel: "No",
    })
    .onOk(() => {
      loading.value = true;
      proxy.$axios
        .put(`/sales/${id}/anular`)
        .then(() => {
          getVentas();
        })
        .finally(() => {
          loading.value = false;
        });
    });
}

function getUsers() {
  users.value = [{ id: "", name: "Todos" }];
  proxy.$axios.get("/users").then((response) => {
    response.data.forEach((u) => {
      users.value.push({ id: u.id, name: u.name });
    });
  });
}

function getVentas() {
  loading.value = true;
  proxy.$axios
    .get("/sales", {
      params: { fechaInicio: fechaInicio.value, fechaFin: fechaFin.value, user_id: user.value },
    })
    .then((response) => {
      ventas.value = response.data;
      ventasAll.value = response.data;
    })
    .finally(() => {
      loading.value = false;
    });
}

function verDetalles(id) {
  proxy.$router.push(`/ventas/${id}`);
}
</script>

<style scoped>
.hidden {
  display: none;
}
</style>
