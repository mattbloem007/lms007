import { EDIT_FACILITATOR, VALIDATE_FACILITATOR, SAVE_FACILITATOR, RESET_FACILITATOR, RECEIVE_FACILITATORS } from '../actions/actionTypes';

const facilitatorState = {
  name: "",
  surname: "",
  ID: "",
  Cell_no: "",
  nameError: false,
  surnameError: false,
  IDError: false,
  cellnoError: false,
  facilitators: [],
  type: "add",
  success: false
}

const facilitatorReducer = (state = facilitatorState, action) => {
  switch (action.type) {
    case VALIDATE_FACILITATOR:
      return {...state, ...action.payload}
    case SAVE_FACILITATOR:
      return {...state, ...action.payload}
    case RECEIVE_FACILITATORS:
      return {...state, facilitators: action.payload}
    case RESET_FACILITATOR:
      return facilitatorState
    case EDIT_FACILITATOR:
      return {...state, ...action.payload}
    default:
      return state;
  }
}
export default facilitatorReducer;
