import React, { Component }from 'react';
import { Form, Icon } from 'semantic-ui-react';
import { isEmpty, isNumeric, isAlpha, isMobilePhone, isLength } from 'validator';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as assessorActions from '../actions/assessorActions';
import * as flowActions from '../actions/flowActions';
import { days, months, SETA } from '../common';

class RegisterAssessor extends Component{

  constructor(props) {
    super(props);

    this.state = {
                  info: {
                          name: "",
                          ID: "",
                          reg_no: "",
                          seta: "",
                          day: "",
                          month: "",
                          year: ""
                         }

                 }
  }

  validateInput = (e) => {
    this.props.assessorActions.updateAssessor(this.state.info);
    this.props.flowActions.changeActiveStep("client")

  }

  back = () => {
    this.props.assessorActions.updateAssessor(this.state.info);
    this.props.flowActions.changeActiveStep("client")
  }

  render() {
    return(
      <Form>
        <Form.Group>
          <Form.Field>
            <Form.Input label="Name" defaultValue={this.props.name} placeholder="Enter Assessor Name"  onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, name: data.value}}))}} error={this.props.nameError}/>
        </Form.Field>
          <Form.Field>
          <Form.Input label="ID Number" defaultValue={this.props.ID} placeholder="ID Number" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, ID: data.value}}))}} error={this.props.IDError}/>
      </Form.Field>
        </Form.Group>
            <Form.Input label="Registration Number" defaultValue={this.props.reg_no} placeholder="Registration Number" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, reg_no: data.value}}))}} error={this.props.reg_noError}/>
          <Form.Select options={SETA} label="SETA" placeholder="SETA" defaultValue={this.props.seta} onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, seta: data.value}}))}} error={this.props.setaError}/>
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
  nameError: state.assessor.nameError,
  IDError: state.assessor.IDError,
  reg_noError: state.assessor.reg_noError,
  setaError: state.assessor.setaError,
  dayError: state.assessor.dayError,
  yearError: state.assessor.yearError,
  monthError: state.assessor.monthError,
  name: state.assessor.name,
  ID: state.assessor.ID,
  reg_no: state.assessor.reg_no,
  seta: state.assessor.seta,
  day: state.assessor.day,
  month: state.assessor.month,
  year: state.assessor.year,
  errors: state.assessor.errors
})
const mapDispatchToProps = (dispatch) => ({
  assessorActions: bindActionCreators(assessorActions, dispatch),
  flowActions: bindActionCreators(flowActions, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(RegisterAssessor);
