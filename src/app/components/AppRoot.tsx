import React from 'react';
import { renderRoutes, RouteConfig } from 'react-router-config';

export interface AppRootProps {
  route?: RouteConfig;
}

const AppRoot = ({ route }: AppRootProps): JSX.Element => {
  return (
    <React.Fragment>
      {route && renderRoutes(route.routes)}
    </React.Fragment>
  );
};

export default AppRoot;