import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthenticatedRoute = ({ component: Component, path, ...rest }) => {
  const userIsAuthenticated = useSelector((state) => state.tokens != null);
  return (
    <Route
      path={path}
      {...rest}
      render={(props) =>
        userIsAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                prevLocation: path,
                error: 'Unauthorized',
              },
            }}
          />
        )
      }
    />
  );
};

AuthenticatedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};

const authenticationRouteWithRouter = withRouter(AuthenticatedRoute);

export default authenticationRouteWithRouter;
