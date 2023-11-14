const apiKey = 'c82895bdc50b848e2df6533322b114cb';

// Function to fetch and display current weather
function getCurrentWeather(city) {
  // Use fetch to get geographical coordinates from OpenWeatherMap Geocoding API
  fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`)
    .then(response => response.json())
    .then(geoData => {
      const location = geoData[0]; // Extract coordinates

      // Fetch current weather data using coordinates
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${apiKey}`)
        .then(response => response.json())
        .then(weatherData => {
          // Extract relevant information from data and update UI
          updateCurrentWeatherUI(city, weatherData);
          saveSearchHistory(city); // Save searched city to history
        })
        .catch(error => {
          console.error('Error fetching current weather:', error);
        });
    })
    .catch(error => {
      console.error('Error fetching coordinates:', error);
    });
}
// Function to update the UI with current weather information
function updateCurrentWeatherUI(city, data) {
  // Extract relevant data from the response
  const currentWeather = data.current;
  const cityName = city;
  const weatherDate = new Date(currentWeather.dt * 1000); // Convert timestamp to date
  const weatherIcon = currentWeather.weather[0].icon;
  const temperature = currentWeather.temp;
  const humidity = currentWeather.humidity;
  const windSpeed = currentWeather.wind_speed;

  // Update the UI elements with the retrieved data
  document.getElementById('city-name').textContent = cityName;
  document.getElementById('weather-date').textContent = formatDate(weatherDate);
  document.getElementById('weather-icon').src = `https://openweathermap.org/img/w/${weatherIcon}.png`;
  document.getElementById('temperature').textContent = `Temperature: ${temperature} °F`;
  document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
  document.getElementById('wind-speed').textContent = `Wind Speed: ${windSpeed} MPH`;
}

// Function to format the date in 'Month Day, Year' format
function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
}

// Function to fetch and display 5-day forecast
function getWeatherForecast(city) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
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
    const date = new Date(item.dt_txt);
    const weatherIcon = item.weather[0].icon;
    const temperature = item.main.temp;
    const windSpeed = item.wind.speed;
    const humidity = item.main.humidity;

    const forecastItem = document.createElement('div');
    forecastItem.classList.add('forecast-item');
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















  // Example of fetching forecast data
function getWeatherForecast(city) {
    // Use fetch to get 5-day forecast data from the OpenWeatherMap API
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        // Extract relevant information from data and update UI
        updateForecastUI(data);
      })
      .catch(error => {
        console.error('Error fetching weather forecast:', error);
      });
  }

  // Example of updating the UI with forecast data
function updateForecastUI(data) {
    // Update the UI to display 5-day forecast information
    // Access data properties such as data.list[0].dt_txt, data.list[0].main.temp, etc.
    // Loop through the forecast data and update the UI accordingly
    for (const forecast of data.list) {
      const date = forecast.dt_txt;
      const temperature = forecast.main.temp;
      // Update the UI elements with the retrieved forecast data
      // For example, $("#forecast").append(`Date: ${date}, Temperature: ${temperature}<br>`);
    }
}

// Event listener for the form submission
$("#city-form").submit(function (event) {
  event.preventDefault();
  const city = $("#city-input").val();
  // Call functions to fetch and update weather data
  getCurrentWeather(city);
  getWeatherForecast(city);
});


    