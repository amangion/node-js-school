import * as JSONStream from 'JSONStream'
import * as fs from 'fs';

const  stream = JSONStream.parse(['rows', true, 'doc'])

stream.on('data', function(data) {
    console.log('received:', data);
});
//emits anything from _before_ the first match
stream.on('header', function (data) {
    console.log('header:', data) // => {"total_rows":129,"offset":0}
})

//fs.createReadStream('./couchData.json').pipe(process.stdout)
fs.createReadStream('./couchData.json').pipe(stream)