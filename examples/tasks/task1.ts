import {Readable} from 'stream'

const inStream = new Readable({
    read() {}
});

inStream.pipe(process.stdout)
inStream.push("Test")
inStream.push(null)