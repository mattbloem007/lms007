import React, { Component } from 'react';
import { Segment, Form, Icon } from 'semantic-ui-react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as clientActions from '../actions/clientActions';
import * as programmeActions from '../actions/programmeActions'
import * as flowActions from '../actions/flowActions';
import * as learnerActions from '../actions/learnerActions';
import { days, months } from '../common';




class Client extends Component {

  constructor() {
      super();
      this.state = {
          day: "",
          month: "",
          year: "",
          aday: "",
          amonth: "",
          ayear: "",
          mday: "",
          mmonth: "",
          myear: "",
          client_name: "",
          project: "",
          programme_name: "",
          credit: "",
          creditStatus: false,
          facilitator: "",
          programmeType: ""

      }
  }

  componentDidMount() {
    this.props.clientActions.fetchClients();
    this.props.learnerActions.fetchFacilitator();
    this.props.learnerActions.fetchAssessor();
    this.props.learnerActions.fetchModerator();
  }

  componentWillReceiveProps(nextProps) {
      this.setState({creditStatus: nextProps.creditStatus})
  }

  handleRadio = value => {
    this.setState({credit: value})
    this.props.programmeActions.updateProgrammeInfo(value)
  }


  validateInput = (e) => {
    this.props.clientActions.updateBatchClient(this.state)
  //  this.props.clientActions.validateInput1(this.state)
  }

  addFacilitator = () => {
    this.props.clientActions.updateBatchClient(this.state)
    this.props.flowActions.changeActiveStep("addFac");
  }
  addModerator = () => {
    this.props.clientActions.updateBatchClient(this.state)
    this.props.flowActions.changeActiveStep("addMod");
  }
  addAssessor = () => {
    this.props.clientActions.updateBatchClient(this.state)
    this.props.flowActions.changeActiveStep("addAss");
  }

  addClient = () => {
    this.props.clientActions.updateBatchClient(this.state)
    this.props.flowActions.changeActiveStep("rclient");
  }

