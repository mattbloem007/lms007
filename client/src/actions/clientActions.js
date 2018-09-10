import { FETCH_CLIENTS, RECEIVE_CLIENTS, VALIDATE_CLIENT, SAVE_CLIENT, UPDATE_CLIENT, UPDATE_BATCH } from './actionTypes'
import { isEmpty, isNumeric, isAlpha, isMobilePhone, isLength } from 'validator';
import { changeActiveStep } from './flowActions'

// export const receiveInfo = json => (console.log(json)
// { type: RECEIVE, payload: json }
// );
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
    type: RECEIVE_CLIENTS,
    payload: clientsArr
  }
}
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
export const validateComplete = errs => ({ type: VALIDATE_CLIENT, payload: errs})
export const save = info => ({type: SAVE_CLIENT, payload: info})
export const validateInput = (info, errs) => {
  return (dispatch, getState) => {
    console.log(info)

    if (isEmpty(info.name)) {
      errs = {...errs, nameError: true, errors: true}
    }
    else {
      errs = {...errs, nameError: false, errors: false}
    }

    if (!isMobilePhone(info.tel)) {
      errs = {...errs, telError: true, errors: true}
    }
    else {
      errs = {...errs, telError: false, errors: false}
    }

    if (isEmpty(info.address)) {
      errs = {...errs, addressError: true, errors: true}
    }
    else {
      errs = {...errs, addressError: false, errors: false}
    }

    if (isEmpty(info.address2)) {
      errs = {...errs, address2Error: true, errors: true}
    }
    else {
      errs = {...errs, address2Error: false, errors: false}
    }

    if (isEmpty(info.postCode) || !isNumeric(info.postCode)) {
      errs = {...errs, postCodeError: true, errors: true}
    }
    else {
      errs = {...errs, postCodeError: false, errors: false}
    }

    if (isEmpty(info.contact)) {
      errs = {...errs, contactError: true, errors: true}
    }
    else {
      errs = {...errs, contactError: false, errors: false}
    }

    if (isEmpty(info.municipality)) {
      errs = {...errs, municipalityError: true, errors: true}
    }
    else {
      errs = {...errs, municipalityError: false, errors: false}
    }

    let address = "";
    if (info.address2 != "") {
      address = info.address + "," + info.address2 +"," + info.postCode
    } else {
      address = info.address +"," + info.postCode
    }
    info = {...info, address: address}
    dispatch(validateComplete(errs));

    const state = getState();

    if (state.client.errors == false) {
      dispatch(save(info))
      dispatch(uploadClient(info))
      dispatch(changeActiveStep("client"))

    }
  }
}

export const validateInput1 = (info, errs) => {
  return (dispatch, getState) => {
    console.log(info)
    if (isEmpty(info.project)) {
      errs = {...errs, projectError: true, errors: true}
    }
    else {
      errs = {...errs, projectError: false, errors: false}
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

    if(isEmpty(info.client_name)) {
      errs = {...errs, clientError: true, errors: true}
    }
    else {
      errs = {...errs, clientError: false, errors: false}
    }
    const date = info.month + " " + info.day +", " + info.year
    info = {...info, date: date}
    dispatch(validateComplete(errs));

    const state = getState();
    console.log(state)

    if (state.client.errors == false) {
      dispatch(updateBatchClient(info))
      dispatch(changeActiveStep("programme"))
    }
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
