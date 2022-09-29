
// 브라우저 내장객체중 navigator를 사용해서
// navigator객체에 geolocation 이 있는가? 를 if문으로 체크함 있으면 true 실행하고 없으면 없는걸 실행

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

  // getWeather(latitude, longitude);
}

function showError(error) {
  notification.style.display = "block";
  notification.innerHTML = `<p>${error.message}</p>`;
}

// 시간
let now = new Date();
now = now.getHours();

if(6 < now && now < 18){
  callAM();
}else if(now >= 18 || now <= 6){
  callPM();
}

function callAM(){
  if(weather.value == "cloud" ){
    // 구름낀 오전
  }else if(weather.value == "clean"){
    // 화창한 오전
  }else if(weather.value == "Rain"){
    // 비내리는 오전
  }else {
    // 눈내리는 오전
  }
};
function callPM(){
  if(weather.value == "cloud" ){
    // 구름낀 오후
  }else if(weather.value == "clean"){
    // 화창한 오후
  }else if(weather.value == "Rain"){
    // 비내리는 오후
  }else {
    // 눈내리는 오후
  }
};