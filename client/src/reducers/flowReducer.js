import { ACTIVE_ITEM, ACTIVE_STEP, COMPLETED, RECEIVE, CONFIRM } from '../actions/actionTypes';
import initialState from './initialState'

const flowReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIVE_ITEM:
      return {...state, activeItem: action.payload };
    case ACTIVE_STEP:
      return {...state, activeStep: action.payload };
    case COMPLETED:
      return {...state, completed: action.payload };
    case RECEIVE:
      return {...state, response: action.payload };
    case CONFIRM:
      return {...state, completed: true, activeItem: action.payload }
    default:
      return state;
  }
}
export default flowReducer;
