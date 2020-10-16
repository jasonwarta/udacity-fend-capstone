const path = require('path')
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const GEONAMES_URL = 'http://api.geonames.org/searchJSON';
const WEATHER_URL = 'http://api.weatherbit.io/v2.0/forecast/daily';
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

let projectData = {}

// app.post('/nlp', async (req, res) => {
//     const url = "https://api.meaningcloud.com/sentiment-2.1";
//     const params = {
//         key: process.env.API_KEY,
//         lang: "en",
//         url: req.body.url
//     };
    
//     try {
//         const response = await axios({
//             url,
//             method: "POST",
//             params
//         });
//         const {score_tag, agreement, subjectivity, confidence, irony} = response.data;
//         res.status(200).json({score_tag, agreement, subjectivity, confidence, irony});
//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err)
//     }
// });

app.post('/collectData', async (req, res) => {
    const {city, country, date} = req.body;

    console.log({city, country, date})

    // get city data from GeoNames
    const cityData = await axios.get(GEONAMES_URL, {
        params: {
            username: process.env.GEONAMES_USERNAME,
            name: city,
            country,
            lang: 'en',
            maxRows: 1
        }
    })
    .then(({data: {geonames: [placeData]}}) => placeData);

    // Get weather data from WeatherBit using lat and long from geonames
    const {lat, lng} = cityData;
    const weatherData = await axios.get(WEATHER_URL, {
        params: {
            key: process.env.WEATHERBIT_API_KEY,
            units: 'I',
            lat,
            lon: lng,
        }
    })
    .then(({data: {data}}) => data.filter(({datetime}) => datetime === date));

    // get a photo of the city or country
    const picture = await axios.get(PIXABAY_URL, {
        params: {
            key: process.env.PIXABAY_API_KEY,
            q: city,
            image_type: 'photo',
            category: 'places'
        }
    })
    .then(({data: {hits: [{webformatURL}]}}) => webformatURL);


    res.status(200).json({cityData, weatherData, picture});
})



app.listen(process.env.SERVER_PORT, function () {
    console.log(`Example app listening on port ${process.env.SERVER_PORT}!`)
})