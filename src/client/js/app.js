/* Global Variables */
// http://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&APPID={APIKEY}
const API_KEY = 'f6f5d4c3d0443779f9f94a63ae95e04b';
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=imperial`;

// basic wrapper for GET requests
const getData = async (url) => new Promise((resolve, reject) => {
    fetch(url)
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch(err => reject(err));
});

// basic wrapper for POST requests with json data
const postData = async (url, data) => new Promise((resolve, reject) => {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch(err => reject(err));
});

// get weather data from openweathermap
const getWeather = async (zip) => getData(`${BASE_URL}&zip=${zip}`);

// listener function for generate button
const generateListener = async () => {
    const zip = document.querySelector('#zip').value;
    const content = document.querySelector('#feelings').value;

    if (zip.length === 0 || feelings.length === 0) {
        alert("Must fill out zip and feelings")
        return;
    }

    const {main: {temp}} = await getWeather(zip)
        .catch((err) => {
            alert(err.message);
            console.error(err);
        });

    // Create a new date instance dynamically with JS
    let d = new Date();
    let date = `${d.getMonth()+1}.${d.getDate()}.${d.getFullYear()}`;

    await postData('/projectData', {
        temp,
        date,
        content
    });

    updateUI();
}

// update UI with info from server
const updateUI = async () => {
    getData('/projectData')
        .then(({date, temp, content}) => {
            document.querySelector('#date').innerHTML = date;
            document.querySelector('#temp').innerHTML = temp;
            document.querySelector('#content').innerHTML = content;
        })
        .catch((err) => {
            alert(err.message);
            console.error(err);
        })
}

// attatch listener to generate button
document.querySelector('#generate').addEventListener('click', generateListener);
