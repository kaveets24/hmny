import { combineReducers } from "redux";
import authReducer from './authReducer';
import spotifySdkReducer from './spotifySdkReducer';
import tracksReducer from './tracksReducer';
import playlistsReducer from "./playlistsReducer";


export default combineReducers(
    {
        auth: authReducer,
        playerState: spotifySdkReducer,
        playlists: playlistsReducer,
        tracks: tracksReducer
    
    });