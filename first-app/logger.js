
const EventEmitter = require('events');

var url = 'http://mylogger.io';

class Logger extends EventEmitter{
    log(message){
        //send HTTP request later
        console.log(message);
        //Raise an event 
        this.emit('massageLogged', {id: 1, url: 'http://'});
    }
}

module.exports= Logger;

