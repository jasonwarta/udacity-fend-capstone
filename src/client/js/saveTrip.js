const saveTrip = () => {
    if (!window.tripData) {
        alert('no trip data to save')
        return;
    }

    window.localStorage.setItem('tripData', JSON.stringify(window.tripData))
}

export default saveTrip;