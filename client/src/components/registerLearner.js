import React, { Component } from 'react'
import { Input, Form, Dropdown, Button } from 'semantic-ui-react';
import { isEmpty, isNumeric, isLength, isAlpha, isMobilePhone, isEmail, isAfter } from 'validator';
import { days, months, countryOptions, languageOptions, courseOptions, titleOptions, yesNoOption, genderOptions, EquityOptions } from '../common'


class registerLearner extends Component {

  constructor(props) {
    super(props);

    this.state = {
                  idError: false,
                  equityError: false,
                  nationalityError: false,
                  genderError: false,
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
                  info:  {
                              national_id: "",
                              alt_id: "",
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



  validateInput = (e) => {
    e.preventDefault();
    let errors = false;

    if (isEmpty(this.state.info.national_id) || isLength(this.state.info.national_id) < 13 || !isNumeric(this.state.info.national_id)) {
        this.setState({ idError: true });
        errors = true;
    }
    if(isEmpty(this.state.info.equity)) {
      this.setState({ equityError: true });
      errors = true;
    }
    if(isEmpty(this.state.info.nationality)){
      this.setState({ nationalityError: true });
      errors = true;
    }
    if(isEmpty(this.state.info.gender)){
      this.setState({ genderError: true });
      errors = true;
    }
    if(isEmpty(this.state.info.language)){
      this.setState({ languageError: true });
      errors = true;
    }
    if(isEmpty(this.state.info.employed)){
      this.setState({ employedError: true });
      errors = true;
    }
    if(isEmpty(this.state.info.surname) && !isAlpha(this.state.info.surname)){
      this.setState({ surnameError: true });
      errors = true;
    }
    if(isEmpty(this.state.info.firstname) && !isAlpha(this.state.info.firstname)){
      this.setState({ firstnameError: true });
      errors = true;
    }
    if(isEmpty(this.state.info.title)){
      this.setState({ titleError: true });
      errors = true;
    }
    if(isEmpty(this.state.info.year) || isLength(this.state.info.year) < 4 || isAfter(this.state.info.year)){
      this.setState({ yearError: true });
      errors = true;
    }
    if(isEmpty(this.state.info.month)){
      this.setState({ monthError: true });
      errors = true;
    }
    if(isEmpty(this.state.info.day)){
      this.setState({ dayError: true });
      errors = true;
    }
    if(isEmpty(this.state.info.ayear) || isLength(this.state.info.ayear) < 4 || isAfter(this.state.info.ayear)){
      this.setState({ ayearError: true });
      errors = true;
    }
    if(isEmpty(this.state.info.amonth)){
      this.setState({ amonthError: true });
      errors = true;
    }
    if(isEmpty(this.state.info.aday)){
      this.setState({ adayError: true });
      errors = true;
    }
    if(isEmpty(this.state.info.strAddress)) {
      this.setState({ strAddressError: true });
      errors = true;
    }

    if(isEmpty(this.state.info.postCode) || !isNumeric(this.state.info.postCode)) {
      this.setState({ postCodeError: true });
      errors = true;
    }
    if(isEmpty(this.state.info.postAddress)) {
      this.setState({ postAddressError: true });
      errors = true;
    }

    if(isEmpty(this.state.info.postCode2) || !isNumeric(this.state.info.postCode2)) {
      this.setState({ postCode2Error: true });
      errors = true;
    }
    if(isEmpty(this.state.info.workaddr)) {
      this.setState({ workAddressError: true });
      errors = true;
    }

    if(isEmpty(this.state.info.postCode3) || !isNumeric(this.state.info.postCode3))
     {
      this.setState({ postCode3Error: true });
      errors = true;
    }
    if(!isMobilePhone(this.state.info.homeno)){
      this.setState({ homenoError: true });
      errors = true;
    }
    if(!isMobilePhone(this.state.info.cellno)){
      this.setState({ cellnoError: true });
      errors = true;
    }
    if(isEmpty(this.state.info.employer)){
      this.setState({ employerError: true });
      errors = true;
    }
    if(!isMobilePhone(this.state.info.faxno)){
      this.setState({ faxnoError: true });
      errors = true;
    }
    if(!isMobilePhone(this.state.info.workno)){
      this.setState({ worknoError: true });
      errors = true;
    }
    if(!isEmail(this.state.info.email)){
      this.setState({ emailError: true });
      errors = true;
    }
    if(isEmpty(this.state.info.club)){
      this.setState({ clubError: true });
      errors = true;
    }

    if(errors === false) {
      this.handleNext("learner");
    }

  }

  handleEmployer = (e, data) => {
    if (data.value == "Yes") {
      this.setState(prevState => ({employed: true, info: {...prevState.info, employed: data.value}}))
    }
    else {
      this.setState(prevState => ({employed: false, info: {...prevState.info, employed: data.value}}))
    }

  }

  handleSubmit = (event) => {
    event.preventDefault();

    let info = {
                national_id: this.state.info.national_id,
                alt_id: this.state.info.alt_id,
                equity: this.state.info.equity,
                nationality: this.state.info.nationality,
                gender: this.state.info.gender,
                language: this.state.info.language,
                employed: this.state.info.employed,
                disability: this.state.info.disability,
                surname: this.state.info.surname,
                firstname: this.state.info.firstname,
                secondname: this.state.info.secname,
                title: this.state.info.title,
                dob: this.state.info.year + "-" + this.state.info.month + "-" + this.state.info.day,
                homeaddr: this.state.info.strAddress + ", " + this.state.info.strAddress2 + ", " + this.state.info.postCode,
                postaddr: this.state.info.postAddress +", " + this.state.info.postAddress2 + ", " + this.state.info.postCode2,
                homeno: this.state.info.homeno,
                cellno: this.state.info.cellno,
                employer: this.state.info.employer,
                workaddr: this.state.info.workaddr +", " + this.state.info.workaddr2 + ", " + this.state.info.postCode3,
                faxno: this.state.info.faxno,
                workno: this.state.info.wphno,
                email: this.state.info.email,
                prev_surname: this.state.info.prev_surname,
                assessment_date: this.state.info.ayear + "-" + this.state.info.amonth + "-" + this.state.info.aday,
              //  assessor: this.refs.assessor.value,
                //moderator: this.refs.moderator.value,
                //facilitator: this.refs.facilitator.value,
                club: this.state.info.club
               }

    this.props.handleSubmit(info);
  }

  handleBack = (e, form) => {
    e.preventDefault();
    this.props.handleBack(e, form);
  }

  render() {

    return (
  <Form className="ui form">
    <h4 className="ui dividing header">Learner Information</h4>
    <div className="field">
      <label>National ID Number</label>
      <div className="two fields">
        <div className="field">
          <Input name="id" placeholder="National ID Number" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, national_id: data.value}}))}} error={this.state.idError} />
        </div>
        <div className="field">
          <Input name="altid" placeholder="Alternative ID Type" ref="altid" />
        </div>
      </div>
    </div>
    <div className="three fields">
      <div className="field">
        <label>Equity</label>
          <Dropdown placeholder="Select Equity" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, equity: data.value}}))}} fluid search selection options={EquityOptions}/>
      </div>
      <div className="field">
        <label>Nationality</label>
          <Dropdown placeholder='Select Nationality' onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, nationality: data.value}}))}} fluid search selection options={countryOptions} />
      </div>
      <div className="field">
        <label>Gender</label>
        <Dropdown placeholder="Select Gender" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, gender: data.value}}))}}  fluid search selection options={genderOptions} error={this.state.genderError} />
      </div>
    </div>
      <div className="field">
          <label>First Language</label>
          <Dropdown placeholder="Select Language" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, language: data.value}}))}} fluid search selection options={languageOptions} error={this.state.languageError} />
      </div>
    <div className="two fields">
      <div className="field">
        <label>Employed</label>
        <Dropdown placeholder="Select" onChange={this.handleEmployer} fluid search selection options={yesNoOption} error={this.state.employedError}/>
        {
          this.state.employed ?
          <div className="field">
            <label>Name of Employer</label>
            <Input  name="employer" placeholder="Name of Employer" ref="employer" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, employer: data.value}}))}} error={this.state.employerError}/>
          </div>
              :
           <div></div>
        }
      </div>
      <div className="field">
        <label>Disability</label>
          <Input name="disability" placeholder="Disability" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, disability: data.value}}))}} />
      </div>
    </div>
    <div className="field">
      <label>Surname</label>
      <Input name="surname" placeholder="Surname" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, surname: data.value}}))}} error={this.state.surnameError}/>
    </div>
    <div className="field">
      <label>First Name</label>
      <Input name="firstname" placeholder="First Name" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, firstname: data.value}}))}} error={this.state.firstnameError}/>
    </div>
    <div className="field">
      <label>Second Name</label>
      <Input name="secondname" placeholder="Second Name" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, secondname: data.value}}))}}/>
    </div>
    <div className="two fields">
      <div className="field">
        <label>Title</label>
          <Dropdown placeholder="Select Title" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, title: data.value}}))}} fluid search selection options={titleOptions} error={this.state.titleError}/>
      </div>
      <div className="field">
        <label>Birth Date</label>
          <div className="three fields">
            <div className="field">
              <Dropdown placeholder="DD" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, day: data.value}}))}} fluid search selection options={days} error={this.state.dayError}/>
            </div>
            <div className="field">
              <Dropdown placeholder="MM" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, month: data.value}}))}} fluid search selection options={months} error={this.state.monthError}/>
            </div>
            <div className="field">
              <Input name="year" maxLength="4" placeholder="YYYY" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, year: data.value}}))}} error={this.state.yearError}/>
            </div>
          </div>
      </div>
    </div>
    <div className="field">
      <label>Home Address</label>
      <div className="fields">
        <div className="twelve wide field">
          <Input name="address" placeholder="Street Address" ref="addr" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, strAddress: data.value}}))}} error={this.state.strAddressError} />
        </div>
        <div className="four wide field">
          <Input name="address2" placeholder="Apt #" ref="addr2" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, strAddress2: data.value}}))}}/>
        </div>
      </div>
    </div>
    <div className="two fields">
      <div className="field">
        <label>Postal Code</label>
        <Input name="postal" placeholder="Postal Code" ref="addr3" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, postCode: data.value}}))}} error={this.state.postCodeError}/>
      </div>
      <div className="field">
        <label>Home Phone Number</label>
        <Input name="homeno" placeholder="Home Phone Number" ref="homeno" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, homeno: data.value}}))}} error={this.state.homenoError}/>
      </div>
    </div>
    <div className="field">
      <label>Postal Address</label>
      <div className="fields">
        <div className="twelve wide field">
          <Input type="text" name="paddress" placeholder="Postal Address" ref="paddr" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, postAddress: data.value}}))}} error={this.state.postAddressError}/>
        </div>
        <div className="four wide field">
          <Input name="address2" placeholder="Apt #" ref="paddr2" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, postAddress2: data.value}}))}}/>
        </div>
      </div>
    </div>
    <div className="two fields">
      <div className="field">
        <label>Postal Code</label>
        <Input name="postal" placeholder="Postal Code" ref="paddr3" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, postCode2: data.value}}))}} error={this.state.postCodeError2}/>
      </div>
      <div className="field">
        <label>Cell Phone Number</label>
        <Input name="cellno" placeholder="Cell Phone Number" ref="cellno" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, cellno: data.value}}))}} error={this.state.cellnoError}/>
      </div>
    </div>
    <div className="field">
      <label>Work Address</label>
      <div className="fields">
        <div className="twelve wide field">
          <Input name="workaddress" placeholder="Work Address" ref="waddr" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, workaddr: data.value}}))}} error={this.state.workAddressError}/>
        </div>
        <div className="four wide field">
          <Input name="address2" placeholder="Apt #" ref="waddr2" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, workaddr2: data.value}}))}}/>
        </div>
        <div className="field">
          <label>Postal Code</label>
          <Input type="text" name="postal" placeholder="Postal Code" ref="waddr3" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, postCode3: data.value}}))}} error={this.state.postCode3Error}/>
        </div>
      </div>
    </div>
    <div className="two fields">
      <div className="field">
        <label>Fax Number</label>
        <Input name="faxno" placeholder="Fax Number" ref="faxno" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, faxno: data.value}}))}} error={this.state.faxnoError}/>
      </div>
      <div className="field">
        <label>Work Phone Number</label>
        <Input name="workno" placeholder="Work Phone Number" ref="workno" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, workno: data.value}}))}} error={this.state.worknoError}/>
      </div>
    </div>
    <div className="field">
      <label>E-mail Address</label>
      <Input name="email" placeholder="E-mail Address" ref="email" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, email: data.value}}))}} error={this.state.emailError}/>
    </div>
    <div className="field">
      <label>Previous Surname</label>
      <Input name="prevsurname" placeholder="Previous Surname" ref="prevsur" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, prev_surname: data.value}}))}}/>
    </div>
    <div className="field">
      <label>Course</label>
      <Dropdown placeholder="Select Course" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, course: data.value}}))}} fluid search selection options={courseOptions} error={this.state.courseError}/>
    </div>
    <div className="field">
      <label>Indicate when summative assessment will be completed</label>
        <div className="three fields">
          <div className="field">
            <Dropdown placeholder="DD" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, aday: data.value}}))}} fluid search selection options={days} error={this.state.adayError}/>
          </div>
          <div className="field">
            <Dropdown placeholder="MM" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, amonth: data.value}}))}} fluid search selection options={months} error={this.state.amonthError}/>

          </div>
          <div className="field">
            <Input name="year" maxLength="4" placeholder="YYYY" ref="ayear" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, ayear: data.value}}))}} error={this.state.ayearError}/>
          </div>
        </div>
    </div>
    <div className="field">
      <label>Assessor</label>
      <input type="text" name="assessor" placeholder="Assessor" ref="assessor"/>
    </div>
    <div className="field">
      <label>Moderator</label>
        <input type="text" name="moderator" placeholder="Moderator" ref="moderator"/>
    </div>
    <div className="field">
      <label>Facilitator</label>
        <input type="text" name="facilitator" placeholder="Facilitator" ref="facilitator" />
    </div>
    <div className="field">
      <label>Club</label>
        <Input name="club" placeholder="Club" ref="club" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, club: data.value}}))}} error={this.state.clubError}/>
    </div>
    <Button onClick={(e) => this.handleBack(e, "dates")}>Back</Button>
    <div onClick={this.validateInput} className="ui button" tabIndex="0">Save Learner</div>
  </Form>
    )
  }

}
export default registerLearner;
