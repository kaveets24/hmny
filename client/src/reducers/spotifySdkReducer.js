import { UPDATE_PLAYER, UPDATE_DEVICE_ID } from '../actions/types';

const initialState = {
    deviceId: "",
    error: "",
    trackName: "Track Name",
    artistName: "Artist Name",
    albumName: "Album Name",
    playing: false,
    position: 0,
    duration: 0,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_PLAYER:
            return Object.assign({}, state, action.payload);

        case UPDATE_DEVICE_ID:
            return { ...state, deviceId: action.payload };

        default:
            return state;

    }
}