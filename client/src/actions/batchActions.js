import { FETCH_BATCH, RECEIVE_BATCH } from './actionTypes'

export function receiveInfo(json) {
  return {
    type: RECEIVE_BATCH,
    payload: json.express
  }
}

export const fetchBatch = () => {
  return dispatch => {
    return fetch('/api/lms_batch')
    .then(res =>  res.json())
    .then(json => {
      console.log(json)
      dispatch(receiveInfo(json))
    });
  }
}
