function formatDate(date) {
  let now = new Date();

  let time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let formatedTime = `${day} ${time}`;
  return formatedTime;
}

function displayWeatherConditions(response) {
  let temp = Math.round(response.data.main.temp);
  console.log(response);

  let tempDisplay = document.querySelector("#current-temp-id");
  tempDisplay.innerHTML = `${temp} ºF`;

  let currentDespriptionDisplay = document.querySelector("#dayOverview");
  currentDespriptionDisplay.innerHTML = response.data.weather[0].description;

  console.log(response.data.weather[0].main);
  let emojiDisplay = document.querySelector("#emoji");
  if (response.data.weather[0].main === "Clear") {
    emojiDisplay.innerHTML = "☀️";
  }
  if (response.data.weather[0].main === "Clouds") {
    emojiDisplay.innerHTML = "☁️";
  }
  if (response.data.weather[0].main === "Thunderstorm") {
    emojiDisplay.innerHTML = "🌩";
  }
  if (response.data.weather[0].main === "Drizzle") {
    emojiDisplay.innerHTML = "🌦";
  }
  if (response.data.weather[0].main === "Rain") {
    emojiDisplay.innerHTML = "🌧";
  }
  if (response.data.weather[0].main === "Snow") {
    emojiDisplay.innerHTML = "🌨";
  }
}

function showCityInfo(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#city-search-id");
  let changeToSearchCity = document.querySelector("#city-id");
  changeToSearchCity.innerHTML = `${searchCity.value}`;

  let apiKey = "4b32d099d56b1bcaf39ac804454fcf6a";
  let units = "imperial";
  let city = searchCity.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherConditions);
}

// For formatDate
let currentTime = document.querySelector("#time-id");
currentTime.innerHTML = formatDate(currentTime);

// For showCity
let citySearchForm = document.querySelector("#search-form");
citySearchForm.addEventListener("submit", showCityInfo);
