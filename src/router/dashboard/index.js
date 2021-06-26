import securityRoutes from './security'
import maintenanceRoutes from './maintenance'

const dashboardRoutes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/dashboard/Home.vue'),
    meta: {
      auth: true,
      pageTitle: 'Inicio',
      breadcrumb: [
        {
          text: 'Inicio',
          active: true,
        },
      ],
    },
  },
  ...securityRoutes,
  ...maintenanceRoutes,
]

export default dashboardRoutes
