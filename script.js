// ===============================
// OPENWEATHER API KEY
// ===============================
const API_KEY = "cc88e617d279f04efc2914ce4f185e9a";

// Elements
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherCard = document.getElementById("weatherCard");
const welcome = document.getElementById("welcome");
const message = document.getElementById("message");

// Search button
searchBtn.addEventListener("click", searchWeather);

// Enter key
cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") searchWeather();
});

// Get weather
async function searchWeather() {

  const city = cityInput.value.trim();

  if (!city) {
    message.textContent = "⚠️ Please enter a city name.";
    return;
  }

  if (API_KEY === "YOUR_API_KEY") {
    message.textContent = "⚠️ Please add your OpenWeather API key.";
    return;
  }

  message.textContent = "🔄 Loading weather...";

  try {

    const url =
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {

      if (response.status === 401) {
        throw new Error("Invalid API key.");
      }

      if (response.status === 404) {
        throw new Error("City not found.");
      }

      throw new Error(data.message || "Unable to get weather.");
    }

    showWeather(data);

  } catch (error) {

    weatherCard.classList.add("hidden");
    welcome.classList.remove("hidden");

    message.textContent = "❌ " + error.message;
  }
}

// Display weather
function showWeather(data) {

  message.textContent = "";

  welcome.classList.add("hidden");
  weatherCard.classList.remove("hidden");

  // Location
  document.getElementById("city").textContent =
    `${data.name}, ${data.sys.country}`;

  // Date
  document.getElementById("date").textContent =
    new Date().toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });

  // Temperature
  document.getElementById("temperature").textContent =
    Math.round(data.main.temp);

  // Feels like
  document.getElementById("feelsLike").textContent =
    Math.round(data.main.feels_like);

  // Condition
  document.getElementById("condition").textContent =
    data.weather[0].description;

  // Humidity
  document.getElementById("humidity").textContent =
    `${data.main.humidity}%`;

  // Wind
  document.getElementById("wind").textContent =
    `${Math.round(data.wind.speed * 3.6)} km/h`;

  // Pressure
  document.getElementById("pressure").textContent =
    `${data.main.pressure} hPa`;

  // Visibility
  document.getElementById("visibility").textContent =
    data.visibility
      ? `${(data.visibility / 1000).toFixed(1)} km`
      : "N/A";

  // Weather icon
  document.getElementById("weatherIcon").textContent =
    getWeatherIcon(data.weather[0].main);
}

// Weather icons
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
    Haze: "🌫️",
    Smoke: "🌫️",
    Dust: "🌪️",
    Sand: "🌪️"
  };

  return icons[weather] || "🌤️";
}