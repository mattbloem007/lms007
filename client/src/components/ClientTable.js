import React, { Component } from 'react'
import { Icon, Table, Menu, Container } from 'semantic-ui-react'

class ClientTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
                    headings: ["Project Name", "Name", "Telephone", "Address", "Contact", "Municipality"]
                 }
  }

  handleFooter = (table) => {

    this.props.footerClicked(table);

  }

  render() {
    return(
    <Table celled>
      <Table.Header>
        <Table.Row>
          {
            this.state.headings.map((head) => <Table.HeaderCell key={head}>{head}</Table.HeaderCell>)
          }
        </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            this.props.info.map((x, i) => {
            return(
              <Table.Row>
                {
                  Object.keys(this.props.info[i]).map((y) => <Table.Cell>{x[y]}</Table.Cell>)
                }
              </Table.Row>
              )
            })
          }
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='3'>
              <Menu floated='right' pagination>
                <Menu.Item as='a' icon>
                  <Icon name='chevron left' />
                </Menu.Item>
                <Menu.Item as='a' onClick={() => this.handleFooter("lms_client")}>Client</Menu.Item>
                <Menu.Item as='a' onClick={() => this.handleFooter("lms_logistics")}>Logistics</Menu.Item>
                <Menu.Item as='a' onClick={() => this.handleFooter("lms_dates")}>Dates</Menu.Item>
                <Menu.Item as='a' onClick={() => this.handleFooter("lms_learner")}>Learner</Menu.Item>
                <Menu.Item as='a' icon>
                  <Icon name='chevron right' />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>


    </Table>
    )
  }

}
export default ClientTable;
