import { Readable } from 'stream';

let currentCharCode = 65;
const lowLevelReader = (size) => {
    if (currentCharCode > 90) {
        return null;
    }
    return String.fromCharCode(currentCharCode++);
};

class InStream extends Readable {
    _read(size) {
        this.push(lowLevelReader(size));
    }
}

const inStream = new InStream();

inStream.pipe(process.stdout);
