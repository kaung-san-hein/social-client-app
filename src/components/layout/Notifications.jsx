import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// MUI stuff
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";

// icons
import NotificationsIcon from "@material-ui/icons/Notifications";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";

// Redux
import { connect } from "react-redux";
import { markNotificationsRead } from "../../redux/actions/UserAction";

class Notifications extends Component {
  state = {
    anchorEl: null
  };

  handleOpen = event => {
    this.setState({
      anchorEl: event.target
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  onMenuOpened = () => {
    let unReadNotificationsId = this.props.notifications
      .filter(noti => !noti.read)
      .map(noti => noti.notificationId);
    this.props.markNotificationsRead(unReadNotificationsId);
  };

  render() {
    dayjs.extend(relativeTime);
    const { notifications } = this.props;
    const { anchorEl } = this.state;

    let notificationsIcon;
    if (notifications && notifications.length > 0) {
      const notReadNoti = notifications.filter(
        notification => notification.read === false
      ).length;
      notReadNoti > 0
        ? (notificationsIcon = (
            <Badge badgeContent={notReadNoti} color="secondary">
              {" "}
              <NotificationsIcon />{" "}
            </Badge>
          ))
        : (notificationsIcon = <NotificationsIcon />);
    } else {
      notificationsIcon = <NotificationsIcon />;
    }

    let notificationsMarkup =
      notifications && notifications.length > 0 ? (
        notifications.map((notification, index) => {
          const verb = notification.type === "like" ? "like" : "commented on";
          const time = dayjs(notification.createdAt).fromNow();
          const iconColor = notification.read ? "primary" : "secondary";
          const icon =
            notification.type === "like" ? (
              <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
            ) : (
              <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
            );

          return (
            <MenuItem key={index} onClick={this.handleClose}>
              {icon}
              <Typography
                component={Link}
                variant="body1"
                to={`/users/${notification.recipient}/scream/${notification.screamId}`}
              >
                {notification.sender} {verb} you scream {time}
              </Typography>
            </MenuItem>
          );
        })
      ) : (
        <MenuItem onClick={this.handleClose}>
          You have no notifications yet!!!
        </MenuItem>
      );

    return (
      <React.Fragment>
        <Tooltip placement="top" title="Notifications">
          <IconButton
            aria-owns={anchorEl ? "simple-menu" : undefined}
            aria-haspopup="true"
            onClick={this.handleOpen}
          >
            {notificationsIcon}
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          onEntered={this.onMenuOpened}
        >
          {notificationsMarkup}
        </Menu>
      </React.Fragment>
    );
  }
}

Notifications.propTypes = {
  notifications: PropTypes.array.isRequired
};

const mapStateToPorps = state => {
  return {
    notifications: state.user.notifications
  };
};

export default connect(mapStateToPorps, { markNotificationsRead })(
  Notifications
);
