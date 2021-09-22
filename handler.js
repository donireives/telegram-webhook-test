'use strict';
require('dotenv').config();
const request = require('request');

module.exports.webhook = async (event, context, callback) => {
  const token = process.env.TELEGRAM_TOKEN;;
  const BASE_URL = `https://api.telegram.org/bot${token}/sendMessage`;

  const body = JSON.parse(event.body);
  const message = body.message;
  const chatId = message.chat.id;
  
  await request.post(BASE_URL).form({ text: message.text+" "+chatId, chat_id: chatId });
  
  //send to webhook.site to see detail
  //await request.post("https://webhook.site/YOUR_WEBHOOKSITE_URL_ID").form(message);

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      input: event,
    }),
  };

  return callback(null, response);

};