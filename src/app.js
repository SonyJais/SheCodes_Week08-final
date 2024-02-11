function refreshWeather(response) {
  let tempVal = document.querySelector(".temp");
  let temperature = response.data.temperature.current;
  tempVal.innerHTML = Math.round(temperature);

  let moistureVal = document.querySelector("#humidity");
  let humidVal = response.data.temperature.humidity;
  moistureVal.innerHTML = Math.round(humidVal);

  let speedVal = document.querySelector("#windSpeed");
  let windSpeedVal = response.data.wind.speed;
  speedVal.innerHTML = Math.round(windSpeedVal, 2);

  let weatherVal = document.querySelector(".weather");
  let weatherstyle = response.data.condition.description;
  weatherVal.innerHTML = capitalizeFirstLetter(weatherstyle);

  let timeVal = document.querySelector(".time");
  let dayVal = document.querySelector(".dayName");
  let date = new Date(response.data.time * 1000);
  minuteVal = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
  dayValue = date.getDay(date);

  let daysFull = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  timeVal.innerHTML = `${date.getHours(date)}:${minuteVal}`;
  dayVal.innerHTML = daysFull[dayValue];

  let iconVal = document.querySelector("#icon");
  let emojiLink = `<img src="${response.data.condition.icon_url}" />`;
  iconVal.innerHTML = emojiLink;
  console.log(emojiLink);

  getForecast(response.data.city);
}

function searchCity(city) {
  let apiKey = "aa56bt976def310e73o04395caed4d33";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function buttonClick(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".search-input");
  let cityNameInput = document.querySelector(".cityName");
  cityNameInput.innerHTML = capitalizeFirstLetter(searchInput.value);
  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "aa56bt976def310e73o04395caed4d33";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="weather-forecast">
        <div class="forecast-day">${formatDay(day.time)}</div>
        <div class="forecast-icon"> <img src ="${
          day.condition.icon_url
        }" /></div>
        <div class="forecast-minmax">
          <div class="temp-max">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="temp-min">${Math.round(day.temperature.minimum)}º</div>
        </div>
      </div>
    `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector(".search-form");
searchFormElement.addEventListener("submit", buttonClick);

displayForecast();
