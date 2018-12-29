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

    renderTracks() {
        const allTracks = tracks.map(track => {
            return (
                <div className="playlist__trackrow">
                    <div className="playlist__trackrow--white">
                        <span className="playlist__data">{track.order}.</span>
                        <span className="playlist__data">{track.name}</span>
                    </div>
                    <div className="playlist__trackrow--grey">
                        <span className="playlist__data">{track.artist}</span>
                        <span className="playlist__data playlist__data--duration">{track.length}</span>
                        <span className='playlist__data'><i className="fab fa-spotify" /></span>
                    </div>        
             
                </div>               
            )
        })

        return allTracks;
    }

    render() {
        return (
            <div className="playlist">
                <div className="playlist__column1">
                {this.renderTracks()}
                </div>

                <div className="playlist__column2">
                    <div className="playlist__playlistname">Playlist 1</div>
                    <img className="playlist__albumart" src={this.props.playerState.albumArt} alt="Your Album Art"/>
                    <div className="playlist__trackname">{this.props.playerState.trackName}</div>
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