import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../actions";

class Playlists extends Component {
  state = {
    name: "",
    description: "",
    artwork: ""
  };

  renderContent() {
    console.log("FROM PLAYLISTS.js", this.props.playlists);
    switch (this.props.playlists) {
      case undefined:
        return null;
    

      default:
        if (this.props.playlists.all.length < 1) {
          return (
            <div style={{ color: "white" }} className="">
              You currently don't have any playlists! (Ps this is an inline
              style, change it later)
            </div>
          );
        }
        break;
    }

    return this.props.playlists.all.map(playlist => {
      return (

        <Link
          key={playlist.playlistName}
          to={{
            pathname: `/playlists/${playlist.playlistName}`.replace(
              /\s/gi,
              "-"
            ),
            state: {
              playlist
            }
          }}
        >
          <div className="main__item">{playlist.playlistName}</div>
        </Link>
      );
    });
  }
  // Used arrow "class-field" snytax so that "this" is bound correctly.
  handleSubmit = async event => {
    event.preventDefault();

    // This should be an action instead of a direct post request. That way, we won't have to call fetchPlaylists, because our store should be updated.
    this.props.addPlaylist(this.state);

    // clear out the input field after successfully submitting.
    // this.props.fetchPlaylists();
    this.setState({ name: "" });
  };

  // Used arrow "class-field" snytax so that "this" is bound correctly.
  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  componentDidMount() {
    this.props.fetchPlaylists();
  }

  render() {
    return (
      <div>
        <div className="main__form">
          <img
            src="https://via.placeholder.com/150C"
            alt="artwork"
            className="main__form-artwork"
          />
          <form onSubmit={this.handleSubmit} id="newPlaylist">
            <input
              onChange={this.handleChange}
              value={this.state.name}
              type="text"
              placeholder="Enter a name for your playlist"
            />

            <textarea
              onChange={this.handleChange}
              value={this.state.description}
              placeholder="Enter a description"
            />
            <input
              onChange={this.handleChange}
              value={this.state.artwork}
              type="text"
              placeholder="Choose an image"
            />
            <button type="submit" form="newPlaylist">
              Create
            </button>
          </form>
        </div>
        <div className="main__grid">{this.renderContent()}</div>
      </div>
    );
  }
}
function mapStateToProps({ playlists, auth }) {
  return { auth, playlists };
}
export default connect(
  mapStateToProps,
  actions
)(Playlists);
