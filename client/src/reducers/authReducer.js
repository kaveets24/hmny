import { FETCH_USER } from '../actions/types';

export default function(state = null, action ) {
    switch (action.type) {
        case FETCH_USER: //looks for req.user session object stored by passport
            return action.payload || false;
        default:
            return state;
    }

}