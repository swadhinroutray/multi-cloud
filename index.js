const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 8000;
const axios = require("axios");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/provider/:id/:city", async (req, res) => {
  console.log("hello this is basic function");
  const id = req.params.id;
  console.log(id);
  if (id == 1) {
    return await AWS(req, res);
  }
  if (id == 2) {
    return await IBM(req, res);
  }
  if (id == 3) {
    return await callLocal(req, res);
  } else
    return res.send({ text: "Wrong Choice", provider: "This is local server" });
});

async function AWS(req, res) {
  const city = req.params.city;
  let response = await axios.post(process.env.AWS_URI + "/weather-app", {
    city: city,
  });
  console.log(response);
  const obj = JSON.parse(response.data.body);
  res.send({ message: obj.text, provider: obj.cloud });
}

async function IBM(req, res) {
  const city = req.params.city;
  let response = await axios.post(
    process.env.IBM_URI + "/weather",
    {
      city: city,
    },
    {
      headers: {
        "X-IBM-Client-Id": process.env.IBM_API_KEY,
      },
    }
  );
  // console.log(response);
  const obj = response.data;
  res.send({ message: obj.text, provider: obj.cloud });
}
async function callLocal(req, res) {
  let city = req.params.city;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}`;
  let response = await axios.post(url);
  // console.log(response)
  const resp = response.data;
  // console.log(resp);
  const tempA = Math.trunc(resp.main.temp - 273);
  const tempF = Math.trunc(resp.main.feels_like - 273);
  const humidity = resp.main.humidity;
  const text = `Weather in ${city} is ${tempA}\xB0C but feels like ${tempF}\xB0C with ${humidity}% humidity`;

  return res.send({ text: text, cloud: "Hello from Local Server!" });
}

app.listen(PORT, () => {
  console.log(`Listening on Port:${PORT}`);
});
