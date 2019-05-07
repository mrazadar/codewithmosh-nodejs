const debug = require('debug')('vidly:debug');
// const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');
const logger = require('./middlewares/logger');
const authenticate = require('./middlewares/authentication');
const home = require('./routes/home');
const genres = require('./routes/genres');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views'); //optional setting. this is the default path, you can skip this step. 
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(logger);
app.use(authenticate);


app.use('/', home);
app.use('/api/genres', genres);


// debug(`NODE_ENV: ${process.env.NODE_ENV}`); //returns undefined if not set
// debug(`app: ${app.get('env')}`); //returns 'development' if not set 

// debug(`My application name: ${config.get('name')}`);
// debug(`Mail server: ${config.get('mail.host')}`);
// debug(`Mail password: ${config.get('mail.password')}`);

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    debug("morgan enabled...");
}

//let's say we have some database work here. 
debug("database action...")



const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    debug(`listening at port ${PORT}...`);
});