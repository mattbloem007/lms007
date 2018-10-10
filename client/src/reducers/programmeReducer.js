import { UPDATE_PROGRAMME, RECEIVE_FACILITATORS, VALIDATE_PROGRAMME, RECEIVE_ASSESSORS, RECEIVE_MODERATORS } from '../actions/actionTypes'


const programmeState = {
  programmeOptions: [{text: "Qualification", value: "Qualification"}, {text: "Unit Standard", value: "Unit Standard"}, {text: "Skill Programme", value: "Skill Programme"}, {text: "Short Course", value: "Short Course"}],
  facilitators: [],
  assessors: [],
  moderators: [],
  fac: [],
  ass: [],
  mod: [],
  programme_nameError: false,
  facilitatorError: false,
  programmeTypeError: false,
  errors: true,
  credit: "non-credit",
  creditStatus: false,
  facilitator: "",
  programme_name: "",
  programmeType: ""

}

const programmeReducer = (state = programmeState, action) => {
  switch(action.type) {
    case UPDATE_PROGRAMME:
      let status = false;
      if (action.payload == "credit") {
        status = true;
      }
      return {...state, credit: action.payload, creditStatus: status}
    case RECEIVE_FACILITATORS:
      return {...state, facilitators: action.payload };
    case RECEIVE_ASSESSORS:
        return {...state, assessors: action.payload };
    case RECEIVE_MODERATORS:
        return {...state, moderators: action.payload };
    case VALIDATE_PROGRAMME:
      return {...state, ...action.payload}
    default:
      return state;
  }
}
export default programmeReducer;
