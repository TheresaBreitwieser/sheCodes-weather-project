
//display current Date and Time

let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  
  let currentDayTime = new Date();
  let day = currentDayTime.getDay();
  day = days[day];
  let hours = currentDayTime.getHours();
  if (hours < 10) {hours = "0"+hours};
  let minutes = currentDayTime.getMinutes();
  if (minutes < 10) {minutes = "0"+minutes};
  
  let showDayTime = document.querySelector("#currentDayTime");
  showDayTime.innerHTML = (`${day}, ${hours}:${minutes}`);
  
  // search engine input-form City and display current data
  
  function showCurrentWeather(response) {
    console.log(response);
    let currentTemp = document.querySelector("#temp");
    let currentHumidity = document.querySelector("#humidity");
    let h1 = document.querySelector("h1");
    let weatherDescription = document.querySelector("#weather-description");
    let wind = document.querySelector("#wind-speed");
    let iconElement = document.querySelector("#icon");
    celsiusTemperature = Math.round(response.data.main.temp);
    currentTemp.innerHTML = Math.round(response.data.main.temp);
    currentHumidity.innerHTML = `Humidity: ${Math.round(response.data.main.humidity)}%`;
    h1.innerHTML = response.data.name;
    weatherDescription.innerHTML = response.data.weather[0].description;
    wind.innerHTML = `Wind speed: ${Math.round(response.data.wind.speed)} km/h`;
    iconElement.setAttribute("src", `images/${response.data.weather[0].icon}`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
  }
  
  function showCity(city) {
    let apiKey = "69a9e20cee3bd8ea7b1df001a08c1ef3";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(showCurrentWeather);
  }

  function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    showCity(city);
  }
  
  let searchForm = document.querySelector("#search-city-form");
  searchForm.addEventListener("submit", handleSubmit);

  // convert °C to Fahrenheit and reverse
  function convertToFahrenheit(event) {
    event.preventDefault();
    let fahrenheitTemperature = (celsiusTemperature * 9)/5+32;
    let temperatureElement = document.querySelector("#temp");
    temperatureElement.innerHTML = fahrenheitTemperature;
  }

  function convertToCelsius(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temp");
    temperatureElement.innerHTML = celsiusTemperature;
  }

  let celsiusTemperature = null;

  let tempFahrenheit = document.querySelector("#degrees");
  tempFahrenheit.addEventListener("click", convertToCelsius);

  let tempDegrees = document.querySelector("#fahrenheit");
  tempDegrees.addEventListener("click", convertToFahrenheit);
  
  // button - search for current location - API call with lat.long.
  
  function retrievePosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "69a9e20cee3bd8ea7b1df001a08c1ef3";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(showCurrentWeather);
  }
  
  function getCurrentPosition (event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(retrievePosition);
    }
  
  let locationButton = document.querySelector("#buttonLocation");
  locationButton.addEventListener("click", getCurrentPosition);

  showCity("Vienna");