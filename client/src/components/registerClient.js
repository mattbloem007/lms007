import React, { Component }from 'react';
import { Button, Dropdown, Input } from 'semantic-ui-react';
import { isEmpty, isNumeric, isAlpha, isMobilePhone, isLength } from 'validator';

class RegisterClient extends Component{

  constructor(props) {
    super(props);

    this.state = {
                  projectError: false,
                  nameError: false,
                  telError: false,
                  addressError: false,
                  address2Error: false,
                  postCodeError: false,
                  contactError: false,
                  municipalityError: false,
                  info: {
                          project: "Project Name",
                          name: "Name",
                          tel: "",
                          address: "",
                          address2: "",
                          postCode: "",
                          contact: "",
                          municipality: ""
                         }

                 }
  }

  validateInput = (e) => {
    e.preventDefault();
    let errors = false;

    if (isEmpty(this.state.info.project)) {
      this.setState({ projectError: true });
      errors = true;
    }

    if (isEmpty(this.state.info.name)) {
      this.setState({ nameError: true });
      errors = true;
    }

    if (!isMobilePhone(this.state.info.tel)) {
      this.setState({ telError: true });
      errors = true;
    }

    if (isEmpty(this.state.info.address)) {
      this.setState({ addressError: true });
      errors = true;
    }
    if (isEmpty(this.state.info.postCode) || !isNumeric(this.state.info.postCode)) {
      this.setState({ postCodeError: true });
      errors = true;
    }
    if (isEmpty(this.state.info.contact)) {
      this.setState({ contactError: true });
      errors = true;
    }
    if (isEmpty(this.state.info.municipality)) {
      this.setState({ municipalityError: true });
      errors = true;
    }

    if(errors == false) {
      this.handleNext("learner");
    }
  }

  handleNext = (form) => {
    let info = {
            project_name: this.state.info.project,
            name: this.state.info.name,
            telephone: this.state.info.tel,
            address: this.state.info.address + ", " + this.state.info.address + ", " + this.state.info.postCode,
            contact: this.state.info.contact,
            municipality: this.state.info.municipality};
    this.props.nextClicked(form, info);
  }

  render() {
    return(
      <div className="ui form">
        <div className="fields">
          <div className="field">
            <label>Project Name</label>
            <Input name="project_name" placeholder={this.state.info.project} ref="project_name"  onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, project: data.value}}))}} error={this.state.projectError}/>
          </div>
          <div className="field">
            <label>Name</label>
            <Input name="client_name" placeholder={this.state.info.name} ref="client_name" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, name: data.value}}))}} error={this.state.nameError}/>
          </div>
          <div className="field">
            <label>Telephone</label>
            <Input name="client_telephone" placeholder="Telephone Number" ref="client_telephone" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, tel: data.value}}))}} error={this.state.telError}/>
          </div>
        </div>
        <div className="fields">
          <div className="field">
            <label>Address</label>
            <div className="fields">
              <div className="twelve wide field">
                <Input name="client_address" placeholder="Street Address" ref="client_address" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, address: data.value}}))}}error={this.state.addressError}/>
              </div>
              <div className="four wide field">
                <Input type="text" name="aptaddr" placeholder="Apt #" ref="aptaddr" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, address2: data.value}}))}} />
              </div>
            </div>
            <div className="field">
              <label>Postal Code</label>
              <Input type="text" name="post" placeholder="Postal Code" ref="post" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, postCode: data.value}}))}} error={this.state.postCodeError}/>
            </div>
            <div className="field">
              <label>Contact Person</label>
              <Input name="client_contact" placeholder="Contact Person" ref="client_contact" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, contact: data.value}}))}} error={this.state.contactError}/>
            </div>
            <div className="field">
              <label>Municipality</label>
              <Input name="client_municipality" placeholder="Municipality" ref="client_municipality" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, municipality: data.value}}))}} error={this.state.municipalityError}/>
            </div>
          </div>
        </div>
        <Button onClick={this.validateInput}>Save</Button>
      </div>
    )
  }

}
export default RegisterClient;
