const maintenanceRoutes = [
  {
    path: '/usuario-negocio',
    name: 'businessUsers',
    component: () => import('@/views/dashboard/maintenance/businessUsers/BusinessUser.vue'),
    meta: {
      auth: true,
      pageTitle: 'Usuario-negocio',
      breadcrumb: [
        {
          text: 'Mantenimiento',
          active: true,
        },
        {
          text: 'Usuario-negocio',
          active: true,
        },
      ],
    },
  },
]
export default maintenanceRoutes
