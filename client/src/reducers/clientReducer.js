import { RECEIVE_QP, RECEIVE_SC, RECEIVE_QPM, RECEIVE_US, RECEIVE_SP, RECEIVE_SPM, RECEIVE_CLIENTS, SAVE_CLIENT, VALIDATE_CLIENT, RELOAD, RESET_CLIENT } from '../actions/actionTypes'

const clientState = {
  projectError: false,
  nameError: false,
  telError: false,
  addressError: false,
  address2Error: false,
  postCodeError: false,
  contactError: false,
  municipalityError: false,
  programme_nameError: false,
  facilitatorError: false,
  assessorError: false,
  moderatorError: false,
  programmeTypeError: false,
  saved: false,
  success: false,
  name: "",
  tel: "",
  address: "",
  address2: "",
  address3: "",
  postCode: "",
  contact: "",
  municipality: "",
  clients: [],
  qp: [],
  qpm: [],
  us: [],
  sp: [],
  spm: [],
  sc: [],
  clientError: false,
  dayError: false,
  monthError: false,
  yearError: false,
  errors: true
}

const clientReducer = (state = clientState, action) => {
  switch (action.type) {
    case RECEIVE_CLIENTS:
      return {...state, clients: action.payload };
    case SAVE_CLIENT:
      return {...state, ...action.payload}
    case VALIDATE_CLIENT:
      return {...state, ...action.payload}
    case RELOAD:
      return clientState
    case SUCCESS:
      return {...state, success: action.payload}
    case RESET_CLIENT:
      return clientState
    case RECEIVE_QP:
      return {...state, qp: action.payload}
    case RECEIVE_QPM:
      return {...state, qpm: action.payload}
    case RECEIVE_US:
      return {...state, us: action.payload}
    case RECEIVE_SP:
      return {...state, sp: action.payload}
    case RECEIVE_SPM:
      return {...state, spm: action.payload}
    case RECEIVE_SC:
      return {...state, sc: action.payload}
    default:
      return state;
  }
}
export default clientReducer;
