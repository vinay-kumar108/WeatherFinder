const apiKey = document.getElementById('api-key').innerText;

document.getElementById('searchButton').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    if (city) {
        getWeather(city);
    } else {
        displayError('Please enter a city name.');
    }
});

async function getWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        const data = await response.json();
        if (data.cod === 200) {
            displayWeather(data);
            document.getElementById('error-message').innerText = '';
        } else {
            displayError(data.message);
        }
    } catch (error) {
        displayError('Failed to fetch data. Please try again later.');
    }
}

function displayWeather(data) {
    document.getElementById('cityName').innerText = `City: ${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').innerText = `Temperature: ${data.main.temp}°C`;
    document.getElementById('description').innerText = `Description: ${data.weather[0].description}`;
    document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind').innerText = `Wind Speed: ${data.wind.speed} m/s`;
}

function displayError(message) {
    document.getElementById('error-message').innerText = message;
}
