const es = require('event-stream')
const inspect = require('util').inspect

process.stdin
    .pipe(es.split())
    .pipe(es.map(function (data, cb) {
        cb(null, inspect(JSON.parse(data)))
    }))
    .pipe(process.stdout)