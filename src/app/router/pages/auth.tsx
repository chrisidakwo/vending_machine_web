import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../../pages/HomePage';

const AuthWrapper = (): JSX.Element => {
  return (
    <Switch>
      <Route path={'/login'} exact render={() => <HomePage />} />
    </Switch>
  );
};

export default AuthWrapper;