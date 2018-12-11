import { SUCCESS, EDIT_MODERATOR, VALIDATE_MODERATOR, SAVE_MODERATOR, RESET_MODERATOR, RECEIVE_MODERATORS } from '../actions/actionTypes';

const moderatorState = {
  name: "",
  surname: "",
  ID: "",
  Reg_no: "",
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
  errors: false,
  moderators: [],
  type: "add",
  success: false

}

const moderatorReducer = (state = moderatorState, action) => {
  switch (action.type) {
    case VALIDATE_MODERATOR:
      return {...state, ...action.payload}
    case SAVE_MODERATOR:
      return {...state, ...action.payload}
    case RECEIVE_MODERATORS:
      return {...state, moderators: action.payload}
    case RESET_MODERATOR:
      return moderatorState
    case EDIT_MODERATOR:
      return {...state, ...action.payload}
    case SUCCESS:
      return {...state, success: action.payload}
    default:
      return state;
  }
}
export default moderatorReducer;
