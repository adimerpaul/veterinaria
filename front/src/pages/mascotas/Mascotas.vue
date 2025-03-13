<template>
  <q-page class="q-pa-xs">
    <q-card flat bordered>
      <q-card-section>
        <q-form @submit="mascotasGet">
          <div class="row">
            <div class="col-8 col-md-3">
              <q-input v-model="filter" label="Buscar" outlined dense clearable >
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
              </q-input>
            </div>
            <div class="col-4 col-md-2 flex flex-center">
              <q-btn color="primary" label="Buscar" type="submit" no-caps icon="search" :loading="loading" />
            </div>
            <div class="col-12 col-md-7 text-right">
              <q-btn color="positive" label="Nuevo" no-caps icon="add_circle_outline" :loading="loading" to="/mascotas/create" />
            </div>
            <div class="col-12 flex flex-center">
              <q-pagination
                v-if="totalPages > 1"
                v-model="currentPage"
                :max="totalPages"
                :max-pages="5"
                boundary-numbers
                color="black"
                @update:model-value="mascotasGet"
              />
            </div>
            <div class="col-12">
              <q-markup-table dense wrap-cells flat bordered>
                <thead>
                  <tr class="bg-black text-white">
                    <th>Acciones</th>
                    <th>Nombre</th>
                    <th>Especie</th>
                    <th>Raza</th>
                    <th>Sexo</th>
                    <th>Fecha Nac.</th>
                    <th>Señas Particulares</th>
                    <th>Color</th>
                    <th>Propietario</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="mascota in mascotas" :key="mascota.id">
                    <td>
<!--                      <q-btn class="q-mr-xs" color="primary" dense size="10px" icon="edit" @click="mascotaEdit(mascota)" />-->
<!--                      <q-btn color="negative" dense size="10px" icon="delete" @click="mascotaDelete(mascota)" />-->
                      <q-btn-dropdown size="10px" color="primary" label="Acciones" no-caps dense>
                        <q-list>
                          <q-item clickable v-ripple @click="mascotaEdit(mascota)" v-close-popup>
                            <q-item-section>Editar</q-item-section>
                          </q-item>
                          <q-item clickable v-ripple @click="mascotaDelete(mascota)" v-close-popup>
                            <q-item-section>Eliminar</q-item-section>
                          </q-item>
                        </q-list>
                      </q-btn-dropdown>
                    </td>
                    <td>{{ mascota.nombre }}</td>
                    <td>{{ mascota.especie }}</td>
                    <td>{{ mascota.raza }}</td>
                    <td>{{ mascota.sexo }}</td>
                    <td>{{ mascota.fecha_nac }}</td>
                    <td>{{ mascota.senas_particulares }}</td>
                    <td>{{ mascota.color }}</td>
                    <td>{{ mascota.propietario_nombre }}</td>
                  </tr>
                </tbody>
              </q-markup-table>
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
<!--    <pre>{{mascotas}}</pre>-->
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      filter: '',
      loading: false,
      mascotas: [],
      totalPages: 1,
      currentPage: 1,
    }
  },
  created() {
    this.mascotasGet()
  },
  methods: {
    mascotaDelete(mascota) {
      // console.log('mascotaDelete', mascota)
      this.$alert.confirm('¿Estás seguro de eliminar la mascota?')
        .onOk(() => {
          this.$axios.delete(`/mascotas/${mascota.id}`)
            .then(response => {
              this.mascotasGet()
            })
            .catch(error => {
              console.log(error)
            })
        })
    },
    mascotaEdit(mascota) {
      // console.log('mascotaEdit', mascota)
      this.$router.push({ name: 'mascotas-edit', params: { id: mascota.id } })
    },
    mascotasGet () {
      this.$axios.get('/mascotas',{
        params: {
          filter: this.filter,
          page: this.currentPage,
          limit: 20, // Puedes cambiar el límite por página
        }
      })
        .then(response => {
          this.mascotas = response.data.data
          this.totalPages = response.data.last_page;
        })
        .catch(error => {
          console.log(error)
        })
    },
  }
}
</script>
