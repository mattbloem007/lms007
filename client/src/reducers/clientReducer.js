import { RECEIVE_CLIENTS, SAVE_CLIENT, VALIDATE_CLIENT, RELOAD, RESET_CLIENT } from '../actions/actionTypes'

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
  name: "",
  tel: "",
  address: "",
  address2: "",
  address3: "",
  postCode: "",
  contact: "",
  municipality: "",
  clients: [],
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
    case RESET_CLIENT:
      return clientState
    default:
      return state;
  }
}
export default clientReducer;
