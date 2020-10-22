import assignDataToElements from './assignDataToElements';

const onload = () => {
    const tripData = window.localStorage.getItem('tripData');

    if (!tripData) return;

    assignDataToElements(JSON.parse(tripData));
}

export default onload;