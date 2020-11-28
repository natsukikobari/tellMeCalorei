'use strict';

//料理のカロリーを返す
class returnCalorie {

    //カロリーを返す関数
    returnCalorie(message) {

        //カロリー
        let calorie = 10;

        // MySQLにアクセス
        let mysql = require('mysql');
        let connection = mysql.createConnection({
            host: 'localhost',
            user: 'akito-FB',
            password: 'abc',
            database: 'tellMeCalories'
        });

        //MySQLに接続
        connection.connect();

        // SQL文
        let sql = "SELECT * from calories WHERE foodName = ?";

        // データベースから検索
        connection.query(sql, message, (error, results, fields) => {
            //ここで変数カロリーに代入
            calorie = results[0].calorie;
            console.log('calorieは' + calorie);
            //存在しなかった時のエラー処理
        });

        //MySQLの接続解除
        connection.end();

        //カロリーを返す
        return calorie;
    }

}

//カロリークラスをエクスポート
module.exports = returnCalorie;