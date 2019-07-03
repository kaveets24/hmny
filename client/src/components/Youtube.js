import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

import YouTube from "react-youtube";

class YouTubePlayer extends Component {
  state = {
    active: false
    // youtubeUri: ""
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
        className={className}
        videoId={currentTrack.youtubeUri}
        opts={opts}
        onReady={this._onReady}
        onStateChange={this._onStateChange}
      />
    );
  }

  _onStateChange(event) {
    if (this.props) {
      const { currentTrack, playing } = this.props.globalPlayer;

      if (currentTrack.youtubeUri && playing) {
        event.target.pauseVideo();
      } else if (currentTrack.youtubeUri && !playing) {
        event.target.playVideo();
      }
    }
  }
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
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
