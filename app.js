document.getElementById('Search').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value;
    const apiKey = '9adbba76da2c4c07b2b135336241009'; // Replace with your actual WeatherAPI key
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherData = `
                <h2>${data.location.name}, ${data.location.country}</h2>
                <p>Temperature: ${data.current.temp_c}°C</p>
                <p>Weather: ${data.current.condition.text}</p>
                <img src="${data.current.condition.icon}" alt="Weather icon">
                <p>Humidity: ${data.current.humidity}%</p>
                <p>Wind: ${data.current.wind_kph} kph</p>
            `;
            console.log(data);
            document.getElementById('weatherResult').innerHTML = weatherData;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weatherResult').innerHTML = '<p>Could not retrieve weather data. Please try again later.</p>';
        });
});
