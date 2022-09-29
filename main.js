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
let now = new Date();
now = now.getHours();

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

async function getWeather(lat, log) {
  let url = new URL(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=${API_KEY}&units=metric`
  );
  let data = await fetch(url).then((response) => response.json());

  console.log(data);
  weather.city = data.name; // 도시이름
  let temperatureData = data.main.temp;
  weather.temp = Math.floor(temperatureData); // 온도
  weather.description = data.weather[0].description; // 날씨설명
  weather.id = data.weather[0].icon; // 날씨 아이콘
  weather.main = data.weather[0].main; // 날씨상태
  weather.country = data.sys.country; // 국가명

  if (6 < now && now < 18) {
    callAM();
  } else if (now >= 18 || now <= 6) {
    callPM();
  }
}

function callAM() {
  displayWeather();
  if (weather.main == "Cloud") {
    // 구름낀 오전
    weatherContainer.style.backgroundImage = `url(images/Clouds.jpg)`;
  } else if (weather.main == "Clear") {
    // 화창한 오전
    weatherContainer.style.backgroundImage = `url(images/clean-am02.jpg)`;
  } else if (weather.main == "Rain") {
    // 비내리는 오전
    weatherContainer.style.backgroundImage = `url(images/Rain.jpg)`;
  } else {
    // 눈내리는 오전
    weatherContainer.style.backgroundImage = `url(images/Snow.jpg)`;
  }
}

function callPM() {
  displayWeather();
  if (weather.main == "Cloud") {
    // 구름낀 오후
    weatherContainer.style.backgroundImage = `url(images/cloud-night.jpg)`;
  } else if (weather.main == "Clear") {
    // 화창한 오후
    weatherContainer.style.backgroundImage = `url(images/clean-night02.jpg)`;
  } else if (weather.main == "Rain") {
    // 비내리는 오후
    weatherContainer.style.backgroundImage = `url(images/rain-night.jpg)`;
  } else {
    // 눈내리는 오후
    weatherContainer.style.backgroundImage = `url(images/snow-night.jpg)`;
  }
}

// display weather to UI
function displayWeather() {
  icon.innerHTML = `<img src="images/${weather.id}.png" />`;
  temp.innerHTML = `<p>${weather.temp} °<span>c</span></p>`;
  description.innerHTML = `<p>${weather.description}</p>`;
  locations.innerHTML = `<p>${weather.city}</p> <p>${weather.country}</p>`;
}

getWeather();
