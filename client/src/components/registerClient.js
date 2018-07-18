import React, { Component }from 'react';
import { Button } from 'semantic-ui-react';

class RegisterClient extends Component{

  constructor(props) {
    super(props);
  }

  handleNext = (form) => {
    let info = {
            project_name: this.refs.project_name.value,
            name: this.refs.client_name.value,
            telephone: this.refs.client_telephone.value,
            address: this.refs.client_address.value + ", " + this.refs.aptaddr.value + ", " + this.refs.post.value,
            contact: this.refs.client_contact.value,
            municipality: this.refs.client_municipality.value};
    this.props.nextClicked(form, info);
  }

  render() {
    return(
      <div className="ui form">
        <div className="fields">
          <div className="field">
            <label>Project Name</label>
            <input type="text" name="project_name" placeholder="Project Name" ref="project_name"/>
          </div>
          <div className="field">
            <label>Name</label>
            <input type="text" name="client_name" placeholder="Name" ref="client_name"/>
          </div>
          <div className="field">
            <label>Telephone</label>
            <input type="text" name="client_telephone" placeholder="Telephone Number" ref="client_telephone"/>
          </div>
        </div>
        <div className="fields">
          <div className="field">
            <label>Address</label>
            <div className="fields">
              <div className="twelve wide field">
                <input type="text" name="client_address" placeholder="Street Address" ref="client_address"/>
              </div>
              <div className="four wide field">
                <input type="text" name="aptaddr" placeholder="Apt #" ref="aptaddr"/>
              </div>
            </div>
            <div className="field">
              <label>Postal Code</label>
              <input type="text" name="post" placeholder="Postal Code" ref="post"/>
            </div>
            <div className="field">
              <label>Contact Person</label>
              <input type="text" name="client_contact" placeholder="Contact Person" ref="client_contact"/>
            </div>
            <div className="field">
              <label>Municipality</label>
              <input type="text" name="client_municipality" placeholder="Municipality" ref="client_municipality"/>
            </div>
          </div>
        </div>
        <Button onClick={() => this.handleNext("logistics")}>Next</Button>
      </div>
    )
  }

}
export default RegisterClient;
