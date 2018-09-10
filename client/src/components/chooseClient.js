import React, { Component } from 'react';
import { Segment, Form } from 'semantic-ui-react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as clientActions from '../actions/clientActions';
import * as flowActions from '../actions/flowActions';
import { days, months } from '../common';




class Client extends Component {

  constructor() {
      super();
      this.state = {
          day: "",
          month: "",
          year: "",
          client_name: "",
          project: ""

      }
  }

  componentDidMount() {
    this.props.clientActions.fetchClients();
  }


  validateInput = (e) => {
  //  e.preventDefault();
  let info = {
    date: this.state.day + "-" + this.state.month +"-" + this.state.year,
    client_name: this.state.client_name,
    project: this.state.project
  }
    this.props.clientActions.validateInput1(this.state)

  }

  addClient = () => {
    this.props.clientActions.updateBatchClient(this.state)
    this.props.flowActions.changeActiveStep("rclient");
  }

  render() {
    return(
      <Form>
        <Form.Input defaultValue={this.props.project} label="Project Name" placeholder="Enter Project Name" onChange={(e,{value})=>{this.setState({project: value})}} error={this.props.projectError}/>
        <Form.Group inline label="Date">
            <Form.Select placeholder="DD" defaultValue={this.props.day} onChange={(e,{value})=>{this.setState({day: value})}} fluid search selection options={days} error={this.props.dayError}/>
            <Form.Select placeholder="MM" defaultValue={this.props.month} onChange={(e,{value})=>{this.setState({month: value})}} fluid search selection options={months} error={this.props.monthError}/>
            <Form.Input name="year" defaultValue={this.props.year} maxLength="4" placeholder="YYYY" onChange={(e,{value})=>{this.setState({year: value})}} error={this.props.yearError}/>
        </Form.Group>
            <Form.Select label="Choose Client" defaultValue={this.props.client_name} placeholder='Select Client Name' fluid search selection options={this.props.clients} onChange={(e,{value})=>{this.setState({client_name: value})}} error={this.props.clientError}/>
        <Form.Group widths='equal'>
            <Form.Button onClick={this.validateInput}>Save</Form.Button>
            <Form.Button onClick={this.addClient}>Add New Client</Form.Button>
        </Form.Group>
      </Form>
  )
  }
}
const mapStateToProps = state => ({
  clients: state.client.clients,
  projectError: state.client.projectError,
  dayError: state.client.dayError,
  yearError: state.client.yearError,
  monthError: state.client.monthError,
  clientError: state.client.clientError,
  day: state.batch.day,
  month: state.batch.month,
  year: state.batch.year,
  date: state.batch.date,
  client_name: state.batch.client_name,
  project: state.batch.project,
  errors: state.client.errors
})
const mapDispatchToProps = dispatch => ({
  clientActions: bindActionCreators(clientActions, dispatch),
  flowActions: bindActionCreators(flowActions, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Client);
