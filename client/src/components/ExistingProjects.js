import React, { Component } from 'react'
import { Icon, Table, Menu, Container } from 'semantic-ui-react'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as tableActions from '../actions/tableActions'

import ClientTable from './ClientTable'
import LogisticsTable from './LogisticsTable'
import DatesTable from './DatesTable'
import LearnerTable from './LearnerTable'
import BatchTable from './batchTable'
import Learner from '../components/chooseLearner'
import RegisterLearner from '../components/registerLearner';


class ExistingProjects extends Component {

  constructor(props) {
    super(props);

    this.state = {
                  response: []
    }
  }

  handleFooterClicked = (table) => {
    this.callApi(table);
  }

  componentDidMount() {
    this.callApi("lms_client")
      .catch(err => console.log(err));
  }

  callApi = async (table) => {
    const response = await fetch('/api/' + table);
  //  console.log(response.text())
    const body = await response.json();
    console.log(body)
    this.setState({ response: body.express, activeTable: table })


    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    let currentForm;
    console.log(this.props.activeTable)
    switch (this.props.activeTable) {
      case "batch":
        currentForm = (<BatchTable />)
      break;
      case "learner":
        currentForm = (<Learner />)
      break

      case "rLearner":
        currentForm = (<RegisterLearner />)
      break;

      case "learnerTable":
        currentForm = (<LearnerTable />)
      break;

      case "lms_learner":
        currentForm = (<LearnerTable footerClicked={this.handleFooterClicked} info={this.state.response} />)
      break;
      default:

    }

    return(
      <div className="ui segment">
        {currentForm}
      </div>
    )
  }

}
const mapStateToProps = state => ({
  activeTable: state.table.activeTable
})
const mapDispatchToProps = dispatch => ({
  tableActions: bindActionCreators(tableActions, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(ExistingProjects);
