document.getElementById('Search').addEventListener('click', function() {
    currentday();
    historical();
});
function currentday(){
    const city = document.getElementById('cityInput').value;
    const apiKey = 'f9ae7eff7aea44298fb160050241209'; 
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

            const currentDate = new Date();
            document.getElementById('currentday').innerHTML =`${currentDate.toLocaleString('en-US', { weekday: 'long' })}`;
            document.getElementById('currentdate').innerHTML =`${currentDate.toISOString().split('T')[0]}`;

        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weatherResult').innerHTML = '<p>Could not retrieve weather data. Please try again later.</p>';
        });
}

async function historical() {
    const apiKey = 'f9ae7eff7aea44298fb160050241209'; 
    const location = document.getElementById('cityInput').value;
    const currentDate = new Date();
    let weatherData = ''; // Change to 'let' to allow modification

    // Array to hold all fetch requests
    let fetchPromises = [];

    for (let i = 0; i < 7; i++) {
        // Calculate the date for the past 7 days
        const pastDate = new Date(currentDate);
        pastDate.setDate(currentDate.getDate() - i);
        const formattedDate = pastDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD

        // Store each fetch promise in the array
        const fetchPromise = fetch(`http://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${location}&dt=${formattedDate}`)
            .then(response => response.json())
            .then(data => {
                // Build the HTML for each day's weather data
                const days = `
                    <div class="flexCardBar">
                        <div>
                            <h2>${formattedDate}</h2>
                            <h1>${pastDate.toLocaleString('en-US', { weekday: 'long' })}</h1>
                        </div>
                        <!-- temperature -->
                        <div>
                            <h4>Temperature</h4>
                            <div class="card-flex">
                                <i class="bi bi-thermometer-sun"></i> 
                                <h1>${data.forecast.forecastday[0].day.avgtemp_c}°C</h1>
                            </div>
                        </div>
                        <!-- humidity -->
                        <div>
                            <h4>Humidity</h4>
                            <div class="card-flex">
                                <i class="bi bi-moisture"></i>
                                <h1>${data.forecast.forecastday[0].day.avghumidity}%</h1>
                            </div>
                        </div>
                        <!-- wind speed -->
                        <div>
                            <h4>Wind Speed</h4>
                            <div class="card-flex">
                                <i class="bi bi-wind"></i>
                                <h1>${data.forecast.forecastday[0].day.maxwind_kph} kph</h1>
                            </div>
                        </div>
                    </div>`;
                
                // Concatenate the HTML to the weatherData string
                weatherData += days;
            })
            .catch(error => {
                console.log('Error fetching weather data:', error);
            });

        // Add each fetch promise to the array
        fetchPromises.push(fetchPromise);
    }

    // Wait for all fetch promises to complete
    await Promise.all(fetchPromises);

    // Update the DOM after all data is fetched
    document.getElementById('historycalDays').innerHTML = weatherData;
}
