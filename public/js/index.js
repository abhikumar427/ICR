var mysql = require('mysql');
var getCustomer;
var getCustomer1 = [{'name':'Ahmed Sayed', 'contact':'17737032688', 'decision':'Rejected'}];
var getCustomer2 = [{'name':'Zeshan Sayed', 'contact':'16507978341', 'decision':'Approved'}];
var $;
var env = require('require-env');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var count=0;

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

// var renderCustomerInfo = function(getCustomer) {
//     console.log("In render customer");
//     var tableID = $("#userInfo");
//     for (var i = 0; i < getCustomer.length; i++) {
//       if(getCustomer[i].loanStatus == "pending"){
//         console.log(getCustomer[i].customerID);
//         console.log($("#userInfo").find(".cust-id"));
//         $("#userInfo").find(".cust-id").text(getCustomer[i].customerID);
//         $("#userInfo").find(".cust-name").text(getCustomer[i].customerName);
//         $("#userInfo").find(".cust-contact").text(getCustomer[i].customerContact);
//         $("#userInfo").find(".cust-loanType").text(getCustomer[i].loanType);
//         $("#userInfo").find(".cust-loanStatus").text(getCustomer[i].loanStatus);
//         $("#userInfo").find(".cust-premium").text(getCustomer[i].premium);
//         $("#userInfo").find(".cust-loanAmt").text(getCustomer[i].loanAmt);
//         $("#userInfo").find(".cust-desciption").text(getCustomer[i].desciption);
//         $("#userInfo").find(".cust-date").text(getCustomer[i].creationDate);
//         $("#userInfo").find(".cust-accNo").text(getCustomer[i].accountNumber);
//         $("#userInfo").find(".visual-data").attr('src',getCustomer[i].url);
//       }
//
//         //console.log(row);
//     }
//
// }
var callback = function(getCustomer) {
    console.log("In Post");
    var request = require('request');
    console.log(getCustomer);

    $.ajax({
        url: 'http://10.67.233.204:8080/myaction',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(getCustomer),
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
        //var sql = "INSERT INTO students (name, contact) VALUES ?";
        var count = 3;
        ///var userId = $.cookie(‘userID’);
        //var sql = "Select * from students Limit " + count;
        var sql = "Select * from customer";
        con.query(sql, function(err, rows, result) {
            if (err) throw err;
            //console.log("Number of records inserted: " , result);
            getCustomer = [];

            var array = [];
            for (var i = 0; i < rows.length; i++) {
                //array.push({name: rows[i].name, contact: rows[i].contact });
                var obj = {};
                console.log(rows[i]);
                obj.customerID = rows[i].customerID;
                obj.customerName = rows[i].customerName;
                obj.customerContact = rows[i].customerContact;
                obj.loanType = rows[i].loanType;
                obj.loanStatus = rows[i].loanStatus;
                obj.premium = rows[i].premium;
                obj.loanAmt = rows[i].loanAmt;
                obj.desciption = rows[i].desciption;
                obj.creationDate = rows[i].creationDate;
                obj.accountID = rows[i].accountID;
                obj.accountNumber = rows[i].accountNumber;
                obj.url = rows[i].url;
                obj.creditScore = rows[i].creditScore;
                obj.salary = rows[i].salary;
                array.push(obj);
            }
            //connection.end();
            console.log("Arrya");console.log("Arrya");console.log("Arrya");console.log("Arrya");console.log("Arrya");
            console.log(array);
            getCustomer = array;
            console.log(getCustomer);
                //renderCustomerInfo(getCustomer);
                res.type('json');
                 res.send(JSON.stringify(getCustomer));
                //
                res.end();

        });
        //con.end();
    });
    console.log(getCustomer);
    //res.type('json');
    //res.send(JSON.stringify(getCustomer));
    // res.type('json');
    // res.send(JSON.stringify(getCustomer));
    //res.end();
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
    console.log(test.decision );
    //console.log(JSON.stringify(test));
    if (test.decision == "Approved") {
      callback(getCustomer2);
      //count+=1;
    } else {
      callback(getCustomer1);
    }


    res.end();
    //next();
});

app.post('/getCustomerInfo', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  console.log("Sending Data....");
    res.type('json');
    res.send(JSON.stringify(getCustomer));

    res.end();
    //next();
});

app.listen(8080, function() {
    console.log('Server running at Raspberry Pi @ 192.168.1.104');
});
