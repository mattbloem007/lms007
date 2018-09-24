const express = require('express');
var mysql      = require('mysql');
var bodyParser = require('body-parser')
const path = require('path')
var json2xls = require('json2xls');
var fs = require('fs');
const XLSX = require('xlsx');


const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(json2xls.middleware);

app.post('/save',function(req, res) {
  // console.log(req.body)
  //res.xls('data.xlsx', req.body);

  console.log("IN")
  var xls = json2xls(req.body);
  fs.writeFileSync('data1.xlsx', xls, 'binary');


  // var xFile = fs.readFile(__dirname + '/data1.xlsx', function (err, data) {
  //   res.contentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  // })
  // res.send(new Buffer(xFile))
//  let file = fs.readFileSync(__dirname + '/data1.xlsx')
//  var buffer = new Buffer(file)
  //var buffer = new Buffer(file)
  res.set("Content-Disposition", "attachment;filename=data1.xls");
  res.set("Content-Type", "application/octet-stream");
  res.sendFile(__dirname + '/data1.xlsx');
  //var file = __dirname;
  //res.download(__dirname, 'data1.xlsx');
});

app.get('/download', function(req, res) {
  let file = __dirname + '/data1.xlsx';
  res.download(file, 'data1.xlsx')
})

// app.get('*', (req, res)=>{
//   res.sendFile(path.join(__dirname+'/client/build/index.html'));
// })

// var connection = mysql.createConnection({
//   connectionLimit : 1000,
//   connectTimeout  : 60 * 60 * 1000,
//   aquireTimeout   : 60 * 60 * 1000,
//   timeout         : 60 * 60 * 1000,
//   host     : '41.185.8.125',
//   user     : 'xiconco1_mikeb',
//   password : 'X4k474ssPz',
//   database : 'xiconco1_lms',
//   port     : port
// });

// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'lms',
//   port     : port
// });
var club = mysql.createPool({
  connectionLimit : 1000,
  connectTimeout  : 60 * 60 * 1000,
  aquireTimeout   : 60 * 60 * 1000,
  timeout         : 60 * 60 * 1000,
  host     : '41.185.8.125',
  user     : 'xiconco1_mikeb',
  password : 'X4k474ssPz',
  database : 'xiconco1_iosgroup_clubs'
})
var pool  = mysql.createPool({
  connectionLimit : 1000,
  connectTimeout  : 60 * 60 * 1000,
  aquireTimeout   : 60 * 60 * 1000,
  timeout         : 60 * 60 * 1000,
  host     : '41.185.8.125',
  user     : 'xiconco1_mikeb',
  password : 'X4k474ssPz',
  database : 'xiconco1_lms'
  // host     : 'localhost',
  // user     : 'root',
  // password : '',
  // database : 'lms'
   });



// connection.connect(function(err){
// if(!err) {
//     console.log("Database is connected ... nn");
// } else {
//     console.log("Error connecting database ... nn", err);
// }
// });

// app.get("/",function(req,res){
// connection.query('SELECT * from lms_info LIMIT 2', function(err, rows, fields) {
// connection.end();
//   if (!err) {
//     console.log('The solution is: ', rows);
//     res.send({express: rows});
//   } else{
//     console.log('Error while performing Query.');
//     }
//   });
// });

app.get('/api/clubs', (req, res) => {
  club.getConnection(function(err, connection) {
    if (err) throw err;
    console.log("connection made");

    connection.query('SELECT `club_name` FROM `ppSD_member_data`', function(err, rows, fields) {

      if (err) throw err;

      console.log('The solution is: ', rows);
      res.send({ express: rows });
      connection.release();
    })
  })
})

app.get('/api/lms_batch', (req, res) => {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    console.log("connection made");

    connection.query('SELECT * FROM `lms_batch`', function(err, rows, fields) {

      if (err) throw err;

      console.log('The solution is: ', rows);
      res.send({ express: rows });
      connection.release();
    })
  })
})


