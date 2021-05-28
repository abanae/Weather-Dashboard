let cityTextEl = document.querySelector(`#city`);
let  weatherInputEl= document.querySelector(`#cards`);
let buttonEl = document.querySelector(`#searchBtn`);
let apiKey = `5ab6745ea373fe100ae9cd6aa16bdfa4`;
let city = cityTextEl.value;


let citySubmit = function (event) {
    buttonEl.addEventListener('click', getApi);
  event.preventDefault();
};



function getApi(){
let urlApi = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
console.log(urlApi);
fetch(urlApi)
.then(function(response){
    response.json().then(function(data){
        // console.log(data);
    }
    )
}) 

}

getApi();