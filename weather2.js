const apikey = "ade31d47c59a7945c76f9b098c8abdd4";
const apiurl = (location) => `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}&units=metric`;

const searchBox = document.querySelector("input");
const searchBtn = document.querySelector("button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherCondition = document.getElementById("weather-condition");

async function checkWeather(city) {
    const storedWeather = localStorage.getItem(city);
    if (storedWeather) {
        const weather = JSON.parse(storedWeather);
        displayWeather(weather);
        console.log("Hello")
    } else {
        try {
            const response = await fetch(apiurl(city));
            if (response.status == 404) {
                document.querySelector(".error").style.display = "block";
                document.querySelector(".weather").style.display = "none";
            } else {
                const data = await response.json();
                localStorage.setItem(city, JSON.stringify(data));
        console.log("Hello I dont have data")

                displayWeather(data);
            }
        } catch (error) {
            console.error("Failed to fetch weather data:", error);
        }
    }
}

function displayWeather(data) {
    document.querySelector(".error").style.display = "none";
    document.querySelector(".weather").style.display = "block";

    weatherCondition.innerHTML = data.weather[0].main;
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = Math.round(data.wind.speed * 3.6) + " km/h";
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});
