import React from 'react';
import { Route, RouteProps, Switch } from 'react-router-dom';
import HomePage from '../../pages/HomePage';

const HomeWrapper = (props: RouteProps): JSX.Element => {
  return (
    <Switch>
      <Route path={'/'} exact render={() => <HomePage props={props} />} />
    </Switch>
  );
};

export default HomeWrapper;