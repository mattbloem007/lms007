import React, { Component } from 'react'
import { Icon, Table, Menu, Container, Button } from 'semantic-ui-react'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as tableActions from '../actions/tableActions'
import * as learnerActions from '../actions/learnerActions';

import _ from 'lodash'

class LearnerTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
                    headings: ["National ID", "First Name", "Surname", "Equity", "Gender"],
                    allowed: ['national_id', 'firstname', 'surname', 'equity', 'gender']
                 }
  }

  back = () => {
    this.props.tableActions.changeActiveTable("batch")
    this.props.tableActions.clearBatchLearners()
  }

  downloadPDF = () => {
    this.props.tableActions.downloadPDF(this.props.batch, this.props.batchs, this.props.batchLearners)
  }

  showLearnerInfo = (data) => {
    console.log(data);
      this.props.learnerActions.fetchLearnerInfo(data.national_id);
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
            this.props.batchLearners.map((x, i) => {
            return(
              <Table.Row key={x.client_id}>
                {
                  Object.keys(_.pick(this.props.batchLearners[i], this.state.allowed)).map((y) =><Table.Cell onClick={() => this.showLearnerInfo(x)} key={y}>{x[y]}</Table.Cell>)
                }
              </Table.Row>
              )
            })
          }
        </Table.Body>
        <Table.Footer fullWidth>
      <Table.Row>
      <Table.HeaderCell colSpan='5'>
          <Button onClick={this.back} size='small'>Back</Button>
            <Button onClick={this.downloadPDF} floated='right' icon labelPosition='left' primary size='small'>
              <Icon name='download' /> Download Report
            </Button>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
    </Table>
    )
  }

}
const mapStateToProps = state => ({
  batch: state.table.batch,
  batchs: state.batch.batchs,
  batchLearners: state.table.batchLearners

})
const mapDispatchToProps = dispatch => ({
  learnerActions: bindActionCreators(learnerActions, dispatch),
  tableActions: bindActionCreators(tableActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(LearnerTable);
