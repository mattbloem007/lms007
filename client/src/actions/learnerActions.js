import { SAVE_COMPLETE, RECEIVE_CLUBS, RESET_LEARNER, UPDATE_CHECK, RECEIVE_FACILITATORS, RECEIVE_ASSESSORS, RECEIVE_MODERATORS, FETCH_LEARNERS, RECEIVE_LEARNERS, VALIDATE_LEARNER, SAVE_LEARNER, UPDATE_LEARNER, UPDATE_BATCH } from './actionTypes'
import { isEmpty, isNumeric, isAlpha, isMobilePhone, isLength, isAfter, isEmail } from 'validator';
import { changeActiveStep } from './flowActions'
import { changeActiveTable } from './tableActions'
import { months } from '../common'
import _ from 'lodash'

export const resetLearnerState = () => ({ type: RESET_LEARNER })
export const saveComplete = (saved) => ({ type: SAVE_COMPLETE, payload: saved })
export const loadLearner = json => {
  return dispatch => {
    let homeAddr = [];
    let strAddr = [];
    for (var i = 0; i< json.express[0].homeaddr.split(",").length; i++) {
      homeAddr[i] = json.express[0].homeaddr.split(",")[i];
    }
    for (var i = 0; i< json.express[0].postaddr.split(",").length; i++) {
      strAddr[i] = json.express[0].postaddr.split(",")[i];
    }
    let dob = new Date(json.express[0].dob);

    dispatch(save({
      ...json.express[0],
      type: "edit",
      strAddress: json.express[0].homeaddr,
      postCode: homeAddr[homeAddr.length - 1],
      postCode2: strAddr[strAddr.length - 1],
      postAddress: json.express[0].postaddr,
      day: dob.getDate().toString(),
      month:months[dob.getMonth()].text,
      year: dob.getFullYear().toString(),
      learnerInfo: true
    }))
    dispatch(changeActiveTable("rLearner"))
  }
  //console.log(json.express[0])
}

export function receiveInfo(json) {
  console.log(json.express)
  let learnersArr = [];
  let sorted = _.orderBy(json.express, ['surname'],['asc']);
  for (const key of Object.keys(sorted)) {
    learnersArr = [...learnersArr, Object.assign({text: sorted[key].national_id + "-" + sorted[key].firstname + " " + sorted[key].surname, value: sorted[key].national_id+ "-" + sorted[key].firstname + " " + sorted[key].surname })]
  }
  console.log(learnersArr)
//  learnersArr = [...learnersArr, ...learnerObj]
//  console.log(learnersArr)
  return {
    type: RECEIVE_LEARNERS,
    payload: learnersArr
  }
}

export const updateLearner = (info) => {
  return (dispatch, getState) => {
    let newInfo = {};
    for(var key in info) {
      if (info[key] !== "") {
        newInfo = {...newInfo, [key]: info[key]}
      }
    }
    if (newInfo.day !== undefined || newInfo.aday !== undefined) {
      const date = newInfo.month + " " + newInfo.day +", " + newInfo.year
      let strAddress = newInfo.strAddress;
      let postAddress = "";
      if (newInfo.addrCheck === true) {
        postAddress = newInfo.strAddress;
      }
      else {
        postAddress = newInfo.postAddress
      }
      if (newInfo.strAddress2 !== "" && newInfo.strAddress2 !== undefined) {
        strAddress =  strAddress + ", " + newInfo.strAddress2
        if (newInfo.strAddress3 !== "" && newInfo.strAddress3 !== undefined) {
          strAddress = strAddress + ", " + newInfo.strAddress3
        }
        if (newInfo.strAddress4 !== "" && newInfo.strAddress4 !== undefined) {
          strAddress = strAddress + ", " + newInfo.strAddress4
        }
      }
      if(newInfo.postAddress2 !== "" && newInfo.postAddress2 !== undefined) {
          postAddress =  strAddress + ", " + newInfo.postAddress2
        if (newInfo.postAddress3 !== "" && newInfo.postAddress3 !== undefined) {
          postAddress = postAddress + ", " + newInfo.postAddress3
        }
        if (newInfo.postAddress4 !== "" && newInfo.postAddress4 !== undefined) {
          postAddress = postAddress + ", " + newInfo.postAddress4
        }

      }
        strAddress = strAddress +", " + newInfo.postCode
        if (newInfo.addrCheck === true) {
          postAddress = postAddress + ", " + newInfo.postCode
        }
        else {
          postAddress = postAddress + ", " + newInfo.postCode2
        }

      const dob = newInfo.month + " " + newInfo.day + ", " + newInfo.year

    //  const assessment_date = newInfo.amonth + ", " + newInfo.aday + ", " + newInfo.ayear
      newInfo = {...newInfo, dob: dob, physicalAddress: strAddress, postalAddress: postAddress}//, assessment_date: assessment_date}
    }

    console.log(newInfo)
    dispatch(save(newInfo))
    const state = getState();
    dispatch(validateInput(state.learner))
  }
}

