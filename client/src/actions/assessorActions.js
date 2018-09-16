import {  VALIDATE_ASSESSOR, SAVE_ASSESSOR, RESET_ASSESSOR } from './actionTypes'
import { isEmpty, isNumeric, isAlpha, isMobilePhone, isLength } from 'validator';
import { changeActiveStep } from './flowActions'
import { changeActiveTable } from './tableActions'

export const validateComplete = errs => ({ type: VALIDATE_ASSESSOR, payload: errs})

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

    if (!isNumeric(info.ID)) {
      errs = {...errs, IDError: true}
    }
    else {
      errs = {...errs, IDError: false}
    }

    if (isEmpty(info.reg_no)) {
      errs = {...errs, reg_noError: true}
    }
    else {
      errs = {...errs, reg_noError: false}
    }

    if (isEmpty(info.seta)) {
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
      name: info.name,
      ID: info.ID,
      reg_no: info.reg_no,
      seta: info.seta,
      expiry_date: info.expiry_date
    }

    dispatch(validateComplete(errs));
    const state = getState();

    if (errors == false) {
      dispatch(uploadAssessor(newInfo))
      dispatch(resetAssessor())
      if (state.flow.activeStep == "client") {
        dispatch(changeActiveStep("client"))
      }
      else {
        dispatch(changeActiveTable("learner"))
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
