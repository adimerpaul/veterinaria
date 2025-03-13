<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-black" bordered >
      <q-toolbar>
<!--        keyboard_double_arrow_left-->
        <q-btn
          dense
          rounded
          color="primary"
          :icon="leftDrawerOpen ? 'keyboard_double_arrow_left' : 'keyboard_double_arrow_right'"
          aria-label="Menu"
          size="10px"
          @click="toggleLeftDrawer"
          unelevated
        />

        <q-toolbar-title>
          <span class="text-caption text-bold">
            {{$version}}
          </span>
<!--          Quasar App-->
        </q-toolbar-title>

        <div>
<!--          Quasar v{{ $q.version }}-->
          <q-btn-dropdown flat unelevated  no-caps dropdownIcon="expand_more">
            <template v-slot:label>
              <q-avatar rounded>
<!--                <q-img :src="$url+ '../images/' + $store.user.avatar" v-if="$store.user.avatar" />-->
                <q-icon name="account_circle" />
              </q-avatar>
              <div class="text-center" style="line-height: 1">
                <div style="width: 100px; white-space: normal; overflow-wrap: break-word;">
                  {{ $store.user.name }}
                </div>
<!--                <pre>{{$store.user}}</pre>-->
              </div>
            </template>
            <q-item clickable v-ripple @click="logout" v-close-popup>
              <q-item-section avatar>
                <q-icon name="logout" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Salir</q-item-label>
              </q-item-section>
            </q-item>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      show-if-above
      :width="200"
      :breakpoint="500"
      class="bg-primary text-white"
    >
      <q-list>
        <q-item-label
          header
          class="text-center"
        >
          <q-img src="/logo.png" width="100px" />
        </q-item-label>

<!--        <EssentialLink-->
<!--          v-for="link in linksList"-->
<!--          :key="link.title"-->
<!--          v-bind="link"-->
<!--        />-->
        <template v-for="link in linksList" :key="link.title">
<!--          v-if="link.can === 'Todos' || $store.permissions.some(permission => permission.name === link.can)"-->
          <q-item  clickable :to="link.link" exact
                   class="text-black"
                   active-class="menu"
                   dense
                   v-close-popup
          >
            <q-item-section avatar>
              <q-icon :name="$route.path === link.link ? 'o_' + link.icon : link.icon"
                      :class="$route.path === link.link ? 'text-black' : ''"/>
            </q-item-section>
            <q-item-section>
              <q-item-label :class="$route.path === link.link ? 'text-black text-bold' : ''">
                {{ link.title }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </template>
        <q-item clickable class="text-black" @click="logout" v-close-popup>
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Salir</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container class="bg-grey-3">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import {getCurrentInstance, ref} from 'vue'
// import EssentialLink from 'components/EssentialLink.vue'
const {proxy} = getCurrentInstance()
const linksList = [
  { title: 'Principal', icon: 'home', link: '/', can: 'Todos' },
  { title: 'Usuarios', icon: 'people', link: '/usuarios', can: 'Usuarios' },
  { title: 'Productos', icon: 'inventory_2', link: '/productos', can: 'Productos' },
  { title: 'Mascotas', icon: 'pets', link: '/mascotas', can: 'Mascotas' },
  { title: 'Crear Mascota', icon: 'pets', link: '/mascotas/create', can: 'Mascotas' },
  { title: 'Ventas', icon: 'shopping_cart', link: '/ventas', can: 'Ventas' },
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
function logout() {
  proxy.$alert.dialog('¿Desea salir del sistema?')
    .onOk(() => {
      proxy.$store.isLogged = false
      proxy.$store.user = {}
      localStorage.removeItem('tokenProvidencia')
      proxy.$router.push('/login')
    })
  // proxy.$store.isLogged = false
  // proxy.$store.user = {}
  // localStorage.removeItem('tokenProvidencia')
  // proxy.$router.push('/login')
}
</script>
<style>
.menu{
  background-color: #fff;
  color: #000 !important;
  border-radius: 10px;
  margin: 5px;
  padding: 5px
}
</style>
