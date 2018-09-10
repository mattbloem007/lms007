import React, { Component } from 'react';
import { Segment, Form } from 'semantic-ui-react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as learnerActions from '../actions/learnerActions';
import * as flowActions from '../actions/flowActions';
import * as tableActions from '../actions/tableActions';
import { days, months } from '../common';




class Learner extends Component {

  constructor() {
      super();
      this.state = {
          learnerIDs: []

      }
  }

  componentDidMount() {
    this.props.learnerActions.fetchLearners();
  }


  validateInput = () => {
    let info = [];
    this.state.learnerIDs.map(learner => info = [...info, Object.assign({learner: learner, batch: this.props.batch})])
    this.props.learnerActions.validateInput1(info);
  }

  back = () => {
    this.props.tableActions.changeActiveTable("batch")
  }

  addLearner = () => {
    this.props.tableActions.changeActiveTable("rLearner");
  }

  render() {
    return(
      <Form>
        <Form.Select label="Choose Learner" placeholder='Select Learner Name' fluid multiple search selection options={this.props.learners} selected={this.state.learnerIDs} onChange={(e,{value})=>{this.setState({learnerIDs: value})}} error={this.props.learnerError}/>
        <Form.Group widths='equal'>
          <Form.Button onClick={this.validateInput}>Save</Form.Button>
          <Form.Button onClick={this.back}>Back</Form.Button>
          <Form.Button onClick={this.addLearner}>Add New Learner</Form.Button>
        </Form.Group>
      </Form>
  )
  }
}
const mapStateToProps = state => ({
  learners: state.learner.learners,
  learnerError: state.learner.learnerError,
  batch: state.table.batch,
  errors: state.learner.errors
})
const mapDispatchToProps = dispatch => ({
  learnerActions: bindActionCreators(learnerActions, dispatch),
  tableActions: bindActionCreators(tableActions, dispatch),
  flowActions: bindActionCreators(flowActions, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Learner);
