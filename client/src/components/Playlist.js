import React, {Component} from 'react';
import { connect } from 'react-redux';

const tracks = [
    {
        name: "Track_1",
        order: 1,
        artist: "Artist_1",
        length: "3:00",
        src: "Spotify"
    },
    {
        name: "Track_2",
        order: 2,
        artist: "Artist_2",
        length: "3:00",
        src: "Spotify"
    },
    {
        name: "Track_3",
        order: 3,
        artist: "Artist_3",
        length: "3:00",
        src: "Spotify"
    },
    {
        name: "Track_4",
        order: 4,
        artist: "Artist_4",
        length: "3:00",
        src: "Spotify"
    },

];

class Playlist extends Component{

    render() {
        const allTracks = tracks.map(track => {
            return (
                <div className="playlist__trackrow">
                    <span className="playlist__trackrow__data">{track.order}</span>
                    <span className="playlist__trackrow__data">{track.name}</span>
                    <span className="playlist__trackrow__data">{track.artist}</span>
                    <span className="playlist__trackrow__data">{track.length}</span>
                    {/* <span className="playlist__trackrow__data">{track.src}</span> */}
                    <i className="fab fa-spotify playlist__trackrow__data" />
                </div> 
            )
        })

        return (
            <div className="playlist">
            {allTracks}
                <img className="playlist__albumart" src={this.props.playerState.albumArt} alt="Your Album Art"/>
                <div className="playlist__albumart playlist__trackname">{this.props.playerState.trackName}</div>
            </div>
        )

    }


};



function mapStateToProps(state) {
    return {
        auth: state.auth, 
        playerState: state.playerState
    }
}

export default connect(mapStateToProps, null)(Playlist);