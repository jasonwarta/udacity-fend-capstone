import calculateCountdown from './calculateCountdown';

const assignDataToElements = (data) => {
    const {
        date,
        city: {
            cityName,
            countryName
        },
        picture,
        weather: {
            maxTemp,
            minTemp,
            clouds
        }
    } = data;

    // set countdown
    document.querySelector('#countdown #city').innerText = `${cityName}, ${countryName}`;
    document.querySelector('#countdown #days').innerText = calculateCountdown(date);

    if (cityName && countryName) {
        document.querySelector('#tripName #city').innerText = `${cityName}, ${countryName}`;
        document.querySelector('#tripName #date').innerText = `${date}`;
    }

    if (picture)
        document.querySelector('#image img').src = picture;

    if (maxTemp && minTemp && clouds) {
        document.querySelector('#weather #high').innerText = maxTemp;
        document.querySelector('#weather #low').innerText = minTemp;
        document.querySelector('#weather #clouds').innerText = clouds;
    }

    document.querySelector('.trip').style.display = 'grid';
}

export default assignDataToElements;