<template>
  <q-page class="q-pa-md">
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
              <q-btn color="positive" label="Nuevo" @click="mascotaNew" no-caps icon="add_circle_outline" :loading="loading" />
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
    <pre>{{mascotas}}</pre>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      filter: '',
      loading: false,
      mascotas: [],
    }
  },
  created() {
    this.mascotasGet()
  },
  methods: {
    mascotasGet () {
      this.$axios.get('/mascotas')
        .then(response => {
          this.mascotas = response.data.data
          console.log(this.mascotas)
        })
        .catch(error => {
          console.log(error)
        })
    },
    mascotaNew () {
      console.log('mascotaNew')
    },
  }
}
</script>
