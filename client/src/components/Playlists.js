import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../actions";
import axios from "axios";

class Playlists extends Component {
  state = {
    name: "",
    description: "",
    artwork: ""
  };

  renderContent() {
    let playlists = [];
    switch (this.props.auth) {
      case undefined:
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
          if (typeof p === "object") {
            // Is there a better way to wait for playlists to be an object?
            playlists.push(p);
          }
        }
        break;
    }
    return playlists.map(playlist => {
      return (
        <Link
          key={playlist.playlistName}
          to={`/${playlist.playlistName}`.replace(" ", "-")}
        >
          <div className="main__item">{playlist.playlistName}</div>
        </Link>
      );
    });
  }
  // Used arrow "class-field" snytax so that "this" is bound correctly.
  handleSubmit = async event => {
    event.preventDefault();
    await axios.post("playlists/new", {
      name: this.state.name,
      description: this.state.description,
      artwork: this.state.artwork
    });

    // clear out the input field after successfully submitting.
    this.props.fetchPlaylists();
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
        <img src="https://via.placeholder.com/150C" alt="artwork" className="main__form-artwork">

        </img>
        <form
          
          onSubmit={this.handleSubmit}
          id="newPlaylist"
        >
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
function mapStateToProps({ auth }) {
  return { auth };
}
export default connect(
  mapStateToProps,
  actions
)(Playlists);
