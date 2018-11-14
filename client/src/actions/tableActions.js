import { BATCH_NO, ACTIVE_TABLE, ADD_LEARNERS, RECEIVE_BATCH_LEARNERS, RECEIVE_BATCH_LEARNERIDS, CLEAR_BATCH_LEARNERS } from './actionTypes'
import fileDownload from 'react-file-download'
import exportToExcel from '../exportToExcel';
import pdfMake from 'pdfmake/build/pdfmake';
import vfsFonts from 'pdfmake/build/vfs_fonts';


export const changeActiveTable = activeTable => ({ type: ACTIVE_TABLE, payload: activeTable });
export const getBatchNumber = (batchNo) => ({ type: BATCH_NO, payload: batchNo })
export const addLearners = (activeTable, batchNo) => ({ type: ADD_LEARNERS, payload: activeTable, batch: batchNo })
export const clearBatchLearners = () => ({ type: CLEAR_BATCH_LEARNERS })

export function receiveInfo(json) {
  return {
    type: RECEIVE_BATCH_LEARNERIDS,
    payload: json.express
  }
}
export function receiveLearners(json) {
  return {
    type: RECEIVE_BATCH_LEARNERS,
    payload: json.express
  }
}

export const downloadExcel = (batchs) => {
  return dispatch => {
    exportToExcel(batchs)
  }
}

const _format = (data) => {
	return data.map(item => {
		return ([
			{text: item.firstname + " " + item.surname, style: 'backColor'},
			{text: item.national_id, style: 'backColor'},
			{text: item.cellno, style: 'backColor'},
			{text: item.gender, style: 'backColor'},
			{text: item.equity, style: 'backColor'},
      {text: item.year_attented, style: 'backColor'},
      {text: item.last_school, style: 'backColor'},
      {text: item.physicalAddress, style: 'backColor'}
		]);
	});
}

export const downloadPDF = (batch, batchs, learners) => {
  return dispatch => {


    const {vfs} = vfsFonts.pdfMake;
    pdfMake.vfs = vfs;
    let index = parseInt(batch) - 1
    let info = batchs[index]

	  const formattedData = _format(learners);

    const documentDefinition = {
      pageSize: 'A4',
      pageOrientation: 'landscape',
      content: [
        {
        columns: [
          {
            // auto-sized columns have their widths based on their content
            width: '*',
            text: 'Batch Number:',
            margin: [ 5, 2, 10, 20 ]
          },
          {
              text: batch
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      {
        columns: [
          {
            // auto-sized columns have their widths based on their content
            width: '*',
            text: 'Programme Name:',
            margin: [ 5, 2, 10, 20 ]
          },
          {
              text: info.programme
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      {
        columns: [
          {
            // auto-sized columns have their widths based on their content
            width: '*',
            text: 'Name(s) of Facilitator(s):',
            margin: [ 5, 2, 10, 20 ]
          },
          {
              text: info.facilitator
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      {
        columns: [
          {
            // auto-sized columns have their widths based on their content
            width: '*',
            text: 'Name(s) of Assessor(s):',
            margin: [ 5, 2, 10, 20 ]
          },
          {
              text: info.assessor
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      {
        columns: [
          {
            // auto-sized columns have their widths based on their content
            width: '*',
            text: 'Assessment Date:',
            margin: [ 5, 2, 10, 20 ]
          },
          {
              text: info.assessment_date
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      {
        columns: [
          {
            // auto-sized columns have their widths based on their content
            width: '*',
            text: 'Name(s) of Moderator(s):',
            margin: [ 5, 2, 10, 20 ]
          },
          {
              text: info.moderator
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      {
        columns: [
          {
            // auto-sized columns have their widths based on their content
            width: '*',
            text: 'Moderation Date:',
            margin: [ 5, 2, 10, 20 ]
          },
          {
              text: info.moderator_date
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      {
        columns: [
          {
            // auto-sized columns have their widths based on their content
            width: '*',
            text: 'Client:',
            margin: [ 5, 2, 10, 20 ]
          },
          {
              text: info.client_name
          }
        ],
        // optional space between columns
        columnGap: 10
      },
        '\n',
        {
          table: {
            headerRows: 1,
            dontBreakRows: true,
            body: [
              [{text: 'Full Name', style: 'tableHeader'}, {text: 'ID Number', style: 'tableHeader'}, {text: 'Cell Phone', style: 'tableHeader'}, {text: 'Gender', style: 'tableHeader'}, {text: 'Ethnicity', style: 'tableHeader'},
               {text: 'Year', style: 'tableHeader'}, {text: 'School', style: 'tableHeader'}, {text: 'Address', style: 'tableHeader'}
             ],
              ...formattedData,
            ]
          }
        }
      ],
      styles: {
        backColor: {
          background: 'green'
        }
      }
    };

    pdfMake.createPdf(documentDefinition).open();
  }
}


  export const fetchBatchLearnerIDs = (batch_no) => {
    return (dispatch, getState) => {
      dispatch(getBatchNumber(batch_no))
      return fetch('/api/learner_batch', {
        method: 'POST',
        body: JSON.stringify({batch_no: batch_no}),
        headers: {"Content-Type": "application/json"}
      })
      .then(res =>  res.json())
      .then(json => {
        console.log(json)
        dispatch(receiveInfo(json))
        const state = getState();
        console.log(state.table)
        for(var i in state.table.batchLearnerIDs) {
          dispatch(fetchBatchLearners(state.table.batchLearnerIDs[i]))
        }

      });
    }
  }

  export const fetchBatchLearners = (info) => {
    return dispatch => {
        return fetch('/api/learner_batch2', {
          method: 'POST',
          body: JSON.stringify({ ID: info }),
          headers: {"Content-Type": "application/json"}
        })
        .then(res => res.json())
        .then(json => {
          console.log(json)
          dispatch(receiveLearners(json))
        })
    }
  }
