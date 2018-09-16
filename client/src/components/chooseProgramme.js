import React, { Component } from 'react';
import { Segment, Form } from 'semantic-ui-react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as programmeActions from '../actions/programmeActions'
import * as flowActions from '../actions/flowActions'

class Programme extends Component {

  constructor() {
    super();

    this.state = {
      programme_name: "",
      credit: "",
      facilitator: "",
      programmeType: ""
    }
  }

  componentDidMount() {
    this.props.programmeActions.fetchFacilitator();
  }

  addFacilitator = () => {
    this.props.flowActions.changeActiveStep("addFac");
  }

  back = () => {
    this.props.flowActions.changeActiveStep("client");
  }

  validateInput = () => {
    let info = {
      programme_name: this.state.programme_name,
      credit: this.props.credit,
      facilitator: this.state.facilitator,
      programmeType: this.state.programmeType
    }

    this.props.programmeActions.validateInput(info)
  }

  render() {

    if (this.props.credit == "non-credit") {
      return (
        <Form>
          <Form.Group>
            <Form.Input defaultValue={this.props.programme_name} label="Programme name" placeholder="Programme name" onChange={(e,{value})=>{this.setState({programme_name: value})}} error={this.props.programme_nameError}/>
          </Form.Group>
          <Form.Group inline>
            <Form.Radio label="Credit" defaultValue='credit' checked={this.props.credit === 'credit'} onChange={(e,{value})=> {this.props.programmeActions.updateProgrammeInfo(value)}}/>
            <Form.Radio label="Non-Credit" defaultValue='non-credit' checked={this.props.credit === 'non-credit'} onChange={(e,{value})=>{this.props.programmeActions.updateProgrammeInfo(value)}}/>
          </Form.Group>
          <Form.Group>
            <Form.Select defaultValue={this.props.facilitator} label="Facilitator" placeholder="Enter Facilitator Name" onChange={(e,{value})=>{this.setState({facilitator: value})}} options={this.props.facilitators} error={this.props.facilitatorError}/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Button onClick={this.back}>Back</Form.Button>
            <Form.Button onClick={this.validateInput}>Save</Form.Button>
            <Form.Button onClick={this.addFacilitator}>Add new Facilitator</Form.Button>
          </Form.Group>
        </Form>
      )
    }
    else {
      return (
        <Form>
          <Form.Group>
            <Form.Input defaultValue={this.props.programme_name} label="Programme name" placeholder="Programme name" onChange={(e,{value})=>{this.setState({programme_name: value})}} error={this.props.programme_nameError}/>
          </Form.Group>
          <Form.Group inline>
            <Form.Radio label="Credit" defaultValue='credit' checked={this.props.credit === 'credit'} onChange={(e,{value})=> {this.props.programmeActions.updateProgrammeInfo(value)}}/>
            <Form.Radio label="Non-Credit" defaultValue='non-credit' checked={this.props.credit === 'non-credit'} onChange={(e,{value})=>{this.props.programmeActions.updateProgrammeInfo(value)}}/>
          </Form.Group>
          <Form.Group>
            <Form.Select defaultValue={this.props.programmeType} label="Programme Type" options={this.props.programmeOptions} onChange={(e,{value})=>{this.setState({programmeType: value})}} error={this.props.programmeTypeError}/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Button onClick={this.back}>Back</Form.Button>
            <Form.Button onClick={this.validateInput}>Save</Form.Button>
            <Form.Button onClick={this.addFacilitator}>Add new Facilitator</Form.Button>
          </Form.Group>
        </Form>
      )
    }

  }
}
const mapStateToProps = state => ({
  programmeOptions: state.programme.programmeOptions,
  credit: state.programme.credit,
  facilitators: state.programme.facilitators,
  programme_nameError: state.programme.programme_nameError,
  facilitatorError: state.programme.facilitatorError,
  programmeTypeError: state.programme.programmeTypeError,
  programme_name: state.programme.programme_name,
  facilitator: state.programme.facilitator,
  programmeType: state.programme.programmeType
})
const mapDispatchToProps = dispatch => ({
  programmeActions: bindActionCreators(programmeActions, dispatch),
  flowActions: bindActionCreators(flowActions, dispatch)

})
export default connect(mapStateToProps, mapDispatchToProps)(Programme);
