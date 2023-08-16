const http = require('http');
const fs = require('fs');

const host = 'tuyahome.online';
const port = 80;

const httpServer = http.createServer(httpHandler);

httpServer.listen(port, host, () => {
    console.log(`HTTP server running at http://${host}:${port}/`);
});

function httpHandler(req, res) {
	data=`37FADBF730BD109F225AEC060CFCF6A4680724C967C58A9C669EB26567752BBB
comodoca.com
854959dcab33fda`;
	//res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(data);
	res.end();

}