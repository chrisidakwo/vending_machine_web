import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthContext } from '../../auth';
import HomePage from '../../pages/HomePage';

const HomeWrapper = (): JSX.Element => {
  const { user } = useContext(AuthContext);

  return (
    <Switch>
      <Route path={'/'} exact render={() => <HomePage />} />
    </Switch>
  );
};

export default HomeWrapper;