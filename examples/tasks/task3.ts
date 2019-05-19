import * as from from 'from2-array';
import * as JSONStream from 'JSONStream'
import * as fs from "fs";
import { Transform, TransformCallback } from 'stream';

const source = from.obj([
    { name: 'a'},
    { name: 'b' },
    { name: 'c' },
    { name: 'd' },
    { name: 'e' },
    { name: 'f' },
    { name: 'g' }
])

const stringlifyStream = JSONStream.stringify(`{
    meta: "test",
    data: [`,',',']');




const dest = source.pipe(stringlifyStream).pipe(fs.createWriteStream("1.json"), {end: false});


dest.write(',   data2:');
dest.end();

const result  = {
    meta: "test",
    data: [
        { name: 'a' },
        { name: 'b' },
        { name: 'c' },
        { name: 'd' },
        { name: 'e' },
        { name: 'f' },
        { name: 'g' }
    ],
    data2: [
        { name: 'a' },
        { name: 'b' },
        { name: 'c' },
        { name: 'd' },
        { name: 'e' },
        { name: 'f' },
        { name: 'g' }
    ]

}