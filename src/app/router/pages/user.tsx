import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { CreateAccount } from '../../pages/User';

const UserWrapper = (): JSX.Element => {
  return (
    <Switch>
      <Route path={'/users/register'} exact render={() => <CreateAccount />} />
    </Switch>
  );
};

export default UserWrapper;