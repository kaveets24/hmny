// This is a generic player state which only keeps track of "playing" and the _id of the currently playing track.
import {
  UPDATE_GLOBAL_VOLUME,
  PLAY_TRACK,
  PAUSE_TRACK
} from "../actions/types";
const initialState = {
  playing: false,
  volume: 100,
  position: 0,
  currentTrack: {
    id: null, 
    index: null,
    spotifyUri: null,
    youtubeUri: null
  },
  currentPlaylist: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PLAY_TRACK:
      return {
        ...state,
        playing: action.payload.playing,
        position: action.payload.position,
        currentTrack: {
          id: action.payload.currentTrack.id,
          index: action.payload.currentTrack.index,
          spotifyUri: action.payload.currentTrack.spotifyUri,
          youtubeUri: action.payload.currentTrack.youtubeUri
        }
      };

    case PAUSE_TRACK:
      return {
        ...state,
        playing: action.payload.playing, 
        position: action.payload.position
      };

    case UPDATE_GLOBAL_VOLUME:
        return {
          ...state, volume: parseInt(action.payload)
        }
    default:
      return state;
  }
}
