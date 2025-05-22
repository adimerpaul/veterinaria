<template>
  <div>
    <div class="text-right">
      <q-btn @click="dialogVacunaClick" label="Crear Vacuna" color="green" icon="add_circle_outline" no-caps   />
    </div>
    <template v-if="mascota.vacunas.length > 0">
      <q-markup-table wrap-cells dense flat bordered>
        <thead>
        <tr class="bg-black text-white">
          <td>Opcion</td>
          <td>#</td>
          <th>Fecha</th>
          <th>Proxima vacuna</th>
          <th>Vacuna</th>
          <th>Observacion</th>
          <th>Usuario</th>
<!--          <th>Detalle</th>-->
        </tr>
        </thead>
        <tbody>
        <tr v-for="(vacuna,i) in mascota.vacunas" :key="vacuna.id">
          <td>
            <q-btn @click="eliminarVacuna(vacuna)" color="red" icon="delete" no-caps dense size="10px" label="Elimnar" />
          </td>
          <td>{{ i + 1 }}</td>
          <td>{{ vacuna.fechaVacuna }}</td>
          <td>{{ vacuna.fechaProximaVacuna }}</td>
          <td>{{ vacuna.nombreVacuna }}</td>
          <td>{{ vacuna.observaciones }}</td>
          <td>{{ vacuna.user?.username }}</td>
        </tr>
        </tbody>
      </q-markup-table>
    </template>
    <template v-else>
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 text-center">No hay vacunas registradas</div>
        </q-card-section>
      </q-card>
    </template>
<!--    <s>{{ mascota.vacunas }}</pre>-->
<!--    [-->
<!--    {-->
<!--    "id": 8,-->
<!--    "fechaVacuna": "2025-04-30",-->
<!--    "fechaProximaVacuna": "2025-05-14",-->
<!--    "nombreVacuna": "aaa",-->
<!--    "dosis": null,-->
<!--    "observaciones": "",-->
<!--    "createdAt": "2025-04-30T10:16:48.947Z",-->
<!--    "updatedAt": "2025-04-30T10:16:48.947Z",-->
<!--    "deletedAt": null,-->
<!--    "user": {-->
<!--    "id": 1,-->
<!--    "name": "ING. ADIMER PAUL CHAMBI AJATA",-->
<!--    "role": "Admin",-->
<!--    "username": "Adimer",-->
<!--    "password": "$2b$10$hLxScAvuENNvqjNTwS1p6u/TUd0Ej9Oae9iCAzZSHBqMlCI.fLO0a",-->
<!--    "agencia": "Clinica",-->
<!--    "createdAt": "2025-03-12T09:47:07.189Z",-->
<!--    "updatedAt": "2025-04-29T08:36:19.000Z",-->
<!--    "deletedAt": null-->
<!--    }-->
<!--    }-->
<!--    ]-->
    <q-dialog v-model="dialogVacuna">
      <q-card style="max-width: 760px">
        <q-card-section>
          <q-form @submit.prevent="vacunaCreate">
            <div class="text-h6 text-center">Registrar Vacuna</div>
            <div class="q-pa-xs">
              <q-input v-model="vacuna.fechaProximaVacuna" label="Fecha Proxima Vacuna" type="date" outlined dense clearable :rules="[val => !!val || 'Campo requerido']"/>
              <div>
                <label class="text-bold">Dias para la proxima vacuna</label>
                <div class="text-h6">
                  {{ moment(vacuna.fechaProximaVacuna).diff(moment(), 'days') }} dias
                </div>
              </div>
              <q-input v-model="vacuna.nombreVacuna" label="Nombre Vacuna" outlined dense clearable :rules="[val => !!val || 'Campo requerido']"/>
              <q-input v-model="vacuna.observaciones" label="Observaciones" outlined dense clearable/>
            </div>
            <div class="text-right">
              <q-btn @click="dialogVacuna = false" label="Cancelar" color="red" icon="cancel" no-caps :loading="loading"  />
              <q-btn type="submit" color="green" icon="save" no-caps  :loading="loading" label="Guardar" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import moment from "moment/moment.js";

export default {
  name: 'MascotaVacunas',
  props: {
    mascota: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      moment : moment,
      loading: false,
      dialogVacuna: false,
      vacuna: {
        fechaProximaVacuna: moment().format('YYYY-MM-DD'),
        nombreVacuna: '',
        observaciones: '',
        mascotaId: this.mascota.id,
      },
    }
  },
  methods: {
    eliminarVacuna(vacuna) {
      this.$alert.confirm('¿Está seguro de eliminar la vacuna?', 'Eliminar Vacuna').onOk(() => {
        this.loading = true;
        this.$axios.delete(`/vacunas/${vacuna.id}`)
          .then(response => {
            this.$emit('getMascota');
            this.$alert.success('Vacuna eliminada correctamente', 'Eliminar Vacuna')
          }).catch(error => {
            this.$alert.error('Error al eliminar la vacuna', 'Eliminar Vacuna')
            console.error(error);
          }).finally(() => {
            this.loading = false;
          });
      });
    },
    vacunaCreate() {
      this.loading = true;
      this.$axios.post('/vacunas', this.vacuna)
        .then(response => {
          this.$emit('getMascota');
          this.dialogVacuna = false;
          this.$alert.success('Vacuna registrada correctamente','Registro de Vacuna')
        }).catch(error => {
          this.$alert.error('Error al registrar la vacuna','Registro de Vacuna')
          console.error(error);
        }).finally(() => {
          this.loading = false;
        });
    },
    dialogVacunaClick() {
      this.dialogVacuna = true;
      this.vacuna = {
        fechaProximaVacuna: moment().add(2, 'weeks').format('YYYY-MM-DD'),
        nombreVacuna: '',
        observaciones: '',
        mascotaId: this.mascota.id,
      }
    },
  },
}
</script>
