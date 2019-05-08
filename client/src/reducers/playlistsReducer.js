import {
  FETCH_PLAYLISTS,
  SET_CURRENT_PLAYLIST,
  ADD_TRACK_TO_PLAYLIST,
  REMOVE_TRACK_FROM_PLAYLIST
} from "../actions/types";

const initialState = {
  all: [],
  current: []
};
export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_PLAYLISTS:
      console.log("FETCH_PLAYLISTS", { ...state, all: action.payload });
      return { ...state, all: action.payload };
    case SET_CURRENT_PLAYLIST:
      console.log("SET_CURRENT_PLAYLISTS", {
        ...state,
        current: action.payload
      });
      return { ...state, current: action.payload };
    case ADD_TRACK_TO_PLAYLIST:
      console.log("ADD_TRACK_TO_PLAYLIST", {
        ...state,
        current: action.payload
      });
      return { ...state, current: action.payload };
    case REMOVE_TRACK_FROM_PLAYLIST:
      console.log("REMOVE_TRACK_FROM_PLAYLIST", {
        ...state,
        current: action.payload
      });
      return { ...state, current: action.payload };

    default:
      return state;
  }
}
