import React, { Component } from 'react'
import { Icon, Table, Menu, Container, Button, Segment, Checkbox } from 'semantic-ui-react'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as batchActions from '../actions/batchActions'
import * as tableActions from '../actions/tableActions'
import _ from 'lodash'

class BatchTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
                    headings: ["Batch Number", "Date", "Client Name", "Project", "Programme", "Credit Bearing", "Facilitator", "Assessor", "Moderator", "Date Assessed", "Date Moderated", "Programme Type", ""],
                    checkedRows: []
                 }
  }

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
    this.props.batchActions.Delete(this.state.checkedRows);
  }

  render() {
    return(
    <Segment style={{overflow: 'auto', maxHeight: 500 }}>
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
            this.props.batchs.map((x, i) => {
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
        <Button onClick={this.delete} floated='right' icon labelPosition='left' primary size='small'>
          <Icon name='delete' /> Delete
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
  batchs: state.batch.batchs

})
const mapDispatchToProps = dispatch => ({
  batchActions: bindActionCreators(batchActions, dispatch),
  tableActions: bindActionCreators(tableActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(BatchTable);
