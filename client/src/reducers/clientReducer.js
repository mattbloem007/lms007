import { RECEIVE_CLIENTS, SAVE_CLIENT, VALIDATE_CLIENT } from '../actions/actionTypes'

const clientState = {
  projectError: false,
  nameError: false,
  telError: false,
  addressError: false,
  address2Error: false,
  postCodeError: false,
  contactError: false,
  municipalityError: false,
  name: "",
  tel: "",
  address: "",
  address2: "",
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
      return {...state, ...action.payload
        // name: action.payload.name,
        // tel: action.payload.tel,
        // no: action.payload.no,
        // address: action.payload.address,
        // contact: action.payload.contact,
        // municipality: action.payload.municipality
      }
    case VALIDATE_CLIENT:
      return {...state, ...action.payload}
    default:
      return state;
  }
}
export default clientReducer;
