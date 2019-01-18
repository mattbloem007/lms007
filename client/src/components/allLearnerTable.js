import React, { Component } from 'react'
import { Icon, Table, Menu, Container, Button, Segment, Checkbox, Confirm, Form, Header, Modal } from 'semantic-ui-react'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as tableActions from '../actions/tableActions'
import * as flowActions from '../actions/flowActions'
import * as learnerActions from '../actions/learnerActions';

import _ from 'lodash'
let info = {
  national_id: null,
  firstname: null,
  surname: null,
  equity: null,
  gender: null,
  year_attended: null
}

class AllLearnerTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
                    headings: ["National ID", "First Name", "Surname", "Equity", "Gender", "Year"],
                    filterBy: {},
                    learners: this.props.learners,
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

  back = () => {
    this.props.tableActions.changeActiveTable("batch")
    this.props.tableActions.clearBatchLearners()
  }

  downloadExcel = () => {
    this.props.tableActions.downloadExcel(this.props.learners)
  }

  componentWillReceiveProps(props) {
    this.setState({learners: props.learners})
  }

  // downloadPDF = () => {
  //   this.props.tableActions.downloadPDF(this.props.batch, this.props.batchs, this.props.batchLearners)
  // }

  componentDidMount() {
      this.props.learnerActions.fetchAllLearners();
  }

  delete = () => {
    console.log(this.state.checkedRows)
    this.props.learnerActions.Delete(this.state.checkedRows)
    .then(() => {
      this.close()
      this.forceUpdate()
      this.props.learnerActions.fetchAllLearners();
    })
  }

  edit = (learners) => {
    console.log(learners)
    this.props.learnerActions.fetchLearnerInfo(learners.national_id)
    .then(() => {
      this.props.flowActions.changeActiveStep("rLearner");
    })
  }

  checkRow = (ID, value) => {
    let checked = [];
    if (value) {
      checked.push(ID);
      this.setState({checkedRows: [...this.state.checkedRows, ...checked]})
    }
    else {
      this.setState({checkedRows:  _.without(this.state.checkedRows, ID) })
    }
  }

  filterTable = () => {
    let info = [];
    let filterArr = _.pickBy(this.state.info, _.identity);
    for (var x in filterArr) {
      filterArr[x] = filterArr[x].toLowerCase();
    }
    this.props.learners.map(learner => {
      info.push(_.mapValues(learner, _.method('toLowerCase')))
    })
    this.setState({filterBy: filterArr, openFilter: false, learners: info})
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
                <Form.Input label="National ID" placeholder="Enter National ID" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, national_id: data.value}}))}} />
                <Form.Input label="First Name" placeholder="Enter First Name" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, firstname: data.value}}))}} />
                <Form.Input label="Surname" placeholder="Enter Surname" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, surname: data.value}}))}} />
                <Form.Input label="Equity" placeholder="Enter Equity" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, equity: data.value}}))}} />
                <Form.Input label="Gender" placeholder="Enter Gender" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, gender: data.value}}))}} />
                <Form.Input label="Year Attended" placeholder="Enter Year Attended" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, year_attended: data.value}}))}} />
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
            _.filter(this.state.learners, this.state.filterBy).map((x, i) => {
                return(
                  <Table.Row key={x.national_id}>
                    <Table.Cell collapsing>
                      <Checkbox onChange={(e, {checked}) => {this.checkRow(x.national_id, checked)}}/>
                    </Table.Cell>
                    <Table.Cell>
                      <Button onClick={() => this.edit(this.props.learners[i])} icon labelPosition='left' primary size='small'>
                        <Icon name='edit' /> Edit
                      </Button>
                    </Table.Cell>
                    {
                      Object.keys(this.props.learners[i]).map((y) =><Table.Cell key={y}>{(this.props.learners[i])[y]}</Table.Cell>)
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
  learners: state.learner.learners

})
const mapDispatchToProps = dispatch => ({
  learnerActions: bindActionCreators(learnerActions, dispatch),
  flowActions: bindActionCreators(flowActions, dispatch),
  tableActions: bindActionCreators(tableActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AllLearnerTable);
