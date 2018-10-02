import pdfMake from 'pdfmake/build/pdfmake';
import React, { Component } from 'react';
import vfsFonts from 'pdfmake/build/vfs_fonts';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as learnerActions from './actions/learnerActions';
import * as flowActions from './actions/flowActions';
import * as tableActions from './actions/tableActions';


class Reports extends Component {

  constructor() {
    super();

    this.reports();
  }

   reports = () => {
    const {vfs} = vfsFonts.pdfMake;
    pdfMake.vfs = vfs;

    pdfMake.createPdf({content: 'Hi. I am a PDF.'}).open();
  }

}

const mapStateToProps = state => ({
  batch: state.table.batch,
  batchs: state.batch.batchs,
  batchLearners: state.table.batchLearners
})
const mapDispatchToProps = dispatch => ({
  learnerActions: bindActionCreators(learnerActions, dispatch),
  tableActions: bindActionCreators(tableActions, dispatch),
  flowActions: bindActionCreators(flowActions, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Reports);
