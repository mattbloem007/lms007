import React, { Component }from 'react';
import { Form, Icon } from 'semantic-ui-react';
import { isEmpty, isNumeric, isAlpha, isMobilePhone, isLength } from 'validator';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as moderatorActions from '../actions/moderatorActions';
import * as flowActions from '../actions/flowActions';
import { days, months, SETA } from '../common';

class RegisterModerator extends Component{

  constructor(props) {
    super(props);

    this.state = {
                  info: {
                          name: "",
                          surname: "",
                          ID: "",
                          Reg_no: "",
                          SETA: "",
                          day: "",
                          month: "",
                          year: ""
                         }

                 }
  }

  validateInput = (e) => {
    this.props.moderatorActions.updateModerator(this.state.info);

  }

  back = () => {
    if (this.props.type == "add") {
      this.props.moderatorActions.updateModerator(this.state.info);
      this.props.flowActions.changeActiveStep("client")
    }
    else {
      this.props.moderatorActions.updateModerator(this.state.info);
      this.props.flowActions.changeActiveStep("Moderator")
    }

  }

  render() {
    return(
      <Form>
        <Form.Group>
          <Form.Field>
            <Form.Input label="Name" defaultValue={this.props.name} placeholder="Enter moderator Name"  onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, name: data.value}}))}} error={this.props.nameError}/>
        </Form.Field>
        <Form.Field>
          <Form.Input  label= "Surname" defaultValue={this.props.surname} placeholder="Enter Surname"  onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, surname: data.value}}))}} error={this.props.surnameError}/>
        </Form.Field>
          <Form.Field>
          <Form.Input label="ID Number" defaultValue={this.props.ID} placeholder="ID Number" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, ID: data.value}}))}} error={this.props.IDError}/>
      </Form.Field>
        </Form.Group>
            <Form.Input label="Registration Number" defaultValue={this.props.Reg_no} placeholder="Registration Number" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, Reg_no: data.value}}))}} error={this.props.reg_noError}/>
          <Form.Select label="SETA" placeholder="SETA" defaultValue={this.props.SETA} onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, SETA: data.value}}))}} options={SETA} error={this.props.setaError}/>
          <Form.Field>
            <label>Expiry Date</label>
          </Form.Field>
          <Form.Group>
              <Form.Select placeholder="DD" defaultValue={this.props.day} onChange={(e,{value})=>{this.setState(prevState => ({info: {...prevState.info, day: value}}))}} fluid search selection options={days} error={this.props.dayError}/>
              <Form.Select placeholder="MM" defaultValue={this.props.month} onChange={(e,{value})=>{this.setState(prevState => ({info: {...prevState.info, month: value}}))}} fluid search selection options={months} error={this.props.monthError}/>
              <Form.Input name="year" defaultValue={this.props.year} maxLength="4" placeholder="YYYY" onChange={(e,{value})=>{this.setState(prevState => ({info: {...prevState.info, year: value}}))}} error={this.props.yearError}/>
          </Form.Group>
          <Form.Button primary onClick={this.back}><Icon name="chevron circle left"/> Back</Form.Button>
          <Form.Button primary onClick={this.validateInput}><Icon name="save"/>Save</Form.Button>
    </Form>
    )
  }

}
const mapStateToProps = (state) => ({
  nameError: state.moderator.nameError,
  surnameError: state.moderator.surnameError,
  IDError: state.moderator.IDError,
  reg_noError: state.moderator.reg_noError,
  setaError: state.moderator.setaError,
  dayError: state.moderator.dayError,
  yearError: state.moderator.yearError,
  monthError: state.moderator.monthError,
  name: state.moderator.name,
  surname: state.moderator.surname,
  ID: state.moderator.ID,
  Reg_no: state.moderator.Reg_no,
  SETA: state.moderator.SETA,
  day: state.moderator.day,
  month: state.moderator.month,
  year: state.moderator.year,
  errors: state.moderator.errors,
  type: state.moderator.type
})
const mapDispatchToProps = (dispatch) => ({
  moderatorActions: bindActionCreators(moderatorActions, dispatch),
  flowActions: bindActionCreators(flowActions, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(RegisterModerator);
