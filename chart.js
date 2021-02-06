var express = require("express");
const mysql = require('mysql');

var app = express();
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'takuya',
  password: '0000',
  database: 'caloriedb'
});

connection.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('success');
});

// EJS設定
app.set("views", __dirname + "/");
app.set("view engine", "ejs");

app.get("/", function (req, response) {
  let foodname = [];
  let calorie = [];
  let test = ["あ","い","う"];
  connection.query(
    "SELECT name, calorie FROM foodcalorie",
    (error, results, fields) => {
      let datadb = JSON.parse(JSON.stringify(results));
      for (let i in datadb) {
        foodname.push(datadb[i].name);
        calorie.push(datadb[i].calorie);
      }
      console.log(foodname);//確認用
      console.log(calorie);//確認用
      response.render("index", { foodname: foodname, calorie: calorie} );
    }
  );
});
app.listen(3005);

//下のコードは無視

// const fs = require('fs');
// var express = require('express');
// const mysql = require('mysql');
// var app = express();
// var path = require('path');
// var Chart = require('chart.js');
// const { stringify } = require('querystring');
// var result =[3,6,9];
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'takuya',
//   password: '0000',
//   database: 'caloriedb'
// });

// connection.connect((err) => {
//   if (err) {
//     console.log('error connecting: ' + err.stack);
//     return;
//   }
//   console.log('success');
// });

// app.get('/', function(req, res){
//   let name = [];
//   let calorie = [];
//     let _resLine = '<h1>Ereignisse: ' + result+'</h1>';
//     console.log('show chart:');
//     console.log(_resLine);
//     connection.query(
//       'SELECT name, calorie FROM foodcalorie',
//       (error, results,fields) => {
//         let datadb = JSON.parse(JSON.stringify(results));
//         for(let i in datadb){
//           name.push(datadb[i].name);
//           calorie.push(datadb[i].calorie);
//         }
//         console.log(name);
//         console.log(calorie);
//         _html = "<script src='https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js'></script>"+
//         "<canvas id='bar-chart' width='800' height='450'></canvas>"+
//         "<script>"+
//         "var logChart = new Chart(document.getElementById('bar-chart'), {"+
//         "type: 'horizontalBar',"+
//         "data: {"+
//         "labels: name,"+
//         "datasets: ["+
//         "{"+
//         "label: 'Aufrufe',"+
//         "backgroundColor: rgba(255,150,0.9),"+
//         "data: calorie," +
//         "}"+
//         "]"+
//         "},"+
//         "options: {"+
//         "legend: { display: false },"+
//         "title: {"+
//         "display: true,"+
//         "text: 'Ereignisse '"+
//         "}"+
//         "}"+
//         "});"+
//         "</script>";

//         res.send(_html);
//       }
//     );
// });

// app.listen(3005);
