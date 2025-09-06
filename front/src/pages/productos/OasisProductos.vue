<template>
  <q-page class="q-pa-md">
    <q-card flat bordered>
      <q-card-section>
        <q-form @submit="productosGet">
          <div class="row">
            <div class="col-8 col-md-3">
              <q-input v-model="filter" label="Buscar" outlined dense clearable >
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
              </q-input>
            </div>
            <div class="col-4 col-md-2">
<!--              <q-select v-model="filterTipo" label="Tipo" outlined dense :options="tipos" />-->
              <q-btn color="primary" label="Buscar" type="submit" no-caps icon="search" :loading="loading" />
            </div>
            <div class="col-4 col-md-2 flex flex-center">
<!--              boton expotar excel-->
              <q-btn color="secondary" label="Exportar Excel" @click="exportarExcel" no-caps icon="save_alt" :loading="loading" />
            </div>
            <div class="col-12 col-md-5 text-right">
              <q-btn color="positive" label="Nuevo" @click="productoNew" no-caps icon="add_circle_outline" :loading="loading" />
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
              @update:model-value="productosGet"
            />
          </div>
        </div>

        <q-markup-table dense wrap-cells flat bordered>
          <thead class="bg-black text-white">
          <tr>
            <td>Opciones</td>
            <td>Codigo</td>
            <td>Nombre</td>
<!--            <td>Imagen</td>-->
            <td>Precio Compra</td>
            <td>Precio Venta</td>
            <td>Stock</td>
            <td>Empresa</td>
            <td>Proveedor</td>
<!--            <td>Tipo</td>-->
          </tr>
          </thead>
          <tbody>
          <tr v-for="producto in productos" :key="producto.id">
            <td>
              <q-btn-dropdown dense size="10px" label="Opciones" no-caps dropdown-icon="more_vert" color="orange" :loading="loading">
                <q-list>
                  <q-item clickable v-ripple @click="productoEdit(producto)" v-close-popup>
                    <q-item-section avatar> <q-icon name="edit" /> </q-item-section>
                    <q-item-section>Editar</q-item-section>
                  </q-item>
                  <q-item clickable v-ripple @click="productoDelete(producto.id)" v-close-popup>
                    <q-item-section avatar> <q-icon name="delete" /> </q-item-section>
                    <q-item-section>Eliminar</q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </td>
            <td>{{ producto.codigo }}</td>
            <td>{{ producto.nombre }}</td>
<!--            <td>-->
<!--              <q-img-->
<!--                v-if="producto.imagen"-->
<!--                :src="`${$url}uploads/${producto.imagen}`"-->
<!--                style="width: 35px; height: 35px;"-->
<!--                class="q-mb-sm"-->
<!--              />-->
<!--            </td>-->
            <td>{{ producto.precioCompra }}</td>
            <td>{{ producto.precioVenta }}</td>
            <td>{{ producto.stock }}</td>
            <td>{{ producto.empresa }}</td>
            <td>{{ producto.proveedor }}</td>
<!--            <td>-->
<!--              <q-chip dense :color="getColor(producto.tipo)" size="10px">-->
<!--                {{ producto.tipo }}-->
<!--              </q-chip>-->
<!--            </td>-->
          </tr>
          </tbody>
        </q-markup-table>
      </q-card-section>
    </q-card>

    <q-dialog v-model="productoDialog" persistent position="right" maximized>
      <q-card style="min-width: 350px">
        <q-card-section class="q-pb-none row items-center">
          <div class="text-bold text-sub">
            {{ actionProducto }} Oasis Producto
          </div>
          <q-space />
          <q-btn icon="close" flat round dense @click="productoDialog = false" />
        </q-card-section>
        <q-card-section>
          <q-form @submit.prevent="producto.id ? productoPut() : productoPost()">
            <q-input v-model="producto.codigo" label="Codigo" outlined dense />
            <q-input v-model="producto.nombre" label="Nombre" outlined dense />
            <q-input v-model="producto.precioCompra" label="Precio Compra" outlined dense type="number" step="0.01" />
            <q-input v-model="producto.precioVenta" label="Precio Venta" outlined dense type="number" step="0.01" />
            <q-input v-model="producto.stock" label="Stock" outlined dense type="number" />
            <q-input v-model="producto.empresa" label="Empresa Proveedora" outlined dense />
            <q-input v-model="producto.proveedor" label="Proveedor" outlined dense />
