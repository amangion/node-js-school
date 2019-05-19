const bluebird = require('bluebird'),
    request = require('request'),
    path = require('path'),
    createWriteStream = require('fs').createWriteStream,
    ps = require('promise-streams'),
     from = require('from2-array')

bluebird.promisifyAll(request);

var download = url =>
    ps.wait(request(url).pipe(
        createWriteStream(
            './images/' + path.basename(url))));


from(['https://i.imgur.com/7jGz7nX.png', 'https://i.imgur.com/zATRlXo.jpg'])
    .pipe(ps.map({concurrent: 4}, imgurl => download(imgurl.toString())))
    .done( total => console.log(total, "images downloaded"),
      err  => console.error(err.stack))

