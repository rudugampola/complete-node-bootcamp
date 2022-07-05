const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  //Solution 1 - load everything first then respond - too slow
  //   fs.readFile('./starter/test-file.txt', (err, data) => {
  //     if (err) console.log(err);
  //     res.end(data);
  //   });
  //Solution 2: Streams
  //   const readable = fs.createReadStream('./starter/test-file.txt');
  //   readable.on('data', (chunk) => {
  //     res.write(chunk); // Response is a writable stream
  //   });
  //   readable.on('end', () => {
  //     res.end();
  //End method signals no more data will be written to the writable stream, not
  //passing anything because data already went in
  //   });
  //   readable.on('error', (err) => {
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.end('File not found!');
  //   });
  //Solution 3
  //Back pressure happens when the response cannot send the data as fast as the read data comes in

  const readable = fs.createReadStream('./starter/test-file.txt');
  readable.pipe(res);
  //readableSource.pipe(writeableDest)
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening ...');
});
