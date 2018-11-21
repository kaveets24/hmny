import React, { Component } from 'react';
import { connect } from 'react-redux';


const Player = () => {
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

};


// will need this to access state and conditionally render components
//   export default connect(mapStateToProps)(Player);

export default Player;
