// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'Mi Perfil',
    path: '/dashboard/profile',
    icon: getIcon('eva:options-2-fill'),
    admin: false
  },
  {
    title: 'Dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
    admin: false
  },
  {
    title: 'Empleados',
    path: '/dashboard/user',
    icon: getIcon('eva:people-fill'),
    admin: true
  },
  {
    title: 'Clientes',
    path: '/dashboard/client',
    icon: getIcon('material-symbols:database'),
    admin: false
  },
  {
    title: 'Campañas',
    path: '/dashboard/campaign',
    icon: getIcon('material-symbols:shopping-bag-outline'),
    admin: false
  },
  // {
  //   title: 'product',
  //   path: '/dashboard/products',
  //   icon: getIcon('eva:shopping-bag-fill'),
  // },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: getIcon('eva:file-text-fill'),
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: getIcon('eva:lock-fill'),
  // },
  // {
  //   title: 'register',
  //   path: '/register',
  //   icon: getIcon('eva:person-add-fill'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon('eva:alert-triangle-fill'),
  // },
];

export default navConfig;
