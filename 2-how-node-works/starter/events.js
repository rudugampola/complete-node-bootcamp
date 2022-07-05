const EventEmitter = require('events');
const http = require('http');

//This how other core node modules implement events and listeners
class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales();

//Listener
//Can setup multiple listeners for the same emitter
myEmitter.on('newSale', () => {
  console.log('There was a new sale!');
});

myEmitter.on('newSale', () => {
  console.log('Customer name: John');
});

myEmitter.on('newSale', (stock, people) => {
  console.log(
    `There are now ${stock} items left in stock. And ${people} waiting...`
  );
});

//Can pass arguments to emitters
myEmitter.emit('newSale', 9, 20);

///////////////////////////////////////////////////////////

const server = http.createServer();

// .on is a listener
server.on('request', (req, res) => {
  console.log('Request received!');
  console.log(req.url);
  res.end('Request received');
});

server.on('request', (req, res) => {
  console.log('Another request 😎!');
});

server.on('close', (req, res) => {
  console.log('Server closed!');
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Waiting for requests...');
});
