// ✅ Replace with your real API key
const API_KEY = "your_real_api_key";

function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const weatherResult = document.getElementById('weatherResult');

  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  console.log("Calling URL:", url); // Debug: check constructed API URL

  fetch(url)
    .then(response => {
      console.log("Status:", response.status); // Debug: response status code

      if (!response.ok) {
        return response.json().then(err => {
          console.error("Error body:", err); // Debug: error body from API
          throw new Error(err.message || "City not found");
        });
      }

      return response.json();
    })
    .then(data => {
      // Display fetched data in the UI
      document.getElementById('cityName').textContent = data.name;
      document.getElementById('temperature').textContent = data.main.temp;
      document.getElementById('humidity').textContent = data.main.humidity;
      document.getElementById('description').textContent = data.weather[0].description;

      weatherResult.classList.remove("hidden"); // Show the result box
    })
    .catch(error => {
      alert("Error: " + error.message);
      weatherResult.classList.add("hidden"); // Hide result on error
    });
}
