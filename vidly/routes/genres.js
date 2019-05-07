const express = require('express');
const router = express.Router();
const Joi = require('joi');

const genres = [
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

const genresSchema = {
    name: Joi.string().min(3).required(),
};

const validateRequest = (body, schema) => {
    return Joi.validate(body, schema);
}


router.get('/', (req, res) => {
    res.send(genres);
});

router.get('/:id', (req, res) => {
    const genre = genres.find((g) => g.id === parseInt(req.params.id));    
    if(!genre) return res.status(404).send(`requested resourse ${parseInt(req.params.id)} not found`); 
    res.send(genre);
});

router.post('/', (req, res) => {
    const { error } = validateRequest(req.body, genresSchema);
    // debug('err', error);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: (genres.length + 1),
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
});

router.put('/:id', (req, res) => {
    const genre = genres.find((g)=> g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send(`requested resourse ${parseInt(req.params.id)} not found`); 

    const { error } = validateRequest(req.body, genresSchema);
    if(error) return res.status(400).send(error.details[0].message);
    
    genre.name = req.body.name;
    // genres.splice(generes.findIndex((g) => g.id === parseInt(req.params.id)), 1, genre);
    res.send(genre);
});

router.delete('/:id', (req, res) => {
    const genre = genres.find((g)=> g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send(`requested resourse ${parseInt(req.params.id)} not found`); 

    genres.splice(genres.findIndex((g) => g.id === parseInt(req.params.id)), 1);
    res.send(genre);
});

module.exports = router;