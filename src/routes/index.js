import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import {
  SignInPage,
  SignUpPage,
  ForgottenPage,
  LandingPage,
  ResetPage
} from '@/pages';

const AppRoutes = () => (
  <Switch>
    <Route path="/signin">
      <SignInPage />
    </Route>
    <Route path="/signup">
      <SignUpPage />
    </Route>
    <Route path="/landing">
      <LandingPage />
    </Route>
    <Route path="/forgotten">
      <ForgottenPage />
    </Route>
    <Route path="/reset">
      <ResetPage />
    </Route>
  </Switch>
);

export default AppRoutes;
