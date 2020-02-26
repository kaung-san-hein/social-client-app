import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Scream from "../components/scream/Scream";
import Profile from "../components/profile/Profile";
import { connect } from "react-redux";
import { getScreams } from "../redux/actions/DataAction";

class Home extends Component {
  componentDidMount() {
    this.props.getScreams();
  }
  render() {
    const { screams, loading } = this.props.data;
    let recentScreamsMarkup = !loading ? (
      screams.map((scream, index) => <Scream scream={scream} key={index} />)
    ) : (
      <p>Loading...</p>
    );
    return (
      <Grid container spacing={10}>
        <Grid item xs={12} sm={8}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item xs={12} sm={4}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

Home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    data: state.data
  };
};

export default connect(mapStateToProps, { getScreams })(Home);
