import { createBrowserHistory } from 'history';
import React from 'react';
import { renderRoutes } from 'react-router-config';
import routeConfig from './app/router/routeConfig';
import { Router } from 'react-router-dom';
import { Auth, AuthActions, AuthProvider } from './app/auth';
import { ThemeProvider } from './app/theme';

import './index.css';
import { createStateContext } from 'react-use';

const history = createBrowserHistory();

export const [useAuthState, AuthStateProvider] = createStateContext<Auth & AuthActions>({
  accessToken: null,
  user: null,
});

const App = (): JSX.Element => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router history={history}>
          {renderRoutes(routeConfig())}
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
