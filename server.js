'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

// create LINE SDK config from env variables
const config = {
    channelSecret: '1b3dfca295347143734097b1b23caaf9',
    channelAccessToken: 'LQjuzdCYV/cx8XuPsB2+HFdx1ZWN2q+ZoNEjS7xl5vqz1wwnrUS0WwywfQLIde7Ga29aEk1ttXFadVSMlR7Zs48f5VBhvfOWxPD4M5DrYNyM6rAGswaOs+LHuHjG6GdJX6zXJmiPUtneQ5JeqCCfPAdB04t89/1O/w1cDnyilFU='
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result))
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
});

app.get('/bodyweight', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

//DBを操作する関数
function connectionDB(sql) {
    return new Promise(resolve => {
        // requireの設定
        const mysql = require('mysql');
        // MySQLとのコネクションの作成
        const connection = mysql.createConnection({
            host: 'us-cdbr-east-03.cleardb.com',
            user: 'bd9a43b372dd3b',
            password: '97b231c8',
            database: 'heroku_165e150e33124a9'
        });
        // 接続
        connection.connect();
        //DB操作
        connection.query(sql, function(err, rows, fields) {
            resolve(rows);
        });
        // 接続終了
        connection.end();
    });
}

// event handler
async function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        // ignore non-text-message event
        return Promise.resolve(null);
    }

    //今日の体重を登録する処理
    {
        const weight = event.message.text;
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const date = now.getDate();
        const today = `"${year}"-"${month}"-"${date}"`;
        const userId = event.source.userId;
        console.log(weight);
        console.log(today);
        console.log(userId);
        const sql = `INSERT INTO weights(weight, date, user_id) VALUES("${weight}", "${today}", "${userId}")`;
        console.log(sql);

        await connectionDB(sql);
    }

    // create a echoing text message
    const echo = { type: 'text', text: event.message.text };

    // use reply API
    return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});