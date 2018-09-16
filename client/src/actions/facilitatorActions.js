import {  VALIDATE_FACILITATOR, SAVE_FACILITATOR, RESET_FACILITATOR } from './actionTypes'
import { isEmpty, isNumeric, isAlpha, isMobilePhone, isLength } from 'validator';
import { changeActiveStep } from './flowActions'

export const validateComplete = errs => ({ type: VALIDATE_FACILITATOR, payload: errs})

export const updateFacilitator = (info) => {
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
    dispatch(validateInput(state.facilitator))
  }
}
export const save = newInfo => ({ type: SAVE_FACILITATOR, payload: newInfo })
export const resetFacilitator = () => ({ type: RESET_FACILITATOR })
export const validateInput = (info, errs) => {
  return (dispatch, getState) => {
    console.log(info)
    if (isEmpty(info.name)) {
      errs = {...errs, nameError: true}
    }
    else {
      errs = {...errs, nameError: false}
    }

    if (isEmpty(info.ID) && isLength(info.ID) < 13 && !isNumeric(info.ID)) {
      errs = {...errs, IDError: true}
    }
    else {
      errs = {...errs, IDError: false}
    }

    if (!isMobilePhone(info.cellno)) {
      errs = {...errs, cellnoError: true}
    }
    else {
      errs = {...errs, cellnoError: false}
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
      cellno: info.cellno,
    }

    dispatch(validateComplete(errs));

    console.log(errors)
    if (errors == false) {
          dispatch(uploadFacilitator(newInfo))
          dispatch(resetFacilitator())
          dispatch(changeActiveStep("client"))
        }
      }
}

export const uploadFacilitator = (info) => {
  return dispatch => {
    return fetch("/data/lms_facilitator",{
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
