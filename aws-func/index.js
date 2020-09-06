'use strict';
const fetch  =require('node-fetch')
exports.handler = async (event) => {
    let city = event.body.city
    let text;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}`;
    await fetch(url)
      .then((data) => data.json())
      .then(async (resp) => {
        console.log(resp);
        const tempA = Math.trunc(resp.main.temp - 273);
        const tempF = Math.trunc(resp.main.feels_like - 273);
        const humidity = resp.main.humidity;
        text = `Weather in ${city} is ${tempA}\xB0C but feels like ${tempF}\xB0C with ${humidity}% humidity`;
        console.log(text);
        })
     return {
        'statusCode': 200,
        'headers': { 'Content-Type': 'application/json' },
        'body': JSON.stringify({ 'text': text })
    }
      
};
