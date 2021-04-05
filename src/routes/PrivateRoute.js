import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '@/hooks';

const PrivateRoute = ({ children, ...rest }) => {
  const auth = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
