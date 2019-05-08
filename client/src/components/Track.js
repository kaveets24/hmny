import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

class Track extends Component {

  handleClick = async () => {

    await this.props.addTrackToPlaylist(this.props.track, this.props.playlists.current._id);
    await this.props.fetchTracks(this.props.playlists.current._id);
  };

  handleDelete = async () => {
    await this.props.removeTrackFromPlaylist(this.props.track, this.props.playlists.current._id);
    await this.props.fetchTracks(this.props.playlists.current._id); 
  };
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
    let addButtonClass = searching ? "" : "hidden";
    let deleteButtonClass = searching ? "hidden" : "";
    let orderClass = searching ? "hidden" : "playlist__data";
    let { artistNames } = this.props.track;

    let artistName = "";
    if (artistNames)
      artistNames.forEach(artist => {
        (artistNames.indexOf(artist) !== artistNames.length - 1) ? artistName += artist + ", " : artistName += artist; 
      });
    return (
      <div className="playlist__trackrow">
        <div className="playlist__trackrow--white">
          <button className={addButtonClass} onClick={this.handleClick}>
            <i className="fas fa-plus fa-lg" />
          </button>
       
          <span className={orderClass}>{this.props.order}.</span>
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
    playerState: state.playerState
  };
}

export default connect(
  mapStateToProps,
  actions
)(Track);
