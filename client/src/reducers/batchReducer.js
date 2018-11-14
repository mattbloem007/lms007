import { SAVE_BATCH, UPDATE_BATCH, RECEIVE_BATCH, RELOAD } from '../actions/actionTypes';

const batchState = {
  date: "",
  client_name: "",
  project: "",
  day: "",
  month: "",
  year: "",
  aday: "",
  amonth: "",
  ayear: "",
  mday: "",
  mmonth: "",
  myear: "",
  credit: "non-credit",
  facilitator: [],
  moderator: [],
  assessor: [],
  programme_name: "",
  programmeType: "",
  us: "",
  qp: "",
  sp: "",
  sc: "",
  qpms: [],
  spms: [],
  modules: {},
  learnerIDs: [],
  saved: false,
  success: false,
  batchs: []
}

const batchReducer = (state = batchState, action) => {
  switch(action.type) {
      case UPDATE_BATCH:
        return {...state, ...action.payload}
      case RECEIVE_BATCH:
        return {...state, batchs: action.payload };
      case RELOAD:
        return batchState
    default:
      return state;
  }
}
export default batchReducer;
