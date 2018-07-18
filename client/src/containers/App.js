import React, { Component } from 'react';
import { Link } from "react-router-dom";
import update from 'immutability-helper';
import { Menu, Button } from 'semantic-ui-react';
import * as mysql from 'mysql';


import RegisterLearner from '../components/registerLearner';
import MenuItem from '../components/MenuItem';
import RegisterClient from '../components/registerClient';
import Logistics from '../components/Logistics';
import Dates from '../components/Dates';
import Steps from '../components/Steps';
import ExistingProjects from '../components/ExistingProjects';

class App extends Component {

  constructor(props) {
    super(props);

    let rep = [];

    this.state = { activeItem: "Register Project",
                   activeStep: "client",
                   activeInfo: "client",
                   menuItems: [{id: 0, text: "Register Project"},
                               {id: 1, text: "Existing Projects"}],
                   days: ['1','2','3','4','5', '6', '7','8','9','10',
                          '11','12','13','14','15','16','17','18','19','20',
                          '21','22','23','24','25','26','27','28','29','30','31'],
                   months: ['Month', 'January', 'February', 'March', 'April', 'May', 'June',
                            'July', 'August', 'September', 'October', 'November', 'December'],
                   users: [],
                   response: []


                 }

  }


  handleItemClick = (e, { name }) => this.setState({ activeItem: name })


  handleNextClick = (form, refs) => {
    let rep = {};
    rep["table"] = "lms_" + this.state.activeStep;
    for (var ref in refs) {
      rep[ref] = refs[ref];
    }
    console.log(rep)
    fetch('/data',{
      method: 'POST',
      body: JSON.stringify(rep),
      headers: {"Content-Type": "application/json"}
    })
    .then(function(response){
      return response.json()
    }).then(function(body){
      console.log(body);
  });
    // if(this.rep == undefined) {
    //   this.rep = rep;
    // }
    // else {
    //   this.rep = update(this.rep, {$merge: rep});
    // }
    this.setState(prevState => ({
      ...prevState,
      activeStep: form
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
      fetch('/data',{
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

  // componentDidMount() {
  //   this.callApi()
  //     .then(res => this.setState({ response: res.express }))
  //     .then(() => console.log(this.state.response))
  //     .catch(err => console.log(err));
  // }
  //
  // callApi = async () => {
  //   const response = await fetch('/api/hello');
  //   const body = await response.json();
  //   console.log(body)
  //
  //   if (response.status !== 200) throw Error(body.message);
  //
  //   return body;
  // };

  render() {
    let segment, currentForm;
    switch (this.state.activeItem) {
      case "Register Project":
        switch (this.state.activeStep) {
          case "client":
            currentForm = (<RegisterClient nextClicked={this.handleNextClick}/>)
          break;
          case "logistics":
            currentForm = (<Logistics nextClicked={this.handleNextClick} />)
          break;

          case "dates":
            currentForm = (<Dates days={this.state.days} months={this.state.months} nextClicked={this.handleNextClick} />)
          break;

          case "learner":
            currentForm = (<RegisterLearner days={this.state.days} months={this.state.months} handleSubmit={this.handleSubmit} />)
          break;
          default:

        }
        segment = (
                    <div className="ui segment">
                      <Steps />
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
