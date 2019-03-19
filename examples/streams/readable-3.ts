import { Readable } from 'stream';

class Counter extends Readable {
    _max: number = 100;
    _index: number = 1;

    _read() {
        const i = this._index++;
        if (i > this._max)
            this.push(null);
        else {
            const str = String(i);
            const buf = Buffer.from(str, 'ascii');
            this.push(buf);
        }
    }
}

const counter = new Counter();

counter.pipe(process.stdout);