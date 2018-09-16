import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as flowActions from '../actions/flowActions';
import { Link } from "react-router-dom";
import update from 'immutability-helper';
import { Menu, Button, Step, Segment } from 'semantic-ui-react';
import * as mysql from 'mysql';


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
//import Steps from '../components/Steps';
import ExistingProjects from '../components/ExistingProjects';
import { days, months } from '../common';

class App extends Component {

  constructor(props) {
    super(props);

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

  render() {
    let segment, currentForm;
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
      default:

    }

    return (
      <div>
          <Menu secondary pointing>
            {
              this.props.menuItems.map((item) =>
              <Menu.Item key={item.id} name={item.text} active={this.props.activeItem === item.text} onClick={this.handleItemClick} />
            )
            }
          <Menu.Menu position='right'>
            <Menu.Item link={true} name="logout" />
          </Menu.Menu>
        </Menu>
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
    flowActions: bindActionCreators(flowActions, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
