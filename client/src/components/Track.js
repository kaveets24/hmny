import React from "react";
import { connect } from "react-redux";


function Track(props) {
  return (
    <div className="playlist__trackrow">
      <div className="playlist__trackrow--white">
        <span className="playlist__data">{props.order}.</span>
        <span className="playlist__data">{props.track.trackName}</span>
      </div>
      <div className="playlist__trackrow--grey">
        <span className="playlist__data">{props.track.artistName}</span>
        <span className="playlist__data playlist__data--duration">
          {props.track.duration}
        </span>
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
