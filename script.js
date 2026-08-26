const API_KEY = "YOUR_API_KEY";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherCard = document.getElementById("weatherCard");
const welcome = document.getElementById("welcome");
const message = document.getElementById("message");

searchBtn.addEventListener("click", searchWeather);

cityInput.addEventListener("keydown", e => {
  if (e.key === "Enter") searchWeather();
});

async function searchWeather() {

  const city = cityInput.value.trim();

  if (!city) {
    message.textContent = "Please enter a city name.";
    return;
  }

  if (API_KEY === "YOUR_API_KEY") {
    message.textContent = "Please add your OpenWeatherMap API key in script.js";
    return;
  }

  message.textContent = "Loading weather...";

  try {

    const url =
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "City not found");
    }

    showWeather(data);

  } catch (error) {

    weatherCard.classList.add("hidden");
    welcome.classList.remove("hidden");

    message.textContent =
      "❌ " + error.message;

  }
}

function showWeather(data) {

  message.textContent = "";
  welcome.classList.add("hidden");
  weatherCard.classList.remove("hidden");

  document.getElementById("city").textContent =
    `${data.name}, ${data.sys.country}`;

  document.getElementById("date").textContent =
    new Date().toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long"
    });

  document.getElementById("temperature").textContent =
    Math.round(data.main.temp);

  document.getElementById("feelsLike").textContent =
    Math.round(data.main.feels_like);

  document.getElementById("condition").textContent =
    data.weather[0].description;

  document.getElementById("humidity").textContent =
    `${data.main.humidity}%`;

  document.getElementById("wind").textContent =
    `${Math.round(data.wind.speed * 3.6)} km/h`;

  document.getElementById("pressure").textContent =
    `${data.main.pressure} hPa`;

  document.getElementById("visibility").textContent =
    `${(data.visibility / 1000).toFixed(1)} km`;

  document.getElementById("weatherIcon").textContent =
    getWeatherIcon(data.weather[0].main);
}

function getWeatherIcon(weather) {

  const icons = {
    Clear: "☀️",
    Clouds: "☁️",
    Rain: "🌧️",
    Drizzle: "🌦️",
    Thunderstorm: "⛈️",
    Snow: "❄️",
    Mist: "🌫️",
    Fog: "🌫️",
    Haze: "🌫️"
  };

  return icons[weather] || "🌤️";
}