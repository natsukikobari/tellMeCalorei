//a
// import { returnCalorie } from './returnCalorie.js';

// let m = new ReadSql;
// console.log(readSql.returnCalorie('オムライス'));

async function returnCalorie(message) {

    //カロリー
    var calorie = 10;

    // MySQLにアクセス
    let mysql = require('mysql');
    let connection;
    return new Promise((resolve, reject) => {
        try {
            connection = mysql.createConnection({
                //host: 'localhost',
                host: 'us-cdbr-east-03.cleardb.com',
                //user: 'akito-FB',
                user: 'b8d38b6229689b',
                //password: 'abc',
                password: '90c6fdf8',
                //port : 3000,
                //database: 'tellMeCalories'
                database: 'heroku_91a0951754ecaf2'
            });

            //MySQLに接続
            connection.connect();

            // SQL文
            let sql = "SELECT * from calories WHERE foodName = ?";

            // データベースから検索
            connection.query(sql, message, (error, results, fields) => {
                    //存在しなかった時のエラー処理
                    if (results[0] == null) {
                        console.log(message + 'のデータがありません。');
                    } else {
                        calorie = results[0].calorie; //ここで変数カロリーに代入
                        console.log(message + 'のカロリーは' + calorie + 'です。');
                    }
                    console.log('b');
                    connection.end();
                    resolve(calorie);
                })
                //MySQLの接続解除

            //カロリーを返す
        } catch (err) {
            connection.end();
            reject(err);
        }

    });
}

returnCalorie('オムライス')
    .then((val) => {
        console.log("aaaa");
        console.log(val);
    })
    .catch((err) => { console.log(err); })