import axios from "axios";
import { 
  FETCH_USER,
  UPDATE_PLAYER,
  UPDATE_DEVICE_ID,
} from "./types";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const updatePlayer = (playerState) => dispatch => {
  // console.log("updatePlayer action called. Here's the playerState object it was passed:", playerState);
  
  dispatch({type: UPDATE_PLAYER, payload: playerState})
}

export const updateDeviceId = (device_id) => dispatch => {

  dispatch({type: UPDATE_DEVICE_ID, payload: device_id});
}


