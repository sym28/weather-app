// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup routes, get and post
app.get('/alldata', (req, res) => {
    console.log('data has been sent to client: ');
    console.log(projectData)
    res.send(projectData)
})

app.post('/add-data', (req, res) => {
    projectData['temperature'] = req.body.temperature;
    projectData['date'] = req.body.date;
    projectData['response'] = req.body.response;
    console.log('data has been posted to server:');
    console.log(projectData);
})

// start server
app.listen(7000, () => {
    console.log('app is running on port: ' + 7000);
});