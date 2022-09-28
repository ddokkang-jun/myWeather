"use strict";
// const API_KEY = '9a960ef52eb6c134ff3ed50341d4e861';
// Tutorial by http://youtube.com/CodeExplained

const API_KEY = "9a960ef52eb6c134ff3ed50341d4e861";
const icon = document.querySelector(".weather-icon");
const temp = document.querySelector(".temperature-value");
const description = document.querySelector(".temperature-description");
const locations = document.querySelector(".location-info");
const notification = document.querySelector(".notification");
const weather = {};

async function getWeather(lat, log) {
  let url = new URL(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=${API_KEY}&units=metric`
  );
  let data = await fetch(url).then((response) => response.json());

  console.log(data);
  weather.city = data.name;
  let temperatureData = data.main.temp;
  weather.temp = Math.floor(temperatureData);
  weather.description = data.weather[0].description;
  weather.id = data.weather[0].icon;

  displayWeather();
}

// display weather to UI
function displayWeather() {
  icon.innerHTML = `<img src="images/${weather.id}.png" />`;
  temp.innerHTML = `<p>${weather.temp} °<span>C</span></p>`;
  description.innerHTML = `<p>${weather.description}</p>`;
  locations.innerHTML = `<p>${weather.city}</p>`;
}

// check if browser supports geolocation
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  notification.getElementsByClassName.display = "block";
  notification.innerHTML = "<p>Browser doesn 't support Geolocation</p>";
}

// set user ' s position
function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  getWeather(latitude, longitude);
}

function showError(error) {
  notification.style.display = "block";
  notification.innerHTML = `<p>${error.message}</p>`;
}

getWeather();