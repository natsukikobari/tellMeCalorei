const fs = require('fs');
var express = require('express');
const mysql = require('mysql');
var app = express();
var path = require('path');
var Chart = require('chart.js');
var result =[3,6,9];
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

app.get('/', function(req, res){



    let _resLine = '<h1>Ereignisse: ' + result+'</h1>';
    console.log('show chart:');
    console.log(_resLine);
    connection.query(
      'SELECT * FROM foodcalorie',
      (error, results) => {
        let datadb = JSON.stringify(results);
        _html = "<script src='https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js'></script>"+
        "<canvas id='bar-chart' width='800' height='450'></canvas>"+
        "<script>"+
        "var logChart = new Chart(document.getElementById('bar-chart'), {"+
        "type: 'horizontalBar',"+
        "data: {"+
        // "labels: ['E', 'Ereignis2', 'Ereignis3'],"+
        "datasets: ["+
        "{"+
        "label: 'Aufrufe',"+
        "backgroundColor: rgba(255,150,0.9),"+
        "data: 'datadb'," +
        "}"+
        "]"+
        "},"+
        "options: {"+
        "legend: { display: false },"+
        "title: {"+
        "display: true,"+
        "text: 'Ereignisse '"+
        "}"+
        "}"+
        "});"+
        "</script>";
        
        res.send(_html);
      }
    );
});

app.listen(3005);