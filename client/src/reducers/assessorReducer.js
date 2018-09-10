import { VALIDATE_ASSESSOR, SAVE_ASSESSOR } from '../actions/actionTypes';

const assessorState = {
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

const assessorReducer = (state = assessorState, action) => {
  switch (action.type) {
    case VALIDATE_ASSESSOR:
      return {...state, ...action.payload}
    case SAVE_ASSESSOR:
      return {...state, ...action.payload}
    default:
      return state;
  }
}
export default assessorReducer;
