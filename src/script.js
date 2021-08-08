
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
  
  function showCurrentTempCurrentLocation(response) {
    let currentTemp = document.querySelector("#temp");
    currentTemp.innerHTML = Math.round(response.data.main.temp);
    let currentHumidity = document.querySelector("#humidity");
    let dataCurrentHumidity = Math.round(response.data.main.humidity);
    currentHumidity.innerHTML = `Humidity: ${dataCurrentHumidity}%`;
    let h1 = document.querySelector("h1");
    h1.innerHTML = response.data.name;
  }
  
  function showCity(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#city-input");
    let apiKey = "69a9e20cee3bd8ea7b1df001a08c1ef3";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiKey}`;
  
    axios.get(apiUrl).then(showCurrentTempCurrentLocation);
  }
  
  let searchForm = document.querySelector("#search-city-form");
  searchForm.addEventListener("submit", showCity);
  
  // button - search for current location - API call with lat.long.
  
  function retrievePosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "69a9e20cee3bd8ea7b1df001a08c1ef3";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(showCurrentTempCurrentLocation);
  }
  
  function getCurrentPosition (event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(retrievePosition);
    }
  
  let locationButton = document.querySelector("#buttonLocation");
  locationButton.addEventListener("click", getCurrentPosition);