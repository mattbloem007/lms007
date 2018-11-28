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
class Login extends Component {

  constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            submitted: false,
            register: false
        };
    }

    login = () => {
      this.props.loginActions.fetchUser(this.state.username, this.state.password)
      .then(() => {
        if (this.props.auth) {
          console.log("here")
          this.setState({submitted: true})
          this.props.loginActions.auth
        }
      })

    }

    register = () => {
      this.setState({register: true})
    }


  render() {

    if (this.state.submitted === true) {
      return <Redirect to='/App'/>
    }
    else {
      if (this.state.register === true) {
        return <Redirect to='/Register' />
      }
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
                  <div id="remember">
                      <input type="checkbox" name="remember" value="1"/> Remember Me
                  </div>
              </div>
          </div>
          <input type="submit" value="Login" className="save" onClick={this.login}/>
            <input type="submit" value="Register" className="register" onClick={this.register}/>
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
export default connect(mapStateToProps, mapDispatchToProps)(Login);
