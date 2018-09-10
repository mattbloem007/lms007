import { ACTIVE_ITEM, ACTIVE_STEP, COMPLETED, RECEIVE, SAVE_BATCH, CONFIRM } from './actionTypes';

export const changeActiveItem = activeItem => ({ type: ACTIVE_ITEM, payload: activeItem });
export const changeActiveStep = activeStep => ({ type: ACTIVE_STEP, payload: activeStep });
export const isCompleted = complete => ({ type: COMPLETED, payload: complete });
export function receiveInfo(json) {
  console.log(json)
  return {
    type: RECEIVE,
    payload: json
  }
}
export const confirmPost = (json, form) => ({ type: CONFIRM, payload: form });
export const save = info => ({type: SAVE_BATCH, payload: info});
export const fetchInfo = () => {
  return dispatch => {
    return fetch('/api/lms_client')
    .then(res =>  res.json())
    .then(body => console.log(body))
    .then(json => dispatch(receiveInfo(json)));
  }
}
export const saveInfo = (form, info, prev) => {
  let rep = {};
  rep["table"] = "lms_" + prev;
  for (var i in info) {
    rep[i] = info[i];
  }
  let req = '/data/' + rep["table"];
  return dispatch => {
    return fetch(req, {
      method: 'POST',
      body: JSON.stringify(rep),
      headers: {"Content-Type": "application/json"}
    })
    .then(response => response.json())
    .then(json => dispatch(confirmPost(json, form)))
  }
}