app.get('/api/client', (req, res) => {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    console.log("connection made");


    connection.query('SELECT `name` FROM `lms_client`', function(err, rows, fields) {

      if (err) throw err;

      console.log('The solution is: ', rows);
      res.send({ express: rows });
      connection.release();
    })
  })
})


app.get('/api/facilitator', (req, res) => {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    console.log("connection made");

    connection.query('SELECT `name` FROM `lms_facilitator`', function(err, rows, fields) {

      if (err) throw err;

      console.log('The solution is: ', rows);
      res.send({ express: rows });
      connection.release();
    })
  })
})

app.get('/api/assessor', (req, res) => {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    console.log("connection made");

    connection.query('SELECT `name` FROM `lms_assessor`', function(err, rows, fields) {

      if (err) throw err;

      console.log('The solution is: ', rows);
      res.send({ express: rows });
      connection.release();
    })
  })
})

app.get('/api/moderator', (req, res) => {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    console.log("connection made");

    connection.query('SELECT `name` FROM `lms_moderator`', function(err, rows, fields) {

      if (err) throw err;

      console.log('The solution is: ', rows);
      res.send({ express: rows });
      connection.release();
    })
  })
})

app.get('/api/learner', (req, res) => {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    console.log("connection made");

    connection.query('SELECT `national_id`, `firstname`, `surname` FROM `lms_learner`', function(err, rows, fields) {

      if (err) throw err;

      console.log('The solution is: ', rows);
      res.send({ express: rows });
      connection.release();
    })
  })
})

app.post('/api/learnerInfo', (req, res) => {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    console.log("connection made");
    console.log(req.body)

    connection.query('SELECT * FROM `lms_learner` WHERE national_id = ?', [req.body.ID], function(err, rows, fields) {

      if (err) throw err;

      console.log('The solution is: ', rows);
      res.send({ express: rows });
      connection.release();
    })
  })
})

app.post('/api/learner_batch', (req, res) => {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    console.log("connection made");

    connection.query('SELECT `learner_ID` FROM `lms_learner_batch` WHERE batch_no = ?', [req.body.batch_no], function(err, rows, fields) {

      if (err) throw err;

      console.log('The solution is: ', rows);
      res.send({express: rows})
      connection.release();
    })
  })

})
app.post('/api/learner_batch2', (req, res) => {
  let learners = [];
  let learnersInfo = [];
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    console.log("connection made");

    let jsondata = req.body;
    console.log(jsondata)
    connection.query('SELECT * FROM `lms_learner` WHERE national_id = ?', [jsondata.ID], function(err, rows, fields) {

      if (err) throw err;

      console.log('The solution is: ', rows);
      res.send({express: rows})
      connection.release();
    })
  })

})

app.get('/api/lms_client', (req, res) => {
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected
    console.log("Connection made");
    // Use the connection
    connection.query('SELECT `name`, `telephone`, `address`, `contact`, `municipality` FROM `lms_client`', function (err, rows, fields) {
      // And done with the connection.


      // Handle error after the release.
      if (err) throw err;

      console.log('The solution is: ', rows);
      res.send({ express: rows });
      connection.release();

    });
  });
});

app.get('/api/lms_logistics', (req, res) => {
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected
    // Use the connection
    connection.query('SELECT `venue`,`batchno`,`facilitator`,`assessor`,`moderator` FROM `lms_logistics`', function (err, rows, fields) {

      // And done with the connection.
      connection.release();

      // Handle error after the release.
      if (err) throw err;

      console.log('The solution is: ', rows);
      res.send({ express: rows });

    });
  });
});

app.get('/api/lms_dates', (req, res) => {
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected
    // Use the connection
    connection.query('SELECT `facilitator_date`, `assessment_date`, `moderation_date` FROM `lms_dates`', function (err, rows, fields) {
      // And done with the connection.
      connection.release();

      // Handle error after the release.
      if (err) throw err;

      console.log('The solution is: ', rows);
      res.send({ express: rows });
    });
  });
});


