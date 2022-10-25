import { createBrowserHistory } from 'history';
import React from 'react';
import { UIDReset } from 'react-uid';
import { renderRoutes } from 'react-router-config';
import routeConfig from './app/router/routeConfig';
import { Router } from 'react-router-dom';
import './index.css';
import { ThemeProvider } from './app/theme';

const history = createBrowserHistory();

const App = (): JSX.Element => {
  return (
    <ThemeProvider>
      <UIDReset>
        <Router history={history}>
          {renderRoutes(routeConfig())}
        </Router>
      </UIDReset>
    </ThemeProvider>
  );
};

export default App;
