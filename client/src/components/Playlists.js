import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../actions";
import axios from "axios";

class Playlists extends Component {
  state = {
    newPlaylistName: ""
  };

  renderContent() {
    let playlists = [];
    switch (this.props.auth) {
      case null:
        return null;

      default:
        if (this.props.auth.playlists.length < 1) {
          return (
            <div style={{ color: "white" }} className="">
              You currently don't have any playlists! (Ps this is an inline
              style, change it later)
            </div>
          );
        }
        for (let p of this.props.auth.playlists) {
          playlists.push(p);
        }
        break;
    }
    return playlists.map(playlist => {
      return (
        <Link to={`/${playlist.playlistName}`.replace(" ", "_")}>
          <div key={playlist.playlistName} className="main__item">
            {playlist.playlistName}
          </div>
        </Link>
      );
    });
  }
  // Used arrow "class-field" snytax so that "this" is bound correctly.
  handleSubmit = async event => {
    event.preventDefault();
    await axios.post("playlists/new", { newPlaylistName: this.state.newPlaylistName });

    // clear out the input field after successfully submitting.
    this.props.fetchPlaylists();
    this.setState({ newPlaylistName: "" });
  };

  // Used arrow "class-field" snytax so that "this" is bound correctly.
  handleChange = event => {
    this.setState({ newPlaylistName: event.target.value });
  };

  componentDidMount() {
    this.props.fetchPlaylists();
  }

  render() {
    return (
      <div className="main__grid">
        <form onSubmit={this.handleSubmit} id="newPlaylist">
          <input
            onChange={this.handleChange}
            value={this.state.newPlaylistName}
            type="text"
            placeholder="Enter a name for your playlist"
          />
          <button type="submit" form="newPlaylist">
            Create
          </button>
        </form>
        {this.renderContent()}
      </div>
    );
  }
}
function mapStateToProps({ auth }) {
  return { auth };
}
export default connect(
  mapStateToProps,
  actions
)(Playlists);
