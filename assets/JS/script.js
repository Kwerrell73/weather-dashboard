const apiKey = "823d12533533a33a3f03e7bef61cae69";

var weather = $("#currentWeather");
var forecast = $("#weatherForecast");
var cities;

function fetchWeather() {

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

$("#submitCity").click(function() {
    event.preventDefault();
    let cityName = $("#cityInput").val();
    fetchWeather(cityName);
    fetchForecast(cityName);
});

$("#previousSearch").click(function() {
    let cityName = event.target.value;
    fetchWeather(cityName);
    fetchForecast(cityName);
})
