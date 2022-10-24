import { RouteConfig } from 'react-router-config';
import AppRoot from '../components/AppRoot';
import AuthWrapper from './pages/auth';
import HomeWrapper from './pages/home';

const routeConfig = (): RouteConfig[] => [
  {
    component: AppRoot,
    routes: [
      {
        path: '/',
        component: HomeWrapper,
        exact: true,
      },
      {
        path: '/login',
        component: AuthWrapper,
        exact: true,
      }
    ],
  }
];

export default routeConfig;