import React, { Component } from 'react'
import { Icon, Table, Menu, Container, Button, Segment, Checkbox, Confirm, Form, Header, Modal } from 'semantic-ui-react'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as tableActions from '../actions/tableActions'
import * as flowActions from '../actions/flowActions'
import * as clientActions from '../actions/clientActions';

import _ from 'lodash'
let info = {
  name: null,
  telephone: null,
  address: null,
  contact: null,
  municipality: null
}

class ClientTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
                    headings: ["Name", "Telephone", "Address", "Contact", "Muncipality"],
                    checkedRows: [],
                    filterBy: {},
                    deleted: false,
                    open: false,
                    openFilter: false,
                    info: info
                 }
  }

  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })
  openFilter = () => this.setState({ openFilter: true })
  closeFilter = () => this.setState({ openFilter: false })

  back = () => {
    this.props.tableActions.changeActiveTable("batch")
    this.props.tableActions.clearBatchLearners()
  }

  downloadExcel = () => {
    this.props.tableActions.downloadExcel(this.props.clients)
  }


  componentDidMount() {
      this.props.clientActions.fetchAllClients();
  }

  delete = () => {
    console.log(this.state.checkedRows)

    this.props.clientActions.Delete(this.state.checkedRows)
    .then(() => {
      this.close()
      this.forceUpdate();
      this.props.clientActions.fetchAllClients();
    })
  }

  edit = (client) => {
    console.log(client)
    this.props.clientActions.editClient(client)
    .then(() => {
      this.props.flowActions.changeActiveStep("rclient")
    })
  }

  checkRow = (name, value) => {
    let checked = [];
    if (value) {
      checked.push(name);
      this.setState({checkedRows: [...this.state.checkedRows, ...checked]})
    }
    else {
      this.setState({checkedRows:  _.without(this.state.checkedRows, name) })
    }
  }

  filterTable = () => {
    let filterArr = _.pickBy(this.state.info, _.identity);
    console.log(filterArr, this.state.info)
    this.setState({filterBy: filterArr, openFilter: false})
  }

  reset = () => {
    this.setState({filterBy: {}, info: info })

  }

  render() {
    return(
    <Segment style={{overflow: 'auto', maxHeight: 500 }}>

      <Button onClick={this.reset}>Reset Filters</Button>
      <Modal
        onOpen={this.openFilter}
        onClose={this.filterTable}
      trigger={<Button>Filter</Button>}>
    <Modal.Header>Filter</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <Header>Filter</Header>
          <Form>
            <Form.Field>
              <Form.Input label="Name" placeholder="Name" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, name: data.value}}))}} />
              <Form.Input label="Telephone" placeholder="Enter Telephone" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, telephone: data.value}}))}} />
              <Form.Input label="Address" placeholder="Enter Address" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, address: data.value}}))}} />
              <Form.Input label="Contact" placeholder="Enter Contact Name" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, contact: data.value}}))}} />
              <Form.Input label="Muncipality" placeholder="Enter Municipality" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, municipality: data.value}}))}} />
            </Form.Field>

          </Form>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button onClick={this.filterTable} icon labelPosition='left' primary size='small'>
        <Icon name='filter' /> Filter
      </Button>
    </Modal.Actions>
  </Modal>

    <Table celled selectable sortable stackable compact definition>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell />
          {
            this.state.headings.map((head) => <Table.HeaderCell key={head}>{head}</Table.HeaderCell>)
          }
        </Table.Row>
      </Table.Header>
        <Table.Body>
          {
            _.filter(this.props.clients, this.state.filterBy).map((x, i) => {
            return(
              <Table.Row key={x.name}>
                <Table.Cell collapsing>
                  <Checkbox onChange={(e, {checked}) => {this.checkRow(x.name, checked)}}/>
                </Table.Cell>
                <Table.Cell>
                  <Button onClick={() => this.edit(this.props.clients[i])} icon labelPosition='left' primary size='small'>
                    <Icon name='edit' /> Edit
                  </Button>
                </Table.Cell>
                {
                  Object.keys(this.props.clients[i]).map((y) =><Table.Cell key={y}>{x[y]}</Table.Cell>)
                }
              </Table.Row>
              )
            })
          }
        </Table.Body>
        <Table.Footer fullWidth>
      <Table.Row>
      <Table.HeaderCell colSpan='5'>
            <Button onClick={this.downloadExcel} floated='left' icon labelPosition='left' primary size='small'>
              <Icon name='download' /> Export To Excel
            </Button>
            <div>
              <Button onClick={this.open} floated='left' icon labelPosition='left' primary size='small'>
                <Icon name='delete' /> Delete
              </Button>
              <Confirm open={this.state.open} onCancel={this.close} onConfirm={this.delete} />
            </div>
            <Button onClick={this.downloadPDF} floated='right' icon labelPosition='left' primary size='small'>
              <Icon name='download' /> Download Report
            </Button>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
    </Table>
  </Segment>
    )
  }

}
const mapStateToProps = state => ({
  batch: state.table.batch,
  batchs: state.batch.batchs,
  batchLearners: state.table.batchLearners,
  clients: state.client.clients

})
const mapDispatchToProps = dispatch => ({
  clientActions: bindActionCreators(clientActions, dispatch),
  flowActions: bindActionCreators(flowActions, dispatch),
  tableActions: bindActionCreators(tableActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ClientTable);
