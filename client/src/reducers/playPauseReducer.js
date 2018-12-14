import PLAY_PAUSE from '../actions/types';

export default function (state = playerState, action) {
    switch (action.type) {
        case PLAY_PAUSE:
            return action.payload;
        default:
            return state;
    }
}
