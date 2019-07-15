import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

import YouTube from "react-youtube";

class YouTubePlayer extends Component {
  state = {
    active: false
    // youtubeUri: ""
  };

  _onReady = event => {
    // access to player in all event handlers via event.target
    event.target.unMute();
    window.youtubePlayer = event.target; // Make the player object available via the window.
  };


  _onPlay = event => {
    const { tracks } = this.props.playlists.current;
    const { currentTrack } = this.props.globalPlayer;

    if (tracks !== undefined) {
      const currentSong = tracks[currentTrack.index];
      this.props.playTrack(currentSong, currentTrack.index, 0);
    }
  };

  _onPause = event => {
    if (this.props.globalPlayer.currentTrack.youtubeUri)
      this.props.pauseTrack({}, 0);
  };

  _onEnd = event => {
    const { tracks } = this.props.playlists.current;
    const { currentTrack } = this.props.globalPlayer;

    // if (tracks !== undefined) {
      const nextSong = tracks[currentTrack.index + 1];
      if (nextSong !== undefined)
        this.props.playTrack(nextSong, currentTrack.index + 1, 0);
    // }
  };

  render() {
    const { currentTrack, playing } = this.props.globalPlayer;
    const className = currentTrack.youtubeUri ? "youtube" : "youtube--hidden";

    const opts = {
      height: "390",
      width: "640",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        controls: 1
      }
    };

    return (
      <YouTube
        id="youtube-player"
        className={className}
        videoId={currentTrack.youtubeUri}
        opts={opts}
        onReady={this._onReady}
        // onStateChange={this._onStateChange}  
        onPlay={this._onPlay}
        onPause={this._onPause}
        onEnd={this._onEnd}
      />
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
    spotifyState: state.spotifyState,
    globalPlayer: state.globalPlayer,
    playlists: state.playlists
  };
}

export default connect(
  mapStateToProps,
  actions
)(YouTubePlayer);
