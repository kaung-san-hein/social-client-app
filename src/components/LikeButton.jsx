import React, { Component } from "react";
import MyButton from "../util/MyButton";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// MUI icon
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

// Redux
import { connect } from "react-redux";
import { likeScream, unLikeScream } from "../redux/actions/DataAction";

class LikeButton extends Component {
  likedScream = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(like => like.screamId === this.props.screamId)
    ) {
      return true;
    } else {
      return false;
    }
  };

  likeScream = () => {
    this.props.likeScream(this.props.screamId);
  };
  unLikeScream = () => {
    this.props.unLikeScream(this.props.screamId);
  };
  render() {
    const {
      user: { authenticated }
    } = this.props;

    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : this.likedScream() ? (
      <MyButton tip="Undo Like" onClick={this.unLikeScream}>
        <FavoriteIcon primary="color" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likeScream}>
        <FavoriteBorder primary="color" />
      </MyButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  likeScream: PropTypes.func.isRequired,
  unLikeScream: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapStateToDispatch = {
  likeScream,
  unLikeScream
};

export default connect(mapStateToProps, mapStateToDispatch)(LikeButton);