<!--            <q-select v-model="producto.tipo" label="Tipo" outlined dense :options="tipos" />-->
            <div class="text-right">
              <q-btn color="negative" label="Cancelar" @click="productoDialog = false" no-caps :loading="loading" />
              <q-btn color="primary" label="Guardar" type="submit" no-caps class="q-ml-sm" :loading="loading" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <div id="myElement" style="display: none"></div>

  </q-page>
</template>

<script>
import {Excel} from "src/addons/Excel.js";

export default {
  name: 'OasisProductosPage',
  data() {
    return {
      tipos: ['Cirugía', 'Laboratorio', 'Peluqueria', 'Producto', 'Tratamiento'],
      productos: [],
      producto: {},
      productoDialog: false,
      loading: false,
      actionProducto: '',
      filter: '',
      filterTipo: 'Todos',
      totalPages: 1,
      currentPage: 1,
    };
  },
  mounted() {
    this.productosGet();
  },
  methods: {
    exportarExcel() {
      // Prepara los datos para el Excel
      const data = [
        {
          sheet: 'Productos',
          columns: [
            { label: 'Código', value: 'codigo' },
            { label: 'Nombre', value: 'nombre' },
            { label: 'Precio Compra', value: 'precioCompra' },
            { label: 'Precio Venta', value: 'precioVenta' },
            { label: 'Stock', value: 'stock' },
            { label: 'Empresa', value: 'empresa' },
            { label: 'Proveedor', value: 'proveedor' },
            // Agrega más columnas si lo necesitas
          ],
          content: this.productos
        }
      ];
      Excel.export(data, 'Productos');
    },
    getColor(tipo) {
      switch (tipo) {
        case 'Cirugía': return 'red';
        case 'Laboratorio': return 'blue';
        case 'Peluqueria': return 'green';
        case 'Producto': return 'orange';
        case 'Tratamiento': return 'purple';
        default: return 'grey';
      }
    },
    productoNew() {
      this.producto = { codigo: '', nombre: '', precioCompra: 0, precioVenta: 0, stock: 0, tipo: 'Producto' };
      this.actionProducto = 'Nuevo';
      this.productoDialog = true;
    },
    productosGet() {
      this.loading = true;
      this.$axios.get('oasis-productos', {
        params: {
          filter: this.filter,
          page: this.currentPage,
          limit: 20,
          tipo: this.filterTipo === 'Todos' ? '' : this.filterTipo
        }
      })
        .then(res => {
          this.productos = res.data;
          // this.totalPages = res.data.last_page;
        })
        .catch(err => {
          this.$alert.error(err.response?.data?.message || 'Error al cargar');
        })
        .finally(() => {
          this.loading = false;
        });
    },
    productoPost() {
      this.loading = true;
      this.$axios.post('oasis-productos', this.producto)
        .then(() => {
          this.productoDialog = false;
          this.productosGet();
          this.$alert.success('Creado correctamente');
        })
        .catch(err => {
          this.$alert.error(err.response?.data?.message || 'Error al crear');
        })
        .finally(() => {
          this.loading = false;
        });
    },
    productoPut() {
      this.loading = true;
      this.$axios.put(`oasis-productos/${this.producto.id}`, this.producto)
        .then(() => {
          this.productoDialog = false;
          this.productosGet();
          this.$alert.success('Actualizado correctamente');
        })
        .catch(err => {
          this.$alert.error(err.response?.data?.message || 'Error al actualizar');
        })
        .finally(() => {
          this.loading = false;
        });
    },
    productoEdit(producto) {
      this.producto = { ...producto };
      this.actionProducto = 'Editar';
      this.productoDialog = true;
    },
    productoDelete(id) {
      this.$alert.dialog('¿Eliminar producto?').onOk(() => {
        this.loading = true;
        this.$axios.delete(`oasis-productos/${id}`)
          .then(() => {
            this.productosGet();
            this.$alert.success('Eliminado correctamente');
          })
          .catch(err => {
            this.$alert.error(err.response?.data?.message || 'Error al eliminar');
          })
          .finally(() => {
            this.loading = false;
          });
      });
    }
  }
}
</script>
