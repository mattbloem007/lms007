import React, { Component }from 'react';
import { Form, Icon } from 'semantic-ui-react';
import { isEmpty, isNumeric, isAlpha, isMobilePhone, isLength } from 'validator';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as clientActions from '../actions/clientActions';
import * as flowActions from '../actions/flowActions';

class RegisterClient extends Component{

  constructor(props) {
    super(props);

    this.state = {
                  info: {
                          name: "",
                          tel: "",
                          address: "",
                          address2: "",
                          address3: "",
                          postCode: "",
                          contact: "",
                          municipality: ""
                         }

                 }
  }

  validateInput = (e) => {
    this.props.clientActions.updateClient(this.state.info);
  }

  back = () => {
    this.props.clientActions.updateClient(this.state.info);
    this.props.flowActions.changeActiveStep("client")
  }

  render() {
    return(
      <Form>
        <Form.Group>
          <Form.Field>
            <Form.Input defaultValue={this.props.name} label="Name" name="client_name" placeholder="Enter Client Name" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, name: data.value}}))}} error={this.props.nameError}/>
        </Form.Field>
          <Form.Field>
          <Form.Input label="Telephone" defaultValue={this.props.tel} name="client_telephone" placeholder="Telephone Number" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, tel: data.value}}))}} error={this.props.telError}/>
      </Form.Field>
        </Form.Group>
        <Form.Group>
          <Form.Field>
            <Form.Field>
              <Form.Field>
                <Form.Input label="Address" defaultValue={this.props.address} placeholder="Street Address" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, address: data.value}}))}}error={this.props.addressError}/>
            </Form.Field>
              <Form.Field>
                <Form.Input type="text" name="aptaddr" defaultValue={this.props.address2} placeholder="Address Line 2" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, address2: data.value}}))}} />
            </Form.Field>
            <Form.Field>
              <Form.Input type="text" name="aptaddr" defaultValue={this.props.address3} placeholder="Address Line 3" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, address3: data.value}}))}} />
          </Form.Field>
          </Form.Field>
            <Form.Field>
            <Form.Input label="Postal Code" type="text" name="post" defaultValue={this.props.postCode} placeholder="Postal Code"  onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, postCode: data.value}}))}} error={this.props.postCodeError}/>
        </Form.Field>
            <Form.Field>
            <Form.Input label="Contact Person" name="client_contact" placeholder="Contact Person" defaultValue={this.props.contact} onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, contact: data.value}}))}} error={this.props.contactError}/>
        </Form.Field>
            <Form.Field>
            <Form.Input label="Municipality" name="client_municipality" placeholder="Municipality" defaultValue={this.props.municipality} onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, municipality: data.value}}))}} error={this.props.municipalityError}/>
        </Form.Field>
      </Form.Field>
        </Form.Group>
        <Form.Button primary onClick={this.back}><Icon name="chevron circle left"/> Back</Form.Button>
        <Form.Button primary onClick={this.validateInput}><Icon name="save" />Save</Form.Button>
    </Form>
    )
  }

}
const mapStateToProps = (state) => ({
  nameError: state.client.nameError,
  telError: state.client.telError,
  addressError: state.client.addressError,
  address2Error: state.client.address2Error,
  postCodeError: state.client.postCodeError,
  contactError: state.client.contactError,
  municipalityError: state.client.municipalityError,
  name: state.client.name,
  tel: state.client.tel,
  address: state.client.address,
  address2: state.client.address2,
  address3: state.client.address3,
  postCode: state.client.postCode,
  contact: state.client.contact,
  municipality: state.client.municipality,
})
const mapDispatchToProps = (dispatch) => ({
  clientActions: bindActionCreators(clientActions, dispatch),
  flowActions: bindActionCreators(flowActions, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(RegisterClient);
