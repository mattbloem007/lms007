import React, { Component } from 'react'
import { Icon, Table, Menu, Container, Button, Segment, Checkbox, Confirm } from 'semantic-ui-react'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as tableActions from '../actions/tableActions'
import * as flowActions from '../actions/flowActions'
import * as facilitatorActions from '../actions/facilitatorActions';

import _ from 'lodash'

class FacilitatorTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
                    headings: ["Name", "ID", "Cell Number"],
                    checkedRows: [],
                    open: false
                 }
  }

  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  back = () => {
    this.props.tableActions.changeActiveTable("batch")
    this.props.tableActions.clearBatchLearners()
  }

  downloadExcel = () => {
    this.props.tableActions.downloadExcel(this.props.facilitators)
  }

  // downloadPDF = () => {
  //   this.props.tableActions.downloadPDF(this.props.batch, this.props.batchs, this.props.batchLearners)
  // }

  componentDidMount() {
      this.props.facilitatorActions.fetchFacilitators();
  }

  delete = () => {
    console.log(this.state.checkedRows)
    this.props.facilitatorActions.Delete(this.state.checkedRows)
    this.close()
  }

  edit = (facilitator) => {
    console.log(facilitator)
    this.props.facilitatorActions.editFacilitator(facilitator)
    .then(() => {
      this.props.flowActions.changeActiveStep("rfac")
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

  render() {
    return(
      <Segment style={{overflow: 'auto', maxHeight: 500 }}>

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
            this.props.facilitators.map((x, i) => {
            return(
              <Table.Row key={x.ID}>
                <Table.Cell collapsing>
                  <Checkbox onChange={(e, {checked}) => {this.checkRow(x.ID, checked)}}/>
                </Table.Cell>
                <Table.Cell>
                  <Button onClick={() => this.edit(this.props.facilitators[i])} icon labelPosition='left' primary size='small'>
                    <Icon name='edit' /> Edit
                  </Button>
                </Table.Cell>
                {
                  Object.keys(this.props.facilitators[i]).map((y) =><Table.Cell key={y}>{x[y]}</Table.Cell>)
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
  facilitators: state.facilitator.facilitators

})
const mapDispatchToProps = dispatch => ({
  facilitatorActions: bindActionCreators(facilitatorActions, dispatch),
  flowActions: bindActionCreators(flowActions, dispatch),
  tableActions: bindActionCreators(tableActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(FacilitatorTable);