export const updateBatchLearner = (info) => {
  return (dispatch, getState) => {
    let newInfo = {};
    for(var key in info) {
      if (info[key] !== "") {
        newInfo = {...newInfo, [key]: info[key]}
      }
    }
    console.log(newInfo)
    dispatch(updateBatch(newInfo))
    const state = getState();
    dispatch(validateInput1(state.batch.learnerIDs))
  }
}
export const validateComplete = errs => ({ type: VALIDATE_LEARNER, payload: errs})
export const save = info => ({type: SAVE_LEARNER, payload: info})
export const updateBatch = info => ({ type: UPDATE_BATCH, payload: info })
export const validateInput = (info, errs) => {
  return (dispatch, getState) => {
    console.log(info)

    if (isEmpty(info.id_type)) {
      errs = {...errs, idTypeError: true}
    }
    else {
      errs = {...errs, idTypeError: false}
    }

    if (isEmpty(info.last_school)) {
      errs = {...errs, lastSchoolError: true}
    }
    else {
      errs = {...errs, lastSchoolError: false}
    }

    if (info.national_id.length != 13 ||!isNumeric(info.national_id)) {
      errs = {...errs, idError: true}
    }
    else {
      errs = {...errs, idError: false}
    }

    if(isEmpty(info.equity)) {
      errs = {...errs, equityError: true}
    }
    else {
      errs = {...errs, equityError: false}
    }

    if(isEmpty(info.nationality)){
      errs = {...errs, nationalityError: true}
    }
    else {
      errs = {...errs, nationalityError: false}
    }

    if(isEmpty(info.gender)){
      errs = {...errs, genderError: true}
    }
    else {
      errs = {...errs, genderError: false}
    }

    if(isEmpty(info.language)){
      errs = {...errs, languageError: true}
    }
    else {
      errs = {...errs, languageError: false}
    }

    if(isEmpty(info.employed)){
      errs = {...errs, employedError: true}
    }
    else {
      errs = {...errs, employedError: false}
    }

    if(isEmpty(info.surname) && !isAlpha(info.surname)){
      errs = {...errs, surnameError: true}
    }
    else {
      errs = {...errs, surnameError: false}
    }

    if(isEmpty(info.firstname) && !isAlpha(info.firstname)){
      errs = {...errs, firstnameError: true}
    }
    else {
      errs = {...errs, firstnameError: false}
    }

    if(isEmpty(info.title)){
      errs = {...errs, titleError: true}
    }
    else {
      errs = {...errs, titleError: false}
    }

    if(isEmpty(info.year)){
      errs = {...errs, yearError: true}
    }
    else {
      errs = {...errs, yearError: false}
    }

    if(isEmpty(info.month)){
      errs = {...errs, monthError: true}
    }
    else {
      errs = {...errs, monthError: false}
    }

    if(isEmpty(info.day)){
      errs = {...errs, dayError: true}
    }
    else {
      errs = {...errs, dayError: false}
    }

    if(isEmpty(info.strAddress)) {
      errs = {...errs, strAddressError: true}
    }
    else {
      errs = {...errs, strAddressError: false}
    }

    // if(!isNumeric(info.postCode)) {
    //   errs = {...errs, postCodeError: true}
    // }
    // else {
    //   errs = {...errs, postCodeError: false}
    // }

    if(isEmpty(info.postAddress)) {
      errs = {...errs, postAddressError: true}
    }
    else {
      errs = {...errs, postAddressError: false}
    }

    // if(!isNumeric(info.postCode2)) {
    //   errs = {...errs, postCode2Error: true}
    // }
    // else {
    //   errs = {...errs, postCode2Error: false}
    // }

    if(!isMobilePhone(info.homeno)){
      errs = {...errs, homenoError: true}
    }
    else {
      errs = {...errs, homenoError: false}
    }

    if(!isMobilePhone(info.cellno)){
      errs = {...errs, cellnoError: true}
    }
    else {
      errs = {...errs, cellnoError: false}
    }

    dispatch(validateComplete(errs));
    let errors = false;

    for (var x in errs) {
      if (errs[x]) {
        errors = true;
        break;
      }
    }
    let facs = "";
    let mods = "";
    let ass = "";
    info.fac.map(fac => facs = facs + fac + " ");
    info.ass.map(mod => mods = mods + mod + " ");
    info.mod.map(as => ass = ass + as + " ");
    let newInfo = {
      id_type: info.id_type,
      national_id: info.national_id,
      last_school: info.last_school,
      year_attented: info.year_attented,
      statssa: info.statssa,
      education: info.education,
      ass_status: info.ass_status,
      equity: info.equity,
      nationality: info.nationality,
      gender: info.gender,
      language: info.language,
      employed: info.employed,
      disability: info.disability,
      surname: info.surname,
      firstname: info.firstname,
      secondname: info.secondname,
      title: info.title,
      dob: info.dob,
      strAddress: info.physicalAddress,
      homeno: info.homeno,
      postAddress: info.postalAddress,
      cellno: info.cellno,
      employer: info.employer,
      faxno: info.faxno,
      workno: info.workno,
      email: info.email,
      prev_surname: info.prev_surname,
    //  assessment_date: info.assessment_date,
      assessor: ass,
      moderator: mods,
      facilitator: facs,
      club: info.club
    }
    console.log(newInfo)
    const state = getState();
    if(errors === false) {
      if (state.learner.type === "add") {
        dispatch(uploadLearner(newInfo))
        dispatch(saveComplete(true))
      }
      else {
        dispatch(editLearner(newInfo))
        dispatch(saveComplete(true))
      }
      dispatch(changeActiveTable("learner"))
    }
  }
}

