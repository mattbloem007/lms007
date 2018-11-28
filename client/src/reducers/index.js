import { combineReducers } from 'redux';
import flowReducer from './flowReducer';
import clientReducer from './clientReducer';
import batchReducer from './batchReducer';
import programmeReducer from './programmeReducer'
import facilitatorReducer from './facilitatorReducer'
import assessorReducer from './assessorReducer'
import moderatorReducer from './moderatorReducer'
import learnerReducer from './learnerReducer'
import tableReducer from './tableReducer'
import loginReducer from './loginReducer'

const rootReducer = combineReducers({
  flow: flowReducer,
  client: clientReducer,
  batch: batchReducer,
  programme: programmeReducer,
  facilitator: facilitatorReducer,
  assessor: assessorReducer,
  moderator: moderatorReducer,
  learner: learnerReducer,
  table: tableReducer,
  login: loginReducer
});

export default rootReducer;
