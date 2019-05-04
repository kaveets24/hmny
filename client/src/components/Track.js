import React from "react";
import { connect } from "react-redux";

function msToMin(ms) {
  var min = ms / 1000 / 60;
  var r = min % 1;
  var sec = Math.floor(r * 60);
  if (sec < 10) {
    sec = "0" + sec;
  }
  min = Math.floor(min);
  return min + ":" + sec;
}

function Track(props) {
  let time = msToMin(props.track.duration);
  return (
    <div className="playlist__trackrow">
      <div className="playlist__trackrow--white">
        <span className="playlist__data">{props.order}.</span>
        <span className="playlist__data">{props.track.trackName}</span>
      </div>
      <div className="playlist__trackrow--grey">
        <span className="playlist__data">{props.track.artistName}</span>
        <span className="playlist__data playlist__data--duration">{time}</span>
        <span className="playlist__data">
          <i className="fab fa-spotify" />
        </span>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    playerState: state.playerState
  };
}

export default connect(
  mapStateToProps,
  null
)(Track);
