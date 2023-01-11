/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const TuyaWebsocket = require('./dist').default;

const client = new TuyaWebsocket({
  accessId: "4fuehnegqrfqspnpymn9",
  accessKey: "5bb653adee024441aa74fc49f50b6727",
  url: TuyaWebsocket.URL.EU,
  env: TuyaWebsocket.env.PROD,
  maxRetryTimes: 100,
});

client.open(() => {
  console.log('wss open');
});

client.message((ws, message) => {
  client.ackMessage(message.messageId);
  //console.log('message', JSON.stringify(message));
  console.log('devId', message.payload.data.devId);
  console.log('code', message.payload.data.status[0].code);
  console.log('value', message.payload.data.status[0].value);
  // console.log('protocol', message.payload.protocol,'::');
  // console.log('message', message.payload.data.status);
});

client.reconnect(() => {
  console.log('wss reconnect');
});

client.ping(() => {
  console.log('wss ping');
});

client.pong(() => {
  console.log('wss pong');
});

client.close((ws, ...args) => {
  console.log('wss close', ...args);
});

client.error((ws, error) => {
  console.log('wss error', error);
});

//client.start() // Начните получать сообщения
