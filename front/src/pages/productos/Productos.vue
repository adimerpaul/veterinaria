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
              <q-select v-model="filterTipo" label="Tipo" outlined dense :options="tipos" />
            </div>
            <div class="col-4 col-md-2 flex flex-center">
              <q-btn color="primary" label="Buscar" type="submit" no-caps icon="search" :loading="loading" />
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
            <td>Imagen</td>
            <td>Precio Compra</td>
            <td>Precio Venta</td>
            <td>Stock</td>
            <td>Tipo</td>
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
<!--                  opcion cambiar imagen-->
                  <q-item clickable v-ripple @click="verImagen(producto.imagen)" v-close-popup>
                    <q-item-section avatar> <q-icon name="image" /> </q-item-section>
                    <q-item-section>Ver Imagen</q-item-section>
                  </q-item>
                  <q-item clickable v-ripple @click="cambiarImagen(producto.id)" v-close-popup>
                    <q-item-section avatar> <q-icon name="photo_camera" /> </q-item-section>
                    <q-item-section>Cambiar Imagen</q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </td>
            <td>{{ producto.codigo }}</td>
            <td>{{ producto.nombre }}</td>
            <td>
<!--              {{`${$url}uploads/${producto.imagen}`}}-->
              <q-img
                @click="verImagen(producto.imagen)"
                v-if="producto.imagen"
                :src="`${$url}uploads/${producto.imagen}`"
                style="width: 35px; height: 35px;"
                class="q-mb-sm"
              />
            </td>
            <td>{{ producto.precioCompra }}</td>
            <td>{{ producto.precioVenta }}</td>
            <td>{{ producto.stock }}</td>
            <td>
              <q-chip dense :color="getColor(producto.tipo)" size="10px">
                {{ producto.tipo }}
              </q-chip>
            </td>
          </tr>
          </tbody>
        </q-markup-table>
