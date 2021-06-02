
/* Global Variables */
const apiKey = '&appid=18121f575515bd09d4ce9340099e8e52';
const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?zip='
// Create a new date instance dynamically with JS
let d = new Date();
console.log(d)
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
console.log(newDate)

// Personal API Key for OpenWeatherMap API

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', checkWeather);
/* Function called by event listener */
function checkWeather(e) {
    e.preventDefault();
    const zip = document.getElementById('zip').value;
    const feeling = document.getElementById('feelings').value;
    getWeatherData(apiUrl, apiKey, zip)
    .then(function(wData){
        const country = wData.sys.country;
        const city = wData.name;
        const temp = wData.main.temp;
        const tempFeel = wData.main.feels_like;
        const main = wData.weather[0].main;
        const icon = wData.weather[0].icon;
        const wind = wData.wind.speed;
        const userFeeling = feeling;
        const date = newDate
        

        postData('/add', {
            country,
            city,
            temp,
            tempFeel,
            main,
            icon,
            wind,
            userFeeling,
            date
        }).then(() => {
            updateUI()
        });
    });
}
/* Function to GET Web API Data*/
const getWeatherData = async (apiUrl, apiKey, zip) => {
    console.log(apiUrl+zip+apiKey)
    const response = await fetch(apiUrl+zip+apiKey)
    console.log(response)
    try {
        const weatherData = await response.json();
        console.log(weatherData);
        return weatherData;
    } catch(error){
        console.log('Error in getWeatherData: ', error);
    }
}
/* Function to POST data */
const postData = async(url='', data = {}) => {
    console.log("url in post Data: ",url)
    debugger
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        
        body: JSON.stringify(data),
    });
    
    debugger
    try {
        const newData = await response.json();
        return newData;
        } catch(error){
            console.log('Error in postData: ',error);
        }
};

/* Function to Update UI */
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const entry = await request.json();
        document.getElementById('date').innerHTML= `Today is the ${entry.date}.`;
        document.getElementById('temp').innerHTML=`The temerature in ${entry.city} is ${entry.temp}.`;
        document.getElementById('content').innerHTML=`Keep feeling ${entry.userFeeling}.`;
    } catch(error){
        console.log('Error in updateUI: ', error)
    }
}
