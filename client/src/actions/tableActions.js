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
    let styleC = 'backColor';
    switch (item.ass_status ) {
      case "Competent":
        styleC = 'backColor'
      break;
      case "Not yet competent":
        styleC = 'notCompetent'
      break;
      case "Not Submitted":
        styleC = 'notSubmitted'
      case "Competent After Resubmission":
        styleC = 'resub'
      break;
    }
    console.log(item)
		return ([
			{text: item.firstname + " " + item.surname, style: styleC},
			{text: item.national_id, style: styleC},
			{text: item.cellno, style: styleC},
			{text: item.gender, style: styleC},
			{text: item.equity, style: styleC},
      {text: item.year_attended, style: styleC},
      {text: item.last_school, style: styleC},
      {text: item.homeaddr, style: styleC}
		]);
	});
}

export const downloadPDF = (batch, batchs, learners) => {
  return dispatch => {


    const {vfs} = vfsFonts.pdfMake;
    pdfMake.vfs = vfs;
    let index = parseInt(batch) - 1
    console.log(index)
    let info = batchs[0];
    for (var x = 0; x < batchs.length; x++) {
      console.log(batchs[x].batch_no + " " + parseInt(batch))
      if (batchs[x].batch_no == parseInt(batch)) {
        info = batchs[x]
      }
    }
    console.log(info)
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
            margin: [ 5, 2, 5, 5 ]
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
            margin: [ 5, 2, 5, 5 ]
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
            margin: [ 5, 2, 5, 5 ]
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
            margin: [ 5, 2, 5, 5 ]
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
            margin: [ 5, 2, 5, 5 ]
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
            margin: [ 5, 2, 5, 5 ]
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
            margin: [ 5, 2, 5, 5 ]
          },
          {
              text: info.moderator_date
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      {
        canvas: [
		        {
		            type: 'rect',
					      x: 0,
      					y: 0,
      					w: 750,
      					h: 25,
      					r: 0,
      					color: 'grey',
		        }
		    ]
      },
      {
        columns: [
          {
            // auto-sized columns have their widths based on their content
            width: '*',
            text: 'Training Date:',
            margin: [ 5, 2, 5, 5 ]
          },
          {
              text: info.date + "-" + info.end_date
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
            margin: [ 5, 2, 5, 5 ]
          },
          {
              text: info.client_name
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
            text: 'Training Venue:',
            margin: [ 5, 2, 5, 5 ]
          },
          {
              text: info.venue
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      {
        text: [
				      {text: 'AFTER ASSESSMENT & MODERATION ONLY: (INDICATE ON LEARNER NAME LIST BELOW)', color: 'red'},
			   ]
      },
      {
        canvas: [
		        {
		            type: 'rect',
					      x: 0,
      					y: 0,
      					w: 750,
      					h: 25,
      					r: 0,
      					color: 'grey',
		        }
		    ]
      },
      {
        columns: [
          {
            // auto-sized columns have their widths based on their content
            width: '*',
            color: 'green',
            text: 'COMPETENT LEARNERS:',
            margin: [ 5, 2, 5, 5 ]
          },
          {
              text: '0'
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
            text: 'NOT COMPETENT',
            color: 'red',
            margin: [ 5, 2, 5, 5 ]
          },
          {
              text: '0'
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
            color: 'orange',
            text: 'COMPETENT AFTER RESUBMISSION',
            margin: [ 5, 2, 5, 5 ]
          },
          {
              text: '0'
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      {
        canvas: [
		        {
		            type: 'rect',
					      x: 0,
      					y: 0,
      					w: 750,
      					h: 25,
      					r: 0,
      					color: 'grey',
		        }
		    ]
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
          fillColor: 'green'
        },
        notCompetent: {
          fillColor: 'red'
        },
        notSubmitted : {
          fillColor: 'white'
        },
        resub: {
          fillColor:'orange'
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
