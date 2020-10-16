const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target.parentNode;
    const city = form.querySelector('input#city').value;
    const country = form.querySelector('input#country').value;
    const date = form.querySelector('input#date').value;

    if (city === '' || country === '' || date === '')
        alert('Please enter city, country, and date')

    fetch('http://localhost:8081/collectData', {
        method: 'POST',
        // mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            city, country, date
        })
    })
        .then(res => res.json())
        .then(res => console.log(res));

    console.log({city, country, date})

    console.log('yo')
}

export {handleSubmit}