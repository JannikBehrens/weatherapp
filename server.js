// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Dependencies */
/* Middleware*/
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
// Spin up the server
const port = 3000;
const server = app.listen(port, listening);

// Callback to debug
function listening(){
    console.log(`Server running on localhost: ${port}`);
}
// Initialize all route with a callback function
app.get('/all', (request, response) => {
    //response.send('Hello World')
    response.send(projectData)
    
});


// Post Route
app.post('/add', function(request, response){
    projectData = request.body;
    console.log(projectData);
    response.send({message: 'received'})
})