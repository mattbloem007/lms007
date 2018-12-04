import React, { Component } from 'react';
import { connect } from "react-redux";
import { Form, Image } from 'semantic-ui-react';
import { Redirect } from "react-router-dom";
import { bindActionCreators } from 'redux';
import * as loginActions from '../actions/loginActions';
import logo from '../imgs/Institute of Sport Logo.png'

const style1 = {
  width:'100%'
}
const style2 = {
  display:'none'
}
const style3 = {
  width:'200px'
}
class Register extends Component {

  constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            fname: '',
            lname: '',
            submitted: false,
            back: false
        };
    }

    back = () => {
      this.setState({back: true})
    }

    register = () => {
      let info = {
        fname: this.state.fname,
        lname: this.state.lname,
        username: this.state.username,
        password: this.state.password
      }
      this.props.loginActions.registerUser(info)
      .then(() => {
        if (this.props.auth) {
          console.log("here")
          this.setState({submitted: true})
          this.props.loginActions.auth
        }
      })

    }


  render() {

    if (this.state.submitted === true) {
      return <Redirect to='/App'/>
    }

    if (this.state.back === true) {
      return <Redirect to='/App'/>
    }

    return (
      <div>
        <div id="login_logo"><img src={logo} size="small" /></div>
        <div id="background"></div>
        <div id="foreground"></div>
        <div id="login_box">
          <div id="login_box_inner">
              <div id="login_pad">
                <div className="col50l">
                    <div className="field">
                      <label>First Name</label>
                        <input onChange={(event)=>{this.setState({fname: event.target.value})}} type="text" name="fname" className="home req" style={style1}/>
                    </div>
                </div>
                <div className="col50l">
                    <div className="field">
                        <label>Last Name</label>
                        <input onChange={(event)=>{this.setState({lname: event.target.value})}} type="text" name="lname" className="home req" style={style1}/>
                    </div>
                </div>
                  <div className="col50l">
                      <div className="field">
                        <label>Username</label>
                          <input onChange={(event)=>{this.setState({username: event.target.value})}} type="text" name="username" className="home req" style={style1}/>
                      </div>
                  </div>
                  <div className="col50r">
                      <div className="field">
                        <label>Password</label>
                          <input type="password" onChange={(event)=>{this.setState({password: event.target.value})}} name="password" className="home req" style={style1}/>
                      </div>
                  </div>
                  <div className="clear"></div>
                  <div className="field">
                      <div id="captcha_block" className="notice" style={style2}>
                          <div className="pad20">
                              <center>
                                  <img width="200" height="50" id="captchaput" className="imageout" src=""/>
                                  <input type="text" name="captcha" value="" className="home" style={style3}/>
                              </center>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <input type="submit" value="Save" className="save" onClick={this.register}/>
          <input type="submit" value="Back" className="save" onClick={this.back}/>
        </div>
      </div>
    )
  }

}
const mapStateToProps = (state) => ({
      auth: state.login.auth
})
const mapDispatchToProps = (dispatch) => ({
    loginActions: bindActionCreators(loginActions, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Register);
