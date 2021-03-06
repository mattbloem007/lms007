import {  SUCCESS, EDIT_MODERATOR, VALIDATE_MODERATOR, SAVE_MODERATOR, RESET_MODERATOR, RECEIVE_MODERATORS } from './actionTypes'
import { isEmpty, isNumeric, isAlpha, isMobilePhone, isLength } from 'validator';
import { changeActiveStep } from './flowActions'
import { changeActiveTable } from './tableActions'
import { months } from '../common'
import _ from 'lodash'

export const validateComplete = errs => ({ type: VALIDATE_MODERATOR, payload: errs})
export const success = (saved) => ({type: SUCCESS, payload: saved})

export const Delete = (rows) => {
  return dispatch => {
    return fetch("/api/deleteModerator", {
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


export const editModerator = (moderator) => {
  return dispatch => {
    console.log(moderator['Expiry Date'])
    let date = new Date(moderator['Expiry Date'])
    dispatch(edit({...moderator,
      surname: moderator.name.split(" ")[moderator.name.split(" ").length - 1],
      day: date.getDate().toString(),
      month: months[date.getMonth()].text,
      year: date.getFullYear().toString(),
      type: "edit"
      }))
    return Promise.resolve()
  }
}

export const saveEditModerator = (info) => {
  return dispatch => {
    return fetch("/data/lms_moderatorEdit", {
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

export const edit = (moderator) => ({type: EDIT_MODERATOR, payload: moderator})

export const updateModerator = (info) => {
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
    dispatch(validateInput(state.moderator))
    return Promise.resolve()
  }
}
export const save = newInfo => ({ type: SAVE_MODERATOR, payload: newInfo })
export const resetModerator = () => ({ type: RESET_MODERATOR })

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
      name: info.name.charAt(0).toUpperCase() + info.name.slice(1).toLowerCase() + " " + info.surname.charAt(0).toUpperCase() + info.surname.slice(1).toLowerCase(),
      ID: info.ID,
      Reg_no: info.Reg_no,
      SETA: info.SETA,
      expiry_date: info.expiry_date
    }

    dispatch(validateComplete(errs));
    const state = getState()

    if (errors == false) {
    //  newInfo = {...newInfo, success: true}
      if (state.moderator.type == "add") {
        dispatch(uploadModerator(newInfo))
        dispatch(resetModerator())
        dispatch(success(true))
      //  dispatch(changeActiveStep("client"))
      }
      else {
        dispatch(saveEditModerator(newInfo))
      }

      // }
      // else {
      //   dispatch(changeActiveTable("learner"))
      // }
    }
  }
}

export const uploadModerator = (info) => {
  return dispatch => {
    return fetch("/data/lms_moderator",{
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

export const fetchModerators = () => {
  return dispatch => {
    return fetch('/api/moderators')
    .then(res =>  res.json())
    .then(json => {
      console.log(json)
      dispatch(receiveModerators(json))
    });
  }
}

export function receiveModerators(json) {
  console.log(json.express)
  let sorted = _.orderBy(json.express, ['surname'],['asc']);
  console.log(sorted)
  return {
    type: RECEIVE_MODERATORS,
    payload: sorted
  }
}
