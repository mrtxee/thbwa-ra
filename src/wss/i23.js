const TuyaWebSocket = require('./dist').default;
const TuyaWebSocketClient = new TuyaWebSocket({
  accessId: "4fuehnegqrfqspnpymn9",
  accessKey: "5bb653adee024441aa74fc49f50b6727",
  url: TuyaWebSocket.URL.EU,
  env: TuyaWebSocket.env.PROD,
  maxRetryTimes: 100,
});

TuyaWebSocketClient.message((ws, message) => {
  TuyaWebSocketClient.ackMessage(message.messageId);
  if(4===message.payload.protocol)
    console.log('protocol',message.payload.protocol
        ,'device_id', message.payload.data.devId
        , 'updateStatus:',message.payload.data.status[0].code,'=',message.payload.data.status[0].value);
});
TuyaWebSocketClient.start()