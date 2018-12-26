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
        name: "A super long name: Track_2 (featuring pdiddy and young spanky IV)",
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
                    <span className='playlist__trackrow__data'><i className="fab fa-spotify" /></span>
                </div> 
            )
        })

        return (
            <div className="playlist">
            {allTracks}
            <div className="playlist__currenttrack">
                <div className="playlist__currenttrack__playlistname">Playlist 1</div>
                <img className="playlist__currenttrack__albumart" src={this.props.playerState.albumArt} alt="Your Album Art"/>
                <div className="playlist__currenttrack__trackname">{this.props.playerState.trackName}</div>
            </div>
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