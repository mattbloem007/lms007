import React, { Component } from 'react'
import { Form, Checkbox, Icon, Container, Message } from 'semantic-ui-react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as learnerActions from '../actions/learnerActions';
import * as flowActions from '../actions/flowActions';
import * as tableActions from '../actions/tableActions';
import { isEmpty, isNumeric, isLength, isAlpha, isMobilePhone, isEmail, isAfter } from 'validator';
import { disability, days, months, countryOptions, languageOptions, courseOptions, titleOptions, yesNoOption, genderOptions, EquityOptions, idType, status, education } from '../common'
import _ from 'lodash'

class registerLearner extends Component {

  constructor(props) {
    super(props);

    this.state = {
                  info:  {
                    id_type: "",
                    national_id: "",
                    last_school: "",
                    year_attented: "",
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
                    strAddress4: "",
                    postCode: "",
                    homeno: "",
                    postAddress: "",
                    postAddress2: "",
                    postAddress3:"",
                    postAddress4:"",
                    postCode2: "",
                    cellno: "",
                    employer: "",
                    faxno: "",
                    workno: "",
                    email: "",
                    prev_surname: "",
                    assessment_date: "",
                    fac: [],
                    ass: [],
                    mod: [],
                    addrCheck: false,
                    club: "",
                    save: false,
                    idError: true
                  }

                }
  }

