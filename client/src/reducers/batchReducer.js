import { SAVE_BATCH, UPDATE_BATCH, RECEIVE_BATCH } from '../actions/actionTypes';

const batchState = {
  date: "",
  client_name: "",
  project: "",
  day: "",
  month: "",
  year: "",
  modules: {},
  learnerIDs: [],
  batchs: []
}

const batchReducer = (state = batchState, action) => {
  switch(action.type) {
      case UPDATE_BATCH:
        return {...state, ...action.payload}
      case RECEIVE_BATCH:
        return {...state, batchs: action.payload };
    default:
      return state;
  }
}
export default batchReducer;
