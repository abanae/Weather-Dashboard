// Variable declaration
let city = "";
let searchForCity = $("#search");
let searchBttn = $("#search-bttn");
let currentCity = $("#current-city");
let currentTemp = $("#temperature");
let currentHumidity = $("#humidity");
let currentWind = $("#wind-speed");
let currentUv = $("#uv-index");
let inputCity = [];

// Returns value of city 
function find(c) {
    for (var i = 0; i < inputCity.length; i++) {
        if (c.toUpperCase() === inputCity[i]) {
            return -1;
        }
    }
    return 1;
}

//API key Function
let apiKey = "a0aca8a89948154a4182dcecc780b513";
function displayWeather(event) {
    event.preventDefault();
    if (searchForCity.val().trim() !== "") {
        city = searchForCity.val().trim();
        currentWeather(city);
    }
}

// GET Function for API key
function currentWeather(city) {
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + apiKey;
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response);

        //Variables from API data
        let weatherIcon = response.weather[0].icon;
        let iconUrl = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
        let date = new Date(response.dt * 1000).toLocaleDateString();

        $(currentCity).html(response.name + "(" + date + ")" + "<img src=" + iconUrl + ">");

        // Convert temp to degrees
        let tempF = (response.main.temp - 273.15) * 1.80 + 32;
        $(currentTemp).html((tempF).toFixed(2) + "&#8457");

        //       //Current Humidity
        $(currentHumidity).html(response.main.humidity + "%");

        //Wind speed to MPH
        let wS = response.wind.speed;
        let windSpeed = (wS * 2.237).toFixed(1);
        $(currentWind).html(windSpeed + "MPH");

        // UVIndex Forloop
        UvIndex(response.coord.lon, response.coord.lat);
        forecast(response.id);
        if (response.cod == 200) {
            inputCity = JSON.parse(localStorage.getItem("cityname"));
            console.log(inputCity);
            if (inputCity == null) {
                inputCity = [];
                inputCity.push(city.toUpperCase()
                );
                localStorage.setItem("cityname", JSON.stringify(inputCity));
                addToList(city);
            }
            else {
                if (find(city) > 0) {
                    inputCity.push(city.toUpperCase());
                    localStorage.setItem("cityname", JSON.stringify(inputCity));
                    addToList(city);
                }
            }
        }

    });
}

// UVIindex GET function 
function UvIndex(ln, lt) {
    let uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lt + "&lon=" + ln;
    $.ajax({
        url: uvURL,
        method: "GET"
    }).then(function (response) {
        $(currentUv).html(response.value);
    });
}

// Function 5 day Forecast
function forecast(cityId) {
    let dayOver = false;
    let queryForcastURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityId + "&appid=" + apiKey;
    $.ajax({
        url: queryForcastURL,
        method: "GET"
    }).then(function (response) {

        for (i = 0; i < 5; i++) {
            let date = new Date((response.list[((i + 1) * 8) - 1].dt) * 1000).toLocaleDateString();
            let iconCode = response.list[((i + 1) * 8) - 1].weather[0].icon;
            let iconUrl = "https://openweathermap.org/img/wn/" + iconCode + ".png";
            let tempK = response.list[((i + 1) * 8) - 1].main.temp;
            let tempF = (((tempK - 273.5) * 1.80) + 32).toFixed(2);
            let humidity = response.list[((i + 1) * 8) - 1].main.humidity;

            $("#fDate" + i).html(date);
            $("#fImg" + i).html("<img src=" + iconUrl + ">");
            $("#fTemp" + i).html(tempF + "&#8457");
            $("#fHumidity" + i).html(humidity + "%");
        }

    });
}

//Function Append to list
function addToList(c) {
    let listEl = $("<li>" + c.toUpperCase() + "</li>");
    $(listEl).attr("class", "list-group-item");
    $(listEl).attr("data-value", c.toUpperCase());
    $(".list-group").append(listEl);
}

// Function to invoke Past Searches
function invokePastSearch(event) {
    let liEl = event.target;
    if (event.target.matches("li")) {
        city = liEl.textContent.trim();
        currentWeather(city);
    }

}

// Render function
function loadlastCity() {
    $("ul").empty();
    let inputCity = JSON.parse(localStorage.getItem("cityname"));
    if (inputCity !== null) {
        inputCity = JSON.parse(localStorage.getItem("cityname"));
        for (i = 0; i < inputCity.length; i++) {
            addToList(inputCity[i]);
        }
        city = inputCity[i - 1];
        currentWeather(city);
    }

}

//Click Buttons
$("#search-bttn").on("click", displayWeather);
$(document).on("click", invokePastSearch);
$(window).on("load", loadlastCity);



