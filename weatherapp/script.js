const apiKey = "52298ceb7461163029d5dfc03f71c941";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchInput = document.getElementById('searchInput');
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Mapping weather types to icons
const weatherIcons = {
  Clouds: "weather/clouds.png",
  Clear: "weather/clear.png",
  Rain: "weather/rain.png",
  Drizzle: "weather/drizzle.png",
  Mist: "weather/mist.png",
  Snow: "weather/snow.png",
};

// Event listeners
searchInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') { 
      search();
    }
});

searchBtn.addEventListener("click", search);

async function search() {
    const searchTerm = searchInput.value;
    if (!searchTerm) {
      alert('Please enter a city name');
      return;
    }
    console.log('Searching for:', searchTerm);
    try {
      const data = await getWeather(searchTerm);
      displayWeather(data);
    } catch (error) {
      console.error('Error:', error);
      displayError();
    }
}

async function getWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

function displayWeather(data) {
  if (!data) {
    return;
  }

  // Show weather data
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°c" ;
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + "km/h" ;
  
  // Show corresponding weather icon
  weatherIcon.src = weatherIcons[data.weather[0].main] || "weather/default.png";

  // Show weather info and hide error message
  document.querySelector(".weather").style.display = "block";
  document.querySelector(".error").style.display = "none";
}

function displayError() {
  // Hide weather info and show error message
  document.querySelector(".weather").style.display = "none";
  document.querySelector(".error").style.display = "block";
}
