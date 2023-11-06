import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { getUserIsAdmin } from './api/userApi';

const AdminRoute = ({ component: Component, path, ...rest }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    getUserIsAdmin()
      .then((res) => {
        setIsAdmin(res.isAdmin);
        setIsChecked(true);
      })
      .catch(() => {
        //If call fails then assume they are not admin
        setIsChecked(true);
      });
  }, []);

  return (
    <>
      {isChecked && (
        <Route
          path={path}
          {...rest}
          render={(props) =>
            isAdmin ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: '/',
                  state: {
                    prevLocation: path,
                    error: 'Unauthorized',
                  },
                }}
              />
            )
          }
        />
      )}
    </>
  );
};

AdminRoute.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};

const adminRouteWithRouter = withRouter(AdminRoute);

export default adminRouteWithRouter;
