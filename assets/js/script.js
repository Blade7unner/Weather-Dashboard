const apiKey = 'c82895bdc50b848e2df6533322b114cb';

// Function to fetch and display current weather
function getCurrentWeather(city) {
  // Fetch current weather data using the city name
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`)
    .then(response => response.json())
    .then(weatherData => {
      // Extract relevant information from data and update UI
      updateCurrentWeatherUI(city, weatherData);
      saveSearchHistory(city); // Save searched city to history
    })
    .catch(error => {
      console.error('Error fetching current weather:', error);
    });
}

// Function to update the UI with current weather information
function updateCurrentWeatherUI(city, data) {
  if (data.main && data.main.temp) {
    // Extract relevant data from the response
    const cityName = city;
    const weatherDate = new Date(data.dt * 1000); // Convert timestamp to date
    const weatherIcon = data.weather[0].icon;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    // Update the UI elements with the retrieved data
    document.getElementById('city-name').textContent = cityName;
    document.getElementById('weather-date').textContent = formatDate(weatherDate);
    document.getElementById('weather-icon').src = `https://openweathermap.org/img/w/${weatherIcon}.png`;
    document.getElementById('temperature').textContent = `Temperature: ${temperature} °F`;
    document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
    document.getElementById('wind-speed').textContent = `Wind Speed: ${windSpeed} MPH`;
  } else {
    console.error('Error: Unexpected API response format');
  }
}

// Function to format the date in 'Month Day, Year' format
function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
}

// Function to fetch and display 5-day forecast
function getWeatherForecast(city) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      // Extract relevant information from data and update UI
      updateForecastUI(data.list);
    })
    .catch(error => {
      console.error('Error fetching weather forecast:', error);
    });
}

// Function to update the UI with forecast data
function updateForecastUI(forecastData) {
  const forecastInfo = document.getElementById('forecast-info');
  forecastInfo.innerHTML = ''; // Clear previous data

  // Loop through the forecast data and create forecast items
  forecastData.forEach(item => {
    const date = new Date(item.dt * 1000);
    const weatherIcon = item.weather[0].icon;
    const temperature = item.main.temp;
    const windSpeed = item.wind.speed;
    const humidity = item.main.humidity;

    const forecastItem = document.createElement('div');
    forecastItem.classList.add('forecast-item'); // Add a class for styling
    forecastItem.innerHTML = `
      <p>${formatDate(date)}</p>
      <img src="https://openweathermap.org/img/w/${weatherIcon}.png" alt="Weather Icon">
      <p>Temp: ${temperature} °F</p>
      <p>Wind: ${windSpeed} MPH</p>
      <p>Humidity: ${humidity}%</p>
    `;

    forecastInfo.appendChild(forecastItem);
  });
}

// Function to save searched city to search history
function saveSearchHistory(city) {
  const historyList = document.getElementById('history-list');
  const searchItem = document.createElement('li');
  searchItem.textContent = city;
  searchItem.addEventListener('click', () => {
    // Handle click on search history item to re-fetch weather data
    getCurrentWeather(city);
    getWeatherForecast(city);
  });
  historyList.appendChild(searchItem);
}

// Event listener for the form submission
document.getElementById('city-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const city = document.getElementById('city-input').value;
  // Call functions to fetch and update weather data
  getCurrentWeather(city);
  getWeatherForecast(city);
});

// Initial weather display for a default city (e.g., your current location)
getCurrentWeather('Atlanta');
getWeatherForecast('Atlanta');




    