export default [
  {
    title: 'Inicio!',
    route: 'home',
    icon: 'HomeIcon',
  },
  {
    title: 'Seguridad',
    icon: 'LockIcon',
    children: [
      {
        title: 'Usuarios',
        route: 'users',
      },
      {
        title: 'Roles',
        route: 'roles',
      },
      {
        title: 'Colaboradores',
        route: 'collaborators',
      },
      {
        title: 'Menús',
        route: 'menus',
      },
      {
        title: 'Opciones',
        route: 'options',
      },
      {
        title: 'Opciones Menú',
        route: 'menuOptions',
      },
      {
        title: 'Modulos',
        route: 'modules',
      },
    ],
  },
]
