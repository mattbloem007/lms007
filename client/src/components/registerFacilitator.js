import React, { Component }from 'react';
import { Form, Icon } from 'semantic-ui-react';
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
                          ID: "",
                          cellno: ""
                         }

                 }
  }

  validateInput = (e) => {
    this.props.facilitatorActions.updateFacilitator(this.state.info);
    this.props.flowActions.changeActiveStep("client")

  }

  back = () => {
    this.props.facilitatorActions.updateFacilitator(this.state.info);
    this.props.flowActions.changeActiveStep("client")
  }

  render() {
    return(
      <Form>
        <Form.Group>
          <Form.Field>
            <Form.Input label="Name" defaultValue={this.props.name} placeholder="Enter Facilitator Name"  onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, name: data.value}}))}} error={this.props.nameError}/>
        </Form.Field>
          <Form.Field>
          <Form.Input label="ID Number" defaultValue={this.props.ID} placeholder="ID Number" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, ID: data.value}}))}} error={this.props.IDError}/>
      </Form.Field>
        </Form.Group>
        <Form.Group>
            <Form.Input label="Cell Number" defaultValue={this.props.cellno} placeholder="Cell Number" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, cellno: data.value}}))}} error={this.props.cellnoError}/>
         </Form.Group>
        <Form.Button primary onClick={this.back}><Icon name="chevron circle left"/> Back</Form.Button>
        <Form.Button primary onClick={this.validateInput}><Icon name="save"/>Save</Form.Button>
    </Form>
    )
  }

}
const mapStateToProps = (state) => ({
  nameError: state.facilitator.nameError,
  IDError: state.facilitator.IDError,
  cellnoError: state.facilitator.cellnoError,
  name: state.facilitator.name,
  ID: state.facilitator.ID,
  cellno: state.facilitator.cellno,
  errors: state.facilitator.errors
})
const mapDispatchToProps = (dispatch) => ({
  facilitatorActions: bindActionCreators(facilitatorActions, dispatch),
  flowActions: bindActionCreators(flowActions, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(RegisterFacilitator);
