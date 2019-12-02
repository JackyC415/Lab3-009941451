import {ERROR, SUCCESS} from "../actions/action-types";

const initialState = {};
export default function(state = initialState, action) {
  switch (action.type) {
    case ERROR:
      return action.payload;
    case SUCCESS:
      return action.payload;
    default:
      return state;
  }
}