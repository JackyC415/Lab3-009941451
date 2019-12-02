import axios from "axios";
import {ERROR, SUCCESS} from "./action-types";

export const register = (data, history) => dispatch => {
  axios.post("/register", data)
    .then(res => 
      dispatch({type: SUCCESS, payload: res.data}), history.push("/login"))
    .catch(err => 
      dispatch({type: ERROR, payload: err})
    );
};