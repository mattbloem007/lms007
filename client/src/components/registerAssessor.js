import React, { Component }from 'react';
import { Form, Icon, Message} from 'semantic-ui-react';
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
                          surname: "",
                          ID: "",
                          Reg_no: "",
                          SETA: "",
                          day: "",
                          month: "",
                          year: "",
                          save: false
                         }

                 }
  }

  validateInput = (e) => {
    this.props.assessorActions.updateAssessor(this.state.info)
    .then(() => {
      this.setState({save: true})
    })

  }

  back = () => {
    this.props.assessorActions.updateAssessor(this.state.info);
    this.props.flowActions.changeActiveStep("client")
  }

  render() {
    return(
      <Form success={this.state.save}>
        <Form.Group>
          <Form.Field>
            <Form.Input label="Name" defaultValue={this.props.name} placeholder="Enter Assessor Name"  onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, name: data.value}}))}} error={this.props.nameError}/>
        </Form.Field>
        <Form.Field>
          <Form.Input  label= "Surname" defaultValue={this.props.surname} placeholder="Enter Surname"  onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, surname: data.value}}))}} error={this.props.surnameError}/>
        </Form.Field>
          <Form.Field>
          <Form.Input label="ID Number" defaultValue={this.props.ID} placeholder="ID Number" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, ID: data.value}}))}} error={this.props.IDError}/>
      </Form.Field>
        </Form.Group>
            <Form.Input label="Registration Number" defaultValue={this.props.Reg_no} placeholder="Registration Number" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, Reg_no: data.value}}))}} error={this.props.reg_noError}/>
          <Form.Select options={SETA} label="SETA" placeholder="SETA" defaultValue={this.props.SETA} onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, SETA: data.value}}))}} error={this.props.setaError}/>
          <Form.Field>
            <label>Expiry Date</label>
          </Form.Field>
          <Form.Group>
              <Form.Select placeholder="DD" defaultValue={this.props.day} onChange={(e,{value})=>{this.setState(prevState => ({info: {...prevState.info, day: value}}))}} fluid search selection options={days} error={this.props.dayError}/>
              <Form.Select placeholder="MM" defaultValue={this.props.month} onChange={(e,{value})=>{this.setState(prevState => ({info: {...prevState.info, month: value}}))}} fluid search selection options={months} error={this.props.monthError}/>
              <Form.Input name="year" defaultValue={this.props.year} maxLength="4" placeholder="YYYY" onChange={(e,{value})=>{this.setState(prevState => ({info: {...prevState.info, year: value}}))}} error={this.props.yearError}/>
          </Form.Group>
          <Message success header='Form Completed' content="Saved Assessor Successfully" />
          <Form.Button primary onClick={this.back}><Icon name="chevron circle left"/> Back</Form.Button>
          <Form.Button primary onClick={this.validateInput}><Icon name="save"/>Save</Form.Button>
    </Form>
    )
  }

}
const mapStateToProps = (state) => ({
  nameError: state.assessor.nameError,
  surnameError: state.assessor.surnameError,
  IDError: state.assessor.IDError,
  reg_noError: state.assessor.reg_noError,
  setaError: state.assessor.setaError,
  dayError: state.assessor.dayError,
  yearError: state.assessor.yearError,
  monthError: state.assessor.monthError,
  name: state.assessor.name,
  surname: state.assessor.surname,
  ID: state.assessor.ID,
  Reg_no: state.assessor.Reg_no,
  SETA: state.assessor.SETA,
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
