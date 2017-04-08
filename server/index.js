let express = require('express');
let path = require('path');
let logger = require('morgan');

const PORT = 3000;
const STATIC_PATH = 'static';

let server = express();

server.use(logger('combined'));
server.use('/js', express.static(path.join(__dirname, STATIC_PATH, 'js')));
server.use('/css', express.static(path.join(__dirname, STATIC_PATH, 'css')));

server.use('/', (request, response) => {
  response.sendFile(path.join(__dirname, STATIC_PATH, 'index.html'));
})

server.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
})
