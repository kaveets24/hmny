import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

import Track from "./Track";
import Search from "./Search";

const tracks = [
  {
    name: "Track_1",
    order: 1,
    artist: "Artist_1",
    length: "3:00",
    src: "Spotify"
  },
  {
    name: "A super long name: Track_2 (featuring pdiddy and young spanky IV)",
    order: 2,
    artist: "Artist_2",
    length: "3:00",
    src: "Spotify"
  },
  {
    name: "Track_3",
    order: 3,
    artist: "Artist_3",
    length: "3:00",
    src: "Spotify"
  },
  {
    name: "Track_4",
    order: 4,
    artist: "Artist_4",
    length: "3:00",
    src: "Spotify"
  }
];

class Playlist extends Component {
  constructor(props) {
    super(props);
    // Needed to grab this.props.location.state
  }
  renderTracks() {
    return this.props.tracks.current.map(track => {
      let order = this.props.tracks.current.indexOf(track) + 1;
      return <Track track={track} key={order} order={order} />;
    });
  }

  componentDidMount() {
    // We have to do this here because the current playlist object is being passed as a prop through the <Link> component in Playlists.js
    // If we refresh the page, this.props.location.state is undefined, so we dispatch an action to update this.props.playlists.current in our redux data store.
    if (this.props.location.state !== undefined) {
      this.props.setCurrentPlaylist(this.props.location.state.playlist)
    }
    this.props.fetchTracks();
  }

  render() {
    const playlist  = this.props.playlists.current;
    return (
      <div>
        <Search />

        <div className="playlist">
          <div className="playlist__column1">{this.renderTracks()}</div>

          <div className="playlist__column2">
            <div className="playlist__playlistname">
              {playlist.playlistName}
            </div>
            <img
              className="playlist__albumart"
              src={this.props.playerState.albumArt}
              alt="Your Album Art"
            />
            <div className="playlist__trackname">
              {this.props.playerState.trackName}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    playerState: state.playerState,
    tracks: state.tracks,
    playlists: state.playlists
  };
}

export default connect(
  mapStateToProps,
  actions
)(Playlist);
