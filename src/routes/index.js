import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {
  SignInPage,
  SignUpPage,
  ForgottenPage,
  ResetPage,
  LandingPage,
  SearchPage
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
  }
];

const AuthRoutes = () => (
  <Switch>
    {routes.map(({ name, ...rest }) => (
      <Route key={name} {...rest} />
    ))}
    <Redirect to="/landing" />
  </Switch>
);

export default AuthRoutes;
