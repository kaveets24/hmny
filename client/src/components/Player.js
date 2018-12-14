import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Player extends Component {



  // Initialize the Spotify Web Playback SDK
  initializeSpotifySdk() {
    const token = this.props.auth.spotifyAccessToken;


    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);
    
    window.onSpotifyWebPlaybackSDKReady = () => {
      if (window.Spotify !== null) {
        this.player = new window.Spotify.Player({
          name: 'hmny',
          getOAuthToken: cb => { cb(token); }
        });
      
        // Error handling
        this.player.addListener('initialization_error', ({ message }) => { console.error(message); });
        this.player.addListener('authentication_error', ({ message }) => { console.error(message); });
        this.player.addListener('account_error', ({ message }) => { console.error(message); });
        this.player.addListener('playback_error', ({ message }) => { console.error(message); });
      
        // Playback status updates
        this.player.addListener('player_state_changed', state => { 
          this.onPlayerStateChange(state);
        });
      
        // Ready
        this.player.addListener('ready', ({ device_id }) => {
          console.log('Ready with Device ID', device_id);
        });
      
        // Not Ready
        this.player.addListener('not_ready', ({ device_id }) => {
          console.log('Device ID has gone offline', device_id);
        });
      
        // Connect to the player!
        this.player.connect();
      }     
      
    };
  }
  onPlayerStateChange(playerState) {
    // if we're no longer listening to music, we'll get a null state.
    console.log("onPlayerStateChange called");
    if (playerState !== null) {
      const {
        current_track: currentTrack,
        position,
        duration,
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

  onPlayClick() {
    //  Need to call the spotify api to pause the song
    // const playerState = this.props.playerState
    // this.props.playPause(playerState)

  }

  componentDidMount() {
      this.initializeSpotifySdk();
  }


  render() {
      // dummy data
    let playButtonClass;
    (this.props.playerState.playing === true) ? playButtonClass = "fas fa-pause": playButtonClass = "fas fa-play";
  
    return (
      <footer className="player">
        <div className="player__div fa-lg">
          <a className="player__a" href="#previous"><i className="fas fa-step-backward"></i></a>
          <a className="player__a" href="#play"><i onClick={this.onPlayClick()}className={playButtonClass}></i></a>
          <a className="player__a" href="#next"><i className="fas fa-step-forward"></i></a>
          <a className="player__a" href="#volume"><i className="fas fa-volume-up"></i></a>
        </div>
    </footer>
  )

  }


};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    playerState: state.playerState
  };
};

export default connect(mapStateToProps, actions)(Player);

