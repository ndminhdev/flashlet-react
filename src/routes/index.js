import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { ForgottenPage, LandingPage, ResetPage } from '@/pages';

const AppRoutes = () => (
  <Switch>
    <PrivateRoute path="/landing">
      <LandingPage />
    </PrivateRoute>
    <Route path="/forgotten">
      <ForgottenPage />
    </Route>
    <Route path="/reset">
      <ResetPage />
    </Route>
  </Switch>
);

export default AppRoutes;
