import { UPDATE_PROGRAMME, RECEIVE_FACILITATORS, VALIDATE_PROGRAMME } from '../actions/actionTypes'


const programmeState = {
  programmeOptions: [{text: "Qualification", value: "Qualification"}, {text: "Unit Standard", value: "Unit Standard"}, {text: "Skill Programme", value: "Skill Programme"}],
  facilitators: [],
  programme_nameError: false,
  facilitatorError: false,
  programmeTypeError: false,
  errors: true,
  credit: "non-credit",
  facilitator: "",
  programme_name: "",
  programmeType: ""

}

const programmeReducer = (state = programmeState, action) => {
  switch(action.type) {
    case UPDATE_PROGRAMME:
      return {...state, credit: action.payload}
    case RECEIVE_FACILITATORS:
      return {...state, facilitators: action.payload };
    case VALIDATE_PROGRAMME:
      return {...state, ...action.payload}
    default:
      return state;
  }
}
export default programmeReducer;
