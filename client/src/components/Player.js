import React, {Component} from 'react';
import { connect } from 'react-redux';


class Player extends Component {

  // Initialize the Spotify Web Playback SDK
  initializeSpotifySdk() {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);
    
    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = this.props.auth.spotifyAccessToken;
      const player = new window.Spotify.Player({
        name: 'hmny',
        getOAuthToken: cb => { cb(token); }
      });
    
      // Error handling
      player.addListener('initialization_error', ({ message }) => { console.error(message); });
      player.addListener('authentication_error', ({ message }) => { console.error(message); });
      player.addListener('account_error', ({ message }) => { console.error(message); });
      player.addListener('playback_error', ({ message }) => { console.error(message); });
    
      // Playback status updates
      player.addListener('player_state_changed', state => { console.log(state); });
    
      // Ready
      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
      });
    
      // Not Ready
      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });
    
      // Connect to the player!
      player.connect();
    };
  }

  componentDidMount() {
      this.initializeSpotifySdk();
  }


  render() {
      // dummy data
    const playing = true;
    let playState;
    playing === true ? playState = "fas fa-play": playState = "fas fa-pause";
    return (
      <footer className="player">
        <div className="player__div fa-lg">
          <a className="player__a" href="#previous"><i className="fas fa-step-backward"></i></a>
          <a className="player__a" href="#play"><i className={playState}></i></a>
          <a className="player__a" href="#next"><i className="fas fa-step-forward"></i></a>
          <a className="player__a" href="#volume"><i className="fas fa-volume-up"></i></a>
        </div>
    </footer>
  )

  }


};

function mapStateToProps({ auth }) {
  return { auth };
};

export default connect(mapStateToProps)(Player);

