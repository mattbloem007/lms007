import { VALIDATE_MODERATOR, SAVE_MODERATOR, RESET_MODERATOR } from '../actions/actionTypes';

const moderatorState = {
  name: "",
  surname: "",
  ID: "",
  reg_no: "",
  seta: "",
  expiry_date: "",
  day: "",
  month: "",
  year: "",
  nameError: false,
  surnameError: false,
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
    case RESET_MODERATOR:
      return moderatorState
    default:
      return state;
  }
}
export default moderatorReducer;
