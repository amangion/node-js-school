import * as from from 'from2-array';
import {Transform, TransformCallback} from "stream";
import {JsonFormatter} from "cucumber";

class AggregateTransformer extends Transform {
    buffer: Array<any>;
    constructor () {
        super({
            writableObjectMode: true,
        });
        this.buffer = []
    }

    _transform(chunk: Buffer, encoding: string, callback: TransformCallback): void {

        if (this.buffer.length < 3) {

            this.buffer.push(chunk)
            callback()
            return
        }


        this.push(JSON.stringify(this.buffer.slice()));
        this.buffer = [chunk];
        callback();
    }

    _flush(callback) {
        this.push(JSON.stringify(this.buffer.slice()));
        callback();
    }
}

const transformer = new AggregateTransformer();

const source = from.obj([
    { name: 'a'},
    { name: 'b' },
    { name: 'b' },
    { name: 'b' },
    { name: 'b' },
    { name: 'b' },
    { name: 'b' },
    { name: 'c'}
    ])
    .pipe(transformer)

    .pipe(process.stdout)

transformer.on('error', console.error)



