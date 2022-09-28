"use strict";
// const API_KEY = '9a960ef52eb6c134ff3ed50341d4e861';
// Tutorial by http://youtube.com/CodeExplained

const API_KEY = "9a960ef52eb6c134ff3ed50341d4e861";
const icon = document.querySelector(".weather-icon");
const temp = document.querySelector(".temperature-value");
const description = document.querySelector(".temperature-description");
const locations = document.querySelector(".location-info");
const notification = document.querySelector(".notification");
const weatherContainer = document.querySelector(".weatherContainer");
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
  weather.main = data.weather[0].main;
  weather.country = data.sys.country;

  displayWeather();
  
}

// display weather to UI
function displayWeather() {
  icon.innerHTML = `<img src="images/${weather.id}.png" />`;
  temp.innerHTML = `<p>${weather.temp} °<span>c</span></p>`;
  description.innerHTML = `<p>${weather.description}</p>`;
  locations.innerHTML = `<p>${weather.city}</p> <p>${weather.country}</p>`;
  displayBackground();
}

function displayBackground(){
  if(weather.main == "Clouds"){
    weatherContainer.style.backgroundImage = `url(images/Clouds.jpg)`;
  }else if(weather.main == "Rain"){
    weatherContainer.style.backgroundImage = `url(images/Rain.jpg)`;
  }else if(weather.main == "Snow"){
    weatherContainer.style.backgroundImage = `url(images/Snow.jpg)`;
  }
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