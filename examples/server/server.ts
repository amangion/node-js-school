import * as fs from 'fs';
import * as http from 'http';

const server = http.createServer();
server.on('request', (req, res) => {
    fs.readFile('./big.file', (err, data) => {
        if (err) throw err;

        res.end(data);
    });
});

server.listen(8000);