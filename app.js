var api = "http://api.openweathermap.org/data/2.5/weather?q=";
var andUnits = "&units=";
var apiKey = "&appid=87846ec7c9b24097c9951ca770e54585";

var units = "imperial";

fetch("city.list.json")
  .then(response => response.json())
  .then(json => console.log(json));

document.getElementById("city").onkeypress = function(event) {
  if (event.keyCode == 13 || event.which == 13){
    document.getElementById("main-information").style.visibility = "visible";
    document.getElementById("main-temp-icon").style.visibility = "visible";
    document.getElementById("additional-information-div").style.visibility = "visible";
    document.getElementById("more-info-table").style.visibility = "visible";
    document.getElementById("search-for-location").innerHTML = "";
    getWeather();
  }
};

async function getWeather(clicked_id = null) {
  if (document.getElementById("city").value.length == 0) {
  }

  if (clicked_id == "c-to-f") {
    units = "imperial";
    document.getElementById("c-to-f").style.backgroundColor = "#ff304f";
    document.getElementById("f-to-c").style.backgroundColor = "#775ada";
  }
  else if (clicked_id == "f-to-c") {
    units = "metric";
    document.getElementById("c-to-f").style.backgroundColor = "#775ada";
    document.getElementById("f-to-c").style.backgroundColor = "#ff304f";
  }

  var city_location = document.getElementById("city").value;
  var weather_url = api + city_location + andUnits + units + apiKey;
  const response = await fetch(weather_url);
  data = await response.json();

  console.log(weather_url);
  console.log(data);

  document.getElementById("humidity").textContent = data.main.humidity + "%";


  if (units == "imperial") {
    document.getElementById("main-temp").textContent = Math.round(data.main.temp) + "°F";
    document.getElementById("feels-like").textContent = "Ощущается как " + Math.round(data.main.feels_like) + "°F";
    document.getElementById("high").textContent = Math.round(data.main.temp_max) + "°F";
    document.getElementById("low").textContent = Math.round(data.main.temp_min) + "°F";
    document.getElementById("wind_speed").textContent = data.wind.speed + " миль/час";
  }
  else {
    document.getElementById("main-temp").textContent = Math.round(data.main.temp) + "°C";
    document.getElementById("feels-like").textContent = "Ощущается как " + Math.round(data.main.feels_like) + "°C";
    document.getElementById("high").textContent = Math.round(data.main.temp_max) + "°C";
    document.getElementById("low").textContent = Math.round(data.main.temp_min) + "°C";
    var windspeed = 3.6 * data.wind.speed;
    document.getElementById("wind_speed").textContent = windspeed.toFixed(2) + " км/ч";
  }
}

getWeather()
