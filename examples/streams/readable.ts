const { Readable } = require('stream');

const inStream = new Readable({
    read() {}
});

inStream.push('ABCDEFGHIJKLM');
inStream.push('NOPQRSTUVWXYZ');
inStream.push(undefined); // No more data

inStream.pipe(process.stdout);