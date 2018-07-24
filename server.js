const express = require('express');
var mysql      = require('mysql');
var bodyParser = require('body-parser')
const path = require('path')


const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
})

// var connection = mysql.createConnection({
//   host     : '41.185.8.125',
//   user     : 'xiconco1_mikeb',
//   password : 'X4k474ssPz',
//   database : 'xiconco1_lms'
// });

// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'lms',
//   port     : port
// });

var pool  = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'lms',
  port     : port
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

app.get('/api/lms_client', (req, res) => {
  pool.getConnection(function(err, connection) {
    // Use the connection
    connection.query('SELECT `project_name`, `name`, `telephone`, `address`, `contact`, `municipality` FROM `lms_client`', function (err, rows, fields) {
      // And done with the connection.
      connection.release();

      // Handle error after the release.
      if (error) throw error;

      console.log('The solution is: ', rows);
      res.send({ express: rows });
    });
  });
});

app.get('/api/lms_logistics', (req, res) => {
  pool.getConnection(function(err, connection) {
    // Use the connection
    connection.query('SELECT `venue`,`batchno`,`facilitator`,`assessor`,`moderator` FROM `lms_logistics`', function (err, rows, fields) {
      // And done with the connection.
      connection.release();

      // Handle error after the release.
      if (error) throw error;

      console.log('The solution is: ', rows);
      res.send({ express: rows });
    });
  });
});

// app.get('/api/lms_dates', (req, res) => {
//   connection.query('SELECT `facilitator_date`, `assessment_date`, `moderation_date` FROM `lms_dates`', function (err, rows, fields) {
//   if (err) {
//     throw err;
//   }
//
//   console.log('The solution is: ', rows);
//   res.send({ express: rows });
//   });
// });
//
// app.get('/api/lms_learner', (req, res) => {
//   connection.query('SELECT `national_id`,`alt_id`,`equity`,`nationality`,`gender`,`language`,`employed`,`disability`,`surname`,`firstname`,`secondname`,`title`,`dob`,`homeaddr`,`postaddr`,`cellno`,`employer`,`workaddr`,`faxno`,`workno`,`email`,`prev_surname`,`assessment_date`,`club`,`programme`,`qualification`,`skill_programme`,`short_course`,`unitstd` FROM `lms_learner`', function (err, rows, fields) {
//   if (err) {
//     throw err;
//   }
//
//   console.log('The solution is: ', rows);
//   res.send({ express: rows });
//   });
// });

// app.post('/data', function(req, res) {
//   var jsondata = req.body;
//   var values = [];
//   for(var i in jsondata){
//     values.push(jsondata[i]);
//   }
//
//     connection.query("INSERT INTO `lms_info` (`project_name`, `client_name`, `client_telephone`, `client_address`, `client_contact`, `client_municipality`, `log_venue`, `log_batch_no`, `log_facilitator`, `log_assessor`, `log_moderator`, `dates_facilitator`, `dates_assessment`, `dates_moderation`, `learner_id`, `learner_alt_id`, `learner_equity`, `learner_nationality`, `learner_gender`, `learner_lang`, `learner_employed`, `learner_disability`, `learner_surname`, `learner_firstname`, `learner_secondname`, `learner_title`, `learner_dob`, `learner_homeaddr`, `learner_postaladdr`, `learner_cellno`, `learner_employer`, `learner_workaddr`, `learner_faxno`, `learner_workno`, `learner_email`, `learner_prevsurname`, `learner_assessment_date`, `learner_assessor`, `learner_moderator`, `learner_facilitator` , `learner_club`, `learner_programme`, `course_qualification`, `course_skill_programme`, `course_shortcourse`, `course_unitstd`) VALUES (?)", [values], function(err, result){
//       if(err) console.log(err);
//
//       console.log("1 record inserted");
//         });
//
//     res.send({ express: req.body });
// });

app.post('/data', function(req, res) {
  var jsondata = req.body;
  var values = [];
  var index = [];
     var table;
   for(var i in jsondata){
      if(i == "table") {
        table = jsondata[i];
      }
      else {
        index.push(i);
        values.push(jsondata[i]);
      }

  }
    // var sql = mysql.format("INSERT INTO `" + table + "` (?) VALUES (?)", [index, values]);
    // console.log(sql);
    connection.query("INSERT INTO `" + table + "` (??) VALUES (?)", [index, values], function(err, result){
      if(err) console.log(err);

      console.log("1 record inserted");
        });

    res.send({ express: req.body });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