app.post('/data/lms_learner_batch', function(req, res) {
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected
    // Use the connection
    var jsondata = req.body;
    console.log(jsondata);
    var values = [];
    for(var i in jsondata){
        for(var x in jsondata[i]) {
          values.push(jsondata[i][x])
        }
        console.log(values)
        //IF NOT EXISTS (SELECT * FROM lms_learner_batch WHERE learner_ID = ? AND batch_no = ?) THEN
        connection.query("INSERT INTO `lms_learner_batch` (`learner_ID`, `batch_no`) VALUES (?)", [values], function(err, result){
          if(err) console.log(err);

          console.log("1 record inserted");
            });
        values.splice(0,2);

      }
    console.log(values)


      res.send({ express: req.body });
  });
});

app.post('/data/lms_batch', function(req, res) {
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected
    // Use the connection
    var jsondata = req.body;
    console.log(jsondata);
    var values = [];
    for(var i in jsondata){
    //  if (i != "day" && i != "month" && i != "year" && i != "modules" && i != "learnerIDs" && i != "modules" && i != "batchs"){
        // if (i == "date" || i == "assessment_date" || i == "moderator_date") {
        //   let date = new Date(jsondata[i])
        //   values.push(date)
        // }
        // else {
          values.push(jsondata[i]);
       //}

      //}
    }
    console.log(values)
      connection.query("INSERT INTO `lms_batch` (`date`,`client_name`,`project`,`programme`,`credit`,`facilitator`, `assessor`, `moderator`, `assessment_date`, `moderator_date`, `programmeType`) VALUES (?)", [values], function(err, result){
        if(err) console.log(err);

        console.log("1 record inserted");
          });

      res.send({ express: req.body });
  });
});

app.post('/data/lms_client', function(req, res) {
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected
    // Use the connection
    var jsondata = req.body;
    console.log(jsondata);
    var values = [];
    for(var i in jsondata){
      //if (i != "address2" && i != "postCode"){
        values.push(jsondata[i]);
      //}
    }
    console.log(values)
      connection.query("INSERT INTO `lms_client` (`name`, `telephone`, `address`, `contact`, `municipality`) VALUES (?)", [values], function(err, result){
        if(err) console.log(err);

        console.log("1 record inserted");
          });

      res.send({ express: req.body });
  });
});

app.post('/data/lms_facilitator', function(req, res) {
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected
    // Use the connection
    var jsondata = req.body;
    console.log(jsondata);
    var values = [];
    for(var i in jsondata){
        values.push(jsondata[i]);
    }
    console.log(values)
      connection.query("INSERT INTO `lms_facilitator` (`name`,`ID`,`Cell_no`) VALUES (?)", [values], function(err, result){
        if(err) console.log(err);

        console.log("1 record inserted");
          });

      res.send({ express: req.body });
  });
});

app.post('/data/lms_assessor', function(req, res) {
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected
    // Use the connection
    var jsondata = req.body;
    console.log(jsondata);
    var values = [];
    for(var i in jsondata){
       //  if (i == "expiry_date") {
       //    let date = new Date(jsondata[i])
       //    values.push(date)
       //  }
       // else {
          values.push(jsondata[i]);
      //  }
    }
    console.log(values)
      connection.query("INSERT INTO `lms_assessor` (`name`,`ID`,`Reg_no`,`SETA`,`Expiry Date`) VALUES (?)", [values], function(err, result){
        if(err) console.log(err);

        console.log("1 record inserted");
          });

      res.send({ express: req.body });
  });
});

app.post('/data/lms_moderator', function(req, res) {
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected
    // Use the connection
    var jsondata = req.body;
    console.log(jsondata);
    var values = [];
    for(var i in jsondata){
        // if (i == "expiry_date") {
        //   let date = new Date(jsondata[i])
        //   values.push(date)
        // }
        // else {
          values.push(jsondata[i]);
      //  }
    }
    console.log(values)
      connection.query("INSERT INTO `lms_moderator` (`name`,`ID`,`Reg_no`,`SETA`,`Expiry Date`) VALUES (?)", [values], function(err, result){
        if(err) console.log(err);

        console.log("1 record inserted");
          });

      res.send({ express: req.body });
  });
});

