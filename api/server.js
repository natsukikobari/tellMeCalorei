'use strict';

//ファイルをインポート
// const returnCalorie = require('./returnCalorie');

//多LINEと接続処理
const express = require('express');
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 3000;

const config = {
    channelSecret: '1b3dfca295347143734097b1b23caaf9',
    channelAccessToken: 'LQjuzdCYV/cx8XuPsB2+HFdx1ZWN2q+ZoNEjS7xl5vqz1wwnrUS0WwywfQLIde7Ga29aEk1ttXFadVSMlR7Zs48f5VBhvfOWxPD4M5DrYNyM6rAGswaOs+LHuHjG6GdJX6zXJmiPUtneQ5JeqCCfPAdB04t89/1O/w1cDnyilFU='
};

const app = express();

app.get('/', (req, res) => res.send('Hello LINE BOT!(GET)')); //ブラウザ確認用(無くても問題ない)
app.post('/webhook', line.middleware(config), (req, res) => {
    console.log(req.body.events);

        //ここのif分はdeveloper consoleの"接続確認"用なので削除して問題ないです。
        if(req.body.events[0].replyToken === '00000000000000000000000000000000' && req.body.events[1].replyToken === 'ffffffffffffffffffffffffffffffff'){
            res.send('Hello LINE BOT!(POST)');
            console.log('疎通確認用');
            return; 
        }

    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
});


//この先のコードを変えてシステムを作りたい

//clientと言うオブジェクトを生成
const client = new line.Client(config);

//処理
async function handleEvent(event) {

    //エラー処理
    if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null);
    }

    return client.replyMessage(event.replyToken /*メッセージを送信した人のアドレス*/ , {
        type: 'text',
        text: 'デプロイできています。2'
    } /*返す値*/ );
}

// app.listen(PORT);
// console.log(`Server running at ${PORT}`);
(process.env.NOW_REGION) ? module.exports = app: app.listen(PORT);
console.log(`Server running at ${PORT}`);