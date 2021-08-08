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

function fetchWeather(citySelected) {
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${citySelected}&units=imperial&APPID=${apiKey}`;

    $.get(apiURL).then(function (response) {
        let time = new Date(response.dt * 1000);
        let weatherMapIcon = `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`;

        weather.html
            //return city name, country, and month, date and year
            //then return temp, wind speed and humidity
            (`
        <h2>${response.name}, 
        ${response.sys.country}
        (${time.getMonth() + 1}/${time.getDate()}/${time.getFullYear()})
        <img src=${weatherMapIcon} height="70px"></h2>

        <p>
        Temperature: ${response.main.temp} &#176;F,        
        <br>
        <br>
        Wind Speed: ${response.wind.speed} m/s,
        <br>
        <br>
        Humidity: ${response.main.humidity}%
        </p>
        `,

                fetchUVIndex(response.coord))
        historyBtn(response.name);
    })
};



function fetchForecast(citySelected) {
    let apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${citySelected}&units=imperial&APPID=${apiKey}`;

    $.get(apiURL)
        .then(function (response) {
            let forecastData = response.list;
            forecast.empty();
            $.each(forecastData, function (i) {
                if (!forecastData[i].dt_txt.includes("12:00:00")) {
                    return;
                }
    let forecastDate = new Date(forecastData[i].dt * 1000);
    let weatherMapIcon = `https://openweathermap.org/img/wn/${forecastData[i].weather[0].icon}.png`;

                forecast.append(`
            <div class="col-md">
                <div class="card text-white bg-info">
                    <div class="card-body">
                        <h4>${forecastDate.getMonth() + 1}/${forecastDate.getDate()}/${forecastDate.getFullYear()}</h4>
                        <img src=${weatherMapIcon} alt="Icon">

                        <p id="card-text">
                        Temp: ${forecastData[i].main.temp} &#176;F,
                        <br>
                        <br>
                        Humidity: ${forecastData[i].main.humidity}%</p>
                    </div>
                </div>
            </div>
            `)
            })
        })

};

function fetchUVIndex(coordinates) {
    let apiURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${coordinates.lat}&lon=${coordinates.lon}&APPID=${apiKey}`;

    $.get(apiURL).then(function (response) {
        let uvIndex = response.value;
        let uvData = "green";
        let fontColor = "white"

        //Change UV background based on reading
        //Also change font color for readability
        if (uvIndex >= 11) {
            uvData = "purple";

        } else if (uvIndex >= 8) {
            uvData = "red";

        } else if (uvIndex >= 6) {
            uvData = "orange";
            fontColor = "black"

        } else if (uvIndex >= 3) {
            uvData = "yellow";
            fontColor = "black"
        }

        weather.append(
            `<p>
            <br>
            UV Index:
             <span class="text-${fontColor} uvPadding" style="background-color: ${uvData};">${uvIndex}</span>
            </p>`
        );
    })

};

function historyBtn(citySelected) {
    // If the button exists in history, exit the function

    var citySearch = citySelected.trim();
    var buttonCheck = $(`#previousSearch > BUTTON[value='${citySearch}']`);

    if (buttonCheck.length == 1) {
        return;
    }

    if (!citiesArray.includes(citySelected)) {
        citiesArray.push(citySelected);
        localStorage.setItem("localWeatherSearches", JSON.stringify(citiesArray));
    }

    $("#previousSearch").prepend
        (`
      <button class="btn btn-light cityHistoryBtn" 
      value='${citySelected}'>${citySelected}</button>
      `);

};

function searchHistory() {

};


// Set the default weather search
fetchWeather("Scottsdale");
fetchForecast("Scottsdale");

$("#submitCity").click(function () {
    event.preventDefault();
    let citySelected = $("#cityInput").val();
    fetchWeather(citySelected);
    fetchForecast(citySelected);
});

$("#previousSearch").click(function () {
    let citySelected = event.target.value;
    fetchWeather(citySelected);
    fetchForecast(citySelected);
})
