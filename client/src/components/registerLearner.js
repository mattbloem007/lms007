import React, { Component } from 'react'
import { Form } from 'semantic-ui-react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as learnerActions from '../actions/learnerActions';
import * as tableActions from '../actions/tableActions';
import { isEmpty, isNumeric, isLength, isAlpha, isMobilePhone, isEmail, isAfter } from 'validator';
import { disability, days, months, countryOptions, languageOptions, courseOptions, titleOptions, yesNoOption, genderOptions, EquityOptions, idType, status, education } from '../common'


class registerLearner extends Component {

  constructor(props) {
    super(props);

    this.state = {
                  info:  {
                    id_type: "",
                    national_id: "",
                    last_school: "",
                    statssa: "",
                    education: "",
                    ass_status: "",
                    equity: "",
                    nationality: "",
                    gender: "",
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
                    club: ""
                             }

                }
  }



  validateInput = () => {
    this.props.learnerActions.validateInput(this.state.info)
  }

  handleEmployer = (e, data) => {
    if (data.value == "Yes") {
      this.setState(prevState => ({employed: true, info: {...prevState.info, employed: data.value}}))
    }
    else {
      this.setState(prevState => ({employed: false, info: {...prevState.info, employed: data.value}}))
    }

  }


  back = () => {
    this.props.tableActions.changeActiveTable("learner")
  }

  render() {

    return (
  <Form className="ui form">
    <h4 className="ui dividing header">Learner Information</h4>
  <Form.Group>
    <Form.Group>
          <Form.Select label="ID Type" placeholder="ID Type" options={idType} onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, id_type: data.value}}))}} error={this.props.idTypeError} />
          <Form.Input label="National ID Number" name="id" placeholder="National ID Number" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, national_id: data.value}}))}} error={this.props.idError} />
    </Form.Group>
    </Form.Group>
    <Form.Group>
      <Form.Field>
        <Form.Select label="Equity" placeholder="Select Equity" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, equity: data.value}}))}} fluid search selection options={EquityOptions}/>
      </Form.Field>
      <Form.Field>
        <Form.Select label="Nationality" placeholder='Select Nationality' onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, nationality: data.value}}))}} fluid search selection options={countryOptions} />
      </Form.Field>
      <Form.Field>
      <Form.Select label="Gender" placeholder="Select Gender" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, gender: data.value}}))}}  fluid search selection options={genderOptions} error={this.props.genderError} />
    </Form.Field>
    <Form.Field>
    <Form.Select label="Last School (EMIS Number)" placeholder="Select Last School Attended" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, last_school: data.value}}))}}  fluid search selection options={genderOptions} error={this.props.lastSchoolError} />
  </Form.Field>
  <Form.Field>
    <Form.Input label="Statssa Area" placeholder="Statssa Area" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, statssa: data.value}}))}} />
  </Form.Field>
  <Form.Field>
  <Form.Select label="Highest Education" placeholder="Select Highest Education" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, education: data.value}}))}}  fluid search selection options={education} error={this.props.lastSchoolError} />
