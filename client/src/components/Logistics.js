import React, { Component } from 'react'
import { Button, Dropdown, Input } from 'semantic-ui-react';
import { isEmpty, isNumeric, isAlpha } from 'validator';


class Logistics extends Component {

  constructor(props) {
    super(props);

    this.state = {
                  venueError: false,
                  batchnoError: false,
                  facilitatorError: false,
                  assessorError: false,
                  moderatorError: false,
                  info: {
                          venue: "",
                          batchno: "",
                          facilitator: "",
                          assessor: "",
                          moderator: ""
                         }

                 }
    }

  validateInput = (e) => {
    e.preventDefault();
    let errors = false;

    if (isEmpty(this.state.info.venue)) {
      this.setState({ venueError: true });
      errors = true;
    }

    if (isEmpty(this.state.info.batchno)) {
      this.setState({ batchnoError: true });
      errors = true;
    }

    if (isEmpty(this.state.info.facilitator)) {
      this.setState({ facilitatorError: true });
      errors = true;
    }
    if (isEmpty(this.state.info.assessor)) {
      this.setState({ assessorError: true });
      errors = true;
    }
    if (isEmpty(this.state.info.moderator)) {
      this.setState({ moderatorError: true });
      errors = true;
    }
    if(errors == false) {
      this.handleSubmit();
    }
  }

  handleNext = (form) => {
    let info = {
                venue: this.state.info.venue,
                batchno: this.state.info.batchno,
                facilitator: this.state.info.facilitator,
                assessor: this.state.info.assessor,
                moderator: this.state.info.moderator
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
          <div class="field">
            <label>Venue</label>
            <Input placeholder="Venue" ref="log_venue" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, venue: data.value}}))}} error={this.state.venueError}/>
          </div>
          <div class="field">
            <label>Batch Number</label>
            <Input placeholder="Batch Number" ref="batchno" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, batchno: data.value}}))}} error={this.state.batchnoError}/>
          </div>
        </div>
        <div class="fields">
          <div class="field">
            <label>Facilitator</label>
            <Input placeholder="Facilitator" ref="facilitator" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, facilitator: data.value}}))}} error={this.state.facilitatorError}/>
          </div>
          <div class="field">
            <label>Assessor</label>
            <Input placeholder="Assessor" ref="assessor" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, assessor: data.value}}))}} error={this.state.assessorError}/>
          </div>
          <div class="field">
            <label>Moderator</label>
            <Input placeholder="Moderator" ref="moderator" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, moderator: data.value}}))}} error={this.state.moderatorError}/>
          </div>
        </div>
        <Button onClick={(e) => this.handleBack(e, "client")}>Back</Button>
        <Button onClick={this.validateInput}>Save</Button>
      </div>
    )
  }

}
export default Logistics;
