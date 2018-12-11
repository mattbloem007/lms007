import { EDIT_ASSESSOR, VALIDATE_ASSESSOR, SAVE_ASSESSOR, RESET_ASSESSOR, RECEIVE_ASSESSORS, SUCCESS } from '../actions/actionTypes';

const assessorState = {
  name: "",
  surname: "",
  ID: "",
  Reg_no: "",
  SETA: "",
  expiry_date: "",
  day: "",
  month: "",
  year: "",
  nameError: false,
  surnameError: false,
  IDError: false,
  reg_noError: false,
  setaError: false,
  dayError: false,
  yearError: false,
  monthError: false,
  errors: false,
  assessors: [],
  type: "add",
  success: false
}

const assessorReducer = (state = assessorState, action) => {
  switch (action.type) {
    case VALIDATE_ASSESSOR:
      return {...state, ...action.payload}
    case SAVE_ASSESSOR:
      return {...state, ...action.payload}
    case RECEIVE_ASSESSORS:
      return {...state, assessors: action.payload}
    case RESET_ASSESSOR:
      return assessorState
    case EDIT_ASSESSOR:
      return {...state, ...action.payload}
    case SUCCESS:
      return {...state, success: action.payload}
    default:
      return state;
  }
}
export default assessorReducer;