<!--        <pre>{{ productos }}</pre>-->
<!--        [-->
<!--        {-->
<!--        "id": 19,-->
<!--        "codigo": "mace",-->
<!--        "nombre": "Acedan",-->
<!--        "presentacion": "caja",-->
<!--        "contenido": "10ml",-->
<!--        "tipo": "Producto",-->
<!--        "precioCompra": "15.00",-->
<!--        "precioVenta": "45.00",-->
<!--        "stock": 1,-->
<!--        "activo": true,-->
<!--        "imagen": "imagenes\\19.png",-->
<!--        "createdAt": "2025-02-28T10:21:37.836Z",-->
<!--        "updatedAt": "2025-05-21T10:10:15.447Z",-->
<!--        "deletedAt": null-->
<!--        },-->
      </q-card-section>
    </q-card>
    <q-dialog v-model="productoDialog" persistent position="right" maximized>
      <q-card style="min-width: 350px">
        <q-card-section class="q-pb-none row items-center">
          <div class="text-bold text-sub">
            {{ actionProducto }} Producto
          </div>
          <q-space />
          <q-btn icon="close" flat round dense @click="productoDialog = false" />
        </q-card-section>
        <q-card-section>
          <q-form @submit.prevent="producto.id ? productoPut() : productoPost()">
            <q-input v-model="producto.codigo" label="Codigo" outlined dense hint="" />
            <q-input v-model="producto.nombre" label="Nombre" outlined dense hint="" />
            <q-input v-model="producto.precioCompra" label="Precio Compra" outlined dense type="number" step="0.01" hint="" />
            <q-input v-model="producto.precioVenta" label="Precio Venta" outlined dense type="number" step="0.01" hint="" />
            <q-input v-model="producto.stock" label="Stock" outlined dense type="number" hint="" />
            <q-select v-model="producto.tipo" label="Tipo" outlined dense :options="tipos" hint="" />
            <div class="text-right">
              <q-btn color="negative" label="Cancelar" @click="productoDialog = false" no-caps :loading="loading" />
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
  name: "ProductosPage",
  data() {
    return {
      tipos: [
        'Cirugía',
        'Laboratorio',
        'Peluqueria',
        'Producto',
        'Tratamiento'
      ],
      productos: [],
      productosAll: [],
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
    cambiarImagen(id) {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = () => {
        const file = input.files[0]; // <-- Solo un archivo
        if (!file) return;

        const formData = new FormData();
        formData.append('photo', file); // <- importante que el campo se llame "photo"

        this.loading = true;
        this.$axios.post(`productos/${id}/imagen`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then(() => {
            this.$alert.success('Imagen actualizada');
            this.productosGet();
          })
          .catch(err => {
            this.$alert.error(err.response?.data?.message || 'Error al subir imagen');
          })
          .finally(() => {
            this.loading = false;
          });
      };
      input.click();
    },
    verImagen(imagen) {
      this.$q.dialog({
        title: 'Imagen',
        message: `<img src="${this.$url}uploads/${imagen}" style="width: 100%; height: auto;" />`,
        html: true,
        persistent: true,
        ok: { label: 'Cerrar', color: 'primary' }
      });
    },
    getColor(tipo) {
      switch (tipo) {
        case 'Cirugía':
          return 'red';
        case 'Laboratorio':
          return 'blue';
        case 'Peluqueria':
          return 'green';
        case 'Producto':
          return 'orange';
        case 'Tratamiento':
          return 'purple';
        default:
          return 'grey';
      }
    },
    productosFilter() {
      if (this.filter) {
        this.productos = this.productosAll.filter(producto => {
          return producto.nombre.toLowerCase().includes(this.filter.toLowerCase());
        });
      } else {
        this.productos = this.productosAll;
      }
    },
    productoNew() {
      this.producto = {
        medicamento: '',
        forma_farmaceutica: '',
        concentracion: '',
        precio: 0,
        stock: 0,
        tipo: 'Producto',
        imagen: null, // Valor por defecto
        categoria_id: null // Valor por defecto
      };
      this.actionProducto = "Nuevo";
      this.productoDialog = true;
    },
    productosGet() {
      this.loading = true;
      this.$axios
        .get("productos", {
          params: {
            filter: this.filter,
            page: this.currentPage,
            limit: 20, // Puedes cambiar el límite por página
            tipo: this.filterTipo === 'Todos' ? '' : this.filterTipo
          }
        })
        .then(res => {
          this.productos = res.data.data;
          this.totalPages = res.data.last_page;
        })
        .catch(error => {
          this.$alert.error(error.response?.data?.message || "Error al cargar productos");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    productoPost() {
      this.loading = true;
      this.$axios
        .post("productos", this.producto)
        .then(() => {
          this.productoDialog = false;
          this.productosGet();
          this.$alert.success("Producto creado correctamente");
        })
        .catch(error => {
          this.$alert.error(error.response?.data?.message || "Error al crear producto");
        })
        .finally(() => {
          // this.loading = false;
        });
    },
    productoPut() {
      this.loading = true;
      this.$axios
        .put(`productos/${this.producto.id}`, this.producto)
        .then(() => {
          this.productoDialog = false;
          this.productosGet();
          this.$alert.success("Producto actualizado correctamente");
        })
        .catch(error => {
          this.$alert.error(error.response?.data?.message || "Error al actualizar producto");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    productoEdit(producto) {
      this.producto = { ...producto };
      this.actionProducto = "Editar";
      this.productoDialog = true;
    },
    productoDelete(id) {
      this.$alert
        .dialog("¿Desea eliminar el producto?")
        .onOk(() => {
          this.loading = true;
          this.$axios
            .delete(`productos/${id}`)
            .then(() => {
              this.productosGet();
              this.$alert.success("Producto eliminado correctamente");
            })
            .catch(error => {
              this.$alert.error(error.response?.data?.message || "Error al eliminar producto");
            })
            .finally(() => {
              this.loading = false;
            });
        });
    }
  }
};
</script>
