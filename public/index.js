var mysql = require('mysql');
var getStudent, getCustomerData;
getStudent = [{'name':'Ahmed Sayed', 'contact':'17737032688', 'hawkid':'A20388365'},
              {'name':'Zeshan Sayed', 'contact':'16507978341', 'hawkid':'A20388365'},
              {'name':'Tejas Manoj', 'contact':'13126782891', 'hawkid':'A20388365'},
              {'name':'Mudassir Vavathar', 'contact':'17737876305', 'hawkid':'A20388365'},
              {'name':'Divyank', 'contact':'12016260675', 'hawkid':'A20388365'}];
var $;
var env = require('require-env');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
require("jsdom/lib/old-api").env("", function(err, window) {
    if (err) {
        console.error(err);
        return;
    }
    $ = require("jquery")(window);
    //doSomething();
});

var con = mysql.createConnection({
    host: "vandy123.cbag1ah2rou0.us-west-2.rds.amazonaws.com",
    port: 3306,
    user: "vandy",
    password: "vandyhacks",
    database: "vandy",
    //timeout: 10000
});

var renderTable = function(getStudent) {
    console.log("In render table");
    var tableID = $("#student");
    for (var i = 0; i < getStudent.length; i++) {
        var row = '<tr>' +
            '<td>' + getStudent[i].name + '</td>' +
            '<td>' + getStudent[i].contact + '</td>' +
            '</tr>';
        tableID.append(row);
        console.log(row);
    }

}
var callback = function(getCustomerData) {
    console.log("In Post");
    var request = require('request');
    console.log(getCustomerData);

    $.ajax({
        url: 'http://10.67.233.204:8080/myaction',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(getCustomerData),
        success: postSuccessHandler
    });

    function postSuccessHandler(jsonData) {
        console.log("Success");
    };
} //postItem()

app.post('/getUsers', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log("In Connect Database");
    var test = req.body;
    con.connect(function(err) {
        if (err) {
            console.error('Database connection failed: ' + err.stack);
            return;
        }
        console.log(test);
        console.log('Connected to database.');
        //var sql = "CREATE TABLE students (name VARCHAR(255), contact VARCHAR(255))";
        //var sql = "CREATE DATABASE iotpublicsafety"
        var sql = "INSERT INTO students (name, contact) VALUES ?";
        var count = 3;
        var userId = $.session.get(‘userID’);
        //var sql = "Select * from students Limit " + count;
        var sql = "Select * from students where customerID =" + userId;
        con.query(sql, function(err, rows, result) {
            if (err) throw err;
            //console.log("Number of records inserted: " , result);
            //getStudent = [];

            var array = [];
            for (var i = 0; i < rows.length; i++) {
                //array.push({name: rows[i].name, contact: rows[i].contact });
                var obj = {};
                obj.name = rows[i].customerID;
                obj.contact = rows[i].customerName;
                obj.contact = rows[i].customerContact;
                obj.contact = rows[i].loanType;
                obj.contact = rows[i].loanStatus;
                obj.contact = rows[i].premium;
                obj.contact = rows[i].loanAmt;
                obj.contact = rows[i].desciption;
                obj.contact = rows[i].creationDate;
                obj.contact = rows[i].accountID;
                obj.contact = rows[i].accountNumber;
                array.push(obj);
            }
            //connection.end();
            console.log(array);
            getStudent = array;
            //     renderTable(getStudent);
            console.log("End");

        });
    });
    console.log(getStudent);
    // res.type('json');
    // res.send(JSON.stringify(getStudent));
    res.end();
    //con.end();
    //res.end();
    //next();
});


//app.use(express.bodyParser());

app.post('/sendData', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log("In Laptop Server");
    var test = req.body;
    console.log(test);
    console.log(JSON.stringify(test));
    callback(test);

    res.end("Fuck you buddy !!!");
    //next();
});


app.post('/getStudentInfo', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  console.log("Sending Data....");
    res.type('json');
    res.send(JSON.stringify(getStudent));

    res.end();
    //next();
});

app.listen(8080, function() {
    console.log('Server running at Raspberry Pi @ Localhost');
});