  render() {
    return(
      <Form>
        <Form.Input defaultValue={this.props.project} label="Project Name" placeholder="Enter Project Name" onChange={(e,{value})=>{this.setState({project: value})}} error={this.props.projectError}/>
        <Form.Field>
          <label>Date</label>
        </Form.Field>
        <Form.Group>
            <Form.Select placeholder="DD" defaultValue={this.props.day} onChange={(e,{value})=>{this.setState({day: value})}} fluid search selection options={days} error={this.props.dayError}/>
            <Form.Select placeholder="MM" defaultValue={this.props.month} onChange={(e,{value})=>{this.setState({month: value})}} fluid search selection options={months} error={this.props.monthError}/>
            <Form.Input name="year" defaultValue={this.props.year} maxLength="4" placeholder="YYYY" onChange={(e,{value})=>{this.setState({year: value})}} error={this.props.yearError}/>
        </Form.Group>
            <Form.Select label="Choose Client" defaultValue={this.props.client_name} placeholder='Select Client Name' fluid search selection options={this.props.clients} onChange={(e,{value})=>{this.setState({client_name: value})}} error={this.props.clientError}/>
              <Form.Field>
                <label>Date Assessed</label>
              </Form.Field>
              <Form.Group>
                  <Form.Select placeholder="DD" defaultValue={this.props.aday} onChange={(e,{value})=>{this.setState({aday: value})}} fluid search selection options={days} error={this.props.adayError}/>
                  <Form.Select placeholder="MM" defaultValue={this.props.amonth} onChange={(e,{value})=>{this.setState({amonth: value})}} fluid search selection options={months} error={this.props.amonthError}/>
                  <Form.Input name="year" defaultValue={this.props.ayear} maxLength="4" placeholder="YYYY" onChange={(e,{value})=>{this.setState({ayear: value})}} error={this.props.ayearError}/>
              </Form.Group>
              <Form.Field>
                <label>Date Moderated</label>
              </Form.Field>
              <Form.Group>
                  <Form.Select placeholder="DD" defaultValue={this.props.mday} onChange={(e,{value})=>{this.setState({mday: value})}} fluid search selection options={days} error={this.props.mdayError}/>
                  <Form.Select placeholder="MM" defaultValue={this.props.mmonth} onChange={(e,{value})=>{this.setState({mmonth: value})}} fluid search selection options={months} error={this.props.mmonthError}/>
                  <Form.Input name="year" defaultValue={this.props.myear} maxLength="4" placeholder="YYYY" onChange={(e,{value})=>{this.setState({myear: value})}} error={this.props.myearError}/>
              </Form.Group>
              <Form.Group>
                <Form.Input defaultValue={this.props.programme_name} label="Programme name" placeholder="Programme name" onChange={(e,{value})=>{this.setState({programme_name: value})}} error={this.props.programme_nameError}/>
              </Form.Group>
              <Form.Group inline>
                <Form.Radio label="Credit" value='credit' checked={this.props.credit === 'credit'} onChange={(e,{value})=> {this.handleRadio(value)}}/>
                <Form.Radio label="Non-Credit" value='non-credit' checked={this.props.credit === 'non-credit'} onChange={(e,{value})=>{this.handleRadio(value)}}/>
              </Form.Group>
              {
                this.state.creditStatus ?
                <Form.Field>
                  <Form.Field>
                    <Form.Select defaultValue={this.props.programmeType} label="Programme Type" placeholder="Select Programme Type" fluid search selection onChange={(e,{value})=>{this.setState({programmeType: value})}} options={this.props.programmeOptions} error={this.props.programmeTypeError}/>
                  </Form.Field>
                  <Form.Field>
                    <Form.Select defaultValue={this.props.facilitator} label="Facilitator" placeholder="Select Facilitator Name" fluid multiple search selection onChange={(e,{value})=>{this.setState({facilitator: value})}} options={this.props.facilitators} error={this.props.facilitatorError}/>
                  </Form.Field>
                  <Form.Field>
                    <Form.Select defaultValue={this.props.assessor} label="Assessor" placeholder="Select Assessor Name"  fluid multiple search selection onChange={(e,{value})=>{this.setState({assessor: value})}} options={this.props.assessors} error={this.props.assessorError}/>
                  </Form.Field>
                  <Form.Field>
                    <Form.Select defaultValue={this.props.moderator} label="Moderator" placeholder="Select Moderator Name"  fluid multiple search selection onChange={(e,{value})=>{this.setState({moderator: value})}} options={this.props.moderators} error={this.props.moderatorError}/>
                  </Form.Field>
                </Form.Field>
                :
                <Form.Field>
                  <Form.Select defaultValue={this.props.facilitator} label="Facilitator" placeholder="Select Facilitator Name" fluid multiple search selection onChange={(e,{value})=>{this.setState({facilitator: value})}} options={this.props.facilitators} error={this.props.facilitatorError}/>
                </Form.Field>
              }
                  {
                    this.state.creditStatus ?
                    <Form.Group widths='equal'>
                      <Form.Button primary onClick={this.validateInput}><Icon name="save" /> Save</Form.Button>
                      <Form.Button primary onClick={this.addClient}><Icon name="add" /> Add New Client</Form.Button>
                      <Form.Button primary onClick={this.addFacilitator}><Icon name="add" /> Add new Facilitator</Form.Button>
                      <Form.Button primary onClick={this.addAssessor}><Icon name="add" /> Add new Assessor</Form.Button>
                      <Form.Button primary onClick={this.addModerator}><Icon name="add" /> Add new Moderator</Form.Button>
                    </Form.Group>
                    :
                    <Form.Group widths='equal'>
                        <Form.Button primary onClick={this.validateInput}><Icon name="save" /> Save</Form.Button>
                        <Form.Button primary onClick={this.addClient}><Icon name="add" />Add New Client</Form.Button>
                        <Form.Button primary onClick={this.addFacilitator}><Icon name="add" />Add new Facilitator</Form.Button>
                    </Form.Group>
                  }



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
  aday: state.batch.aday,
  amonth: state.batch.amonth,
  ayear: state.batch.ayear,
  mday: state.batch.mday,
  mmonth: state.batch.mmonth,
  myear: state.batch.myear,
  date: state.batch.date,
  client_name: state.batch.client_name,
  project: state.batch.project,
  errors: state.client.errors,
  programmeOptions: state.programme.programmeOptions,
  credit: state.programme.credit,
  facilitators: state.programme.facilitators,
  assessors: state.programme.assessors,
  moderators: state.programme.moderators,
  programme_nameError: state.client.programme_nameError,
  facilitatorError: state.client.facilitatorError,
  assessorError: state.client.assessorError,
  moderatorError: state.client.moderatorError,
  programmeTypeError: state.client.programmeTypeError,
  programme_name: state.batch.programme_name,
  facilitator: state.batch.facilitator,
  assessor: state.batch.assessor,
  moderator: state.batch.moderator,
  creditStatus: state.programme.creditStatus,
  programmeType: state.batch.programmeType,
  saved: state.client.saved
})
const mapDispatchToProps = dispatch => ({
  clientActions: bindActionCreators(clientActions, dispatch),
  programmeActions: bindActionCreators(programmeActions, dispatch),
  learnerActions: bindActionCreators(learnerActions, dispatch),
  flowActions: bindActionCreators(flowActions, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Client);
