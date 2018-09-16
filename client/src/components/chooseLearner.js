import React, { Component } from 'react';
import { Segment, Form, Icon } from 'semantic-ui-react';
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
    this.props.tableActions.fetchBatchLearnerIDs(this.props.batch);
  }


  validateInput = () => {
    this.props.learnerActions.updateBatchLearner(this.props.learnerIDs)
  }

  back = () => {
    this.props.learnerActions.updateBatchLearner(this.state)
    this.props.tableActions.changeActiveTable("batch")
  }

  addLearner = () => {
    this.props.learnerActions.updateBatchLearner(this.state)
    if (this.props.saved == true || this.props.type == "edit") {
      this.props.learnerActions.resetLearnerState();
    }
    this.props.tableActions.changeActiveTable("rLearner");
  }

  handleLearner = (e, data) => {
    if (data.value != undefined || data.value != null) {
      this.setState({ learnerIDs: data.value});
      console.log(data, e)
      this.props.learnerActions.updateBatchLearner({ learnerIDs: data.value})
      if (data.value.length > 0) {
        this.props.learnerActions.fetchLearnerInfo(data.value[data.value.length - 1].split("-")[0]);
      }
    }

  }

  render() {
    return(
      <Form>
        <Form.Select defaultValue={this.props.learnerIDs} label="Choose Learner" placeholder='Select Learner Name' fluid multiple search selection options={this.props.learners} onChange={(e, data)=>{this.handleLearner(e, data)}} error={this.props.learnerError}/>
        <Form.Group widths='equal'>
          <Form.Button primary onClick={this.validateInput}><Icon name="save"/>Save</Form.Button>
          <Form.Button primary onClick={this.back}><Icon name="chevron circle left"/>Back</Form.Button>
          <Form.Button primary onClick={this.addLearner}><Icon name="add"/>Add New Learner</Form.Button>
        </Form.Group>
      </Form>
  )
  }
}
const mapStateToProps = state => ({
  learners: state.learner.learners,
  learnerError: state.learner.learnerError,
  batch: state.table.batch,
  learnerIDs: state.batch.learnerIDs,
  errors: state.learner.errors,
  saved: state.learner.saved,
  type: state.learner.type
})
const mapDispatchToProps = dispatch => ({
  learnerActions: bindActionCreators(learnerActions, dispatch),
  tableActions: bindActionCreators(tableActions, dispatch),
  flowActions: bindActionCreators(flowActions, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Learner);
