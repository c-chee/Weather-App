const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const weatherstackKey = process.env.WEATHERSTACK_KEY;

    if (!weatherstackKey) {
        return callback('Missing Weatherstack API key. Check your .env file.', undefined);
    }

    const url = `http://api.weatherstack.com/current?access_key=${weatherstackKey}&query=${latitude},${longitude}&units=f`;

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } 
        else if (!body || body.error) {
            callback('Unable to find location.', undefined);
        } 
        else {
            const description = body.current.weather_descriptions.join(', ');
            const temperature = body.current.temperature;
            const feelslike = body.current.feelslike;
            const precip = body.current.precip;

            callback(
                undefined, 
                `${description}. It is currently ${temperature}°F. Feels like ${feelslike}°F. Chance of rain: ${precip}%.`
            );
        }
    });
};

module.exports = forecast;
