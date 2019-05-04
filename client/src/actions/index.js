import axios from "axios";
import { 
  FETCH_USER,
  UPDATE_PLAYER,
  UPDATE_DEVICE_ID,
  UPDATE_VOLUME,
  FETCH_PLAYLISTS,
  SET_CURRENT_PLAYLIST,
  FETCH_TRACKS,
  SEARCH_TRACKS,
  ADD_TRACK_TO_PLAYLIST
} from "./types";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
  
};

export const fetchPlaylists = () => async dispatch => {
  const res = await axios.get("/api/playlists/view");
  dispatch({ type: FETCH_PLAYLISTS, payload: res.data });
};

export const fetchTracks = () => async dispatch => {
  const res = await axios.get("/api/tracks/view");
  dispatch({ type: FETCH_TRACKS, payload: res.data });
};

export const searchTracks = (query) => async dispatch => {
  const res = await axios.put('/api/findtrack', {
    query
  });
  dispatch({ type: SEARCH_TRACKS, payload: res.data });
};

export const addTrackToPlaylist = (track, playlist) => async dispatch => {
  const newTrack = {
    
  }
  const res = await axios.post("/api/tracks/new",  )
  dispatch({ type: ADD_TRACK_TO_PLAYLIST, payload: playlist });
}
export const setCurrentPlaylist = (playlist) => async dispatch => {
  dispatch({ type: SET_CURRENT_PLAYLIST, payload: playlist });
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


