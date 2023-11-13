// Example of fetching current weather data
function getCurrentWeather(city) {
    // Use fetch to get current weather data from the OpenWeatherMap API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid={YOUR_API_KEY}`)
      .then(response => response.json())
      .then(data => {
        // Extract relevant information from data and update UI
        updateCurrentWeatherUI(data);
      })
      .catch(error => {
        console.error('Error fetching current weather:', error);
      });
  }

  // Example of updating the UI with current weather data
function updateCurrentWeatherUI(data) {
    // Update the UI to display current weather information
    // Access data properties such as data.name, data.main.temp, etc.
    const cityName = data.name;
    const temperature = data.main.temp;
    // Update the UI elements with the retrieved data
    // For example, $("#current-weather").text(`City: ${cityName}, Temperature: ${temperature}`);
  }

  // Example of fetching forecast data
function getWeatherForecast(city) {
    // Use fetch to get 5-day forecast data from the OpenWeatherMap API
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid={YOUR_API_KEY}`)
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

  



// Example of updating the UI with current weather data
function updateCurrentWeatherUI(data) {
    // Update the UI to display current weather information
    // Access data properties such as data.name, data.main.temp, etc.
  }

  // Example of fetching forecast data
function getWeatherForecast(city) {
    // Use fetch to get 5-day forecast data from the OpenWeatherMap API
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid={634b0cc73b3b80106e8b3e30353b60fb}`)
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
  }




  