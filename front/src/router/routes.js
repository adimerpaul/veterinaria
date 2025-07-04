const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue'), meta: { requiresAuth: true } },
      { path: 'usuarios', component: () => import('pages/usuarios/Usuarios.vue'), meta: { requiresAuth: true } },
      { path: 'productos', component: () => import('pages/productos/Productos.vue'), meta: { requiresAuth: true } },
      { path: 'oasisproductos', component: () => import('pages/productos/OasisProductos.vue'), meta: { requiresAuth: true } },
      { name: 'mascotas' , path: 'mascotas', component: () => import('pages/mascotas/Mascotas.vue'), meta: { requiresAuth: true } },
      { path: 'mascotas/create', component: () => import('pages/mascotas/MascotaCreate.vue'), meta: { requiresAuth: true } },
      { name: 'mascotas-edit', path: 'mascotas/:id', component: () => import('pages/mascotas/MascotaEdit.vue'), meta: { requiresAuth: true } },
      { path: 'ventas', component: () => import('pages/sales/Sales.vue'), meta: { requiresAuth: true } },
      { path: 'ventas/add', component: () => import('pages/sales/VentaAdd.vue'), meta: { requiresAuth: true } },
      { path: 'oasissales', component: () => import('pages/sales/OasisSalesPage.vue'), meta: { requiresAuth: true } },
      { path: 'oasisventas/add', component: () => import('pages/sales/OasisVentaAdd.vue'), meta: { requiresAuth: true } },
      { path: 'proximas-vacunas', component: () => import('pages/proximaVacunas/ProximaVacunas.vue'), meta: { requiresAuth: true } },
    ]
  },
  {
    path: '/login',
    component: () => import('pages/LoginPage.vue')
  },
  {
    path: '/imprimir/:id',
    component: () => import('pages/imprimir/Imprimir.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
