const calculateCountdown = (travelDate) => {
    const today = new Date();
    const future = new Date(travelDate);

    const difference = (future.getTime() - today.getTime()) / (24 * 60 * 60 * 1000);

    return Math.round(difference);
}

export default calculateCountdown;