</Form.Field>

  </Form.Group>
      <Form.Field>
        <Form.Select label="First Language" placeholder="Select Language" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, language: data.value}}))}} fluid search selection options={languageOptions} error={this.props.languageError} />
    </Form.Field>
    <Form.Group>
      <Form.Field>
      <Form.Select label="Employed" placeholder="Select" onChange={this.handleEmployer} fluid search selection options={yesNoOption} error={this.props.employedError}/>
        {
          this.props.employed ?
          <Form.Field>
            <Form.Input label="Name of Employer" name="employer" placeholder="Name of Employer" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, employer: data.value}}))}} error={this.props.employerError}/>
          </Form.Field>
              :
           <div></div>
        }
      </Form.Field>
      </Form.Group>
      <Form.Field>
        <Form.Select label="Disability" placeholder="Disability" options={disability} onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, disability: data.value}}))}} />
      </Form.Field>
    <Form.Field>
      <Form.Input label="Surname" name="surname" placeholder="Surname" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, surname: data.value}}))}} error={this.props.surnameError}/>
    </Form.Field>
    <Form.Field>
    <Form.Input label="First Name" name="firstname" placeholder="First Name" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, firstname: data.value}}))}} error={this.props.firstnameError}/>
    </Form.Field>
    <Form.Field>
    <Form.Input label="Second Name" name="secondname" placeholder="Second Name" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, secondname: data.value}}))}}/>
    </Form.Field>
    <Form.Group>
      <Form.Field>
      <Form.Select label="Title" placeholder="Select Title" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, title: data.value}}))}} fluid search selection options={titleOptions} error={this.props.titleError}/>
      </Form.Field>
      </Form.Group>
      <Form.Group>
            <Form.Field >
              <Form.Select label="Birth Date" placeholder="DD" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, day: data.value}}))}} fluid search selection options={days} error={this.props.dayError}/>
            </Form.Field>
            <Form.Field>
              <Form.Select placeholder="MM" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, month: data.value}}))}} fluid search selection options={months} error={this.props.monthError}/>
          </Form.Field>
            <Form.Field>
              <Form.Input name="year" maxLength="4" placeholder="YYYY" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, year: data.value}}))}} error={this.props.yearError}/>
            </Form.Field>
      </Form.Group>
      <Form.Group >
        <Form.Field>
          <Form.Input label="Home Address" name="address" placeholder="Home Address Line 1"  onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, strAddress: data.value}}))}} error={this.props.strAddressError} />
        </Form.Field>
        <Form.Field>
          <Form.Input name="address2" placeholder="Address Line 2"  onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, strAddress2: data.value}}))}}/>
        </Form.Field>
        <Form.Field>
          <Form.Input label="Postal Code" name="postal" placeholder="Postal Code" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, postCode: data.value}}))}} error={this.props.postCodeError}/>
        </Form.Field>
      </Form.Group>
    <Form.Group>
      <Form.Field>
      <Form.Input label="Home Phone Number" name="homeno" placeholder="Home Phone Number"  onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, homeno: data.value}}))}} error={this.props.homenoError}/>
      </Form.Field>
    </Form.Group>
    <Form.Group>
        <Form.Field>
          <Form.Input label="Postal Address" type="text" placeholder="Postal Address Line 1"  onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, postAddress: data.value}}))}} error={this.props.postAddressError}/>
        </Form.Field>
        <Form.Field>
          <Form.Input name="address2" placeholder="Postal Address Line 2" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, postAddress2: data.value}}))}}/>
        </Form.Field>
        <Form.Field>
        <Form.Input label="Postal Code" name="postal" placeholder="Postal Code" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, postCode2: data.value}}))}} error={this.props.postCodeError2}/>
        </Form.Field>
      </Form.Group>
    <Form.Group>
      <Form.Field>
      <Form.Input label="Cell Phone Number" name="cellno" placeholder="Cell Phone Number" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, cellno: data.value}}))}} error={this.props.cellnoError}/>
      </Form.Field>
    </Form.Group>
    <Form.Group>
      <Form.Field>
          <Form.Input label="Work Address" name="workaddress" placeholder="Work Address Line 1"  onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, workaddr: data.value}}))}} error={this.props.workAddressError}/>
        </Form.Field>
        <Form.Field>
          <Form.Input name="address2" placeholder="Work Address Line 2" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, workaddr2: data.value}}))}}/>
        </Form.Field>
        <Form.Field>
        <Form.Input label="Postal Code" type="text" name="postal" placeholder="Postal Code" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, postCode3: data.value}}))}} error={this.props.postCode3Error}/>
        </Form.Field>
      </Form.Group>
    <Form.Group>
      <Form.Field>
      <Form.Input label="Fax Number" name="faxno" placeholder="Fax Number" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, faxno: data.value}}))}} error={this.props.faxnoError}/>
      </Form.Field>
      <Form.Field>
      <Form.Input label="Work Phone Number" name="workno" placeholder="Work Phone Number" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, workno: data.value}}))}} error={this.props.worknoError}/>
      </Form.Field>
    </Form.Group>
    <Form.Field>
    <Form.Input label="E-mail Address" name="email" placeholder="E-mail Address" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, email: data.value}}))}} error={this.props.emailError}/>
    </Form.Field>
    <Form.Field>
    <Form.Input label="Previous Surname" name="prevsurname" placeholder="Previous Surname" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, prev_surname: data.value}}))}}/>
    </Form.Field>
    <Form.Field>
    <Form.Select label="Course" placeholder="Select Course" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, course: data.value}}))}} fluid search selection options={courseOptions} error={this.props.courseError}/>
    </Form.Field>
    <Form.Group>
          <Form.Field >
            <Form.Select label="Indicate when summative assessment will be completed" placeholder="DD" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, aday: data.value}}))}} fluid search selection options={days} error={this.props.adayError}/>
          </Form.Field>
          <Form.Field>
            <Form.Select placeholder="MM" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, amonth: data.value}}))}} fluid search selection options={months} error={this.props.amonthError}/>
          </Form.Field>
          <Form.Field>
            <Form.Input name="year" maxLength="4" placeholder="YYYY" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, ayear: data.value}}))}} error={this.props.ayearError}/>
          </Form.Field>
        </Form.Group>
    <Form.Field>
      <Form.Select label="Assessment Status" placeholder="Select Assessment Status" options={status} onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, ass_status: data.value}}))}} fluid search selection error={this.props.amonthError}/>
    </Form.Field>
    <Form.Field>
      <Form.Input label="Assessor" type="text" name="assessor" placeholder="Assessor" />
    </Form.Field>
    <Form.Field>
    <Form.Input label="Moderator" type="text" name="moderator" placeholder="Moderator" />
    </Form.Field>
    <Form.Field>
        <Form.Input label="Facilitator" type="text" name="facilitator" placeholder="Facilitator"  />
    </Form.Field>
    <Form.Field>
    <Form.Input label="Club" name="club" placeholder="Club"  onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, club: data.value}}))}} error={this.props.clubError}/>
    </Form.Field>
    <Form.Group widths='equal'>
      <Form.Button onClick={this.back} className="ui button" tabIndex="0">Back</Form.Button>
      <Form.Button onClick={this.validateInput} className="ui button" tabIndex="0">Save Learner</Form.Button>
    </Form.Group>
  </Form>
    )
  }

}
const mapStateToProps = state => ({
  idTypeError: state.learner.idTypeError,
  idError: state.learner.idError,
  equityError: state.learner.equityError,
  nationalityError: state.learner.nationalityError,
  genderError: state.learner.genderError,
  lastSchoolError: state.learner.lastSchoolError,
  languageError: state.learner.languageError,
  employedError: state.learner.employedError,
  surnameError: state.learner.surnameError,
  firstnameError: state.learner.firstnameError,
  titleError: state.learner.titleError,
  yearError: state.learner.yearError,
  monthError: state.learner.monthError,
  dayError: state.learner.dayError,
  ayearError: state.learner.ayearError,
  amonthError: state.learner.amonthError,
  adayError: state.learner.adayError,
  strAddressError: state.learner.strAddressError,
  postCodeError: state.learner.postCodeError,
  postCode2Error: state.learner.postCode2Error,
  postCode3Error: state.learner.postCode3Error,
  homenoError: state.learner.homenoError,
  postAddressError: state.learner.postAddressError,
  workAddressError: state.learner.workAddressError,
  cellnoError: state.learner.cellnoError,
  employerError: state.learner.employerError,
  worknoError: state.learner.worknoError,
  faxnoError: state.learner.faxnoError,
  emailError: state.learner.emailError,
  clubError: state.learner.clubError,
  courseError: state.learner.courseError,
  year2Error: state.learner.year2Error,
  employed: state.learner.employed,
  errors: state.learner.errors
})
const mapDispatchToProps = dispatch => ({
  learnerActions: bindActionCreators(learnerActions, dispatch),
  tableActions: bindActionCreators(tableActions, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(registerLearner);
