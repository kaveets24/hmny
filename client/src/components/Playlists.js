import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Playlists = () => {
    const playlistNames = ["Playlist 1","Playlist 2","Playlist 3", "Playlist 4", "Playlist 5", "Playlist 6","Playlist 7","Playlist 8", "Playlist 9", "Playlist 10"];
    
    const allPlaylists = playlistNames.map((playlist) => {
        return (
            <Link to={`/${playlist}`.replace(' ','_')}>
                <div key={playlist} className="main__item">{playlist}</div>
            </Link>
        )
    })

    return (
        <div className="main__grid">{allPlaylists}</div>
    )

}
function mapStateToProps({ auth }) {
    return { auth };

}
export default connect(mapStateToProps)(Playlists);
