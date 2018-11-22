import React from 'react';

const Playlists = () => {
    const playlistNames = ["Playlist 1","Playlist 2","Playlist 3", "Playlist 4", "Playlist 5" ];
    const allPlaylists = playlistNames.map((playlist) => {
        return <li key={playlist} className="main__li">{playlist}</li>
    })

    return (
        <ul className="main__ul">{allPlaylists}</ul>
    )

}

export default Playlists;