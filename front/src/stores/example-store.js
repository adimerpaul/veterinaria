import { defineStore, acceptHMRUpdate } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    counter: 0,
    isLogged: !!localStorage.getItem('tokenClinica'),
    user: {},
    permissions: [],
    env: {
      razon: 'Clinica Veterinaria',
      direccion: 'Heroes del Chaco y Campo Jordán Oruro, Bolivia',
      telefono: '75705687',
    }
// <div class='titulo2'>${env.razon} <br>
//   Casa Matriz<br>
//   No. Punto de Venta 0<br>
//   ${env.direccion}<br>
//   Tel. ${env.telefono}<br>
  }),

  getters: {
    doubleCount: (state) => state.counter * 2
  },

  actions: {
    increment() {
      this.counter++
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCounterStore, import.meta.hot))
}
