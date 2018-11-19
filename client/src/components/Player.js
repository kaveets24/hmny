import React, { Component } from 'react';
import { connect } from 'react-redux';


const Player = () => {
    return (
        <footer class="player">
          <div class="player__button fa-lg">
            <a class="player__a" href="#previous"><i class="fas fa-step-backward"></i></a>
            <a class="player__a" href="#play"><i class="fas fa-play"></i></a>
            <a class="player__a" href="#next"><i class="fas fa-step-forward"></i></a>
            <a class="player__a" href="#volume"><i class="fas fa-volume-up"></i></a>
          </div>
      </footer>
    )

};


// will need this to access state and conditionally render components
//   export default connect(mapStateToProps)(Player);

export default Player;
