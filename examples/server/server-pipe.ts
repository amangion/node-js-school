import * as fs from 'fs';
import * as http from 'http';

const server = http.createServer();
server.on('request', (req, res) => {
    fs.createReadStream('./big.file').pipe(res);
});

server.listen(8000);