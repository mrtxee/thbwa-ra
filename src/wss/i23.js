/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const TuyaWebsocket = require('./dist').default;

//import {default as TuyaWebsocket} from "./dist";

const TuyaWebsocketClient = new TuyaWebsocket({
  accessId: "4fuehnegqrfqspnpymn9",
  accessKey: "5bb653adee024441aa74fc49f50b6727",
  url: TuyaWebsocket.URL.EU,
  env: TuyaWebsocket.env.PROD,
  maxRetryTimes: 100,
});

TuyaWebsocketClient.message((ws, message) => {
  TuyaWebsocketClient.ackMessage(message.messageId);
  console.log('devId', message.payload.data.devId, 'update status',message.payload.data.status[0].code,'=',message.payload.data.status[0].value);
});
TuyaWebsocketClient.start()
