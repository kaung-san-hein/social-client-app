import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authenticated ? <Redirect to="/" /> : <Component {...props} />
    }
  />
);

AuthRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    authenticated: state.user.authenticated
  };
};

export default connect(mapStateToProps)(AuthRoute);
