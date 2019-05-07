
const Joi = require('joi');
const express = require('express'); //load express function 

//call the express the function to create the application
// this returns the app object which has useful methods like /get/put/post/delete
const app = express(); 

app.use(express.json()); //express.json returns a piece of middleware that middleware we use in app.use 

/**
 * //app.get takes two argument (url, callback)
 * @params url to respond 
 * @params callback route handler (req, res) 
 */


const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
];

function validateCourse(course){
    const courseSchema = {
        name: Joi.string().min(3).required(),
    };    
    return Joi.validate(course, courseSchema);
}

app.get('/', (req, res)=>{
    res.send('Hello World@@@');
});

app.get('/api/courses', (req, res)=>{
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send(`The course with the given ID ${req.params.id} did not found.`);

    res.send(course);
});

app.post('/api/courses', (req, res) => {
    /**
     * we can loop and access all messages as well. 
     * "name" is required
     * "name" length must be at least 3 characters long
     * and we should return here because we don't want to run the below code.    
     */    
    const {error} = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);      
      
    const course = {
        id: (courses.length + 1), 
        name: req.body.name
    };
    courses.push(course);
    // console.log("course, ", course);
    res.send(course);
});


app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send(`The course with the given ID ${req.params.id} did not found.`);
    
    const {error} = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message); 

    course.name = req.body.name;
    courses.splice(courses.findIndex(c => c.id == req.params.id), 1, course);
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send(`The course with the given ID ${req.params.id} did not found.`);

    courses.splice(courses.findIndex(c => c.id == req.params.id), 1);
    res.send(course);    
});

// finally we need to listen on the given port, 
// it also has a callback, which is called when server started. 
const port = process.env.PORT || 3003
app.listen(3003, ()=>{
    console.log(`listening on port ${port}...`);
});