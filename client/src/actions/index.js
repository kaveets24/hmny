import axios from "axios";
import {
  FETCH_USER,
  UPDATE_SPOTIFY_PLAYER,
  UPDATE_DEVICE_ID,
  UPDATE_SPOTIFY_VOLUME,
  FETCH_PLAYLISTS,
  SET_CURRENT_PLAYLIST,
  FETCH_TRACKS,
  SEARCH_TRACKS,
  ADD_PLAYLIST,
  ADD_TRACK_TO_PLAYLIST,
  REMOVE_TRACK_FROM_PLAYLIST,

  // globalPlayer
  PLAY_TRACK,
  PAUSE_TRACK,
  UPDATE_GLOBAL_VOLUME,
} from "./types";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchPlaylists = () => async dispatch => {
  const res = await axios.get("/api/playlists/view");
  dispatch({ type: FETCH_PLAYLISTS, payload: res.data });
};

// export const fetchTracks = playlistId => async dispatch => {
//   const reqBody = {
//     playlistId
//   };
//   const res = await axios.put("/api/tracks/view", reqBody);

//   dispatch({ type: FETCH_TRACKS, payload: res.data });
// };

export const searchTracks = query => async dispatch => {
  console.log(query);
  if (query.inputText !== "") {
    const res = await axios.put("/api/findtrack", {
      query
    });
    dispatch({
      type: SEARCH_TRACKS,
      payload: res.data
    });
  } else {
    dispatch({
      type: SEARCH_TRACKS,
      payload: []
    })
  }

    
 
};

export const addTrackToPlaylist = (track, playlistId) => async dispatch => {
  const reqBody = {
    track,
    playlistId
  };
  const res = await axios.post("/api/tracks/new", reqBody);
  dispatch({ type: ADD_TRACK_TO_PLAYLIST, payload: res.data });
};

export const removeTrackFromPlaylist = (
  track,
  playlistId
) => async dispatch => {
  const reqBody = {
    track,
    playlistId
  };
  const res = await axios.post("/api/tracks/remove", reqBody);

  dispatch({ type: REMOVE_TRACK_FROM_PLAYLIST, payload: res.data });
};
export const setCurrentPlaylist = playlist => async dispatch => {
  const reqBody = {
    playlistId: playlist._id
  };
  const res = await axios.put("/api/tracks/view", reqBody);
  dispatch({ type: SET_CURRENT_PLAYLIST, payload: res.data });
  dispatch({ type: FETCH_TRACKS, payload: res.data });
};

export const addPlaylist = formData => async dispatch => {
  const res = await axios.post("/api/playlists/new", {
    name: formData.name,
    description: formData.description,
    artwork: formData.artwork
  });

  dispatch({ type: ADD_PLAYLIST, payload: res.data });
};

export const playTrack = (track, trackIndex, position) => async dispatch => {
  await axios.get("/api/pause");
  const res = await axios.put("/api/play", {
    spotifyUri: track.spotifyUri,
    position_ms: position,
    youtubeUri: track.youtubeUri,
    source: track.source
  });
  let globalPlayer = {
    playing: true,
    position,
    currentTrack: {
      id: track._id,
      index: trackIndex,
      spotifyUri: track.spotifyUri,
      youtubeUri: track.youtubeUri
    }
  };

  dispatch({ type: PLAY_TRACK, payload: globalPlayer });
};

export const pauseTrack = (track, position) => async dispatch => {
  let globalPlayer = {
    playing: false,
    position
  };
  axios.get("/api/pause");

  dispatch({ type: PAUSE_TRACK, payload: globalPlayer });
};

// Spotify Actions
export const updateSpotifyPlayer = playerState => dispatch => {
  // console.log("updatePlayer action called. Here's the playerState object it was passed:", playerState);

  dispatch({ type: UPDATE_SPOTIFY_PLAYER, payload: playerState });
};

export const updateDeviceId = device_id => dispatch => {
  dispatch({ type: UPDATE_DEVICE_ID, payload: device_id });
};

export const updateVolume = (player, volume, currentTrack) => async dispatch => {

  if (currentTrack.spotifyUri) {
    await player.setVolume(volume / 100);
    const getVolume = await player.getVolume();
    dispatch({ type: UPDATE_SPOTIFY_VOLUME, payload: getVolume });
  }

  dispatch({ type: UPDATE_GLOBAL_VOLUME, payload: volume });
};

export const requestNewSpotifyToken = () => async dispatch => {
  await axios.get("/auth/refresh_token");
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};