export const validateInput1 = (info, errs) => {
  return (dispatch, getState) => {
    console.log(info)
    if(info.length === 0) {
      errs = {...errs, learnerError: true}
    }
    else {
      errs = {...errs, learnerError: false}
    }
    dispatch(validateComplete(errs));
    let errors = false;

    for (var x in errs) {
      if (errs[x]) {
        errors = true;
        break;
      }
    }

    const state = getState();
    let newInfo = [];
    for (var x in info) {
      newInfo.push(info[x].split("-")[0])
    }
    newInfo = _.difference(newInfo, state.table.batchLearnerIDs)
    console.log(newInfo);
        if(errors === false) {
          //dispatch(updateBatchLearner(info))
          dispatch(uploadBatchLearner(newInfo, state.table.batch))
        //  dispatch(changeActiveTable("batch"))
        }
  }


}

export const uploadBatchLearner = (info, batch) => {
  let newInfo = [];
  console.log(info)
  for(var key in info) {
    if (info[key] !== "") {
      newInfo = [...newInfo, Object.assign({id: info[key].split("-")[0], batch: batch})]
    }
  }
  console.log(newInfo)
  return dispatch => {

    return fetch("/data/lms_learner_batch",{
         method: 'POST',
         body: JSON.stringify(newInfo),
         headers: {"Content-Type": "application/json"}
       })
       .then(function(response){
         return response.json()
       }).then(function(body){
         console.log(body);
     });
  }
}

export const uploadLearner = (info) => {
  return dispatch => {
    return fetch("/data/lms_learner",{
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

export const editLearner = (info) => {
  return dispatch => {
    return fetch("/data/lms_learnerEdit",{
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

export const fetchLearnerInfo = (ID) => {

  return dispatch => {
    return fetch('/api/learnerInfo', {
      method: 'POST',
      body:JSON.stringify({ID: ID}),
      headers: {"Content-Type": "application/json"}
    })
    .then(res =>  res.json())
    .then(json => {
      console.log(json)
      dispatch(loadLearner(json))
    });
  }
}


export const fetchLearners = () => {
  return dispatch => {
    return fetch('/api/learner')
    .then(res =>  res.json())
    .then(json => {
      console.log(json)
      dispatch(receiveInfo(json))
    });
  }
}

export const fetchClubs = () => {
  return dispatch => {
    return fetch('/api/clubs')
    .then(res =>  res.json())
    .then(json => {
      console.log(json)
      dispatch(receiveClubs(json))
    });
  }
}

export function receiveClubs(json) {
  let clientsArr = [];
  let sorted = _.orderBy(json.express, ['clube_name'],['asc']);
  for (const key of Object.keys(sorted)) {
    clientsArr = [...clientsArr, Object.assign({text: sorted[key].club_name, value: sorted[key].club_name})]
  }
  console.log(clientsArr)

  return {
    type: RECEIVE_CLUBS,
    payload: clientsArr
  }
}

export function receiveEmployeeInfo(json, employeeType) {
  console.log(json.express)
  let clientsArr = [];
  let sorted = _.orderBy(json.express, ['name'],['asc']);
  for (const key of Object.keys(sorted)) {
    clientsArr = [...clientsArr, Object.assign({text: sorted[key].name, value: sorted[key].name})]
  }
  console.log(clientsArr)
//  clientsArr = [...clientsArr, ...clientObj]
//  console.log(clientsArr)
  switch(employeeType) {
    case "fac":
      return { type: RECEIVE_FACILITATORS, payload: clientsArr }
    break;
    case "ass":
      return { type: RECEIVE_ASSESSORS, payload: clientsArr }
    break;
    case "mod":
      return { type: RECEIVE_MODERATORS, payload: clientsArr }
    break;
  }

}

export const fetchFacilitator = () => {
  return dispatch => {
    return fetch('/api/facilitator')
    .then(res =>  res.json())
    .then(json => {
      console.log(json)
      dispatch(receiveEmployeeInfo(json, "fac"))
    });
  }
}

export const fetchAssessor = () => {
  return dispatch => {
    return fetch('/api/assessor')
    .then(res =>  res.json())
    .then(json => {
      console.log(json)
      dispatch(receiveEmployeeInfo(json, "ass"))
    });
  }
}

export const fetchModerator = () => {
  return dispatch => {
    return fetch('/api/moderator')
    .then(res =>  res.json())
    .then(json => {
      console.log(json)
      dispatch(receiveEmployeeInfo(json, "mod"))
    });
  }
}

export const updateChecked = (val, addrInfo) => ({type: UPDATE_CHECK, payload: val, addrInfo: addrInfo})
