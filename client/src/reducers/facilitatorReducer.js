import { VALIDATE_FACILITATOR, SAVE_FACILITATOR, RESET_FACILITATOR } from '../actions/actionTypes';

const facilitatorState = {
  name: "",
  ID: "",
  cellno: "",
  nameError: false,
  IDError: false,
  cellnoError: false
}

const facilitatorReducer = (state = facilitatorState, action) => {
  switch (action.type) {
    case VALIDATE_FACILITATOR:
      return {...state, ...action.payload}
    case SAVE_FACILITATOR:
      return {...state, ...action.payload}
    case RESET_FACILITATOR:
      return facilitatorState
    default:
      return state;
  }
}
export default facilitatorReducer;
