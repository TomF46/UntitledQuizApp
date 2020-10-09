import React from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";

const AuthenticatedRoute = ({
    component: Component,
    path,
    userIsAuthenticated,
    ...rest
}) => (
    <Route
        path={path}
        {...rest}
        render={props =>
            userIsAuthenticated ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: {
                            prevLocation: path,
                            error: "Unauthorized"
                        }
                    }}
                />
            )
        }
    />
);

const mapStateToProps = (state, ownProps) => {
    return {
        userIsAuthenticated: state.tokens != null
    };
};

const authenticationRouteWithRouter = withRouter(AuthenticatedRoute);

export default connect(mapStateToProps)(authenticationRouteWithRouter);
