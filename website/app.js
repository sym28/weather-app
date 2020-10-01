/* Global Variables */
    // fetch url variables
const apiKey = '&appid=e1012bff61c6233795d2f677e3f14ff9';
const weatherURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
const zip = document.getElementById('zip');
    // variables to populate dom elements
const feelings = document.getElementById('feelings');
const date = document.getElementById('date');
const temp = document.getElementById('temp');
    // user text data
const content = document.getElementById('content');
    // store temperature
const data = {};

// // Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// // create url for fetch call
const buildZipCode = (zipcode) => {
    const url = weatherURL + zipcode + apiKey + '&units=metric';
    getWeather(url)
}

// async get weather data from fetch call
const getWeather = async (url = '') => {
    let weatherData = await fetch(url);
    try {
        weatherData = await weatherData.json();
        data['temperature'] = weatherData.main.temp;
        postThenGet();
    } catch (error) {
        console.log('error: ' + error)
    }
}

// async post data to server
const postWeatherData = async (path, data = {}) => {
    const response = await fetch(path, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        const data = await response.json();
        return data;
    } catch(error) {
        console.log('error', error);
    }
}

// get data from server and display in dom
const getData = async (path) => {
    const request = await fetch(path);
    try {
        const requestData = await request.json()
        date.textContent = `Date: ${requestData.date}`;
        temp.innerHTML = `Temperature: ${requestData.temperature}&#8451`;
        content.textContent = `Your feeling: ${requestData.response}`;
        console.log(requestData)
    } catch(error) {
        console.log('error: ', error);
    }
}

// post user data to the server then get data back
const postThenGet = async () => {
    postWeatherData('/add-data', {
        temperature: data.temperature.toString(),
        date: newDate,
        response: feelings.value
    }).then(getData('/alldata'))
}

// event for button
document.getElementById('generate').addEventListener('click', () => { 
    buildZipCode(zip.value)
});