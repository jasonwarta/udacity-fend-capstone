const removeTrip = () => {
    window.localStorage.removeItem('tripData');
    document.querySelector('.trip').style.display = 'none';
}

export default removeTrip;