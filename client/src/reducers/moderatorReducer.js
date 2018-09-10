import { VALIDATE_MODERATOR, SAVE_MODERATOR } from '../actions/actionTypes';

const moderatorState = {
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

const moderatorReducer = (state = moderatorState, action) => {
  switch (action.type) {
    case VALIDATE_MODERATOR:
      return {...state, ...action.payload}
    case SAVE_MODERATOR:
      return {...state, ...action.payload}
    default:
      return state;
  }
}
export default moderatorReducer;
