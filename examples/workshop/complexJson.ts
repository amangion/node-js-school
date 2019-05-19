import { Transform } from 'stream'
import * as JSONStream from 'JSONStream'

class RouteListStream extends Transform {
    private isFirstChunk: boolean
    private readonly metaData: object

    constructor(options, metaData) {
        super(options)
        this.isFirstChunk = true
        this.metaData = metaData
    }

    public _flush(callback) {
        const metaDataChunk = `, "meta": ${JSON.stringify(this.metaData)} }`
        callback(null, metaDataChunk)
    }

    public _transform(chunk, encoding, callback) {
        if (this.isFirstChunk) {
            this.push('{ "data": ')
            this.isFirstChunk = false
        }
        callback(null, chunk)
    }
}

const routeListStream = new RouteListStream({}, {someData: "data"})

const stringlifyStream = JSONStream.stringify('[', ',', ']')

const resultStream =  stringlifyStream.pipe(routeListStream).pipe(process.stdout, {end: false});

stringlifyStream.write({data: "1"})
stringlifyStream.write({data: "2"})
stringlifyStream.write({data: "3"})
stringlifyStream.end()

resultStream.write(`,{data: "4"}`)
resultStream.write(`,{data: "5"}`)

resultStream.write('}')

