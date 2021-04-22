import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import {
  SignInPage,
  SignUpPage,
  ForgottenPage,
  ResetPage,
  LandingPage,
  SearchPage,
  SetFormPage
} from '@/pages';

const routes = [
  {
    name: 'signin',
    path: '/signin',
    component: SignInPage
  },
  {
    name: 'signup',
    path: '/signup',
    component: SignUpPage
  },
  {
    name: 'forgotten',
    path: '/forgotten',
    component: ForgottenPage
  },
  {
    name: 'reset',
    path: '/reset',
    component: ResetPage
  },
  {
    name: 'landing',
    path: '/landing',
    component: LandingPage
  },
  {
    name: 'search',
    path: '/subject/:keyword',
    component: SearchPage
  },
  {
    name: 'createSet',
    path: '/create-set',
    component: SetFormPage,
    isPrivate: true
  }
];

const AuthRoutes = () => (
  <Switch>
    {routes.map(({ name, component: Component, isPrivate, ...rest }) =>
      isPrivate ? (
        <PrivateRoute key={name} {...rest}>
          <Component />
        </PrivateRoute>
      ) : (
        <Route key={name} {...rest}>
          <Component />
        </Route>
      )
    )}
  </Switch>
);

export default AuthRoutes;
