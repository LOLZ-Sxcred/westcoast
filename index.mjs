import Server from 'bare-server-node';
import http from 'http';
import nodeStatic from 'node-static';


const bare =  new Server('/bare/', '');
const serve = new nodeStatic.Server('static/');

const server = http.createServer();
const UltraViolet = require('../');
const proxy = new UltraViolet({
   requestMiddleware: [
    Corrosion.middleware.blacklist([ 
      '1v1.lol',
      '1v1.lol',
    ], 'Page is blocked!'),  
  ],
});

server.on('request', (request, response) => {
    if (bare.route_request(request, response)) return true;
    serve.serve(request, response);
});

server.on('upgrade', (req, socket, head) => {
	if(bare.route_upgrade(req, socket, head))return;
	socket.end();
});

server.listen(process.env.PORT || 8080);
