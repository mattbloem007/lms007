import React, { Component } from 'react';
import { Link } from "react-router-dom";
import update from 'immutability-helper';
import { Menu, Button, Step } from 'semantic-ui-react';
import * as mysql from 'mysql';


import RegisterLearner from '../components/registerLearner';
import MenuItem from '../components/MenuItem';
import RegisterClient from '../components/registerClient';
import Logistics from '../components/Logistics';
import Dates from '../components/Dates';
//import Steps from '../components/Steps';
import ExistingProjects from '../components/ExistingProjects';
import { days, months } from '../common';

class App extends Component {

  constructor(props) {
    super(props);

    let rep = [];

    this.state = { activeItem: "Register Project",
                   activeStep: "client",
                   activeInfo: "client",
                   completed: false,
                   clientActive: true,
                   learnerActive: false,
                   assessorActive: false,
                   menuItems: [{id: 0, text: "Register Project"},
                               {id: 1, text: "Existing Projects"}],
                   users: [],
                   response: []


                 }

  }


  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleBack = (e, form) => {
    e.preventDefault();
    this.setState(prevState => ({
      ...prevState,
      activeStep: form
    }))
  }


  handleNextClick = (form, refs) => {
    let rep = {};
    rep["table"] = "lms_" + this.state.activeStep;
    for (var ref in refs) {
      rep[ref] = refs[ref];
    }
    let req = '/data/' + rep["table"];
    fetch(req, {
      method: 'POST',
      body: JSON.stringify(rep),
      headers: {"Content-Type": "application/json"}
    })
    .then(function(response){
      return response.json()
    }).then(function(body){
      console.log(body);
  });
    if(this.rep == undefined) {
      this.rep = rep;
    }
    else {
      this.rep = update(this.rep, {$merge: rep});
    }
    this.setState(prevState => ({
      ...prevState,
      activeStep: form,
      completed: true
    }))
    //console.log(this.rep)

  }

  handleSubmit = (refs) => {
    let rep = {};
    rep["table"] = "lms_learner";
    for (var ref in refs) {
      rep[ref] = refs[ref];
    }
     //this.rep = update(this.rep, {$merge: rep});
     let req = '/data/' + rep["table"];
      fetch(req,{
        method: 'POST',
        body: JSON.stringify(rep),
        headers: {"Content-Type": "application/json"}
      })
      .then(function(response){
        return response.json()
      }).then(function(body){
        console.log(body);
    });

   this.setState({ activeStep: "client" })

  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .then(() => console.log(this.state.response))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    console.log(body)

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    let segment, currentForm;
    switch (this.state.activeItem) {
      case "Register Project":
        switch (this.state.activeStep) {
          case "client":
            currentForm = (<RegisterClient nextClicked={this.handleNextClick} />)
            this.state.clientActive = true
            this.state.assessorActive = false
            this.state.learnerActive = false
          break;
          case "logistics":
            currentForm = (<Logistics nextClicked={this.handleNextClick} handleBack={this.handleBack} />)
            this.state.assessorActive = true
            this.state.clientActive = false
            this.state.learnerActive = false
          break;

          case "dates":
            currentForm = (<Dates nextClicked={this.handleNextClick} handleBack={this.handleBack} />)
          break;

          case "learner":
            currentForm = (<RegisterLearner handleSubmit={this.handleSubmit} handleBack={this.handleBack}/>)
            this.state.learnerActive = true;
            this.state.assessorActive = false
            this.state.clientActive = false
          break;
          default:

        }
        let activeArray = [ {
                              isClientActive: this.state.clientActive,
                              isAssessorActive: this.state.assessorActive,
                              isLearnerActive: this.state.learnerActive
                            }
                          ];
        segment = (
                    <div className="ui segment">
                      <Step.Group>
                      <Step active={this.state.clientActive}>
                        <Step.Content>
                          <Step.Title>Project</Step.Title>
                          <Step.Description>Register a Project</Step.Description>
                        </Step.Content>
                      </Step>
                      <Step active={this.state.assessorActive}>
                        <Step.Content>
                          <Step.Title>Learner Information</Step.Title>
                          <Step.Description>Register a Learner</Step.Description>
                        </Step.Content>
                      </Step>
                    <Step active={this.state.learnerActive}>
                      <Step.Content>
                        <Step.Title>Assessors and Moderators</Step.Title>
                        <Step.Description></Step.Description>
                      </Step.Content>
                    </Step>
                  </Step.Group>
                      {currentForm}
                    </div>
        );
        break;
      case "Existing Projects":
        segment = (<ExistingProjects info={this.state.response}/>)
      break;
      default:

    }

    return (
      <div>
          <div className="ui secondary pointing menu">
            {
              this.state.menuItems.map((item) =>
              <Menu.Item key={item.id} name={item.text} active={this.state.activeItem === item.text} onClick={this.handleItemClick} />
            )
            }
          <div className="right menu">
            <a className="ui item">
              Logout
            </a>
          </div>
        </div>
          {segment}
     </div>
    );
  }
}

export default App;
