const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Vidly rentel services.', 
        message: 'Rent a movie as long as you want.'
    });
});
module.exports = router;