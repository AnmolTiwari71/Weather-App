const apiKey = "ba9d5e8336655d3618fae002ac158a98"; // Replace with your OpenWeatherMap API key
const searchButton = document.querySelector(".search button");
const searchInput = document.querySelector(".search input");
const weatherIcon = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temp");
const cityElement = document.querySelector(".city");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");

// Function to fetch weather data from OpenWeather API
async function getWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    updateWeatherDetails(data);
  } catch (error) {
    alert(error.message);
  }
}

// Function to update the weather details in the DOM
function updateWeatherDetails(data) {
  const temperature = data.main.temp;
  const city = data.name;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;
  const weatherCondition = data.weather[0].main;

  // Update weather information in the UI
  tempElement.innerHTML = `${Math.round(temperature)}°C`;
  cityElement.innerHTML = city;
  humidityElement.innerHTML = `${humidity}%`;
  windElement.innerHTML = `${windSpeed} km/h`;

  // Change the weather icon based on the weather condition
  switch (weatherCondition) {
    case "Clear":
      weatherIcon.src = "images/clear.png";
      break;
    case "Rain":
      weatherIcon.src = "images/rain.png";
      break;
    case "Snow":
      weatherIcon.src = "images/snow.png";
      break;
    case "Clouds":
      weatherIcon.src = "images/clouds.png";
      break;
    case "Mist":
      weatherIcon.src = "images/mist.png";
      break;
    default:
      weatherIcon.src = "images/drizzle.png";
      break;
  }
}

// Event listener for search button click
searchButton.addEventListener("click", () => {
  const city = searchInput.value.trim();
  if (city) {
    getWeather(city);
  } else {
    alert("Please enter a city name");
  }
});

// Event listener for pressing Enter in the input field
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const city = searchInput.value.trim();
    if (city) {
      getWeather(city);
    }
  }
});