  componentDidMount() {
    // this.props.learnerActions.fetchFacilitator();
    // this.props.learnerActions.fetchAssessor();
    // this.props.learnerActions.fetchModerator();
    this.props.learnerActions.fetchClubs();

  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps)
    // this.setState(prevState => ({info: {...prevState.info, ...nextProps}}))
    // console.log(this.state.info)
  }

  handleCheck = () => {
    let addrInfo = {
      strAddress: this.state.info.strAddress,
      strAddress2: this.state.info.strAddress2,
      strAddress3: this.state.info.strAddress3,
      strAddress4: this.state.info.strAddress4,
      postCode: this.state.info.postCode,
      postAddress: this.state.info.postAddress,
      postAddress2: this.state.info.postAddress2,
      postAddress3: this.state.info.postAddress3,
      postAddress4: this.state.info.postAddress4,
      postCode2: this.state.info.postCode

    }
    this.setState(prevState => ({info: {...prevState.info, addrCheck: !this.state.addrCheck}}))
    this.props.learnerActions.updateChecked(this.props.addrCheck, addrInfo)
  //  this.forceUpdate()
  //  console.log("done")
  }


  validateInput = () => {
    let arrID = [this.props.national_id]
    let objID = {learnerIDs: arrID};
    this.props.learnerActions.updateBatchLearner(objID)
    this.props.learnerActions.updateLearner(this.state.info)
    .then(() => {
      if (this.props.success) {
        this.setState({save: true})
      }
    })
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
    this.props.learnerActions.updateLearner(this.state.info)
    if (this.props.type == "add") {
      this.props.tableActions.changeActiveTable("learnerTable")
      this.props.flowActions.changeActiveStep("client")

    }
    else if (this.props.type == "edit-t"){
      this.props.flowActions.changeActiveStep("Learners")
      this.props.flowActions.changeActiveStep("client")
    }
    else if (this.props.type == "edit-l") {
      this.props.tableActions.changeActiveTable("learnerTable")
      this.props.flowActions.changeActiveStep("client")
    }
  }

  checkID = (data) => {

    if(_.find(this.props.learners, {'value': data.value}) != undefined) {
      this.setState(prevState => ({info: {...prevState.info, national_id: data.value, idError: false}}));
    }
    else {
      this.setState(prevState => ({info: {...prevState.info, national_id: data.value, idError: true}}));
    }
  }

  render() {

    return (
<Container>
  {
    this.props.addrCheck ?
    <Form className="ui form" success={this.state.save}>
      <h4 className="ui dividing header">Learner Information</h4>
    <Form.Group>
      <Form.Group>
            <Form.Select defaultValue={this.props.id_type} label="ID Type" placeholder="ID Type" options={idType} onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, id_type: data.value}}))}} error={this.props.idTypeError} />
            <Form.Input defaultValue={this.props.national_id} label="National ID Number" name="id" placeholder="National ID Number" onChange={(e, data) => this.checkID(data)} error={this.props.idError} />
            <Message color='red' hidden={this.state.info.idError} size='mini'>This learner already exists</Message>
      </Form.Group>
      </Form.Group>
      <Form.Group>
        <Form.Field>
          <Form.Select defaultValue={this.props.title} label="Title" placeholder="Select Title" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, title: data.value}}))}} fluid search selection options={titleOptions} error={this.props.titleError}/>
        </Form.Field>
        <Form.Field>
          <Form.Input defaultValue={this.props.surname} label="Surname" name="surname" placeholder="Surname" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, surname: data.value}}))}} error={this.props.surnameError}/>
        </Form.Field>
        <Form.Field>
          <Form.Input defaultValue={this.props.firstname} label="First Name" name="firstname" placeholder="First Name" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, firstname: data.value}}))}} error={this.props.firstnameError}/>
        </Form.Field>
        <Form.Field>
          <Form.Input defaultValue={this.props.secondname} label="Second Name" name="secondname" placeholder="Second Name" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, secondname: data.value}}))}}/>
        </Form.Field>
        <Form.Field>
          <label>Birth Date</label>
        </Form.Field>
        <Form.Group>
          <Form.Field>
            <Form.Select defaultValue={this.props.day}  placeholder="DD" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, day: data.value}}))}} fluid search selection options={days} error={this.props.dayError}/>
          </Form.Field>
          <Form.Field>
            <Form.Select defaultValue={this.props.month} placeholder="MM" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, month: data.value}}))}} fluid search selection options={months} error={this.props.monthError}/>
          </Form.Field>
          <Form.Field>
            <Form.Input defaultValue={this.props.year} name="year" maxLength="4" placeholder="YYYY" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, year: data.value}}))}} error={this.props.yearError}/>
          </Form.Field>
        </Form.Group>
      </Form.Group>
        <Form.Field>
          <Form.Select defaultValue={this.props.equity} label="Equity" placeholder="Select Equity" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, equity: data.value}}))}} fluid search selection options={EquityOptions}/>
        </Form.Field>
        <Form.Field>
          <Form.Select  defaultValue={this.props.nationality} label="Nationality" placeholder='Select Nationality' onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, nationality: data.value}}))}} fluid search selection options={countryOptions} />
        </Form.Field>
        <Form.Field>
        <Form.Select defaultValue={this.props.gender} label="Gender" placeholder="Select Gender" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, gender: data.value}}))}}  fluid search selection options={genderOptions} error={this.props.genderError} />
      </Form.Field>
      <Form.Field>
      <Form.Input defaultValue={this.props.last_school} label="Last School (EMIS Number)" placeholder="Enter Last School Attended" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, last_school: data.value}}))}} error={this.props.lastSchoolError} />
    </Form.Field>
    <Form.Field>
    <Form.Input defaultValue={this.props.year_attented} label="Last Year at High School" placeholder="Enter Last Year" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, year_attented: data.value}}))}} />
  </Form.Field>
    <Form.Field>
      <Form.Input defaultValue={this.props.statssa} label="Statssa Area" placeholder="Statssa Area" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, statssa: data.value}}))}} />
    </Form.Field>
    <Form.Field>
    <Form.Select defaultValue={this.props.education} label="Highest Education" placeholder="Select Highest Education" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, education: data.value}}))}}  fluid search selection options={education} error={this.props.lastSchoolError} />
  </Form.Field>
    <Form.Field>
      <Form.Select defaultValue={this.props.language} label="First Language" placeholder="Select Language" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, language: data.value}}))}} fluid search selection options={languageOptions} error={this.props.languageError} />
    </Form.Field>
      <Form.Group>
        <Form.Field>
        <Form.Select defaultValue={this.props.employed} label="Employed" placeholder="Select" onChange={this.handleEmployer} fluid search selection options={yesNoOption} error={this.props.employedError}/>
            <Form.Field>
              <Form.Input defaultValue={this.props.employer} label="Name of Employer" name="employer" placeholder="Name of Employer" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, employer: data.value}}))}} error={this.props.employerError}/>
            </Form.Field>
        </Form.Field>
        </Form.Group>
        <Form.Field>
          <Form.Select defaultValue={this.props.disability} label="Disability" placeholder="Disability" options={disability} onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, disability: data.value}}))}} />
        </Form.Field>


          <Form.Field>
            <Form.Input defaultValue={this.props.strAddress} label="Physical Address" name="address" placeholder="Home Address Line 1"  onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, strAddress: data.value}}))}} error={this.props.strAddressError} />
          </Form.Field>
          <Form.Field>
            <Form.Input defaultValue={this.props.strAddress2} name="address2" placeholder="Address Line 2"  onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, strAddress2: data.value}}))}}/>
          </Form.Field>
          <Form.Field>
            <Form.Input defaultValue={this.props.strAddress3} name="address2" placeholder="Address Line 3"  onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, strAddress3: data.value}}))}}/>
          </Form.Field>
          <Form.Field>
            <Form.Input defaultValue={this.props.strAddress4} name="address2" placeholder="Address Line 4"  onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, strAddress4: data.value}}))}}/>
          </Form.Field>
          <Form.Field>
            <Form.Input defaultValue={this.props.postCode} label="Postal Code" name="postal" placeholder="Postal Code" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, postCode: data.value}}))}} error={this.props.postCodeError}/>
          </Form.Field>
        <Form.Field>
          <Form.Input defaultValue={this.props.homeno} label="Home Phone Number" name="homeno" placeholder="Home Phone Number"  onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, homeno: data.value}}))}} error={this.props.homenoError}/>
        </Form.Field>
        <Form.Field>
          <Checkbox value={this.props.addrCheck} label="Same as Physical Address" onChange={this.handleCheck}/>
        </Form.Field>
      <Form.Group>
        <Form.Field>
        <Form.Input defaultValue={this.props.cellno} label="Cell Phone Number" name="cellno" placeholder="Cell Phone Number" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, cellno: data.value}}))}} error={this.props.cellnoError}/>
        </Form.Field>
      </Form.Group>
      <Form.Group>
        <Form.Field>
        <Form.Input defaultValue={this.props.faxno} label="Fax Number" name="faxno" placeholder="Fax Number" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, faxno: data.value}}))}} error={this.props.faxnoError}/>
        </Form.Field>
        <Form.Field>
        <Form.Input defaultValue={this.props.workno} label="Work Phone Number" name="workno" placeholder="Work Phone Number" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, workno: data.value}}))}} error={this.props.worknoError}/>
        </Form.Field>
      </Form.Group>
      <Form.Field>
      <Form.Input defaultValue={this.props.email} label="E-mail Address" name="email" placeholder="E-mail Address" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, email: data.value}}))}} error={this.props.emailError}/>
      </Form.Field>
      <Form.Field>
      <Form.Input defaultValue={this.props.prev_surname} label="Previous Surname" name="prevsurname" placeholder="Previous Surname" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, prev_surname: data.value}}))}}/>
      </Form.Field>
      <Form.Field>
        <Form.Select defaultValue={this.props.ass_status} label="Assessment Status" placeholder="Select Assessment Status" options={status} onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, ass_status: data.value}}))}} fluid search selection />
      </Form.Field>
      <Form.Field>
      <Form.Select defaultValue={this.props.club} label="Club" name="club" placeholder="Select Club Name"  options={this.props.clubs} onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, club: data.value}}))}} error={this.props.clubError}/>
      </Form.Field>
      <Message success header='Form Completed' content="Saved Learner Successfully" />
      <Form.Group widths='equal'>
        <Form.Button primary onClick={this.back} className="ui button" tabIndex="0"><Icon name="chevron circle left"/>Back</Form.Button>
        <Form.Button primary onClick={this.validateInput} className="ui button" tabIndex="0"><Icon name="save"/>Save Learner</Form.Button>
      </Form.Group>
    </Form>
    :
    <Form className="ui form" success={this.state.save}>
      <h4 className="ui dividing header">Learner Information</h4>
    <Form.Group>
      <Form.Group>
            <Form.Select defaultValue={this.props.id_type} label="ID Type" placeholder="ID Type" options={idType} onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, id_type: data.value}}))}} error={this.props.idTypeError} />
            <Form.Input defaultValue={this.props.national_id} label="National ID Number" name="id" placeholder="National ID Number" onChange={(e, data) => this.checkID(data)} error={this.props.idError} />
            <Message color='red' hidden={this.state.info.idError} size='mini'>This learner already exists</Message>

      </Form.Group>
      </Form.Group>
      <Form.Group>
        <Form.Field>
          <Form.Select defaultValue={this.props.title} label="Title" placeholder="Select Title" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, title: data.value}}))}} fluid search selection options={titleOptions} error={this.props.titleError}/>
        </Form.Field>
        <Form.Field>
          <Form.Input defaultValue={this.props.surname} label="Surname" name="surname" placeholder="Surname" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, surname: data.value}}))}} error={this.props.surnameError}/>
        </Form.Field>
        <Form.Field>
          <Form.Input defaultValue={this.props.firstname} label="First Name" name="firstname" placeholder="First Name" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, firstname: data.value}}))}} error={this.props.firstnameError}/>
        </Form.Field>
        <Form.Field>
          <Form.Input defaultValue={this.props.secondname} label="Second Name" name="secondname" placeholder="Second Name" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, secondname: data.value}}))}}/>
        </Form.Field>
        <Form.Field>
          <label>Birth Date</label>
        </Form.Field>
        <Form.Group>
          <Form.Field>
            <Form.Select defaultValue={this.props.day}  placeholder="DD" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, day: data.value}}))}} fluid search selection options={days} error={this.props.dayError}/>
          </Form.Field>
          <Form.Field>
            <Form.Select defaultValue={this.props.month} placeholder="MM" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, month: data.value}}))}} fluid search selection options={months} error={this.props.monthError}/>
          </Form.Field>
          <Form.Field>
            <Form.Input defaultValue={this.props.year} name="year" maxLength="4" placeholder="YYYY" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, year: data.value}}))}} error={this.props.yearError}/>
          </Form.Field>
        </Form.Group>
      </Form.Group>
        <Form.Field>
          <Form.Select defaultValue={this.props.equity} label="Equity" placeholder="Select Equity" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, equity: data.value}}))}} fluid search selection options={EquityOptions}/>
        </Form.Field>
        <Form.Field>
          <Form.Select  defaultValue={this.props.nationality} label="Nationality" placeholder='Select Nationality' onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, nationality: data.value}}))}} fluid search selection options={countryOptions} />
        </Form.Field>
        <Form.Field>
        <Form.Select defaultValue={this.props.gender} label="Gender" placeholder="Select Gender" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, gender: data.value}}))}}  fluid search selection options={genderOptions} error={this.props.genderError} />
      </Form.Field>
      <Form.Field>
      <Form.Input defaultValue={this.props.last_school} label="Last School (EMIS Number)" placeholder="Enter Last School Attended" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, last_school: data.value}}))}} error={this.props.lastSchoolError} />
    </Form.Field>
    <Form.Field>
      <Form.Input defaultValue={this.props.year_attented} label="Last Year at High School" placeholder="Enter Last Year" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, year_attented: data.value}}))}} />
    </Form.Field>
    <Form.Field>
      <Form.Input defaultValue={this.props.statssa} label="Statssa Area" placeholder="Statssa Area" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, statssa: data.value}}))}} />
    </Form.Field>
    <Form.Field>
    <Form.Select defaultValue={this.props.education} label="Highest Education" placeholder="Select Highest Education" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, education: data.value}}))}}  fluid search selection options={education} error={this.props.lastSchoolError} />
  </Form.Field>
    <Form.Field>
      <Form.Select defaultValue={this.props.language} label="First Language" placeholder="Select Language" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, language: data.value}}))}} fluid search selection options={languageOptions} error={this.props.languageError} />
    </Form.Field>
      <Form.Group>
        <Form.Field>
        <Form.Select defaultValue={this.props.employed} label="Employed" placeholder="Select" onChange={this.handleEmployer} fluid search selection options={yesNoOption} error={this.props.employedError}/>
            <Form.Field>
              <Form.Input defaultValue={this.props.employer} label="Name of Employer" name="employer" placeholder="Name of Employer" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, employer: data.value}}))}} error={this.props.employerError}/>
            </Form.Field>
        </Form.Field>
        </Form.Group>
        <Form.Field>
          <Form.Select defaultValue={this.props.disability} label="Disability" placeholder="Disability" options={disability} onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, disability: data.value}}))}} />
        </Form.Field>


          <Form.Field>
            <Form.Input defaultValue={this.props.strAddress} label="Physical Address" name="address" placeholder="Home Address Line 1"  onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, strAddress: data.value}}))}} error={this.props.strAddressError} />
          </Form.Field>
          <Form.Field>
            <Form.Input defaultValue={this.props.strAddress2} name="address2" placeholder="Address Line 2"  onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, strAddress2: data.value}}))}}/>
          </Form.Field>
          <Form.Field>
            <Form.Input defaultValue={this.props.strAddress3} name="address2" placeholder="Address Line 3"  onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, strAddress3: data.value}}))}}/>
          </Form.Field>
          <Form.Field>
            <Form.Input defaultValue={this.props.strAddress4} name="address2" placeholder="Address Line 4"  onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, strAddress4: data.value}}))}}/>
          </Form.Field>
          <Form.Field>
            <Form.Input defaultValue={this.props.postCode} label="Postal Code" name="postal" placeholder="Postal Code" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, postCode: data.value}}))}} error={this.props.postCodeError}/>
          </Form.Field>
        <Form.Field>
          <Form.Input defaultValue={this.props.homeno} label="Home Phone Number" name="homeno" placeholder="Home Phone Number"  onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, homeno: data.value}}))}} error={this.props.homenoError}/>
        </Form.Field>
        <Form.Field>
          <Checkbox value={this.props.addrCheck} label="Same as Physical Address" onChange={this.handleCheck}/>
        </Form.Field>
        <Form.Field>
            <Form.Input defaultValue={this.props.postAddress} label="Postal Address" type="text" placeholder="Postal Address Line 1"  onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, postAddress: data.value}}))}} error={this.props.postAddressError}/>
        </Form.Field>
          <Form.Field>
            <Form.Input defaultValue={this.props.postAddress2} name="address2" placeholder="Postal Address Line 2" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, postAddress2: data.value}}))}}/>
          </Form.Field>
          <Form.Field>
            <Form.Input defaultValue={this.props.postAddress3} name="address2" placeholder="Postal Address Line 3" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, postAddress3: data.value}}))}}/>
          </Form.Field>
          <Form.Field>
            <Form.Input defaultValue={this.props.postAddress4} name="address2" placeholder="Postal Address Line 4" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, postAddress4: data.value}}))}}/>
          </Form.Field>
          <Form.Field>
          <Form.Input defaultValue={this.props.postCode2} label="Postal Code" name="postal" placeholder="Postal Code" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, postCode2: data.value}}))}} error={this.props.postCode2Error}/>
          </Form.Field>
      <Form.Group>
        <Form.Field>
        <Form.Input defaultValue={this.props.cellno} label="Cell Phone Number" name="cellno" placeholder="Cell Phone Number" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, cellno: data.value}}))}} error={this.props.cellnoError}/>
        </Form.Field>
      </Form.Group>
      <Form.Group>
        <Form.Field>
        <Form.Input defaultValue={this.props.faxno} label="Fax Number" name="faxno" placeholder="Fax Number" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, faxno: data.value}}))}} error={this.props.faxnoError}/>
        </Form.Field>
        <Form.Field>
        <Form.Input defaultValue={this.props.workno} label="Work Phone Number" name="workno" placeholder="Work Phone Number" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, workno: data.value}}))}} error={this.props.worknoError}/>
        </Form.Field>
      </Form.Group>
      <Form.Field>
      <Form.Input defaultValue={this.props.email} label="E-mail Address" name="email" placeholder="E-mail Address" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, email: data.value}}))}} error={this.props.emailError}/>
      </Form.Field>
      <Form.Field>
      <Form.Input defaultValue={this.props.prev_surname} label="Previous Surname" name="prevsurname" placeholder="Previous Surname" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, prev_surname: data.value}}))}}/>
      </Form.Field>
      <Form.Field>
        <Form.Select defaultValue={this.props.ass_status} label="Assessment Status" placeholder="Select Assessment Status" options={status} onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, ass_status: data.value}}))}} fluid search selection />
      </Form.Field>
      <Form.Field>
      <Form.Select defaultValue={this.props.club} label="Club" name="club" placeholder="Select Club Name"  options={this.props.clubs} onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, club: data.value}}))}} error={this.props.clubError}/>
      </Form.Field>
      <Message success header='Form Completed' content="Saved Learner Successfully" />
      <Form.Group widths='equal'>
        <Form.Button primary onClick={this.back} className="ui button" tabIndex="0"><Icon name="chevron circle left"/>Back</Form.Button>
        <Form.Button primary onClick={this.validateInput} className="ui button" tabIndex="0"><Icon name="save"/>Save Learner</Form.Button>
      </Form.Group>
    </Form>
  }
  </Container>
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
  // ayearError: state.learner.ayearError,
  // amonthError: state.learner.amonthError,
  // adayError: state.learner.adayError,
  strAddressError: state.learner.strAddressError,
  postCodeError: state.learner.postCodeError,
  postCode2Error: state.learner.postCode2Error,
  homenoError: state.learner.homenoError,
  postAddressError: state.learner.postAddressError,
  cellnoError: state.learner.cellnoError,
  employerError: state.learner.employerError,
  worknoError: state.learner.worknoError,
  faxnoError: state.learner.faxnoError,
  emailError: state.learner.emailError,
  clubError: state.learner.clubError,
  courseError: state.learner.courseError,
  year2Error: state.learner.year2Error,
  employed: state.learner.employed,
  id_type: state.learner.id_type,
  statssa: state.learner.statssa,
  education: state.learner.education,
  ass_status: state.learner.ass_status,
  national_id: state.learner.national_id,
  equity: state.learner.equity,
  nationality: state.learner.nationality,
  gender: state.learner.gender,
  last_school: state.learner.last_school,
  year_attented: state.learner.year_attented,
  language: state.learner.language,
  employed: state.learner.employed,
  disability: state.learner.disability,
  surname: state.learner.surname,
  firstname: state.learner.firstname,
  secondname: state.learner.secondname,
  title: state.learner.title,
  day: state.learner.day,
  month: state.learner.month,
  year: state.learner.year,
  aday: state.learner.aday,
  amonth: state.learner.amonth,
  ayear: state.learner.ayear,
  dob: state.learner.dob,
  strAddress: state.learner.strAddress,
  strAddress2: state.learner.strAddress2,
  strAddress3: state.learner.strAddress3,
  strAddress4: state.learner.strAddress4,
  postCode: state.learner.postCode,
  homeno: state.learner.homeno,
  postAddress: state.learner.postAddress,
  postAddress2: state.learner.postAddress2,
  postAddress3: state.learner.postAddress3,
  postAddress4: state.learner.postAddress4,
  postCode2: state.learner.postCode2,
  cellno: state.learner.cellno,
  employer: state.learner.employer,
  faxno: state.learner.faxno,
  workno: state.learner.workno,
  email: state.learner.email,
  prev_surname: state.learner.prev_surname,
  assessment_date: state.learner.assessment_date,
  facilitators:state.learner.facilitators,
  moderators:state.learner.moderators,
  assessors:state.learner.assessors,
  club: state.learner.club,
  errors: state.learner.errors,
  clubs: state.learner.clubs,
  addrCheck: state.learner.addrCheck,
  learnerInfo: state.learner.learnerInfo,
  type: state.learner.type,
  success: state.learner.success,
  learners: state.learner.learners

})
const mapDispatchToProps = dispatch => ({
  learnerActions: bindActionCreators(learnerActions, dispatch),
  flowActions: bindActionCreators(flowActions, dispatch),
  tableActions: bindActionCreators(tableActions, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(registerLearner);
