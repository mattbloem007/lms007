import React, { Component } from 'react'
import { Icon, Table, Menu, Container, Button, Segment, Checkbox, Confirm, Form, Header, Modal } from 'semantic-ui-react'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as batchActions from '../actions/batchActions'
import * as tableActions from '../actions/tableActions'
import _ from 'lodash'

let info = {
  batch_no: null,
  venue: null,
  client_name: null,
  project: null,
  programme: null,
  credit: null,
  facilitator: null,
  assessor: null,
  moderator: null
}

class BatchTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
                    headings: ["Batch Number", "Date", "End Date", "Venue", "Client Name", "Project", "Programme", "Credit Bearing", "Facilitator", "Assessor", "Moderator", "Date Assessed", "Date Moderated", "Programme Type", ""],
                    filterBy: {},
                    checkedRows: [],
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

  componentDidMount() {
    this.props.batchActions.fetchBatch();

  }

  addLearners = y => {
    console.log(y)
    this.props.tableActions.addLearners("learner", y.toString())
  }

  showBatchLearners = (batch_no, index) => {
    this.props.tableActions.fetchBatchLearnerIDs(batch_no)
    this.props.tableActions.changeActiveTable("learnerTable")
  }

  downloadExcel = () => {
    this.props.tableActions.downloadExcel(this.props.batchs)
  }

  checkRow = (batch, value) => {
    let checked = [];

    if (value) {
      checked.push(batch);
      this.setState({checkedRows: [...this.state.checkedRows, ...checked]})
    }
    else {
      this.setState({checkedRows:  _.without(this.state.checkedRows, batch) })
    }
  }

  delete = () => {
    console.log(this.state.checkedRows)
    this.props.batchActions.Delete(this.state.checkedRows)
    .then (() => {
      this.close();
      this.forceUpdate()
      this.props.batchActions.fetchBatch();
    })
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
              <Form.Input label="Batch Number" placeholder="Enter Batch Number" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, batch_no: parseInt(data.value)}}))}} />
              <Form.Input label="Venue" placeholder="Enter Venue" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, venue: data.value}}))}} />
              <Form.Input label="Client Name" placeholder="Enter Client Name" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, client_name: data.value}}))}} />
              <Form.Input label="Project" placeholder="Enter Project" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, project: data.value}}))}} />
              <Form.Input label="Programme" placeholder="Enter Programme" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, programme: data.value}}))}} />
              <Form.Select label="Credit" placeholder="Select credit" fluid search selection options={[{text: "Credit", value: "credit"}, {text: "non-credit", value: "non-credit"}]} onChange={(e,{value})=>{this.setState(prevState => ({info: {...prevState.info, credit: value}}))}} />
              <Form.Input label="Facilitator" placeholder="Enter Facilitator" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, facilitator: data.value}}))}} />
              <Form.Input label="Assessor" placeholder="Enter Assessor" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, assessor: data.value}}))}} />
              <Form.Input label="Moderator" placeholder="Enter Moderator" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, moderator: data.value}}))}} />

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

    <Table className="tablesorter listings" id="active_table" celled selectable sortable stackable compact definition>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          {
            this.state.headings.map((head) => <Table.HeaderCell key={head}>{head}</Table.HeaderCell>)
          }
        </Table.Row>
      </Table.Header>
        <Table.Body>
          {
            _.filter(this.props.batchs, this.state.filterBy).map((x, i) => {
            return(
              <Table.Row key={x.batch_no} >
                <Table.Cell collapsing>
                  <Checkbox onChange={(e, {checked}) => {this.checkRow(x.batch_no, checked)}}/>
                </Table.Cell>
                {
                  Object.keys(this.props.batchs[i]).map((y) => <Table.Cell onClick={() => this.showBatchLearners(x.batch_no, i)} key={y}>{x[y]}</Table.Cell>)
                }
                <Table.Cell>
                  <Button floated='right' icon labelPosition='left' primary size='small' onClick={() => this.addLearners(x.batch_no)}>
                    <Icon name='user' /> Add Learners
                  </Button>
                </Table.Cell>
              </Table.Row>
              )
            })
          }
        </Table.Body>
        <Table.Footer fullWidth>
    <Table.Row>
      <Table.HeaderCell colSpan='13'>
        <Button onClick={this.downloadExcel} floated='left' icon labelPosition='left' primary size='small'>
          <Icon name='download' /> Export To Excel
        </Button>
        <div>
          <Button onClick={this.open} floated='left' icon labelPosition='left' primary size='small'>
            <Icon name='delete' /> Delete
          </Button>
          <Confirm open={this.state.open} onCancel={this.close} onConfirm={this.delete} />
        </div>
      </Table.HeaderCell>
    </Table.Row>
  </Table.Footer>
    </Table>
  </Segment>
    )
  }
}
const mapStateToProps = state => ({
  batchs: state.batch.batchs

})
const mapDispatchToProps = dispatch => ({
  batchActions: bindActionCreators(batchActions, dispatch),
  tableActions: bindActionCreators(tableActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(BatchTable);
