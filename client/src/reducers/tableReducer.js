import { ACTIVE_TABLE, ADD_LEARNERS, RECEIVE_BATCH_LEARNERS, RECEIVE_BATCH_LEARNERIDS, CLEAR_BATCH_LEARNERS } from '../actions/actionTypes'

const tableState = {
  activeTable: "batch",
  batch: '',
  batchLearners: [],
  batchLearnerIDs: []
}

const tableReducer = (state = tableState, action) => {
  switch(action.type) {
    case ACTIVE_TABLE:
      return {...state, activeTable: action.payload };
    case ADD_LEARNERS:
      return {...state, activeTable: action.payload, batch: action.batch}
    case RECEIVE_BATCH_LEARNERS:
      let found = false;
      console.log(action.payload);
      state.batchLearners.map(learners => {
        if (learners.national_id == action.payload[0].national_id) {
          found = true;
        }
      })
      if (found == false) {
        return {...state, batchLearners: [...state.batchLearners, ...action.payload] }
      }
      else {
        return state
      }
    case RECEIVE_BATCH_LEARNERIDS:
      let learnerIDs = [];
      for (var x in action.payload) {
        learnerIDs.push(action.payload[x].learner_ID)
      }
      return {...state, batchLearnerIDs: learnerIDs}
    case CLEAR_BATCH_LEARNERS:
        return {...state, batchLearners: []}
    default:
      return state
  }
}

export default tableReducer;
