import { FETCH_BATCH, RECEIVE_BATCH } from './actionTypes'

export function receiveInfo(json) {
  console.log("BATCH: ", json.express);
  let newInfo = [];
  let info = {};

  for (var x in json.express) {
    console.log(x + " " + json.express[x].end_date)
    info = {
      batch_no: json.express[x].batch_no,
      date: json.express[x].date,
      end_date: json.express[x].end_date,
      client_name: json.express[x].client_name,
      project: json.express[x].project,
      programme:  json.express[x].programme,
      credit: json.express[x].credit,
      facilitator: json.express[x].facilitator,
      assessor: json.express[x].assessor,
      moderator: json.express[x].moderator,
      assessment_date: json.express[x].assessment_date,
      moderator_date: json.express[x].moderator_date,
      programmeType: json.express[x].programmeType
    }
    newInfo.push(info)
  }

  return {
    type: RECEIVE_BATCH,
    payload: newInfo
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
