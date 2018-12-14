import  { CONNECT_SDK } from '../actions/types';

const initialState = {
    token: "",
    deviceId: "",
    loggedIn: "",
    error: "",
    trackName: "Track Name",
    artistName: "Artist Name",
    albumName: "Album Name",
    playing: false,
    position: 0,
    duration: 0,
};

export default function(state=initialState, action) {
    switch (action.types) {
        case CONNECT_SDK:
            return initialState;
        default:
            return initialState;

    }
}