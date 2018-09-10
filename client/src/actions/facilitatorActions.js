import {  VALIDATE_FACILITATOR, SAVE_FACILITATOR } from './actionTypes'
import { isEmpty, isNumeric, isAlpha, isMobilePhone, isLength } from 'validator';

export const validateComplete = errs => ({ type: VALIDATE_FACILITATOR, payload: errs})
export function save(info) {

   let newInfo = {};
   for(var key in info) {
     if (info[key] != "") {
       newInfo = {...newInfo, [key]: info[key]}
     }
   }
   console.log(newInfo)
  return {
    type: SAVE_FACILITATOR,
    payload: newInfo
  }
}


export const validateInput = (info, errs) => {
  return (dispatch, getState) => {
    console.log(info)
    if (isEmpty(info.name)) {
      errs = {...errs, nameError: true, errors: true}
    }
    else {
      errs = {...errs, nameError: false, errors: false}
    }

    if (isEmpty(info.ID) && isLength(info.ID) < 13 && !isNumeric(info.ID)) {
      errs = {...errs, IDError: true, errors: true}
    }
    else {
      errs = {...errs, IDError: false, errors: false}
    }

    if (isEmpty(info.reg_no)) {
      errs = {...errs, reg_noError: true, errors: true}
    }
    else {
      errs = {...errs, reg_noError: false, errors: false}
    }

    if (isEmpty(info.seta)) {
      errs = {...errs, setaError: true, errors: true}
    }
    else {
      errs = {...errs, setaError: false, errors: false}
    }

    if(isEmpty(info.day)) {
      errs = {...errs, dayError: true, errors: true}
    }
    else {
      errs = {...errs, dayError: false, errors: false}
    }

    if(isEmpty(info.month)) {
      errs = {...errs, monthError: true, errors: true}
    }
    else {
      errs = {...errs, monthError: false, errors: false}
    }

    if(isEmpty(info.year)) {
      errs = {...errs, yearError: true, errors: true}
    }
    else {
      errs = {...errs, yearError: false, errors: false}
    }
    const date = info.month + " " + info.day +", " + info.year
    info = {...info, expiry_date: date}
    dispatch(validateComplete(errs));

    let state = getState();
    if (state.facilitator.errors == false) {
      dispatch(save(info))
      dispatch(uploadFacilitator(info))
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
