// This is a generic player state which only keeps track of "playing" and the _id of the currently playing track.
import {
  UPDATE_GLOBAL_PLAYER,
  PLAY_TRACK,
  PAUSE_TRACK
} from "../actions/types";
const initialState = {
  playing: false,
  currentTrackId: null,
  currentPlaylistId: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PLAY_TRACK:
      return {
        ...state,
        playing: action.payload.playing,
        currentTrackId: action.payload.currentTrackId,
        currentPlaylistId: action.payload.currentPlaylistId
      };

    case PAUSE_TRACK:
      return {
        ...state,
        playing: action.payload.playing
      };
    default:
      return state;
  }
}
