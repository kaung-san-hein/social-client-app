import React from "react";
import NoImg from "../images/no-image.jpg";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import Paper from "@material-ui/core/Paper";

// MUI stuff
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

const styles = theme => ({
  ...theme.spreadThis,
  handle: {
    height: 20,
    backgroundColor: theme.palette.primary.main,
    width: 60,
    margin: "0 auto 7px auto"
  },
  fullLine: {
    height: 15,
    backgroundColor: "rgba(0,0,0,0.6)",
    width: "100%",
    marginBottom: 10
  },
  halfLine: {
    height: 15,
    backgroundColor: "rgba(0,0,0,0.6)",
    width: "50%",
    marginBottom: 10
  }
});

const ProfileSkeleton = ({ classes }) => {
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <img src={NoImg} alt="Profile" className="profile-image" />
      </div>
      <hr />
      <div className="profile-details">
        <div className={classes.handle} />
        <hr />
        <div className={classes.fullLine} />
        <div className={classes.fullLine} />
        <hr />
        <LocationOn color="primary" />
        <span>Location</span>
        <hr />
        <LinkIcon color="primary" />
        https://website.com
        <hr />
        <CalendarToday color="primary" /> Joined date
      </div>
    </Paper>
  );
};

ProfileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileSkeleton);
