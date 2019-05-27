import {
  SEARCH_TRACKS
} from "../actions/types";

const initialState = {
  results: []
};
export default function(state = initialState, action) {
  switch (action.type) {
    case SEARCH_TRACKS:
      return { ...state, results: action.payload };
  

    default:
      return state;
  }
}
