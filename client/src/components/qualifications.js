import { React, Component } from 'react';
import { Segment, Form, Icon } from 'semantic-ui-react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

const qualifications = () => {
  return (
    <Segment>
      <Form>
        <Form.Select placeholder="Select Moderator Name"  fluid multiple search selection options={this.props.programmes}></Form.Select>
      </Form>
    </Segment>
  )
}
export default qualifications;
