import { lazy } from 'react';

import { PATH, PAGELAYOUT } from './constant';
// import StationPages from 'src/pages/admin/station';

const IndexPages = lazy(() => import('src/pages/dashboard'));
const LoginPages = lazy(() => import('src/pages/login'));
const RegisterPages = lazy(() => import('src/pages/register'));
const DashboardAdminPages = lazy(() => import('src/pages/admin/dashboard'));
const UserPages = lazy(() => import('src/pages/admin/users'));
const BicyclePages = lazy(() => import('src/pages/admin/bicycle'));
const StationPages = lazy(() => import('src/pages/admin/station'));
const ComplainPages =lazy(() => import('src/pages/admin/complain'));


const Page404 = lazy(() => import('src/pages/not-found'));

export const routerData = [
  {
    parent: PAGELAYOUT.DASHBOARD,
    pathName: PATH.DASHBOARD,
    component: IndexPages,
    helmetTitle: 'helmet.default',
    dashboard: true,
  },
  {
    parent: null,
    pathName: PATH.LOGIN,
    component: LoginPages,
    helmetTitle: 'helmet.login_pages',
  },
  {
    parent: null,
    pathName: PATH.REGISTER,
    component: RegisterPages,
    helmetTitle: 'helmet.register_pages',
  },

  {
    parent: PAGELAYOUT.ADMIN,
    pathName: PATH.ADMIN,
    component: DashboardAdminPages,
    helmetTitle: 'helmet.administration_pages',
    dashboard: true,
    title: 'dashboard',
    icon: 'ic_analytics',
  },
  {
    parent: PAGELAYOUT.ADMIN,
    pathName: PATH.ADMIN + PATH.USERS,
    component: UserPages,
    helmetTitle: 'helmet.user_pages',
    title: 'user',
    icon: 'ic_user',
  },
  
  {
    parent: PAGELAYOUT.ADMIN,
    pathName: PATH.ADMIN + PATH.BICYCLE,
    component: BicyclePages,
    helmetTitle: 'helmet.bicycle_pages',
    title: 'bicycle',
    icon: 'ic_bicycle',
  },
  {
    parent: PAGELAYOUT.ADMIN,
    pathName: PATH.ADMIN + PATH.STATION,
    component: StationPages,
    helmetTitle: 'helmet.station_pages',
    title: 'station',
    icon: 'ic_station',
  },
  {
    parent: PAGELAYOUT.ADMIN,
    pathName: PATH.ADMIN + PATH.COMPLAIN,
    component: ComplainPages,
    helmetTitle: 'helmet.complain_pages',
    title: 'complain',
    icon: 'ic_complain',
  },
  {
    parent: null,
    pathName: PATH.NOTFOUND,
    component: Page404,
    helmetTitle: 'helmet.not_found_pages',
  },
];
