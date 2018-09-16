import { ACTIVE_TABLE, ADD_LEARNERS, RECEIVE_BATCH_LEARNERS, RECEIVE_BATCH_LEARNERIDS, CLEAR_BATCH_LEARNERS } from './actionTypes'
var json2xls = require('json2xls');
var fs = require('fs');

export const changeActiveTable = activeTable => ({ type: ACTIVE_TABLE, payload: activeTable });
export const addLearners = (activeTable, batchNo) => ({ type: ADD_LEARNERS, payload: activeTable, batch: batchNo })
export const clearBatchLearners = () => ({ type: CLEAR_BATCH_LEARNERS })
export function receiveInfo(json) {
  return {
    type: RECEIVE_BATCH_LEARNERIDS,
    payload: json.express
  }
}
export function receiveLearners(json) {
  return {
    type: RECEIVE_BATCH_LEARNERS,
    payload: json.express
  }
}

export const downloadExcel = (batchs) => {
  return dispatch => {
    // var xls = json2xls(batchs);
    // fs.writeFileSync('data.xlsx', xls, 'binary');
    return fetch('/', {
      method: 'POST',
      body: JSON.stringify(batchs),
      headers: {"Content-Type": "application/json"}
    })
    .then(res => console.log(res))
    .then(json => {console.log(json)});
  }
}


  export const fetchBatchLearnerIDs = (batch_no) => {
    return (dispatch, getState) => {
      return fetch('/api/learner_batch', {
        method: 'POST',
        body: JSON.stringify({batch_no: batch_no}),
        headers: {"Content-Type": "application/json"}
      })
      .then(res =>  res.json())
      .then(json => {
        console.log(json)
        dispatch(receiveInfo(json))
        const state = getState();
        console.log(state.table)
        for(var i in state.table.batchLearnerIDs) {
          dispatch(fetchBatchLearners(state.table.batchLearnerIDs[i]))
        }

      });
    }
  }

  export const fetchBatchLearners = (info) => {
    return dispatch => {
        return fetch('/api/learner_batch2', {
          method: 'POST',
          body: JSON.stringify({ ID: info }),
          headers: {"Content-Type": "application/json"}
        })
        .then(res => res.json())
        .then(json => {
          console.log(json)
          dispatch(receiveLearners(json))
        })
    }
  }
