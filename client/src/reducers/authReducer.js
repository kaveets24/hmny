import { FETCH_USER, FETCH_PLAYLISTS } from '../actions/types';

export default function(state = null, action ) {
    switch (action.type) {
        case FETCH_USER: //looks for req.user session object stored by passport
            return action.payload || false;
        
        case FETCH_PLAYLISTS: //makes a call to the database to get the most updated user playlists.
            return action.payload;
        default:
            return state;
    }

}