const {chain}  = require('stream-chain');

const {parser} = require('stream-json');
const {pick}   = require('stream-json/filters/Pick');
const {ignore} = require('stream-json/filters/Ignore');
const {streamValues} = require('stream-json/streamers/StreamValues');

const createReadStream   = require('fs').createReadStream;
const zlib = require('zlib');

const pipeline = chain([
    createReadStream('sample.json.gz'),
    zlib.createGunzip(),
    parser(),
    pick({filter: 'data'}),
    ignore({filter: /\b_meta\b/i}),
    streamValues(),
    data => {
        const value = data.value;
        return value && value.department === 'accounting' ? data : null;
    }
]);

let counter = 0;
pipeline.on('data', () => ++counter);
pipeline.on('end', () =>
    console.log(`The accounting department has ${counter} employees.`));