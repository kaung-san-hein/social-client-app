import React, { Component } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Scream from "../components/Scream";

class Home extends Component {
  state = {
    screams: null
  };
  componentDidMount() {
    axios
      .get("/screams")
      .then(res => {
        this.setState({
          screams: res.data
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    let recentScreamsMarkup = this.state.screams ? (
      this.state.screams.map((scream, index) => (
        <Scream scream={scream} key={index} />
      ))
    ) : (
      <p>Loading...</p>
    );
    return (
      <Grid container spacing={10}>
        <Grid item xs={12} sm={8}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item xs={12} sm={4}>
          <p>Profile...</p>
        </Grid>
      </Grid>
    );
  }
}

export default Home;
