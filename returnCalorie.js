'use strict';

//callback関数必要!!
//カロリーを返す関数
exports.returnCalorie = function (message){

    //カロリー
    var calorie = 10;

    // MySQLにアクセス
    let mysql = require('mysql');
    let connection = mysql.createConnection(
        {
        host : 'localhost',
        user : 'takuya',
        password : '0000',
        //port : 3000,
        database: 'test'
        }
    );

    //MySQLに接続
    connection.connect();

    // SQL文
    let sql = "SELECT * from foods WHERE name = ?";

    // データベースから検索
    var result = connection.query(sql, message, (error, results, fields) => {
        //存在しなかった時のエラー処理
        if(results[0] == null){
            console.log(message+'のデータがありません。');
        }
        else {
            calorie = results[0].calorie;//ここで変数カロリーに代入
            console.log(message+'のカロリーは'+calorie+'gです。');
        }

     });
     
    console.log(result.results);
    //MySQLの接続解除
    connection.end();
    //カロリーを返す
    return calorie;
}