import React, { Component } from 'react'
import { Button } from 'semantic-ui-react';


class Logistics extends Component {

  constructor(props) {
    super(props);
  }

  handleNext = (form) => {
    let info = {
                venue: this.refs.log_venue.value,
                batchno: this.refs.batchno.value,
                facilitator: this.refs.facilitator.value,
                assessor: this.refs.assessor.value,
                moderator: this.refs.moderator.value
               }
    this.props.nextClicked(form, info);
  }

  render() {
    return (
      <div class="ui equal width form">
        <div class="fields">
          <div class="field">
            <label>Venue</label>
            <input type="text" placeholder="log_venue" ref="log_venue"/>
          </div>
          <div class="field">
            <label>Batch Number</label>
            <input type="text" placeholder="Batch Number" ref="batchno"/>
          </div>
        </div>
        <div class="fields">
          <div class="field">
            <label>Facilitator</label>
            <input type="text" placeholder="Facilitator" ref="facilitator"/>
          </div>
          <div class="field">
            <label>Assessor</label>
            <input type="text" placeholder="Assessor" ref="assessor"/>
          </div>
          <div class="field">
            <label>Moderator</label>
            <input type="text" placeholder="Moderator" ref="moderator"/>
          </div>
        </div>
        <Button onClick={() => this.handleNext("dates")}>Next</Button>
      </div>
    )
  }

}
export default Logistics;
