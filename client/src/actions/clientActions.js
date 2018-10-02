import { FETCH_CLIENTS, RECEIVE_CLIENTS, VALIDATE_CLIENT, SAVE_CLIENT, UPDATE_CLIENT, UPDATE_BATCH, RELOAD, RESET_CLIENT } from './actionTypes'
import { isEmpty, isNumeric, isAlpha, isMobilePhone, isLength } from 'validator';
import { changeActiveStep } from './flowActions'
import _ from 'lodash'

// export const receiveInfo = json => (console.log(json)
// { type: RECEIVE, payload: json }
// );
export function receiveInfo(json) {
  console.log(json.express)
  let sorted = _.orderBy(json.express, ['name'],['asc']);
  console.log(sorted)
  let clientsArr = [];
  for (const key of Object.keys(sorted)) {
    clientsArr = [...clientsArr, Object.assign({text: sorted[key].name, value: sorted[key].name})]
  }
  console.log(clientsArr)
  return {
    type: RECEIVE_CLIENTS,
    payload: clientsArr
  }
}
export const updateClient = (info) => {
  return (dispatch, getState) => {
    let newInfo = {};
    for(var key in info) {
      if (info[key] != "") {
        newInfo = {...newInfo, [key]: info[key]}
      }
    }
    console.log(newInfo)
    dispatch(save(newInfo))
    const state = getState();
    dispatch(validateInput(state.client))
  }
}

export const updateBatchClient = (info) => {
  return (dispatch, getState) => {
    let newInfo = {};
    for(var key in info) {
      if (info[key] != "") {
        newInfo = {...newInfo, [key]: info[key]}
      }
    }
    if (newInfo.day != undefined) {
      const date = newInfo.month + " " + newInfo.day +", " + newInfo.year
      newInfo = {...newInfo, date: date}
    }
    if (newInfo.aday != undefined) {
      const assessment_date = newInfo.amonth + " " + newInfo.aday +", " + newInfo.ayear
      newInfo = {...newInfo, assessment_date: assessment_date}

    }
    if (newInfo.mday != undefined) {
      const moderator_date = newInfo.mmonth + " " + newInfo.mday +", " + newInfo.myear
      newInfo = {...newInfo, moderator_date: moderator_date}
    }

    console.log(newInfo)
    dispatch(update(newInfo))
    const state = getState();
    dispatch(validateInput1(state.batch))
  }
}
export const reload = (saved) => ({ type: RELOAD, payload: true})
export const resetClient = () => ({ type: RESET_CLIENT })
export const validateComplete = errs => ({ type: VALIDATE_CLIENT, payload: errs})
export const update = info => ({ type: UPDATE_BATCH, payload: info })
export const save = info => ({type: SAVE_CLIENT, payload: info})
export const validateInput = (info, errs) => {
  return (dispatch, getState) => {
    console.log(info)

    if (isEmpty(info.name)) {
      errs = {...errs, nameError: true}
    }
    else {
      errs = {...errs, nameError: false}
    }

    if (!isMobilePhone(info.tel)) {
      errs = {...errs, telError: true}
    }
    else {
      errs = {...errs, telError: false}
    }

    if (isEmpty(info.address)) {
      errs = {...errs, addressError: true}
    }
    else {
      errs = {...errs, addressError: false}
    }

    if (isEmpty(info.address2)) {
      errs = {...errs, address2Error: true}
    }
    else {
      errs = {...errs, address2Error: false}
    }

    if (isEmpty(info.postCode) || !isNumeric(info.postCode)) {
      errs = {...errs, postCodeError: true}
    }
    else {
      errs = {...errs, postCodeError: false}
    }

    if (isEmpty(info.contact)) {
      errs = {...errs, contactError: true}
    }
    else {
      errs = {...errs, contactError: false}
    }

    if (isEmpty(info.municipality)) {
      errs = {...errs, municipalityError: true}
    }
    else {
      errs = {...errs, municipalityError: false}
    }

    let errors = false;

    for (var x in errs) {
      if (errs[x]) {
        errors = true;
        break;
      }
    }

    let address = "";
    if (info.address2 != "") {
      address = info.address + "," + info.address2 +"," + info.postCode
    } else {
      address = info.address +"," + info.postCode
    }
    let newInfo = {
      name: info.name,
      tel: info.tel,
      address: address,
      contact: info.contact,
      municipality: info.municipality
    }
    dispatch(validateComplete(errs));

    if (errors == false) {
      dispatch(uploadClient(newInfo))
      dispatch(resetClient())
      dispatch(changeActiveStep("client"));

    }
  }
}

