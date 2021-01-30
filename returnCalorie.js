'use strict';

//カロリーを返す関数\

function search(connection, message) {
    return new Promise(resolve => {

        // SQL文
        let sql = "SELECT * from calories WHERE foodName = ?";

        // データベースから検索
        connection.query(sql, message, (error, results, fields) => {
            //存在しなかった時のエラー処理
            if (results[0] == null) {
                console.log(message + 'のデータがありません。');
            } else {
                resolve(results[0].calorie) //ここで変数カロリーに代入
                console.log(message + 'のカロリーは' + results[0].calorie + 'です。');
            }

        })

    })
}

async function returnCalorie(message) {
    //カロリー
    let calorie = 0;

    // MySQLにアクセス
    let mysql = require('mysql');
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'akito-FB',
        password: 'abc',
        //port : 3000,
        database: 'tellMeCalories'
    });

    //MySQLに接続
    connection.connect();

    const result = await search(connection, message);

    //MySQLの接続解除
    connection.end();

    console.log(result);
}


returnCalorie('オムライス');