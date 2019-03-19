import * as fs from "fs";
import {Transform, TransformCallback} from "stream";

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


//fs.createReadStream(SOURCE_FILE).pipe(new UpperCaseTransformer()).pipe(process.stdout);

const lastStream = fs.createReadStream(SOURCE_FILE).pipe(upperCaseTransformer).pipe(fs.createWriteStream(RESULT_FILE));

/*

 // How to handle when pipeline finished
const pipeline = new Promise((resolve, reject) => {
    lastStream.on('finish',  resolve);
    lastStream.on('error', reject);
});

pipeline.then(() => console.log('Completed'));


// pipeline implementation for array of streams
const pipeline = async streams => {
    const streamChain = streams.reduce((chain, stream) => chain.pipe(stream));

    return new Promise((resolve, reject) => {
        streamChain.on('finish',  resolve);
        streamChain.on('error', reject);
    });
};

*/