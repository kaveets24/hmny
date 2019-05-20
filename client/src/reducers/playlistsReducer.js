import {
  FETCH_PLAYLISTS,
  SET_CURRENT_PLAYLIST,
  ADD_TRACK_TO_PLAYLIST,
  REMOVE_TRACK_FROM_PLAYLIST,
  ADD_PLAYLIST
} from "../actions/types";

const initialState = {
  all: [],
  current: {}
};
export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_PLAYLISTS:
      return { ...state, all: action.payload };

    case ADD_PLAYLIST:
      return { ...state, all: action.payload };

    case SET_CURRENT_PLAYLIST:
      console.log("SET_CURRENT_PLAYLIST", {
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
