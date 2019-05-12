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
    let { playing, currentTrackId} = this.props.globalPlayer

    if (playing === false || currentTrackId !== this.props.track._id) {
      await this.props.playTrack(this.props.track);
    } else {
      await this.props.pauseTrack();
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
    let { searching } = this.props;
    let searchingClass = searching ? "" : "hidden";
    let deleteButtonClass = searching ? "hidden" : "";
    let orderClass = searching ? "hidden" : "playlist__data";
    let { artistNames } = this.props.track;

    let { playing } = this.props.playerState;
    let playButtonClass = playing ? "fas fa-pause": "fas fa-play";
    let currentTrackPlayingClass = (this.props.track._id === this.props.globalPlayer.currentTrackId) ? "fas fa-pause": "fas fa-play";
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
          <button className={''} onClick={this.handlePlay}>
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
    playerState: state.playerState,
    globalPlayer: state.globalPlayer
  };
}

export default connect(
  mapStateToProps,
  actions
)(Track);
