//declare variables to get the DOM nodes

const loc = document.getElementById("location");
const temNum = document.getElementById("temperature-num");
const temScale = document.getElementById("temperature-scale");
const weatherCon = document.getElementById("weather-condition");
const weatherIcon = document.getElementById("weather-icon");
const togButton = document.getElementById("toggle-button");
const weather_background = document.getElementById("weather_container");
//get location using HTML5 Geolocation 
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      getWeather(position.coords.latitude, position.coords.longitude);
    });
  } else {
    loc.innerHTML = "Geolocation is not supported by this browser.";
  }
}

//fetch api of weather data according to my location
function getWeather(lat, long) {
  const root = "https://fcc-weather-api.glitch.me/api/current?";
  fetch(`${root}lat=${lat}&lon=${long}`, { method: "get" })
    .then(resp => resp.json())
    .then(data => {
      updateDataToUI(data.name, data.weather, data.main.temp);
    })
    .catch(function(err) {
      console.error(err);
    });
}
// update the data from API to DOM
function updateDataToUI(location, weather, temp) {
  weatherIcon.innerHTML = `<img src="${weather[0].icon}" />`;
  weatherCon.innerHTML = weather[0].main;
  loc.innerHTML = location;
  temNum.innerHTML = `${temp.toFixed()}`;
  if(weatherCon.innerHTML == "Clouds")
  {
    document.body.style.backgroundImage = "url('https://www.publicdomainpictures.net/pictures/270000/nahled/cloudy-skies-background.jpg') alt = 'clouds'";
  }else if (weatherCon.innerHTML == "Sunny")
  {
    document.body.style.backgroundImage = "url('https://image.freepik.com/free-vector/sunshine-background-poster_1284-9444.jpg') alt = 'sun'";
  }else if (weatherCon.innerHTML == "Snow")
  {
    document.body.style.backgroundImage = "url('https://th.bing.com/th/id/R65bfec300822a22bdbcf78b6608ee28b?rik=oyoPHyG4rRQEbw&riu=http%3a%2f%2fi.huffpost.com%2fgen%2f1503368%2fimages%2fo-SNOWFALL-facebook.jpg&ehk=Y9D3zQdHUHGnyvQCXoqyNsV1zLSdduw8zRqY3ibrOk8%3d&risl=&pid=ImgRaw') alt = 'snow'";
  }
}
window.onload = function() {
  getLocation();
};
// helper function change from C to F
function cToF(celsius) {
  return celsius * 9 / 5 + 32;
}
// helper function: change from F to C
function fToC(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}
function toggleScale() {
  if (temScale.innerHTML === "C") {
    temNum.innerHTML = cToF(temNum.innerHTML).toFixed();
    temScale.innerHTML = "F";
  } else if (temScale.innerHTML === 'F') {
    temNum.innerHTML = fToC(temNum.innerHTML).toFixed();
    temScale.innerHTML = "C";
  }
}
// toggle the temperature scale
togButton.addEventListener("click", toggleScale);