export const validateInput1 = (info, errs) => {
  return (dispatch, getState) => {
    console.log(info)
    if (isEmpty(info.project)) {
      errs = {...errs, projectError: true}
    }
    else {
      errs = {...errs, projectError: false}
    }

    if(isEmpty(info.day)) {
      errs = {...errs, dayError: true}
    }
    else {
      errs = {...errs, dayError: false}
    }

    if(isEmpty(info.month)) {
      errs = {...errs, monthError: true}
    }
    else {
      errs = {...errs, monthError: false}
    }

    if(isEmpty(info.year)) {
      errs = {...errs, yearError: true}
    }
    else {
      errs = {...errs, yearError: false}
    }

    if(isEmpty(info.client_name)) {
      errs = {...errs, clientError: true}
    }
    else {
      errs = {...errs, clientError: false}
    }
    if (isEmpty(info.programme_name)) {
      errs = {...errs, programme_nameError: true}
    }
    else {
      errs = {...errs, programme_nameError: false}
    }

    if (info.facilitator.length == 0) {
      errs = {...errs, facilitatorError: true}
    }
    else {
      errs = {...errs, facilitatorError: false}

    }
    if (info.credit == "credit") {
      if (isEmpty(info.programmeType)) {
        errs = {...errs, programmeTypeError: true}
      }
      else {
        errs = {...errs, programmeTypeError: false}

      }
    }
    let errors = false;

    for (var x in errs) {
      if (errs[x]) {
        errors = true;
        break;
      }
    }

    let facilitators = "";
    let moderators = "";
    let assessors = "";
    for (let i = 0; i < info.facilitator.length; i++) {
      if (i == info.facilitator.length - 1) {
        facilitators = facilitators + info.facilitator[i]
      }
      else {
        facilitators = facilitators + info.facilitator[i] + ", ";

      }
    }
    for (let i = 0; i < info.assessor.length; i++) {
      if (i == info.assessor.length - 1) {
        assessors = assessors + info.assessor[i]
      }
      else {
        assessors = assessors + info.assessor[i] + ", ";

      }
    }
    for (let i = 0; i < info.moderator.length; i++) {
      if (i == info.moderator.length - 1) {
        moderators = moderators + info.moderator[i]
      }
      else {
        moderators = moderators + info.moderator[i] + ", ";

      }
    }
    let assessment_date = "";
    let moderator_date = "";
    if (info.assessment_date != undefined) {
      assessment_date = info.assessment_date
    }
    if (info.moderator_date != undefined) {
      moderator_date = info.moderator_date
    }
    let newInfo = {
      date:  info.date,
      client_name: info.client_name,
      project: info.project,
      programme_name: info.programme_name,
      credit: info.credit,
      facilitator: facilitators,
      assessor: assessors,
      moderator: moderators,
      assessment_date: assessment_date,
      moderator_date: moderator_date,
      programmeType: info.programmeType

    }
    dispatch(validateComplete(errs));


    if (errors == false) {
        dispatch(uploadBatch(newInfo))
        dispatch(reload(true))
    //  dispatch(changeActiveStep("programme"))
    }
  }


}

export const uploadBatch = (info) => {
  return dispatch => {
    return fetch("/data/lms_batch",{
         method: 'POST',
         body: JSON.stringify(info),
         headers: {"Content-Type": "application/json"}
       })
       .then(function(response){
         return response.json()
       }).then(function(body){
         console.log(body);
     });
  }

}

export const uploadClient = (info) => {
  return dispatch => {
    return fetch("/data/lms_client",{
         method: 'POST',
         body: JSON.stringify(info),
         headers: {"Content-Type": "application/json"}
       })
       .then(function(response){
         return response.json()
       }).then(function(body){
         console.log(body);
     });
  }

}

export const fetchClients = () => {
  return dispatch => {
    return fetch('/api/client')
    .then(res =>  res.json())
    .then(json => {
      console.log(json)
      dispatch(receiveInfo(json))
    });
  }
}