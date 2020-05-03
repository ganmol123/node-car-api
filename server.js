const http = require('http');
const app = require("./app.js")

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port);


/*
CORS: Cross Origin Resouce Sharing

If the client and server are on the same server
we don't face any problem as both the data transfer
takes place in the within a single server

But REST APIs are meant to be consumed by different
clients.

Sending some headers to client from the server which
tells it that It's okay to access data from here,
and the browser replies cool.

CORS is a securiy concept, 
*/ 