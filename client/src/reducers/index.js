import { combineReducers } from "redux";
import authReducer from './authReducer';
import spotifySdkReducer from './spotifySdkReducer';
import searchReducer from './searchReducer';
import playlistsReducer from "./playlistsReducer";
import globalPlayerReducer from "./globalPlayerReducer";


export default combineReducers(
    {
        auth: authReducer,
        spotifyState: spotifySdkReducer,
        playlists: playlistsReducer,
        search: searchReducer,
        globalPlayer: globalPlayerReducer
    
    });