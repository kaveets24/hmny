import axios from "axios";
import { 
  FETCH_USER,
  UPDATE_PLAYER,
  UPDATE_DEVICE_ID,
  UPDATE_VOLUME,
  FETCH_PLAYLISTS
} from "./types";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
  
};

export const fetchPlaylists = () => async dispatch => {
  const res = await axios.get("/playlists/view");
  dispatch({ type: FETCH_PLAYLISTS, payload: res.data });
  console.log("RES.DATA FROM action:", res.data);
};

export const updatePlayer = (playerState) => dispatch => {
  // console.log("updatePlayer action called. Here's the playerState object it was passed:", playerState);
  
  dispatch({type: UPDATE_PLAYER, payload: playerState})
}

export const updateDeviceId = (device_id) => dispatch => {

  dispatch({type: UPDATE_DEVICE_ID, payload: device_id});
}

export const updateVolume = (player, volume) => async dispatch => {
  await player.setVolume(volume);
  const getVolume = await player.getVolume();
  
    dispatch({type: UPDATE_VOLUME, payload: getVolume})
};

export const requestNewSpotifyToken = () => async dispatch => {
  await axios.get('/auth/refresh_token');
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });

}


