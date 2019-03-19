import * as zlib from 'zlib';
import * as util from 'util';
import * as stream from 'stream';
import * as fs from 'fs';

const pipeline = util.promisify(stream.pipeline);

async function run() {
    await pipeline(
        fs.createReadStream('empty.tar'),
        zlib.createGzip(),
        fs.createWriteStream('archive.tar.gz')
    );
    console.log('Pipeline succeeded.');
}

run().catch(console.error);