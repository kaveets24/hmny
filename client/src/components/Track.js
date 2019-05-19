import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

class Track extends Component {

  handleAdd = async () => {

    await this.props.addTrackToPlaylist(this.props.track, this.props.playlists.current._id);
    await this.props.fetchTracks(this.props.playlists.current._id);
  };

  handleDelete = async () => {
    await this.props.removeTrackFromPlaylist(this.props.track, this.props.playlists.current._id);
    await this.props.fetchTracks(this.props.playlists.current._id); 
  };

  handlePlay = async () => {
    const { order, tracks } = this.props;
    const { playing, currentTrack} = this.props.globalPlayer;
    const currentSong = tracks.current[currentTrack.index];
    
    if (!playing) {
      // If paused, play the clicked track.
      await this.props.playTrack(this.props.track, order -1, 0);
    } else if (playing && currentTrack.id === this.props.track._id) {
      // If playing and the currently playing song is clicked, then pause the song.
      await this.props.pauseTrack(currentSong, currentTrack.position);
    } else {
      //  Otherwise, just play the clicked track.
      await this.props.playTrack(this.props.track, order -1, 0);
    }
  }
  msToMin = ms => {
    var min = ms / 1000 / 60;
    var r = min % 1;
    var sec = Math.floor(r * 60);
    if (sec < 10) {
      sec = "0" + sec;
    }
    min = Math.floor(min);
    return min + ":" + sec;
  };
  componentDidMount() {
    console.log("TRACK COMPONENT DIDMOUNT,", this.props);
  }

  render() {
    let time = this.msToMin(this.props.track.duration);
    let { searching, globalPlayer } = this.props;
    let searchingClass = searching ? "" : "hidden";
    let deleteButtonClass = searching ? "hidden" : "";
    let orderClass = searching ? "hidden" : "playlist__data";
    let { artistNames } = this.props.track;

    let currentTrackPlayingClass;
    if (globalPlayer.playing && !searching) {
      // If globalPlayer is playing...
      currentTrackPlayingClass = (this.props.track._id === globalPlayer.currentTrack.id) ? "fas fa-pause": "fas fa-play";
    } else {
            // If globalPlayer is NOT playing...
            currentTrackPlayingClass = "fas fa-play";

    }

    let artistName = "";
    if (artistNames)
      artistNames.forEach(artist => {
        (artistNames.indexOf(artist) !== artistNames.length - 1) ? artistName += artist + ", " : artistName += artist; 
      });
    return (
      <div className="playlist__trackrow">
        <div className="playlist__trackrow--white">
          <button className={searchingClass} onClick={this.handleAdd}>
            <i className="fas fa-plus fa-lg" />
          </button>
       
          <span className={orderClass}>{this.props.order}.</span>
          <button className='' onClick={this.handlePlay}>
            <i className={currentTrackPlayingClass} />
          </button>
          <span className="playlist__data">{this.props.track.trackName}</span>
          <button className={deleteButtonClass} onClick={this.handleDelete}>
            <i className="fa fa-trash" aria-hidden="true"></i>
          </button>
        </div>
        <div className="playlist__trackrow--grey">
          <span className="playlist__data">{artistName}</span>
          <span className="playlist__data playlist__data--duration">
            {time}
          </span>
          <span className="playlist__data">
            <i className="fab fa-spotify" />
          </span>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    playlists: state.playlists,
    spotifyState: state.spotifyState,
    globalPlayer: state.globalPlayer,
    tracks: state.tracks,
  };
}

export default connect(
  mapStateToProps,
  actions
)(Track);
