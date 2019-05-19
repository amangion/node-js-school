const {Transform} = require('stream')

const REQUEST_POOL_SIZE = 2
const READABLE_HIGH_WATER_MARK = 3

class RequestComposer extends Transform {
    constructor () {
        super({
            readableObjectMode: true,
            writableObjectMode: true,
            readableHighWaterMark: READABLE_HIGH_WATER_MARK
        })
        this.requestBuffer = []
    }

    _transform (item: any, encoding: string, callback: Function): any {
        if (this.requestBuffer.length <= REQUEST_POOL_SIZE) {
            this.requestBuffer.push(this.prepareRequest(item))

            return callback()
        }

        const result = this.prepareNextChunk(this.requestBuffer.slice())
        this.requestBuffer = [this.prepareRequest(item)]
        callback(null, result)
    }

    _flush (callback: Function): void {
        callback(null, this.prepareNextChunk(this.requestBuffer.slice()))
    }

    prepareNextChunk (requests) {
        return requests.join(':') + "\n"
    }

    prepareRequest (item: Object) {
        return item;
    }
}

const requestComposer = new RequestComposer();

requestComposer.pipe(process.stdout);

requestComposer.write("1")
requestComposer.write("2")
requestComposer.write("3")
requestComposer.write("4")
requestComposer.write("5")
requestComposer.write("6")
requestComposer.write("7")
requestComposer.end()
