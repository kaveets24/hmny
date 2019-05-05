import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from '../actions';



class Track extends Component {

  constructor(props) {
    super(props);
  }

  handleClick = () => {
    const { _id } = this.props.playlists.current;

    this.props.addTrackToPlaylist(this.props.track, _id);
    
  }
  msToMin = (ms) => {
    var min = ms / 1000 / 60;
    var r = min % 1;
    var sec = Math.floor(r * 60);
    if (sec < 10) {
      sec = "0" + sec;
    }
    min = Math.floor(min);
    return min + ":" + sec;
  }
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    let time = this.msToMin(this.props.track.duration);
    let addButtonClass = this.props.searching ? "" : "hidden";
    let orderClass = this.props.searching ? "hidden" : "playlist__data";
    // let onClickFunction = this.props.searching ? this.handleClick : ""
  return (
    <div className="playlist__trackrow">
      <div className="playlist__trackrow--white">
        <button className={addButtonClass} onClick={this.handleClick}><i className="fas fa-plus fa-lg"></i></button>
        <span className={orderClass}>{this.props.order}.</span>
        <span className="playlist__data">{this.props.track.trackName}</span>
      </div>
      <div className="playlist__trackrow--grey">
        <span className="playlist__data">{this.props.track.artistName}</span>
        <span className="playlist__data playlist__data--duration">{time}</span>
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
