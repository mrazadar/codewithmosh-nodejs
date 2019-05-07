const debug = require('debug')('vidly:debug');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const express = require('express');
const logger = require('./middlewares/logger');
const authenticate = require('./middlewares/authentication');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views'); //optional setting. this is the default path, you can skip this step. 
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(logger);
app.use(authenticate);

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

const geners = [
    {
        id: 1, 
        name: 'Classic'
    },
    {
        id: 2, 
        name: 'Animated'
    },
    {
        id: 3, 
        name: 'Horror'
    },
];

const genersSchema = {
    name: Joi.string().min(3).required(),
};

const validateRequest = (body, schema) => {
    return Joi.validate(body, schema);
}

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Vidly rentel services.', 
        message: 'Rent a movie as long as you want.'
    });
});

app.get('/api/geners', (req, res) => {
    res.send(geners);
});

app.get('/api/geners/:id', (req, res) => {
    const gener = geners.find((g) => g.id === parseInt(req.params.id));    
    if(!gener) return res.status(404).send(`requested resourse ${parseInt(req.params.id)} not found`); 
    res.send(gener);
});

app.post('/api/geners/', (req, res) => {
    const { error } = validateRequest(req.body, genersSchema);
    debug('err', error);
    if(error) return res.status(400).send(error.details[0].message);

    const gener = {
        id: (geners.length + 1),
        name: req.body.name
    };
    geners.push(gener);
    res.send(gener);
});

app.put('/api/geners/:id', (req, res) => {
    const gener = geners.find((g)=> g.id === parseInt(req.params.id));
    if(!gener) return res.status(404).send(`requested resourse ${parseInt(req.params.id)} not found`); 

    const { error } = validateRequest(req.body, genersSchema);
    if(error) return res.status(400).send(error.details[0].message);
    
    gener.name = req.body.name;
    // geners.splice(generes.findIndex((g) => g.id === parseInt(req.params.id)), 1, gener);
    res.send(gener);
});

app.delete('/api/geners/:id', (req, res) => {
    const gener = geners.find((g)=> g.id === parseInt(req.params.id));
    if(!gener) return res.status(404).send(`requested resourse ${parseInt(req.params.id)} not found`); 

    geners.splice(geners.findIndex((g) => g.id === parseInt(req.params.id)), 1);
    res.send(gener);
});


const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    debug(`listening at port ${PORT}...`);
});