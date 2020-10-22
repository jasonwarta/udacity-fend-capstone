import assignDataToElements from './assignDataToElements';

const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target.parentNode.parentNode;
    const city = form.querySelector('input#city').value;
    const date = form.querySelector('input#date').value;

    // break out of function if incomplete data is entered by user
    if (city === '' || date === '') {
        alert('Please enter city, and date')
        return
    }

    // get data
    fetch('http://localhost:8081/collectData', {
        method: 'POST',
        // mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            city, date
        })
    })
        .then(res => res.json())
        .then(res => console.log(res) || res)
        .then(({
            // destructure relevant city data
            cityData: {
                name: cityName,
                countryName
            },
            // backend filters to return just the picture url here
            picture,
            // destructure relevant weather data
            weatherData: {
                max_temp,
                min_temp,
                clouds
            }
        }) => {
            window.tripData = {
                date,
                city: {
                    cityName,
                    countryName
                },
                picture,
                weather: {
                    maxTemp: max_temp,
                    minTemp: min_temp,
                    clouds
                }
            }

            assignDataToElements(window.tripData);
        });
}

export default handleSubmit;