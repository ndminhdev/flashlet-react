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
  DashboardPage,
  SetFormPage,
  AddCardsPage
} from '@/pages';
import { useAuth } from '@/hooks';

const routes = [
  {
    name: 'signin',
    path: '/signin',
    page: SignInPage
  },
  {
    name: 'signup',
    path: '/signup',
    page: SignUpPage
  },
  {
    name: 'forgotten',
    path: '/forgotten',
    page: ForgottenPage
  },
  {
    name: 'reset',
    path: '/reset',
    page: ResetPage
  },
  {
    name: 'home',
    path: '/',
    exact: true,
    page: LandingPage,
    authRedirect: '/dashboard'
  },
  {
    name: 'search',
    path: '/subject/:keyword',
    page: SearchPage
  },
  {
    name: 'dashboard',
    path: '/dashboard',
    page: DashboardPage,
    isPrivate: true
  },
  {
    name: 'createSet',
    path: '/create-set',
    page: SetFormPage,
    isPrivate: true
  },
  {
    name: 'addCards',
    path: '/sets/:setId/cards',
    exact: true,
    page: AddCardsPage,
    isPrivate: true
  }
];

const AuthRoutes = () => {
  const { isAuth } = useAuth();

  return (
    <Switch>
      {routes.map(
        ({ name, page: PageComponent, isPrivate, authRedirect, ...rest }) =>
          isPrivate ? (
            <PrivateRoute key={name} {...rest}>
              <PageComponent />
            </PrivateRoute>
          ) : (
            <Route key={name} {...rest}>
              {isAuth && authRedirect ? (
                <Redirect to={authRedirect} />
              ) : (
                <PageComponent />
              )}
            </Route>
          )
      )}
    </Switch>
  );
};

export default AuthRoutes;
