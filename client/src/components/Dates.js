import React, { Component } from 'react';
import { Button, Dropdown, Input } from 'semantic-ui-react';
import { isEmpty, isNumeric, isAlpha, isLength, isAfter } from 'validator';
import { days, months } from '../common';



class Dates extends Component {

  constructor(props) {
    super(props);

    this.state = {
                  dayError: false,
                  monthError: false,
                  yearError: false,
                  da2Error: false,
                  month2Error: false,
                  year2Error: false,
                  day3Error: false,
                  month3Error: false,
                  year3Error: false,
                  info: {
                          day: "",
                          month: "",
                          year: "",
                          day2: "",
                          month2: "",
                          year2: "",
                          day3: "",
                          month3: "",
                          year3: ""
                         }

                 }
  }

  validateInput = (e) => {
    e.preventDefault();
    let errors = false;

    if (isEmpty(this.state.info.day)) {
      this.setState({ dayError: true });
      errors = true;
    }
    if (isEmpty(this.state.info.month)) {
      this.setState({ monthError: true });
      errors = true;
    }
    if (isEmpty(this.state.info.year) || isLength(this.state.info.year) < 4 || isAfter(this.state.info.year)) {
      this.setState({ dayError: true });
      errors = true;
    }

    if (isEmpty(this.state.info.day2)) {
      this.setState({ dayError: true });
      errors = true;
    }
    if (isEmpty(this.state.info.month2)) {
      this.setState({ monthError: true });
      errors = true;
    }
    if (isEmpty(this.state.info.year2) || isLength(this.state.info.year2) < 4 || isAfter(this.state.info.year2)) {
      this.setState({ dayError: true });
      errors = true;
    }

    if (isEmpty(this.state.info.day3)) {
      this.setState({ dayError: true });
      errors = true;
    }
    if (isEmpty(this.state.info.month3)) {
      this.setState({ monthError: true });
      errors = true;
    }
    if (isEmpty(this.state.info.year3) || isLength(this.state.info.year3) < 4 || isAfter(this.state.info.year3)) {
      this.setState({ dayError: true });
      errors = true;
    }


    if(errors == false) {
      this.handleNext("learner");
    }
  }

  handleNext = (form) => {
    let info = {
                  facilitator_date: this.state.info.year + "-" + this.state.info.month + "-" + this.state.info.day,
                  assessment_date: this.state.info.year2 + "-" + this.state.info.month2 + "-" + this.state.info.day2,
                  moderation_date: this.state.info.year3 + "-" + this.state.info.month3 + "-" + this.state.info.day3
               }
    this.props.nextClicked(form, info);
  }

  handleBack = (e, form) => {
    e.preventDefault();
    this.props.handleBack(e, form);
  }

  render() {
    return (
      <div class="ui equal width form">
        <div class="fields">
          <div className="field">
            <label>Facilitation Date</label>
              <div className="three fields">
                <div className="field">
                  <Dropdown placeholder="DD" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, day: data.value}}))}} fluid search selection options={days} error={this.state.dayError}/>
                </div>
                <div className="field">
                  <Dropdown placeholder="MM" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, month: data.value}}))}}  fluid search selection options={months} error={this.state.monthError}/>
                </div>
                <div className="field">
                  <Input name="year" maxLength="4" placeholder="YYYY"  onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, year: data.value}}))}} error={this.state.yearError}/>
                </div>
              </div>
          </div>
          <div className="field">
            <label>Assessor Date</label>
              <div className="three fields">
                <div className="field">
                  <Dropdown placeholder="DD" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, day2: data.value}}))}} fluid search selection options={days} error={this.state.day2Error}/>
                </div>
                <div className="field">
                  <Dropdown placeholder="MM" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, month2: data.value}}))}} fluid search selection options={months} error={this.state.month2Error}/>

                </div>
                <div className="field">
                  <Input name="year" maxLength="4" placeholder="YYYY"  onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, year2: data.value}}))}} error={this.state.year2Error}/>
                </div>
              </div>
          </div>
          <div className="field">
            <label>Moderation Date</label>
              <div className="three fields">
                <div className="field">
                  <Dropdown placeholder="DD" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, day3: data.value}}))}} fluid search selection options={days} error={this.state.day3Error}/>
                </div>
                <div className="field">
                  <Dropdown placeholder="MM" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, month3: data.value}}))}} fluid search selection options={months} error={this.state.month3Error}/>
                </div>
                <div className="field">
                  <Input name="year" maxLength="4" placeholder="YYYY"  onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, year3: data.value}}))}} error={this.state.year3Error}/>
                </div>
              </div>
          </div>
        </div>
        <Button onClick={(e) => this.handleBack(e, "logistics")}>Back</Button>
        <Button onClick={this.validateInput}>Save</Button>
      </div>
    )
  }

}
export default Dates;
