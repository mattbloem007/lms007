import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as flowActions from '../actions/flowActions';
import * as loginActions from '../actions/loginActions';
import { Link, Redirect } from "react-router-dom";
import update from 'immutability-helper';
import { Menu, Button, Step, Segment, Image, Icon } from 'semantic-ui-react';
import * as mysql from 'mysql';
import myImage from '../imgs/CLUBSMART Logo.png'
import logo from '../imgs/Institute of Sport Logo.png'
import logout from '../imgs/icon-logout-mobile.png'



import RegisterLearner from '../components/registerLearner';
import Learner from '../components/chooseLearner'
import MenuItem from '../components/MenuItem';
import RegisterClient from '../components/registerClient';
import Client from '../components/chooseClient';
import Programme from '../components/chooseProgramme'
import RegisterFacilitator from '../components/registerFacilitator'
import RegisterAssessor from '../components/registerAssessor'
import RegisterModerator from '../components/registerModerator'
import Logistics from '../components/Logistics';
import Dates from '../components/Dates';
import Home from './Home';
import AllLearnerTable from '../components/allLearnerTable';
import ClientTable from '../components/ClientTable';
import FacilitatorTable from '../components/FacilitatorTable';
import ModeratorTable from '../components/ModeratorTable';
import AssessorTable from '../components/AssessorTable';
//import Steps from '../components/Steps';
import ExistingProjects from '../components/ExistingProjects';
import { days, months } from '../common';

const style1 = {
  paddingLeft:'12px'
}

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loggedIn: true,
      register: false
    }

  }


  handleItemClick = (e, { name }) => this.props.flowActions.changeActiveItem(name)

  handleBack = (e, form) => {
    e.preventDefault();
    this.setState(prevState => ({
      ...prevState,
      activeStep: form
    }))
  }


  handleNextClick = (form, refs, prev) => {
    this.props.flowActions.saveInfo(form, refs, prev)
  }

  logout = () => {
    console.log("INHERE")
    this.props.loginActions.logout()
    .then(() => {
      this.setState({loggedIn: false})
    })
  }

  register = () => {
    this.setState({register: true})
  }

  render() {
    let segment, currentForm;
    if (!this.state.loggedIn) {
      return <Redirect to="/" />
    }

    if (this.state.register === true) {
      return <Redirect to='/Register' />
    }



    switch (this.props.activeItem) {
      case "Register Project":
        switch (this.props.activeStep) {
          case "home":
            currentForm = (<Home />)
          break;
          case "client":
            currentForm = (<Client />)
          break;
          case "rclient":
            currentForm = (<RegisterClient />)

          break;
          case "programme":
            currentForm = (<Programme />)
          break;

          case "addFac":
            currentForm = (<RegisterFacilitator />)
          break;

          case "addAss":
            currentForm = (<RegisterAssessor />)
          break;

          case "addMod":
            currentForm = (<RegisterModerator />)
          break;

          case "rLearner":
            currentForm = (<RegisterLearner />)
          break;
          case "learner":
            currentForm = (<Learner />)
          break;
          default:

        }
        segment = (
                    <Segment>
                      {currentForm}
                    </Segment>
        );
        break;
      case "Existing Projects":
        segment = (<ExistingProjects info={this.props.response}/>)
      break;
      case "Learners":
        switch (this.props.activeStep) {

          case "rLearner":
            currentForm = (<RegisterLearner />)
          break;

          default:
            currentForm = (<AllLearnerTable />)
          break;

        }
        segment = (
                    <Segment>
                      {currentForm}
                    </Segment>
        );
      break;
      case "Clients":
      switch (this.props.activeStep) {

        case "rclient":
          currentForm = (<RegisterClient />)
        break;

        default:
          currentForm = (<ClientTable />)
        break;

      }
      segment = (
                  <Segment>
                    {currentForm}
                  </Segment>
      );
      break;
      case "Facilitators":
      switch (this.props.activeStep) {

        case "rfac":
          currentForm = (<RegisterFacilitator />)
        break;

        default:
          currentForm = (<FacilitatorTable />)
        break;

      }
      segment = (
                  <Segment>
                    {currentForm}
                  </Segment>
      );
      break;
      case "Moderators":
      switch (this.props.activeStep) {

        case "rmod":
          currentForm = (<RegisterModerator />)
        break;

        default:
          currentForm = (<ModeratorTable />)
        break;

      }
      segment = (
                  <Segment>
                    {currentForm}
                  </Segment>
      );
      break;
      case "Assessors":
      switch (this.props.activeStep) {

        case "rass":
          currentForm = (<RegisterAssessor />)
        break;

        default:
          currentForm = (<AssessorTable />)
        break;

      }
      segment = (
                  <Segment>
                    {currentForm}
                  </Segment>
      );
      break;
      default:

    }

    return (
      <div>
        <div id="topbar">
              <span onClick={this.register} style={style1}>
                <Icon name="add" />
                Register Employee
              </span>
              <span style={style1}>
                <a onClick={this.logout}><img src={logout} />Logout</a>
              </span>
        </div>
          <Menu id="topdark" secondary pointing>
            <div id="logo">
              <Image className="logo" src={logo} />
              <Image className="logo" src={myImage}  />
            </div>
              <ul id="nav">
                {
                  this.props.menuItems.map((item) =>
                  <Menu.Item as="li" key={item.id} name={item.text} active={this.props.activeItem === item.text} onClick={this.handleItemClick} />
                )
                }
              </ul>
        </Menu>
        <div id="topblue"></div>
          {segment}
     </div>
    );
  }
}
const mapStateToProps = (state) => ({
      activeItem: state.flow.activeItem,
      activeStep: state.flow.activeStep,
      completed: state.flow.completed,
      menuItems: state.flow.menuItems
})
const mapDispatchToProps = (dispatch) => ({
    flowActions: bindActionCreators(flowActions, dispatch),
    loginActions: bindActionCreators(loginActions, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
