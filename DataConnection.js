var mysql = require('mysql');
//var mysql = require('node-mysql')

//establish mysql connection to PP
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'pulsepulse',
  database : 'peoplepulse',
  port     : '3306'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected to peoplepulse database as id ' + connection.threadId);
});

var date = new Date().toISOString().slice(0, 19).replace('T', ' ');

var post = {text:"On a scale of 1-5 How are you feeling today?",category: 4, created_at: date, updated_at: date, position: 4, entity_id: null, iconset_id: null};
var query = connection.query('INSERT INTO PeoplePulse.questions SET ?',post,function(err,result){
  if(!err)
    console.log(query.sql);
  else
    console.log('Error while Inserting :' + err);
});


connection.query('SELECT * from questions', function(err, rows, fields) {
  if (!err)
    console.log('Data: ', rows);
  else
    console.log('Error while performing Query');
});

connection.end();