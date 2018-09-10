import { FETCH_LEARNERS, RECEIVE_LEARNERS, VALIDATE_LEARNER, SAVE_LEARNER, UPDATE_LEARNER, UPDATE_BATCH } from './actionTypes'
import { isEmpty, isNumeric, isAlpha, isMobilePhone, isLength, isAfter, isEmail } from 'validator';
import { changeActiveStep } from './flowActions'

// export const receiveInfo = json => (console.log(json)
// { type: RECEIVE, payload: json }
// );
export function receiveInfo(json) {
  console.log(json.express)
  let learnersArr = [];
  for (const key of Object.keys(json.express)) {
    learnersArr = [...learnersArr, Object.assign({text: json.express[key].national_id, value: json.express[key].national_id})]
  }
  console.log(learnersArr)
//  learnersArr = [...learnersArr, ...learnerObj]
//  console.log(learnersArr)
  return {
    type: RECEIVE_LEARNERS,
    payload: learnersArr
  }
}
export function updateBatchLearner(info) {

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
export const validateComplete = errs => ({ type: VALIDATE_LEARNER, payload: errs})
export const save = info => ({type: SAVE_LEARNER, payload: info})
export const validateInput = (info, errs) => {
  return (dispatch, getState) => {
    console.log(info)

    if (isEmpty(info.id_type)) {
      errs = {...errs, idTypeError: true, errors: true}
    }
    else {
      errs = {...errs, idTypeError: false, errors: false}
    }

    if (isEmpty(info.last_school)) {
      errs = {...errs, lastSchoolError: true, errors: true}
    }
    else {
      errs = {...errs, lastSchoolError: false, errors: false}
    }

    if (isEmpty(info.national_id) || isLength(info.national_id) < 13 || !isNumeric(info.national_id)) {
      errs = {...errs, idError: true, errors: true}
    }

    else {
      errs = {...errs, idError: false, errors: false}
    }

    if(isEmpty(info.equity)) {
      errs = {...errs, equityError: true, errors: true}
    }
    else {
      errs = {...errs, equityError: false, errors: false}
    }

    if(isEmpty(info.nationality)){
      errs = {...errs, nationalityError: true, errors: true}
    }
    else {
      errs = {...errs, nationalityError: false, errors: false}
    }

    if(isEmpty(info.gender)){
      errs = {...errs, genderError: true, errors: true}
    }
    else {
      errs = {...errs, genderError: false, errors: false}
    }

    if(isEmpty(info.language)){
      errs = {...errs, languageError: true, errors: true}
    }
    else {
      errs = {...errs, languageError: false, errors: false}
    }

    if(isEmpty(info.employed)){
      errs = {...errs, employedError: true, errors: true}
    }
    else {
      errs = {...errs, employedError: false, errors: false}
    }

    if(isEmpty(info.surname) && !isAlpha(info.surname)){
      errs = {...errs, surnameError: true, errors: true}
    }
    else {
      errs = {...errs, surnameError: false, errors: false}
    }

    if(isEmpty(info.firstname) && !isAlpha(info.firstname)){
      errs = {...errs, firstnameError: true, errors: true}
    }
    else {
      errs = {...errs, firstnameError: false, errors: false}
    }

    if(isEmpty(info.title)){
      errs = {...errs, titleError: true, errors: true}
    }
    else {
      errs = {...errs, titleError: false, errors: false}
    }

    if(isEmpty(info.year) || isLength(info.year) < 4 || isAfter(info.year)){
      errs = {...errs, yearError: true, errors: true}
    }
    else {
      errs = {...errs, yearError: false, errors: false}
    }

    if(isEmpty(info.month)){
      errs = {...errs, monthError: true, errors: true}
    }
    else {
      errs = {...errs, monthError: false, errors: false}
    }

    if(isEmpty(info.day)){
      errs = {...errs, dayError: true, errors: true}
    }
    else {
      errs = {...errs, dayError: false, errors: false}
    }

    if(isEmpty(info.ayear) || isLength(info.ayear) < 4 || isAfter(info.ayear)){
      errs = {...errs, ayearError: true, errors: true}
    }
    else {
      errs = {...errs, ayearError: false, errors: false}
    }

    if(isEmpty(info.amonth)){
      errs = {...errs, amonthError: true, errors: true}
    }
    else {
      errs = {...errs, amonthError: false, errors: false}
    }

    if(isEmpty(info.aday)){
      errs = {...errs, adayError: true, errors: true}
    }
    else {
      errs = {...errs, adayError: false, errors: false}
    }

    if(isEmpty(info.strAddress)) {
      errs = {...errs, strAddressError: true, errors: true}
    }
    else {
      errs = {...errs, strAddressError: false, errors: false}
    }

    if(isEmpty(info.postCode) || !isNumeric(info.postCode)) {
      errs = {...errs, postCodeError: true, errors: true}
    }
    else {
      errs = {...errs, postCodeError: false, errors: false}
    }

    if(isEmpty(info.postAddress)) {
      errs = {...errs, postAddressError: true, errors: true}
    }
    else {
      errs = {...errs, postAddressError: false, errors: false}
    }

    if(isEmpty(info.postCode2) || !isNumeric(info.postCode2)) {
      errs = {...errs, postCode2Error: true, errors: true}
    }
    else {
      errs = {...errs, postCode2Error: false, errors: false}
    }

    if(isEmpty(info.workaddr)) {
      errs = {...errs, workAddressError: true, errors: true}
    }
    else {
      errs = {...errs, workAddressError: false, errors: false}
    }

    if(isEmpty(info.postCode3) || !isNumeric(info.postCode3))
    {
       errs = {...errs, postCode3Error: true, errors: true}
    }
    else {
      errs = {...errs, postCode3Error: false, errors: false}
    }

    if(!isMobilePhone(info.homeno)){
      errs = {...errs, homenoError: true, errors: true}
    }
    else {
      errs = {...errs, homenoError: false, errors: false}
    }

    if(!isMobilePhone(info.cellno)){
      errs = {...errs, cellnoError: true, errors: true}
    }
    else {
      errs = {...errs, cellnoError: false, errors: false}
    }

    if(isEmpty(info.employer)){
      errs = {...errs, employerError: true, errors: true}
    }
    else {
      errs = {...errs, employerError: false, errors: false}
    }

    if(!isMobilePhone(info.faxno)){
      errs = {...errs, faxnoError: true, errors: true}
    }
    else {
      errs = {...errs, faxnoError: false, errors: false}
    }

    if(!isMobilePhone(info.workno)){
      errs = {...errs, worknoError: true, errors: true}
    }
    else {
      errs = {...errs, worknoError: false, errors: false}
    }

    if(!isEmail(info.email)){
      errs = {...errs, emailError: true, errors: true}
    }
    else {
      errs = {...errs, emailError: false, errors: false}
    }

    if(isEmpty(info.club)){
      errs = {...errs, clubError: true, errors: true}
    }
    else {
      errs = {...errs, clubError: false, errors: false}
    }

    dispatch(validateComplete(errs));
    let strAddress = "";
    let postAddress = "";
    let workaddr = "";
    if (info.strAddress2 != "" && info.postAddress2 != "" && info.workAddress2 != "") {
      strAddress = info.strAddress + "," + info.strAddress2 +"," + info.postCode
      postAddress = info.postAddress + ", " + info.postAddress2 + ", " + info.postCode2
      workaddr = info.workaddr + ", " + info.workaddr2 + ", " + info.postCode3
    } else {
      strAddress = info.strAddress +"," + info.postCode
      postAddress = info.postAddress + ", " + info.postCode2
      workaddr = info.workaddr + ", " + info.postCode3
    }
    const dob = info.month + " " + info.day + ", " + info.year

    const assessment_date = info.amonth + ", " + info.aday + ", " + info.ayear
    info = {...info, dob: dob, strAddress: strAddress, postAddress: postAddress, workaddr: workaddr, assessment_date: assessment_date}
    const state = getState();
    if(state.learner.errors == false) {
      dispatch(save(info))
      dispatch(uploadLearner(info))
      dispatch(changeActiveStep("learner"))
    }
  }
}

export const validateInput1 = (info, errs) => {
  return (dispatch, getState) => {
    console.log(info)
    if(info.length == 0) {
      errs = {...errs, learnerError: true, errors: true}
    }
    else {
      errs = {...errs, learnerError: false, errors: false}
    }
    dispatch(validateComplete(errs));

        const state = getState();
        if(state.learner.errors == false) {
          //dispatch(updateBatchLearner(info))
          dispatch(uploadBatchLearner(info))
        }
  }


}

export const uploadBatchLearner = info => {
  let newInfo = {};
  for(var key in info) {
    if (info[key] != "") {
      newInfo = {...newInfo, [key]: info[key]}
    }
  }
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
