import React, { Component } from 'react'
import { Icon, Table, Menu, Container } from 'semantic-ui-react'

import ClientTable from './ClientTable'
import LogisticsTable from './LogisticsTable'
import DatesTable from './DatesTable'
import LearnerTable from './LearnerTable'

class ExistingProjects extends Component {

  constructor(props) {
    super(props);

    this.state = {
                  response: [],
                  activeTable: "lms_client"
                //  headings: ["project_name", "client_name", "client_telephone", "client_address", "client_contact", "client_municipality", "log_venue", "log_batch_no", "log_facilitator", "log_assessor", "log_moderator", "dates_facilitator", "dates_assessment", "dates_moderation", "learner_id", "learner_alt_id", "learner_equity", "learner_nationality", "learner_gender", "learner_lang", "learner_employed", "learner_disability", "learner_surname", "learner_firstname", "learner_secondname", "learner_title", "learner_dob", "learner_homeaddr", "learner_postaladdr", "learner_cellno", "learner_employer", "learner_workaddr", "learner_faxno", "learner_workno", "learner_email", "learner_prevsurname", "learner_assessment_date", "learner_assessor", "learner_moderator", "learner_facilitator" , "learner_club", "learner_programme", "course_qualification", "course_skill_programme", "course_shortcourse", "course_unitstd"]
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
    switch (this.state.activeTable) {
      case "lms_client":
        currentForm = (<ClientTable footerClicked={this.handleFooterClicked} info={this.state.response} />)
      break;
      case "lms_logistics":
        currentForm = (<LogisticsTable footerClicked={this.handleFooterClicked} info={this.state.response}/>)
      break;

      case "lms_dates":
        currentForm = (<DatesTable footerClicked={this.handleFooterClicked} info={this.state.response} />)
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

export default ExistingProjects;
