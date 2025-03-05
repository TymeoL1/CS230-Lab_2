function navigateToPage(event, page) {
    event.preventDefault();

    let city = document.getElementById("cityInput").value.trim();
    
    if (city === "") {
        alert("Input a city！");
        return;
    }

    window.location.href = `${page}?city=${encodeURIComponent(city)}`;
}

async function fetchWeatherData() {
    const urlParams = new URLSearchParams(window.location.search);
    const city = urlParams.get("city");

    if (!city) {
        document.getElementById("weatherResult").innerText = "No city inputed";
        return;
    }

    try {
        let response = await fetch("sample.json");
        let data = await response.json();

        let cityData = data.find(item => item.cityName.toLowerCase() === city.toLowerCase());

        if (cityData) {
            document.getElementById("cityName").innerText = `Weather in ${city}`;

            if (document.getElementById("temperature")) {
                document.getElementById("temperature").innerText = `${cityData.temperatureCelsius}°C`;
                updateTemperatureStyle(cityData.temperatureCelsius);
            }
            if (document.getElementById("humidity")) {
                let humidityRaw = cityData.humidity;
                let humidityPercentage = Math.round(humidityRaw * 100);
                document.getElementById("humidity").innerText = `${humidityPercentage}%`;
                updateHumidityStyle(humidityPercentage);
            }
            if (document.getElementById("uvIndex")) {
                document.getElementById("uvIndex").innerText = cityData.uvIndex;
                updateUVStyle(cityData.uvIndex);
            }
            if (document.getElementById("windSpeed")) {
                document.getElementById("windSpeed").innerText = cityData.windSpeed;
                updateWindStyle(cityData.windSpeed);
            }
        } else {
            document.getElementById("weatherResult").innerHTML = "<p>Not Found</p>";
        }
    } catch (error) {
        console.error("error", error);
    }
}


// toggleTemperature

let isCelsius = true;

function toggleTemperature() {
    let tempElement = document.getElementById("temperature");
    let toggleButton = document.getElementById("toggleTemp");

    if (!tempElement || tempElement.innerText === "--°C") return;

    let currentTemp = parseFloat(tempElement.innerText);

    if (isCelsius) {
        let fahrenheit = (currentTemp * 9/5) + 32;
        tempElement.innerText = `${fahrenheit.toFixed(1)}°F`;
        toggleButton.innerText = "Switch to Celsius";
    } else {
        let celsius = (currentTemp - 32) * 5/9;
        tempElement.innerText = `${celsius.toFixed(1)}°C`;
        toggleButton.innerText = "Switch to Fahrenheit";
    }

    isCelsius = !isCelsius;
}

document.addEventListener("DOMContentLoaded", function() {
    let toggleButton = document.getElementById("toggleTemp");
    if (toggleButton) {
        toggleButton.addEventListener("click", toggleTemperature);
    }
});

if (window.location.pathname.includes("temperature.html")) {
    fetchWeatherData();
}

function updateTemperatureStyle(temp) {
    let tempElement = document.getElementById("temperature");
    if (temp > 20) {
        tempElement.style.color = "yellow";
    } else {
        tempElement.style.color = "blue";
    }
}

function updateHumidityStyle(humidity) {
    let humidityElement = document.getElementById("humidity");

    if (humidity > 0.5) {
        humidityElement.style.color = "green";
    } else {
        humidityElement.style.color = "blue";
    }
}

function updateUVStyle(uvIndex) {
    let uvElement = document.getElementById("uvIndex");
    if (uvIndex >= 8) {
        uvElement.style.color = "red";
    } else if (uvIndex >= 5) {
        uvElement.style.color = "orange";
    } else {
        uvElement.style.color = "green";
    }
}

function updateWindStyle(windSpeed) {
    let windElement = document.getElementById("windSpeed");
    let speed = parseInt(windSpeed);
    if (speed > 30) {
        windElement.style.color = "red";
    } else if (speed > 15) {
        windElement.style.color = "orange";
    } else {
        windElement.style.color = "green";
    }
}

if (window.location.pathname.includes(".html")) {
    fetchWeatherData();
}