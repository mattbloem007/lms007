import { AUTH, LOGOUT, GET_USER } from '../actions/actionTypes';

const loginState = {
  username: "",
  password: "",
  auth: false
}

const loginReducer = (state = loginState, action) => {
  switch (action.type) {
    case GET_USER:
      return {...state, auth: action.payload}
    case LOGOUT:
      return {...state, auth: action.payload}
    case AUTH:
      return {...state, auth: action.payload}
    default:
      return state;
  }
}
export default loginReducer;
