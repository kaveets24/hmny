import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

class Player extends Component {
  // Initialize the Spotify Web Playback SDK
  initializeSpotifySdk() {
    const token = this.props.auth.spotifyAccessToken;
    console.log(token);

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      if (window.Spotify !== null) {
        this.player = new window.Spotify.Player({
          name: "hmny",
          getOAuthToken: cb => {
            cb(token);
          }
        });
        // Error handling
        this.player.addListener("initialization_error", ({ message }) => {
          console.error(message);
        });
        this.player.addListener("authentication_error", ({ message }) => {
          console.error(message);
          // Take the user back to the spotify Login/Authentication page to get a new refresh token
        });
        this.player.addListener("account_error", ({ message }) => {
          console.error(message);
        });
        this.player.addListener("playback_error", ({ message }) => {
          console.error(message);
        });

        // Playback status updates
        this.player.addListener("player_state_changed", state => {
          this.onPlayerStateChange(state);
        });

        // Ready
        this.player.addListener("ready", ({ device_id }) => {
          console.log("Ready with Device ID", device_id);
          this.onPlayClick();
        });

        // Not Ready
        this.player.addListener("not_ready", ({ device_id }) => {
          console.log("Device ID has gone offline", device_id);
        });
        // Connect to the player!
        this.player.connect();
      }
    };
  }

  onPlayerStateChange(playerState) {
    // if we're no longer listening to music, we'll get a null state.
    console.log("onPlayerStateChange called");
    console.log(playerState);
    if (playerState !== null) {
      const {
        current_track: currentTrack,
        position,
        duration
      } = playerState.track_window; // using ES6 destructuring, take objects off of the playerState.track_window

      const trackName = currentTrack.name;
      const albumName = currentTrack.album.name;
      const artistName = currentTrack.artists
        .map(artist => artist.name)
        .join(", ");
      const playing = !playerState.paused;

      // Call updatePlayer action with this object passed to it.
      this.props.updatePlayer({
        position,
        duration,
        trackName,
        albumName,
        artistName,
        playing
      });
    }
  }


  // Player Controls
  onPreviousClick() {
    this.player.previousTrack();
  }
  onPlayClick() {
    this.player.togglePlay();
  }
  onNextClick() {
    this.player.nextTrack();
  }


  componentDidMount() {
    this.initializeSpotifySdk();
  }

  render() {
    let playButtonClass;
    this.props.playerState.playing === true
      ? (playButtonClass = "fas fa-pause")
      : (playButtonClass = "fas fa-play");

    return (
      <footer className="player">
        <div className="player__div fa-lg">
          <div className="player__button" onClick={() => this.onPreviousClick()}>
            <i className="fas fa-step-backward" />
          </div>
          <div className="player__button" onClick={() => this.onPlayClick()}>
            <i className={playButtonClass} />
          </div>
          <div className="player__button" onClick={()=> {this.onNextClick()}}>
            <i className="fas fa-step-forward" />
          </div>
          <div className="player__button">
            <i className="fas fa-volume-up" />
          </div>
        </div>
      </footer>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    playerState: state.playerState
  };
}

export default connect(
  mapStateToProps,
  actions
)(Player);
