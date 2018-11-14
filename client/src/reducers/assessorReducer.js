import { VALIDATE_ASSESSOR, SAVE_ASSESSOR, RESET_ASSESSOR } from '../actions/actionTypes';

const assessorState = {
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
  dayError: false,
  yearError: false,
  monthError: false,
  errors: false
}

const assessorReducer = (state = assessorState, action) => {
  switch (action.type) {
    case VALIDATE_ASSESSOR:
      return {...state, ...action.payload}
    case SAVE_ASSESSOR:
      return {...state, ...action.payload}
    case RESET_ASSESSOR:
      return assessorState
    default:
      return state;
  }
}
export default assessorReducer;
