import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Scream from "../components/scream/Scream";

import Grid from "@material-ui/core/Grid";

import { connect } from "react-redux";
import { getUserData } from "../redux/actions/DataAction";
import StaticProfile from "../components/profile/StaticProfile";

class User extends Component {
  state = {
    profile: null,
    screamIdParam: null
  };
  componentDidMount() {
    const { handle, screamId } = this.props.match.params;

    if (screamId) this.setState({ screamIdParam: screamId });

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then(res => {
        this.setState({
          profile: res.data.user
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    const { screams, loading } = this.props.data;
    const { handle } = this.props.match.params;

    const { profile, screamIdParam } = this.state;

    let recentScreamsMarkup = !loading ? (
      screams.length === 0 ? (
        <p>{handle} have no scream!!!!!</p>
      ) : !screamIdParam ? (
        screams.map((scream, index) => <Scream scream={scream} key={index} />)
      ) : (
        screams.map((scream, index) => {
          if (scream.screamId !== screamIdParam)
            return <Scream scream={scream} key={index} />;
          else return <Scream scream={scream} key={index} openDialog />;
        })
      )
    ) : (
      <p>Loading data...</p>
    );
    return (
      <Grid container spacing={10}>
        <Grid item xs={12} sm={8}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item xs={12} sm={4}>
          {profile === null ? (
            <p>Loading profile...</p>
          ) : (
            <StaticProfile profile={profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

User.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    data: state.data
  };
};

export default connect(mapStateToProps, { getUserData })(User);
