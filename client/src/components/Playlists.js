import React from 'react';

const Playlists = () => {
    const playlistNames = ["Playlist 1","Playlist 2","Playlist 3", "Playlist 4", "Playlist 5", "Playlist 1","Playlist 2","Playlist 3", "Playlist 4", "Playlist 5"];
    
    const allPlaylists = playlistNames.map((playlist) => {
        return <div key={playlist} className="main__item">{playlist}</div>
    })

    return (
        <div className="main__grid">{allPlaylists}</div>
    )

}

export default Playlists;