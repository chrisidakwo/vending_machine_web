import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../../pages/HomePage';

const HomeWrapper = (): JSX.Element => {
  return (
    <Switch>
      <Route path={'/'} exact render={() => <HomePage />} />
    </Switch>
  );
};

export default HomeWrapper;