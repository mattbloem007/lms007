import { FETCH_BATCH, RECEIVE_BATCH, DELETE, EDIT_BATCH } from './actionTypes'
import { months } from '../common'

export const editBatch = (batch) => {
  return dispatch => {
    let adate = new Date(batch.assessment_date)
    let date = new Date(batch.date)
    let end_date = new Date(batch.end_date)
    let mdate = new Date(batch.moderator_date)
    let abool = false;
    let ebool = false;
    let mbool = false;

    if (adate == "Invalid Date") {
      abool = true;
    }
    if (end_date == "Invalid Date") {
      ebool = true;
    }
    if (mdate == "Invalid Date") {
      mbool = true;
    }

    let newInfo = {...batch,
                  programme_name: batch.programme,
                  type: "edit-c",
                  aday: abool ? "" : adate.getDate().toString(),
                  amonth: abool ? "" : months[adate.getMonth()].text,
                  ayear: abool ? "" : adate.getFullYear().toString(),
                  day: date.getDate().toString(),
                  month: months[date.getMonth()].text,
                  year: date.getFullYear().toString(),
                  endday: ebool ? "" : end_date.getDate().toString(),
                  endmonth: ebool ? "" : months[end_date.getMonth()].text,
                  endyear: ebool ? "" : end_date.getFullYear().toString(),
                  mday: mbool ? "" : mdate.getDate().toString(),
                  mmonth: mbool ? "" : months[mdate.getMonth()].text,
                  myear: mbool ? "" : mdate.getFullYear().toString()
                };

        console.log(newInfo)
        dispatch(edit(newInfo))
    return Promise.resolve()
  }
}

export const edit = (batch) => ({type: EDIT_BATCH, payload: batch})

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
      venue: json.express[x].venue,
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

export const Delete = (rows) => {
  return dispatch => {
    return fetch("/api/deleteBatch", {
         method: 'POST',
         body: JSON.stringify(rows),
         headers: {"Content-Type": "application/json"}
       })
       .then(function(response){
         return response.json()
       }).then(function(body){
         console.log(body);
     });

  }
  return Promise.resolve();
}
