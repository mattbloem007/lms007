import { RECEIVE_LEARNERS, SAVE_LEARNER, VALIDATE_LEARNER, UPDATE_LEARNER } from '../actions/actionTypes'

const learnerState = {
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
  ayearError: false,
  amonthError: false,
  adayError: false,
  strAddressError: false,
  postCodeError: false,
  postCode2Error: false,
  postCode3Error: false,
  homenoError: false,
  postAddressError: false,
  workAddressError: false,
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
  strAddress: "",
  strAddress2: "",
  strAddress3: "",
  postCode: "",
  homeno: "",
  postAddress: "",
  postAddress2: "",
  postCode2: "",
  cellno: "",
  employer: "",
  workaddr: "",
  workaddr2: "",
  postCode3: "",
  faxno: "",
  workno: "",
  email: "",
  prev_surname: "",
  assessment_date: "",
  club: "",
  learnerIDs: [],
  errors: false
}

const learnerReducer = (state = learnerState, action) => {
  switch (action.type) {
    case RECEIVE_LEARNERS:
      return {...state, learners: action.payload};
    case SAVE_LEARNER:
      return {...state, ...action.payload}
    case VALIDATE_LEARNER:
      return {...state, ...action.payload}
    case UPDATE_LEARNER:
      return {...state, learnerIDs: action.payload.learner_name}
    default:
      return state;
  }
}
export default learnerReducer;
