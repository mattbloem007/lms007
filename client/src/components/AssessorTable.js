import React, { Component } from 'react'
import { Icon, Table, Menu, Container, Button, Segment, Checkbox, Confirm, Form, Header, Modal } from 'semantic-ui-react'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as tableActions from '../actions/tableActions'
import * as flowActions from '../actions/flowActions'
import * as assessorActions from '../actions/assessorActions';

import _ from 'lodash'

let info = {
  name: null,
  ID: null,
  Reg_no: null,
  SETA: null
}

class AssessorTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
                    headings: ["Name", "ID", "Reg_no", "SETA", "Expiry Date"],
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

  back = () => {
    this.props.tableActions.changeActiveTable("batch")
    this.props.tableActions.clearBatchLearners()
  }

  downloadExcel = () => {
    this.props.tableActions.downloadExcel(this.props.assessors)
  }

  // downloadPDF = () => {
  //   this.props.tableActions.downloadPDF(this.props.batch, this.props.batchs, this.props.batchLearners)
  // }

  componentDidMount() {
      this.props.assessorActions.fetchAssessors();
  }

  delete = () => {
    console.log(this.state.checkedRows)
    this.props.assessorActions.Delete(this.state.checkedRows)
    .then (() => {
      this.close();
      this.forceUpdate();
      this.props.assessorActions.fetchAssessors();
    })

  }

  edit = (assessors) => {
    console.log(assessors)
    this.props.assessorActions.editAssessor(assessors)
    .then(() => {
      this.props.flowActions.changeActiveStep("rass")
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
                <Form.Input label="Name" placeholder="Enter Name" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, name: data.value}}))}} />
                <Form.Input label="ID" placeholder="Enter ID" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, ID: data.value}}))}} />
                <Form.Input label="Registration Number" placeholder="Enter Registration Number" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, Reg_no: data.value}}))}} />
                <Form.Input label="SETA" placeholder="Enter SETA" onChange={(e,data)=>{this.setState(prevState => ({info: {...prevState.info, SETA: data.value}}))}} />
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
            _.filter(this.props.assessors, this.state.filterBy).map((x, i) => {
            return(
              <Table.Row key={x.name}>
                <Table.Cell collapsing>
                  <Checkbox onChange={(e, {checked}) => {this.checkRow(x.ID, checked)}}/>
                </Table.Cell>
                <Table.Cell>
                  <Button onClick={() => this.edit(this.props.assessors[i])} icon labelPosition='left' primary size='small'>
                    <Icon name='edit' /> Edit
                  </Button>
                </Table.Cell>
                {
                  Object.keys(this.props.assessors[i]).map((y) =><Table.Cell key={y}>{x[y]}</Table.Cell>)
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
  assessors: state.assessor.assessors

})
const mapDispatchToProps = dispatch => ({
  assessorActions: bindActionCreators(assessorActions, dispatch),
  flowActions: bindActionCreators(flowActions, dispatch),
  tableActions: bindActionCreators(tableActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AssessorTable);
