import {  EDIT_ASSESSOR, VALIDATE_ASSESSOR, SAVE_ASSESSOR, RESET_ASSESSOR, RECEIVE_ASSESSORS } from './actionTypes'
import { isEmpty, isNumeric, isAlpha, isMobilePhone, isLength } from 'validator';
import { changeActiveStep } from './flowActions'
import { changeActiveTable } from './tableActions'
import { months } from '../common'
import _ from 'lodash'

export const validateComplete = errs => ({ type: VALIDATE_ASSESSOR, payload: errs})

export const Delete = (rows) => {
  return dispatch => {
    return fetch("/api/deleteAssessor", {
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
}

export const editAssessor = (assessor) => {
  return dispatch => {
    console.log(assessor['Expiry Date'])
    let date = new Date(assessor['Expiry Date'])
    dispatch(edit({...assessor,
      surname: assessor.name.split(" ")[assessor.name.split(" ").length - 1],
      day: date.getDate().toString(),
      month: months[date.getMonth()].text,
      year: date.getFullYear().toString(),
      type: "edit"
      }))
    return Promise.resolve()
  }
}

export const saveEditAssessor = (info) => {
  return dispatch => {
    return fetch("/data/lms_assessorEdit", {
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

export const edit = (moderator) => ({type: EDIT_ASSESSOR, payload: moderator})

export const updateAssessor = (info) => {
  return (dispatch, getState) => {
    let newInfo = {};
    for(var key in info) {
      if (info[key] != "") {
        newInfo = {...newInfo, [key]: info[key]}
      }
    }
    if (newInfo.month != undefined || newInfo.day != undefined || newInfo.year != undefined) {
      const date = newInfo.month + " " + newInfo.day +", " + newInfo.year
      newInfo = {...newInfo, expiry_date: date}
    }
    console.log(newInfo)
    dispatch(save(newInfo))
    const state = getState();
    dispatch(validateInput(state.assessor))
  }
}
export const save = newInfo => ({ type: SAVE_ASSESSOR, payload: newInfo })
export const resetAssessor = () => ({ type: RESET_ASSESSOR })
export const validateInput = (info, errs) => {
  return (dispatch, getState) => {
    console.log(info)
    if (isEmpty(info.name)) {
      errs = {...errs, nameError: true}
    }
    else {
      errs = {...errs, nameError: false}
    }

    if(isEmpty(info.surname)) {
      errs = {...errs, surnameError: true}
    }
    else {
      errs = {...errs, surnameError: false}
    }

    if (info.ID.length != 13 ||!isNumeric(info.ID)) {
      errs = {...errs, IDError: true}
    }
    else {
      errs = {...errs, IDError: false}
    }

    if (isEmpty(info.Reg_no)) {
      errs = {...errs, reg_noError: true}
    }
    else {
      errs = {...errs, reg_noError: false}
    }

    if (isEmpty(info.SETA)) {
      errs = {...errs, setaError: true}
    }
    else {
      errs = {...errs, setaError: false}
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

    let errors = false;

    for (var x in errs) {
      if (errs[x]) {
        errors = true;
        break;
      }
    }

    let newInfo = {
      name: info.name+ " " + info.surname,
      ID: info.ID,
      Reg_no: info.Reg_no,
      SETA: info.SETA,
      expiry_date: info.expiry_date
    }

    dispatch(validateComplete(errs));
    const state = getState();

    if (errors == false) {

      if (state.assessor.type == "add") {
        dispatch(uploadAssessor(newInfo))
        dispatch(resetAssessor())
      //  dispatch(changeActiveStep("client"))
      }
      else {
        dispatch(saveEditAssessor(newInfo))
      }

    }
  }
}

export const uploadAssessor = (info) => {
  return dispatch => {
    return fetch("/data/lms_assessor",{
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

export const fetchAssessors = () => {
  return dispatch => {
    return fetch('/api/assessors')
    .then(res =>  res.json())
    .then(json => {
      console.log(json)
      dispatch(receiveAssessors(json))
    });
  }
}

export function receiveAssessors(json) {
  console.log(json.express)
  let sorted = _.orderBy(json.express, ['surname'],['asc']);
  console.log(sorted)
  return {
    type: RECEIVE_ASSESSORS,
    payload: sorted
  }
}
