// Variable declaration
let city="";
let searchForCity = $("#search");
let searchBttn = $("#search-bttn");
let currentCity = $("#current-city");
let currentTemp = $("#temperature");
let currentHumidity= $("#humidity");
let currentWind=$("#wind-speed");
let currentUv= $("#uv-index");
let inputCity=[];

// Returns value of city 
function find(c){
    for (var i=0; i<inputCity.length; i++){
        if(c.toUpperCase()===inputCity[i]){
            return -1;
        }
    }
    return 1;
}

//API key Function
let apiKey ="a0aca8a89948154a4182dcecc780b513";
function displayWeather(event){
    event.preventDefault();
    if(searchForCity.val().trim()!==""){
        city=searchForCity.val().trim();
        currentWeather(city);
    }
}

// GET Function
function currentWeather(city){
    let queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + apiKey ;
    $.ajax({
        url:queryURL,
        method:"GET",
    }).then(function(response){
        console.log(response);

        //Variables from API data
        let weatherIcon= response.weather[0].icon;
        let iconUrl="https://openweathermap.org/img/wn/"+weatherIcon +"@2x.png";
        let date=new Date(response.dt*1000).toLocaleDateString();

        $(currentCity).html(response.name +"("+date+")" + "<img src="+iconUrl+">");
       
        // Convert temp to degrees
        let tempF = (response.main.temp - 273.15) * 1.80 + 32;
        $(currentTemp).html((tempF).toFixed(2)+"&#8457");

//       //Current Humidity
        $(currentHumidity).html(response.main.humidity+"%");

        //Wind speed to MPH
        let wS=response.wind.speed;
        let windSpeed=(wS*2.237).toFixed(1);
        $(currentWind).html(windSpeed+"MPH");

//         // Display UVIndex.
//         //By Geographic coordinates method and using appid and coordinates as a parameter we are going build our uv query url inside the function below.
//         UVIndex(response.coord.lon,response.coord.lat);
//         forecast(response.id);
//         if(response.cod==200){
//             inputCity=JSON.parse(localStorage.getItem("cityname"));
//             console.log(inputCity);
//             if (inputCity==null){
//                 inputCity=[];
//                 inputCity.push(city.toUpperCase()
//                 );
//                 localStorage.setItem("cityname",JSON.stringify(inputCity));
//                 addToList(city);
//             }
//             else {
//                 if(find(city)>0){
//                     inputCity.push(city.toUpperCase());
//                     localStorage.setItem("cityname",JSON.stringify(inputCity));
//                     addToList(city);
//                 }
//             }
//         }

//     });
// }

//     // This function returns the UVIindex response.
// function UVIndex(ln,lt){
//     //lets build the url for uvindex.
//     var uvqURL="https://api.openweathermap.org/data/2.5/uvi?appid="+ apiKey +"&lat="+lt+"&lon="+ln;
//     $.ajax({
//             url:uvqURL,
//             method:"GET"
//             }).then(function(response){
//                 $(currentUv).html(response.value);
//             });
// }
    
// // Here we display the 5 days forecast for the current city.
// function forecast(cityid){
//     var dayover= false;
//     var queryforcastURL="https://api.openweathermap.org/data/2.5/forecast?id="+cityid+"&appid="+ apiKey ;
//     $.ajax({
//         url:queryforcastURL,
//         method:"GET"
//     }).then(function(response){
        
//         for (i=0;i<5;i++){
//             var date= new Date((response.list[((i+1)*8)-1].dt)*1000).toLocaleDateString();
//             var iconcode= response.list[((i+1)*8)-1].weather[0].icon;
//             var iconUrl="https://openweathermap.org/img/wn/"+iconcode+".png";
//             var tempK= response.list[((i+1)*8)-1].main.temp;
//             var tempF=(((tempK-273.5)*1.80)+32).toFixed(2);
//             var humidity= response.list[((i+1)*8)-1].main.humidity;
        
//             $("#fDate"+i).html(date);
//             $("#fImg"+i).html("<img src="+iconUrl+">");
//             $("#fTemp"+i).html(tempF+"&#8457");
//             $("#fHumidity"+i).html(humidity+"%");
//         }
        
//     });
// }

// //Daynamically add the passed city on the search history
// function addToList(c){
//     var listEl= $("<li>"+c.toUpperCase()+"</li>");
//     $(listEl).attr("class","list-group-item");
//     $(listEl).attr("data-value",c.toUpperCase());
//     $(".list-group").append(listEl);
// }

// // display the past search again when the list group item is clicked in search history
// function invokePastSearch(event){
//     var liEl=event.target;
//     if (event.target.matches("li")){
//         city=liEl.textContent.trim();
//         currentWeather(city);
//     }

// }

// // render function
// function loadlastCity(){
//     $("ul").empty();
//     var inputCity = JSON.parse(localStorage.getItem("cityname"));
//     if(inputCity!==null){
//         inputCity=JSON.parse(localStorage.getItem("cityname"));
//         for(i=0; i<inputCity.length;i++){
//             addToList(inputCity[i]);
//         }
//         city=inputCity[i-1];
//         currentWeather(city);
//     }

// }

// //Click Handlers
// $("#search-bttn").on("click",displayWeather);
// $(document).on("click",invokePastSearch);
// $(window).on("load",loadlastCity);



