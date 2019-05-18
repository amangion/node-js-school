import * as fs from 'fs';
import { Transform, TransformCallback } from 'stream';

const SOURCE_FILE = 'source.txt';
const RESULT_FILE = 'result.txt';

const upperCaseTransformer = new Transform({
    transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
    }
});

class UpperCaseTransformer extends Transform {
    _transform(chunk: Buffer, encoding: string, callback: TransformCallback): void {
        callback(null, chunk.toString().toUpperCase());
    }
}


// fs.createReadStream(SOURCE_FILE).pipe(new UpperCaseTransformer()).pipe(process.stdout);

fs.createReadStream(SOURCE_FILE).pipe(upperCaseTransformer).pipe(fs.createWriteStream(RESULT_FILE));
