import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login } from '../../pages/Auth';

const AuthWrapper = (): JSX.Element => {
  return (
    <Switch>
      <Route path={'/login'} exact render={() => <Login />} />
    </Switch>
  );
};

export default AuthWrapper;