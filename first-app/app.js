/*
    Node is a C++ program. It includes chrome v8 js engine. This app.js file we are going to pass 
    to node, node is gonna give it to v8 for execution. 
*/

// const http = require('http');

// const server = http.createServer((req, res) => {
//     if(req.url === '/'){
//         res.write('Hello world');
//         res.end();
//     }

//     if(req.url === '/api/users'){
//         res.write(JSON.stringify([{id: 1, name: 'John'}, {id: 2, name: 'Doe'}]));
//         res.end();
//     }
// });

// //this server is also an EventEmitter
// server.listen(3001);

// console.log('listening on port 3001...');

const fs = require('fs');
const STATES = require('./states');
const CITIES = require('./cities');

const statesWithCities = {};
function capitalizeFirstLetter(string) {
    let str = string.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

STATES.forEach(st => {
    const cities = CITIES[st.text]
    if(cities) {
        statesWithCities[st.key] = cities.map(ct => {
            return {text: capitalizeFirstLetter(ct), key: ct.toLowerCase(), value: ct.toLowerCase()};
        });
    }else{
        console.log('state: ', st.text, ' -- no-found ');
    }
})

console.log(statesWithCities);

const jsonContent = JSON.stringify(statesWithCities);
fs.writeFile('statesWithCities.json', jsonContent, 'utf-8', (err, data)=> {
    if(err){
        console.log("Cannot write to the file.");
    }
    console.log("json file has been created.")
})
