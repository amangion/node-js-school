import {Transform} from "stream";
import from from 'from2-array';

from.obj([{ name: 'a'}, { name: 'b' }, { name: 'c'}])
    .pipe(new Transform({
        writableObjectMode: true,
        transform(chunk, encoding, callback) {
            callback(null, JSON.stringify(chunk));
        }
        }))
    .pipe(process.stdout);