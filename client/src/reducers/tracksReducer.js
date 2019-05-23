import {
  SEARCH_TRACKS, FETCH_TRACKS
} from "../actions/types";

const initialState = {
  current: [],
  searchResults: []
};
export default function(state = initialState, action) {
  switch (action.type) {
    case SEARCH_TRACKS:
      return { ...state, searchResults: action.payload };

    //  case FETCH_TRACKS:
    //   return { ...state, current: action.payload.tracks };
  

    default:
      return state;
  }
}
