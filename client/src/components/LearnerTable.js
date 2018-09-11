import React, { Component } from 'react'
import { Icon, Table, Menu, Container, Button } from 'semantic-ui-react'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as tableActions from '../actions/tableActions'
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
                  Object.keys(_.pick(this.props.batchLearners[i], this.state.allowed)).map((y) =><Table.Cell key={y}>{x[y]}</Table.Cell>)
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
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
    </Table>
    )
  }

}
const mapStateToProps = state => ({
  batchLearners: state.table.batchLearners

})
const mapDispatchToProps = dispatch => ({
  tableActions: bindActionCreators(tableActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(LearnerTable);
