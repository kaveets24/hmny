import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

class Player extends Component {
  // Initialize the Spotify Web Playback SDK
  async initializeSpotifySdk() {
    const token = this.props.auth.spotifyAccessToken;

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
        this.player.addListener("authentication_error", async ({ message }) => {
          console.error(message);
          await this.props.requestNewSpotifyToken(); // fetch new accessToken and fetchUser();
          setTimeout(() => {
            this.initializeSpotifySdk();
          }, 5000);
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
          console.log(state);
        });

        // Ready
        this.player.addListener("ready", async ({ device_id }) => {
          console.log("Ready with Device ID", device_id);
          const iframe = document.querySelector(
            'iframe[src="https://sdk.scdn.co/embedded/index.html"]'
          );
          if (iframe) {
            iframe.style.display = "block";
            iframe.style.position = "absolute";
            iframe.style.top = "-1000px";
            iframe.style.left = "-1000px";
          }

          await this.props.updateDeviceId(device_id);
          this.selectHmnyOnSpotifyConnect(); // Uncomment if you want the web browser to automatically select itself as your Spotify device. 
        });

        // Not Ready
        this.player.addListener("not_ready", ({ device_id }) => {
          console.log("Device ID has gone offline", device_id);
        });
        // Connect to the player!￼

        this.player.connect();
      }
    };
  }

  onPlayerStateChange(playerState) {
    // if we're no longer listening to music, we'll get a null state.
    console.log("onPlayerStateChange called");
    console.log("Here's the current state:", this.props.spotifyState);
    if (playerState !== null) {
      const { current_track: currentTrack } = playerState.track_window; // using ES6 destructuring, take objects off of the playerState.track_window
      const { position, duration } = playerState;
      const trackName = currentTrack.name;
      const albumName = currentTrack.album.name;
      const albumArt = currentTrack.album.images[0].url;
      const artistName = currentTrack.artists
        .map(artist => artist.name)
        .join(", ");
      const playing = !playerState.paused;
      // Call updatePlayer action with this object passed to it.
      this.props.updateSpotifyPlayer({
        position,
        duration,
        trackName,
        albumName,
        albumArt,
        artistName,
        playing
      });
    }
  }
  componentDidMount() {
    this.initializeSpotifySdk();

    console.log("Global Player State:", this.props.globalPlayer);
    // set up globalPlayer state.
    // 1. should get an array of track ids
  }
  // Sets hmny as the user's currently playing device on Spotify Connect
  selectHmnyOnSpotifyConnect() {
    const { spotifyAccessToken } = this.props.auth;
    const { deviceId } = this.props.spotifyState;

    fetch("https://api.spotify.com/v1/me/player", {
      method: "PUT",
      headers: {
        authorization: `Bearer ${spotifyAccessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        device_ids: [deviceId],
        play: false
      })
    });
  }

  // Player Controls
  onPreviousClick() {
    const { currentTrack } = this.props.globalPlayer;
    const { tracks } = this.props.playlists.current;
    if (tracks !== undefined) {
      const currentSong = tracks[currentTrack.index];
      const previousSong = tracks[currentTrack.index - 1];
      if (currentTrack.index > 0 && previousSong !== undefined) {
        this.props.pauseTrack(currentSong, 0);
        this.props.playTrack(previousSong, currentTrack.index - 1, 0);
      }
    

    }
  
  }
  onPlayClick = () => {
    const { currentTrack, playing, position } = this.props.globalPlayer;
    const {  spotifyState } = this.props;
    const { tracks } = this.props.playlists.current;
    if (tracks !== undefined) {
      const currentSong = tracks[currentTrack.index];
      if (!playing && currentSong !== undefined) {
        // If paused AND a track has been played previously, then resume the current track OR the first track of the playlist.
        // NOTE: spotifyState.position is only for spotify, we'll need to give the youtube position for those cases.
        this.props.pauseTrack(currentSong, 0);
        this.props.playTrack(currentSong, currentTrack.index, position);
  
      } else if (!playing && currentSong === undefined) {
        this.props.pauseTrack(tracks[0], 0);
        this.props.playTrack(tracks[0], 0, 0);
      } else if (playing) {
        this.props.pauseTrack(currentSong, spotifyState.position);
      }

    }


  };
  onNextClick() {
    const { currentTrack } = this.props.globalPlayer;
    const { tracks } = this.props.playlists.current;
    if (tracks !== undefined) {
      const currentSong = tracks[currentTrack.index];
      console.log(currentSong);
      const nextSong = tracks[currentTrack.index + 1];
      if (currentTrack.index !== tracks.length - 1 && nextSong !== undefined) {
        this.props.pauseTrack(currentSong, 0);
        this.props.playTrack(nextSong, currentTrack.index + 1, 0);
      }
    }


  }

  onSetVolume(volume) {
    // calls the UPDATE_VOLUME action
    this.props.updateVolume(this.player, volume);
  }

  onToggleMute() {
    if (this.props.spotifyState.volume > 0.02) {
      this.onSetVolume(0);
    } else {
      this.onSetVolume(1);
    }
  }

  render() {
    const { playing } = this.props.globalPlayer;

    const volume = this.props.spotifyState.volume; // Volume should be taken from this.props.globalPlayer, and converted to properly interact with spotify and youtube apis.
    
    let playButtonClass;
    playing === true
      ? (playButtonClass = "fas fa-pause")
      : (playButtonClass = "fas fa-play");

    let volumeButtonClass;
    if (volume >= 0.5) {
      volumeButtonClass = "fas fa-volume-up";
    } else if (volume < 0.5 && volume > 0.01) {
      volumeButtonClass = "fas fa-volume-down";
    } else {
      volumeButtonClass = "fas fa-volume-mute";
    }

    return (
      <footer className="player">
        <div className="player__div fa-lg">
          <div
            className="player__button player__button--hover"
            onClick={() => this.onPreviousClick()}
          >
            <i className="fas fa-step-backward" />
          </div>
          <div
            className="player__button player__button--hover"
            onClick={this.onPlayClick}
          >
            <i className={playButtonClass} />
          </div>
          <div
            className="player__button player__button--hover"
            onClick={() => this.onNextClick()}
          >
            <i className="fas fa-step-forward" />
          </div>
          <div
            onClick={() => this.onToggleMute()}
            className="player__button player__button--hover player__button--volumeicon fa-xs"
          >
            <i className={volumeButtonClass} />
          </div>
          <div className="player__slidecontainer player__button">
            <input
              onChange={event => this.onSetVolume(event.target.value / 100)}
              className="player__slider"
              type="range"
              min="0"
              max="100"
              value={volume * 100}
            />
          </div>
        </div>
      </footer>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    spotifyState: state.spotifyState,
    globalPlayer: state.globalPlayer,
    playlists: state.playlists,
  };
}

export default connect(
  mapStateToProps,
  actions
)(Player);
