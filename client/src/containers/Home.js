import React, { Component } from 'react';
import { Segment, Form } from 'semantic-ui-react';

class Home extends Component {

  render() {
    return (
      <Segment>
        <Form>
          <Form.Input fluid label='Batch Number Date' placeholder='Date' />
          <Form.Button>Save</Form.Button>
        </Form>
      </Segment>
    )

  }
}
export default Home;
