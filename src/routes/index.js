import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { SignInPage, ForgottenPage, LandingPage, ResetPage } from '@/pages';

const AppRoutes = () => (
  <Switch>
    <Route path="/signin">
      <SignInPage />
    </Route>
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
