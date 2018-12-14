import { combineReducers } from "redux";
import authReducer from './authReducer';
import spotifySdkReducer from './spotifySdkReducer';


export default combineReducers(
    {
        auth: authReducer,
        playerState: spotifySdkReducer
    
    });