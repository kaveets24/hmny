import { FETCH_TRACKS, SEARCH_TRACKS } from "../actions/types";

const initialState = {
  current: [],
  searchResults: []
};
export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_TRACKS:
      return { ...state, current: action.payload };
    case SEARCH_TRACKS:
      return { ...state, searchResults: action.payload };

    default:
      return state;
  }
}