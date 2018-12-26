import React from 'react';
import { connect } from 'react-redux';

const Playlist = () => {
    return (
        <div style={{
            backgroundColor: "blue",
            color: "white",
            }}> Whassup
    </div>
    )

};



function mapStateToProps(state) {
    return {
        auth: state.auth, 
        playerState: state.playerState
    }
}

export default connect(mapStateToProps, null)(Playlist);