const apiKey = "823d12533533a33a3f03e7bef61cae69";

var weather = $("#currentWeather");
var forecast = $("#weatherForecast");
var cities;

if (localStorage.getItem("localWeatherSearches")) {
    cities = JSON.parse(localStorage.getItem("localWeatherSearches"));
    writeSearchHistory(cities);
} else {
    cities = [];
};

function fetchWeather(cityName) {
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&APPID=${apiKey}`;

    $.get(apiURL).then(function (response) {
        let currTime = new Date(response.dt * 1000);
        let weatherIcon = `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`;

        weather.html(`
        <h2>${response.name}, 
        ${response.sys.country}
        (${currTime.getMonth() + 1}/${currTime.getDate()}/${currTime.getFullYear()})
        <img src=${weatherIcon} height="70px"></h2>
        <p>Temperature: ${response.main.temp} &#176;F</p>
        <p>Humidity: ${response.main.humidity}%</p>
        <p>Wind Speed: ${response.wind.speed} m/s</p>
        `,

            fetchUVIndex(response.coord))
            historyBtn(response.name);
    })
};



function fetchForecast() {

};

function fetchUVIndex() {

};

function historyBtn() {

};

function searchHistory() {

};


// Get a deafult weather search
fetchWeather("Scottsdale");
fetchForecast("Scottsdale");

$("#submitCity").click(function () {
    event.preventDefault();
    let cityName = $("#cityInput").val();
    fetchWeather(cityName);
    fetchForecast(cityName);
});

$("#previousSearch").click(function () {
    let cityName = event.target.value;
    fetchWeather(cityName);
    fetchForecast(cityName);
})
