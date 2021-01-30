'use strict'

console.log(bbb());


  
  

// aaa();


async function aaa(){
  await console.log(connectionSql());
}

async function bbb(){
  await Display();
}

function Display(){
  return new Promise(resolve =>{
    const mysql = require('mysql');
    
    const connection = mysql.createConnection({
      host: 'us-cdbr-east-03.cleardb.com',
      user: 'bd9a43b372dd3b',
      password: '97b231c8',
      database: 'heroku_165e150e33124a9'
    });
    
    connection.connect(function(err) {
      if (err) {
        console.error('error connecting: ' + err.stack);
        return;
      }
      console.log('connected as id ' + connection.threadId);
    });
    
      let sql = 'SELECT * FROM callories;';
      connection.query(sql, function(err, row, fields){
        resolve(row);
        // console.log(row);
      });
    
    connection.end();
  });
}

function connectionSql(){
  return new Promise(resolve =>{
    
    const mysql = require('mysql');
    const connection = mysql.createConnection({
      host: 'us-cdbr-east-03.cleardb.com',
      user: 'bd9a43b372dd3b',
      password: '97b231c8',
      database: 'heroku_165e150e33124a9'
    });
    
    connection.connect(function(err) {
      if (err) {
        console.error('error connecting: ' + err.stack);
        return;
      }
    
      console.log('connected as id ' + connection.threadId);
    });
    
    
    let sql = 'INSERT INTO callories(name, callorie, user_id_callorie) VALUES(?,?,?)';
    connection.query(sql, ['curry', '500', '182'], function(err, row, fields){
      resolve(row);
      console.log('Done');
    });

    connection.end();
  });
}