app.post('/data/lms_learner', function(req, res) {
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected
    // Use the connection
    var jsondata = req.body;
    console.log(jsondata);
    var values = [];
    for(var i in jsondata){
          values.push(jsondata[i]);
    }
    console.log(values)
      connection.query("INSERT INTO `lms_learner`(`id_type`, `national_id`, `last_school`, `statssa`, `education`, `ass_status`, `equity`, `nationality`, `gender`, `language`, `employed`, `disability`, `surname`, `firstname`, `secondname`, `title`, `dob`, `homeaddr`, `homeno`, `postaddr`, `cellno`, `employer`, `faxno`, `workno`, `email`, `prev_surname`, `assessor`, `moderator`, `facilitator`, `club`) VALUES (?)", [values], function(err, result){
        if(err) console.log(err);

        console.log("1 record inserted");
          });

      res.send({ express: req.body });
  });
});

app.post('/data/lms_learnerEdit', function(req, res) {
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected
    // Use the connection
    var jsondata = req.body;
    console.log(jsondata);
    var values = [];
    for(var i in jsondata){
          values.push(jsondata[i]);
    }
    console.log(values)
      connection.query("REPLACE INTO `lms_learner`(`id_type`, `national_id`, `last_school`, `statssa`, `education`, `ass_status`, `equity`, `nationality`, `gender`, `language`, `employed`, `disability`, `surname`, `firstname`, `secondname`, `title`, `dob`, `homeaddr`, `homeno`, `postaddr`, `cellno`, `employer`, `faxno`, `workno`, `email`, `prev_surname`, `assessor`, `moderator`, `facilitator`, `club`) VALUES (?)", [values], function(err, result){
        if(err) console.log(err);

        console.log("1 record inserted");
          });

      res.send({ express: req.body });
  });
});

app.post('/data/lms_logistics', function(req, res) {
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected
    // Use the connection
    var jsondata = req.body;
    console.log(jsondata);
    var values = [];
    for(var i in jsondata){
      if (i != "table"){
        values.push(jsondata[i]);
      }
    }

      connection.query("INSERT INTO `lms_logistics` (`venue`, `batchno`, `facilitator`, `assessor`, `moderator`) VALUES (?)", [values], function(err, result){
        if(err) console.log(err);

        console.log("1 record inserted");
          });

      res.send({ express: req.body });
  });
});

app.post('/data/lms_dates', function(req, res) {
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected
    // Use the connection
    var jsondata = req.body;
    console.log(jsondata);
    var values = [];
    for(var i in jsondata){
      if (i != "table"){
        values.push(jsondata[i]);
      }
    }

      connection.query("INSERT INTO `lms_dates` (`facilitator_date`, `assessment_date`, `moderation_date`) VALUES (?)", [values], function(err, result){
        if(err) console.log(err);

        console.log("1 record inserted");
          });

      res.send({ express: req.body });
  });
});

// app.post('/data', function(req, res) {
//   var jsondata = req.body;
//   var values = [];
//   var index = [];
//      var table;
//    for(var i in jsondata){
//       if(i == "table") {
//         table = jsondata[i];
//       }
//       else {
//         index.push(i);
//         values.push(jsondata[i]);
//       }
//
//   }
//     // var sql = mysql.format("INSERT INTO `" + table + "` (?) VALUES (?)", [index, values]);
//     // console.log(sql);
//     connection.query("INSERT INTO `" + table + "` (??) VALUES (?)", [index, values], function(err, result){
//       if(err) console.log(err);
//
//       console.log("1 record inserted");
//         });
//
//     res.send({ express: req.body });
// });

app.listen(port, () => console.log(`Listening on port ${port}`));
