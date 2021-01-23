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

app.get('/bodyweight', (req, res) => res.send('Hello LINE BOT!(GET)'));

// event handler
function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        // ignore non-text-message event
        return Promise.resolve(null);
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