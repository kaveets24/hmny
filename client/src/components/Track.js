import React from "react";
import { connect } from "react-redux";

const track = {
  name: "Track_1",
  order: 1,
  artist: "Artist_1",
  length: "3:00",
  src: "Spotify"
};

function Track() {
  return (
    <div className="playlist__trackrow">
      <div className="playlist__trackrow--white">
        <span className="playlist__data">{track.order}.</span>
        <span className="playlist__data">{track.name}</span>
      </div>
      <div className="playlist__trackrow--grey">
        <span className="playlist__data">{track.artist}</span>
        <span className="playlist__data playlist__data--duration">
          {track.length}
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
