var mysql = require('mysql');
var getStudent;
var $;
var env = require('require-env');

require("jsdom/lib/old-api").env("", function(err, window) {
    if (err) {
        console.error(err);
        return;
    }
    $ = require("jquery")(window);
    //doSomething();
});

var con = mysql.createConnection({
  host: "iotpublicsafety.ck1hiahkkkxg.us-west-2.rds.amazonaws.com",
  port: 3306,
  user: "IITPublicSafety",
  password: "!!tChicago",
  database: "iotpublicsafety"
});
// var callback = function () {
//   // for (var i = 0; i<getStudent.length; i++) {
//   //   console.log("Name :"+getStudent[i].name+", Contact: "+getStudent[i].contact);
//   // }
//   console.log("In callback");
//   postItem(getStudent)
// }
var callback = function (getStudent) {
  console.log("In Post");
  var request = require('request');
  console.log(getStudent);
  //request.post('http://192.168.1.104:8080/myaction',{ json: "getStudent" },function (error, response, body) {
  // request.post('http://192.168.1.104:8080/myaction',{ json: "getStudent" },function (error, response, body) {
  //         if (!error && response.statusCode == 200) {
  //             console.log(body)
  //         }
  //         console.log(getStudent);
  //     }
  // );

  // var options = {
  //   uri: 'http://192.168.1.104:8080/myaction',
  //   method: 'POST',
  //   headers: {
  //       "content-type": "application/json",
  //       },
  //   // body:{
  //   //     "jsonrpc":"2.0",
  //   //     "id":"zdoLXrB5IkwQzwV2wBoj",
  //   //     "method":"barrister-idl"
  //   //   },
  //   json: true
  // };

  // request.post('http://192.168.1.104:8080/myaction',{ json: "getStudent" },function (error, response, body) {
  //         console.log(response.statusCode);
  //         if (!error && response.statusCode == 200) {
  //             console.log(body)
  //         }
  //         else {
  //           console.log(error);
  //         }
  //         console.log(getStudent);
  //     }
  // );
    $.ajax({
          url: 'http://192.168.1.104:8080/myaction',
          type: 'POST',
          // data: {
          //   firstName: 'Ahmed',
          //   lastName: 'Sayed'
          // },
          contentType: 'application/json',
          dataType:'json',
          data: JSON.stringify(getStudent),
          // contentType: 'application/json',
          // data: JSON.stringify(getStudent),
          // datatype: 'json',
          //data : [{'name':'Ahmed','contac':'3123123'}],
          success: postSuccessHandler
      });
      function postSuccessHandler (jsonData) {
        console.log("Success");
      };


// request(options, function (error, response, body) {
//   if (!error && response.statusCode == 200) {
//     console.log(body) // Print the shortened url.
//     console.log(JSON.stringify(response));
//     //console.log(body);
//   }
  //console.log(getStudent);
//});
//request.write(JSON.stringify("some_json"),encoding='utf8');

}//postItem()

con.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }

  console.log('Connected to database.');
  //var sql = "CREATE TABLE students (name VARCHAR(255), contact VARCHAR(255))";
  //var sql = "CREATE DATABASE iotpublicsafety"
  //var sql = "INSERT INTO students (name, contact) VALUES ?";
  var count = 3;
  var sql = "Select * from students Limit "+count;
  // var values = [
  //   ['Ahmed', '17737032688'],
  //   ['Tejas', '13126782891'],
  //   ['Zeeshan', '16507978341'],
  // ];
  con.query(sql, function (err, rows, result) {
    if (err) throw err;
    //console.log("Number of records inserted: " , result);
    //getStudent = [];

    var array = [];
    for (var i = 0;i < rows.length; i++) {
        //array.push({name: rows[i].name, contact: rows[i].contact });
        var obj = {};
       obj.name = rows[i].name;
       obj.contact = rows[i].contact;
       array.push(obj);
    }
    //connection.end();
    console.log(array);
    getStudent = array;
    //console.log(getStudent.length);
    //console.log(result.length);
    // for (var i = 0; i<getStudent.length; i++) {
    //   console.log("Name :"+getStudent[i].name+", Contact: "+getStudent[i].contact);
    // }
    callback(getStudent);
  });
});

//con.end();
