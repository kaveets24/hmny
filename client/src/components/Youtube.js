import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

import YouTube from 'react-youtube';

class YouTubePlayer extends Component {
    state = {
        active: false,
        youtubeUri: ""
    };

    render() {
        const opts = {
          height: '390',
          width: '640',
          playerVars: { // https://developers.google.com/youtube/player_parameters
            autoplay: 1
          }
        };
     
        return (
          <YouTube
            videoId="yUZeZNxiD-M"
            opts={opts}
            onReady={this._onReady}
          />
        );
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