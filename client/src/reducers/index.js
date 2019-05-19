import { combineReducers } from "redux";
import authReducer from './authReducer';
import spotifySdkReducer from './spotifySdkReducer';
import tracksReducer from './tracksReducer';
import playlistsReducer from "./playlistsReducer";
import globalPlayerReducer from "./globalPlayerReducer";


export default combineReducers(
    {
        auth: authReducer,
        spotifyState: spotifySdkReducer,
        playlists: playlistsReducer,
        tracks: tracksReducer,
        globalPlayer: globalPlayerReducer
    
    });