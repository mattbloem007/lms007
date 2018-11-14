import { SAVE_COMPLETE, UPDATE_CHECK_FALSE, RECEIVE_CLUBS, RESET_LEARNER, UPDATE_CHECK,RECEIVE_FACILITATORS, RECEIVE_MODERATORS, RECEIVE_ASSESSORS, RECEIVE_LEARNERS, SAVE_LEARNER, VALIDATE_LEARNER, UPDATE_LEARNER } from '../actions/actionTypes'

const learnerState = {
  saved: false,
  idTypeError: false,
  idError: false,
  equityError: false,
  nationalityError: false,
  genderError: false,
  lastSchoolError: false,
  languageError: false,
  employedError: false,
  surnameError: false,
  firstnameError: false,
  titleError: false,
  yearError: false,
  monthError: false,
  dayError: false,
  // ayearError: false,
  // amonthError: false,
  // adayError: false,
  strAddressError: false,
  postCodeError: false,
  postCode2Error: false,
  postCode3Error: false,
  homenoError: false,
  postAddressError: false,
  cellnoError: false,
  employerError: false,
  worknoError: false,
  faxnoError: false,
  emailError: false,
  clubError: false,
  courseError: false,
  year2Error: false,
  employed: false,
  id_type: "",
  statssa: "",
  education: "",
  ass_status: "",
  national_id: "",
  equity: "",
  nationality: "",
  gender: "",
  last_school: "",
  year_attented: "",
  language: "",
  employed: "",
  disability: "",
  surname: "",
  firstname: "",
  secondname: "",
  title: "",
  day: "",
  month: "",
  year: "",
  aday: "",
  amonth: "",
  ayear: "",
  dob: "",
  physicalAddress: "",
  strAddress: "",
  strAddress2: "",
  strAddress3: "",
  strAddress4: "",
  postCode: "",
  homeno: "",
  postalAddress: "",
  postAddress: "",
  postAddress2: "",
  postAddress3: "",
  postAddress4: "",
  postCode2: "",
  cellno: "",
  employer: "",
  faxno: "",
  workno: "",
  email: "",
  prev_surname: "",
  //assessment_date: "",
  fac: [],
  ass: [],
  mod: [],
  clubs: [],
  club: "",
  facilitators: [],
  assessors: [],
  moderators: [],
  learnerIDs: [],
  addrCheck: false,
  type: "add",
  errors: false
}

const learnerReducer = (state = learnerState, action) => {
  switch (action.type) {
    case RECEIVE_LEARNERS:
      return {...state, learners: action.payload};
    case RECEIVE_FACILITATORS:
        return {...state, facilitators: action.payload }
    case RECEIVE_MODERATORS:
        return {...state, moderators: action.payload }
    case RECEIVE_ASSESSORS:
        return {...state, assessors: action.payload }
    case RECEIVE_CLUBS:
      return { ...state, clubs: action.payload }
    case SAVE_LEARNER:
      return {...state, ...action.payload}
    case VALIDATE_LEARNER:
      return {...state, ...action.payload}
    case UPDATE_LEARNER:
      return {...state, learnerIDs: action.payload.learner_name}
    case UPDATE_CHECK:
      return {...state,
        addrCheck: !action.payload,
        strAddress: action.addrInfo.strAddress,
        strAddress2: action.addrInfo.strAddress2,
        strAddress3: action.addrInfo.strAddress3,
        strAddress4: action.addrInfo.strAddress4,
        postCode: action.addrInfo.postCode,
        postAddress: action.addrInfo.strAddress,
        postAddress2: action.addrInfo.strAddress2,
        postAddress3: action.addrInfo.strAddress3,
        postAddress4: action.addrInfo.strAddress4,
        postCode2: action.addrInfo.postCode
      }
    case RESET_LEARNER:
      return {...state, ...learnerState}
    case SAVE_COMPLETE:
      return {...state, saved: action.payload}
    default:
      return state;
  }
}
export default learnerReducer;
