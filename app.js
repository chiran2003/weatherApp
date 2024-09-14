document.getElementById('Search').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value;
    const apiKey = 'f9ae7eff7aea44298fb160050241209'; // Replace with your actual WeatherAPI key
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherData = `                   
                    <div class="card-flex">
                        <img src="${data.current.condition.icon}" alt="Weather icon">
                        <div class="card-flexdown">
                            <h1>${data.location.name}</h1>
                            <h3>${data.location.country}</h3>
                        </div>                          
                    </div>
                    <p>Weather: ${data.current.condition.text}</p>
                    <div id="hourlyCards">hourlycard</div>
            `;
            console.log(data);
            document.getElementById('currentLeftData').innerHTML = weatherData;
            document.getElementById('currenttemp').innerHTML =`${data.current.temp_c}°C`;
            document.getElementById('currenthumidity').innerHTML = `${data.current.humidity}%`;
            document.getElementById('currentwindSpeed').innerHTML = `${data.current.wind_kph} kph`;

        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weatherResult').innerHTML = '<p>Could not retrieve weather data. Please try again later.</p>';
        });
});
