export const getDateDifferenceForNow = (fromDate) => {
    let difference = new Date().getTime() - new Date(fromDate).getTime();

    difference = difference / 60000; // Convert milliseconds to minutes
    let yearDifference = Math.floor(difference / 525600); // 525600 minutes in a year (365 days)
    difference -= yearDifference * 525600; // Subtract the minutes of full years
    let dayDifference = Math.floor(difference / 1440); // 1440 minutes in a day
    difference -= dayDifference * 1440; // Subtract the minutes of full days
    let hourDifference = Math.floor(difference / 60); // 60 minutes in an hour
    difference -= hourDifference * 60; // Subtract the minutes of full hours

    let message = "";

    // Year Count
    if (yearDifference > 0) {
        message = `${yearDifference} years`;
    }
    // Day Count
    if (dayDifference > 0) {
        message = message ? `${message} ${dayDifference} days` : `${dayDifference} days`;
    }
    // Hour Count
    if (hourDifference > 0) {
        message = message ? `${message} ${hourDifference} hours` : `${hourDifference} hours`;
    }
    // Minute Count
    if (difference > 0) {
        message = message ? `${message} ${Math.round(difference)} minutes` : `${Math.round(difference)} minutes`;
    }

    return message;
}
