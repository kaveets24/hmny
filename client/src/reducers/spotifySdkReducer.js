import  { UPDATE_PLAYER } from '../actions/types';

const playerState = {
    // deviceId: "",
    // error: "",
    trackName: "Track Name",
    artistName: "Artist Name",
    albumName: "Album Name",
    playing: false,
    position: 0,
    duration: 0,
};

export default function(state=playerState, action) {
    switch (action.type) {
        case UPDATE_PLAYER:
            return action.payload;
        default:
            return playerState;

    }
}