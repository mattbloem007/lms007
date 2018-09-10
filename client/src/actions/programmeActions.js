import { UPDATE_PROGRAMME, RECEIVE_FACILITATORS, UPDATE_BATCH, VALIDATE_PROGRAMME } from './actionTypes'
import { isEmpty, isNumeric, isAlpha, isMobilePhone, isLength } from 'validator';
import { changeActiveStep } from './flowActions'

export const updateProgrammeInfo = credit => ({ type: UPDATE_PROGRAMME, payload: credit });
export function updateBatchClient(info) {

   let newInfo = {};
   for(var key in info) {
     if (info[key] != "") {
       newInfo = {...newInfo, [key]: info[key]}
     }
   }
   console.log(newInfo)
  return {
    type: UPDATE_BATCH,
    payload: newInfo
  }
}

export const validateComplete = errs => ({ type: VALIDATE_PROGRAMME, payload: errs})

export const validateInput = (info, errs) => {
  return (dispatch, getState) => {
    if (isEmpty(info.programme_name)) {
      errs = {...errs, programme_nameError: true, errors: true}
    }
    else {
      errs = {...errs, programme_nameError: false, errors: false}
    }

    if (isEmpty(info.facilitator)) {
      errs = {...errs, facilitatorError: true, errors: true}
    }
    else {
      errs = {...errs, facilitatorError: false, errors: false}

    }
    if (info.credit == "credit") {
      if (isEmpty(info.programmeType)) {
        errs = {...errs, programmeTypeError: true, errors: true}
      }
      else {
        errs = {...errs, programmeTypeError: false, errors: false}

      }
    }
    dispatch(validateComplete(errs));
    let state = getState();
    console.log(info)
    if (state.programme.errors == false) {
      dispatch(updateBatchClient(info))
      dispatch(changeActiveStep("programme"))
      state = getState();
      dispatch(uploadBatch(state.batch))
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

export function receiveInfo(json) {
  console.log(json.express)
  let clientsArr = [];
  for (const key of Object.keys(json.express)) {
    clientsArr = [...clientsArr, Object.assign({text: json.express[key].name, value: json.express[key].name})]
  }
  console.log(clientsArr)
//  clientsArr = [...clientsArr, ...clientObj]
//  console.log(clientsArr)
  return {
    type: RECEIVE_FACILITATORS,
    payload: clientsArr
  }
}

export const fetchFacilitator = () => {
  return dispatch => {
    return fetch('/api/facilitator')
    .then(res =>  res.json())
    .then(json => {
      console.log(json)
      dispatch(receiveInfo(json))
    });
  }
}
