<template>
  <q-page class="q-pa-md">
    <q-card flat bordered>
      <q-card-section>
        <q-form @submit.prevent="clientesGet">
          <div class="row">
            <div class="col-8 col-md-3">
              <q-input v-model="filter" label="Buscar Cliente" outlined dense clearable>
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
              </q-input>
            </div>
            <div class="col-4 col-md-2 flex flex-center">
              <q-btn color="primary" label="Buscar" type="submit" no-caps icon="search" :loading="loading" />
            </div>
            <div class="col-12 col-md-7 text-right">
              <q-btn color="positive" label="Nuevo Cliente" @click="clienteNew" no-caps icon="add_circle_outline" :loading="loading" />
            </div>
          </div>
        </q-form>
        <div class="row">
          <div class="col-12 flex flex-center">
            <q-pagination
              v-if="totalPages > 1"
              v-model="currentPage"
              :max="totalPages"
              :max-pages="5"
              boundary-numbers
              color="black"
              @update:model-value="clientesGet"
            />
          </div>
        </div>
        <q-markup-table dense wrap-cells flat bordered>
          <thead class="bg-black text-white">
          <tr>
            <td>Opciones</td>
            <td>Nombre/Razón Social</td>
            <td>Documento</td>
            <td>Email</td>
            <td>Teléfono</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="cliente in clientes" :key="cliente.id">
            <td>
              <q-btn-dropdown dense size="10px" label="Opciones" no-caps dropdown-icon="more_vert" color="orange" :loading="loading">
                <q-list>
                  <q-item clickable v-ripple @click="clienteEdit(cliente)" v-close-popup>
                    <q-item-section>Editar</q-item-section>
                  </q-item>
                  <q-item clickable v-ripple @click="clienteDelete(cliente.id)" v-close-popup>
                    <q-item-section>Eliminar</q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </td>
            <td>{{ cliente.nombreRazonSocial }}</td>
            <td>{{ cliente.numeroDocumento }}</td>
            <td>{{ cliente.email }}</td>
            <td>{{ cliente.telefono }}</td>
          </tr>
          </tbody>
        </q-markup-table>
      </q-card-section>
    </q-card>

    <q-dialog v-model="clienteDialog" persistent position="right" maximized>
      <q-card style="min-width: 300px;">
        <q-card-section class="q-pb-none row items-center">
          <div class="text-bold text-sub">
            {{ cliente.id ? 'Editar Cliente' : 'Nuevo Cliente' }}
          </div>
          <q-space />
          <q-btn icon="close" flat round dense @click="clienteDialog = false" />
        </q-card-section>
        <q-card-section>
          <q-form @submit.prevent="cliente.id ? clientePut() : clientePost()">
            <q-input v-model="cliente.nombreRazonSocial" label="Nombre/Razón Social" dense outlined required hint="" :rules="[val => !!val || 'Campo requerido']" />
            <q-input v-model="cliente.codigoTipoDocumentoIdentidad" label="Tipo de Documento" dense outlined required hint="" :rules="[val => !!val || 'Campo requerido']" />
            <q-input v-model="cliente.numeroDocumento" label="Número de Documento" dense outlined required hint="" :rules="[val => !!val || 'Campo requerido']" />
            <q-input v-model="cliente.email" label="Email" dense outlined type="email" hint="" :rules="[val => !!val || 'Campo requerido']" />
            <q-input v-model="cliente.telefono" label="Teléfono" dense outlined hint="" :rules="[val => !!val || 'Campo requerido']" />
            <q-toggle v-model="cliente.clienteProveedor" label="Es proveedor?"  :rules="[val => !!val || 'Campo requerido']" />

            <div class="text-right">
              <q-btn color="negative" label="Cancelar" @click="clienteDialog = false" no-caps :loading="loading" />
              <q-btn color="primary" label="Guardar" type="submit" no-caps class="q-ml-sm" :loading="loading" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  name: "ClientesPage",
  data() {
    return {
      clientes: [],
      cliente: {},
      clienteDialog: false,
      loading: false,
      filter: '',
      currentPage: 1,
      totalPages: 1
    };
  },
  mounted() {
    this.clientesGet();
  },
  methods: {
    clienteNew() {
      this.cliente = { nombreRazonSocial: '', codigoTipoDocumentoIdentidad: '', numeroDocumento: '', email: '', telefono: '', clienteProveedor: false };
      this.clienteDialog = true;
    },
    clientesGet() {
      this.loading = true;
      this.$axios.get("clients", { params: { filter: this.filter, page: this.currentPage } })
        .then(res => {
          this.clientes = res.data.data;
          this.totalPages = res.data.last_page;
        })
        .finally(() => this.loading = false);
    },
    clientePost() {
      this.loading = true;
      this.$axios.post("clients", this.cliente)
        .then(() => { this.clienteDialog = false; this.clientesGet(); })
        .finally(() => this.loading = false);
    },
    clientePut() {
      this.loading = true;
      this.$axios.put(`clients/${this.cliente.id}`, this.cliente)
        .then(() => { this.clienteDialog = false; this.clientesGet(); })
        .finally(() => this.loading = false);
    },
    clienteDelete(id) {
      this.$axios.delete(`clients/${id}`)
        .then(() => this.clientesGet());
    }
  }
};
</script>
