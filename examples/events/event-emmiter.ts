const EventEmitter = require('events');

class MyEmitter extends EventEmitter {
}

const myEmitter = new MyEmitter();

myEmitter.on('event', eventName => {
    console.log(`Event [${eventName}] occurred!`);
});

myEmitter.emit('event', 'Test event');
myEmitter.emit('event', 'Test event2');
myEmitter.emit('event', 'Test event3');
myEmitter.emit('event', 'Test event4');