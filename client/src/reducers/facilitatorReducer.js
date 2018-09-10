import { VALIDATE_FACILITATOR, SAVE_FACILITATOR } from '../actions/actionTypes';

const facilitatorState = {
  name: "",
  ID: "",
  reg_no: "",
  seta: "",
  expiry_date: "",
  nameError: false,
  IDError: false,
  reg_noError: false,
  setaError: false,
  errors: false
}

const facilitatorReducer = (state = facilitatorState, action) => {
  switch (action.type) {
    case VALIDATE_FACILITATOR:
      return {...state, ...action.payload}
    case SAVE_FACILITATOR:
      return {...state, ...action.payload}
    default:
      return state;
  }
}
export default facilitatorReducer;
