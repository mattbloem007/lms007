import React, { Component }from 'react';
import { Form, Icon, Message } from 'semantic-ui-react';
import { isEmpty, isNumeric, isAlpha, isMobilePhone, isLength } from 'validator';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as facilitatorActions from '../actions/facilitatorActions';
import * as flowActions from '../actions/flowActions';
import { days, months } from '../common';

class RegisterFacilitator extends Component{

  constructor(props) {
    super(props);

    this.state = {
                  info: {
                          name: "",
                          surname: "",
                          ID: "",
                          Cell_no: "",
                          save: false
                         }

                 }
  }

  validateInput = (e) => {
    this.props.facilitatorActions.updateFacilitator(this.state.info)
    .then(() => {
      this.setState({save: true})
    })

  }

  back = () => {
    if (this.props.type == "add") {
      this.props.facilitatorActions.updateFacilitator(this.state.info);
      this.props.flowActions.changeActiveStep("client")
    }
    else {
      this.props.facilitatorActions.updateFacilitator(this.state.info);
      this.props.flowActions.changeActiveStep("Facilitators")
    }

  }

  render() {
    return(
      <Form success={this.state.save}>
        <Form.Group>
          <Form.Field>
            <Form.Input label="Name" defaultValue={this.props.name} placeholder="Enter Name"  onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, name: data.value}}))}} error={this.props.nameError}/>
        </Form.Field>
        <Form.Field>
          <Form.Input  label= "Surname" defaultValue={this.props.surname} placeholder="Enter Surname"  onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, surname: data.value}}))}} error={this.props.surnameError}/>
        </Form.Field>
          <Form.Field>
          <Form.Input label="ID Number" defaultValue={this.props.ID} placeholder="ID Number" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, ID: data.value}}))}} error={this.props.IDError}/>
      </Form.Field>
        </Form.Group>
        <Form.Group>
            <Form.Input label="Cell Number" defaultValue={this.props.Cell_no} placeholder="Cell Number" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, Cell_no: data.value}}))}} error={this.props.cellnoError}/>
         </Form.Group>
         <Message success header='Form Completed' content="Saved Facilitator Successfully" />
        <Form.Button primary onClick={this.back}><Icon name="chevron circle left"/> Back</Form.Button>
        <Form.Button primary onClick={this.validateInput}><Icon name="save"/>Save</Form.Button>
    </Form>
    )
  }

}
const mapStateToProps = (state) => ({
  nameError: state.facilitator.nameError,
  surnameError: state.facilitator.surnameError,
  IDError: state.facilitator.IDError,
  cellnoError: state.facilitator.cellnoError,
  name: state.facilitator.name,
  surname: state.facilitator.surname,
  ID: state.facilitator.ID,
  Cell_no: state.facilitator.Cell_no,
  errors: state.facilitator.errors,
  type: state.facilitator.type
})
const mapDispatchToProps = (dispatch) => ({
  facilitatorActions: bindActionCreators(facilitatorActions, dispatch),
  flowActions: bindActionCreators(flowActions, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(RegisterFacilitator);
