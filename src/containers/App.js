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

class App extends Component {

  constructor(props) {
    super(props);

    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'lms'
    });

    console.log( connection.connect() )


    this.state = { activeItem: "Register Project",
                   activeStep: "client",
                   menuItems: [{id: 0, text: "Register Project"},
                               {id: 1, text: "Existing Projects"}],
                   days: ['1','2','3','4','5', '6', '7','8','9','10',
                          '11','12','13','14','15','16','17','18','19','20',
                          '21','22','23','24','25','26','27','28','29','30','31'],
                   months: ['Month', 'January', 'February', 'March', 'April', 'May', 'June',
                            'July', 'August', 'September', 'October', 'November', 'December'],
                   users: []
                 }

  }


  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleNextClick = (form) => {
    this.setState({ activeStep: form })
  }

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
            currentForm = (<RegisterLearner days={this.state.days} months={this.state.months} nextClicked={this.handleNextClick} />)
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
        segment = (<p>Existing Projects</p>)
      break;
      default:

    }

    return (
      <div>
          <div className="ui secondary pointing menu">
            {
              this.state.menuItems.map((item) =>
              <Menu.Item key={item.id} name={item.text} active={this.state.activeItem === item.text} onClick={this.handleItemClick} />
          //    <MenuItem onSomeEvent={() => this.setActiveItem(item.id)} itemValue={item.text} className={item.isActive ? "active item" : "item"}/>
            )
            }
          <div className="right menu">
            <a className="ui item">
              Logout
            </a>
          </div>
        </div>
        <h1>Users</h1>
        {this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        )}
          {segment}
     </div>
    );
  }
}

export default App;
