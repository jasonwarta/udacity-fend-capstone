const path = require('path')
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const GEONAMES_URL = 'http://api.geonames.org/searchJSON';
const WEATHER_URL = 'http://api.weatherbit.io/v2.0/history/daily';
const PIXABAY_URL = 'https://pixabay.com/api/'

const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(express.static('dist'));

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
});


app.post('/collectData', async (req, res) => {
    const {city, date} = req.body;

    console.log({city, date})

    // get city data from GeoNames
    const cityData = await axios.get(GEONAMES_URL, {
        params: {
            username: process.env.GEONAMES_USERNAME,
            name: city,
            lang: 'en',
            maxRows: 1
        }
    })
    .then(({data: {geonames: [placeData]}}) => placeData)
    .catch(err => console.log('error getting city data', err));

    // Get weather data from WeatherBit using lat and long from geonames
    const {lat, lng} = cityData;
    let lastYear = new Date(date);
    lastYear.setFullYear(2019);
    const startDate = `${lastYear.getFullYear()}-${lastYear.getMonth()+1}-${lastYear.getDate()+1}`;
    lastYear.setDate(lastYear.getDate() + 1);
    const endDate = `${lastYear.getFullYear()}-${lastYear.getMonth()+1}-${lastYear.getDate()+1}`;

    console.log(startDate, endDate);
    
    const weatherData = await axios.get(WEATHER_URL, {
        params: {
            key: process.env.WEATHERBIT_API_KEY,
            units: 'I',
            lat,
            lon: lng,
            start_date: startDate,
            end_date: endDate,
        }
    })
    .then(({data: {data: [weather]}}) => weather)
    .catch(err => console.log('error getting weather data', err));

    // get a photo of the city
    const picture = await axios.get(PIXABAY_URL, {
        params: {
            key: process.env.PIXABAY_API_KEY,
            q: `${city}`,
            image_type: 'photo',
            category: 'places'
        }
    })
    .then(({data: {hits: [{webformatURL}]}}) => webformatURL)
    .catch(err => console.log('error getting photo data', err))


    res.status(200).json({cityData, weatherData, picture});
})



app.listen(process.env.SERVER_PORT, function () {
    console.log(`Example app listening on port ${process.env.SERVER_PORT}!`)
})