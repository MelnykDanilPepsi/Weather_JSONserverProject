const app = document.querySelector('.weather-app'),
temp = document.querySelector('.temp'),
dateOutput = document.querySelector('.date'),
timeOutput = document.querySelector('.time'),
conditionOutput = document.querySelector('.condition'),
nameOutput = document.querySelector('.name'),
cloudOutPut = document.querySelector('.cloud'),
windOutput = document.querySelector('.wind'),
humidityOutPut = document.querySelector('.humidity'),
formWeather = document.querySelector('#location'),
search = document.querySelector('.search'),
btn = document.querySelector('.submit'),
cities = document.querySelectorAll('.city'),
icon = document.querySelector(".weatherIcon"),
country = document.querySelector(".country"),
region = document.querySelector(".region");

let cityInput = "Skhodnitsa";
fetchWeatherData();

cities.forEach(city => {
    city.addEventListener('click',(e)=>{
    cityInput = e.target.innerHTML;
    fetchWeatherData();
    app.style.opacity = "0";
    });
});

formWeather.addEventListener('submit',(e)=>{
if(search.value.length === 0){
    alert('Please enter in a city name');
    return;
}
cityInput = search.value;
fetchWeatherData();
search.value = "";
app.style.opacity = "0";
e.preventDefault();
});

function dayOfTheWeek(day, month, year){
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    return weekday[new Date(`${day},${month},${year}`).getDay()];
};


function fetchWeatherData(){
    console.log(cityInput);
    fetch(`https://api.weatherapi.com/v1/current.json?key=1f7e5757cc7f403cb25120251220410&q=${cityInput}`)
    .then(response => response.json())
    .then(data => {
        temp.innerHTML = data.current.temp_c + "&#176";
        conditionOutput.innerHTML = data.current.condition.text;

        const date = data.location.localtime;
        const y = parseInt(date.substr(0,4));
        const m = parseInt(date.substr(5,2));
        const d = parseInt(date.substr(8,2));
   
        dateOutput.innerHTML = `${dayOfTheWeek(d,m,y)} ${d},${m}, ${y}`;
        timeOutput.innerHTML = date.substr(11);
        nameOutput.innerHTML = data.location.name;
        const iconId = data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64".length);
        icon.src = "../images/weather/64x64" + iconId;
        cloudOutPut.innerHTML = data.current.cloud + "%";
        humidityOutPut.innerHTML = data.current.humidity + "%";
        windOutput.innerHTML = data.current.wind_kph + " km/h";
        country.innerHTML = data.location.country;
        region.innerHTML = data.location.region;
        const timeOfDay = data.current.is_day ? "day" : "night";
        const code = data.current.condition.code;

console.log(code)
        if(code === 1000){
            console.log("1000")
            app.style.backgroundImage = `url(../images/location/${timeOfDay}/clear.jpg)`;
            btn.style.background = timeOfDay == "night" ? "#181e27" : "#e5ba92";
            app.style.opacity = "1";
        }
        else if(code == 1003 ||
                code == 1006 ||
                code == 1009 ||
                code == 1030 ||
                code == 1069 ||
                code == 1087 ||
                code == 1135 ||
                code == 1273 ||
                code == 1276 ||
                code == 1279 ||
                code == 1282 ){
            app.style.backgroundImage = `url(../images/location/${timeOfDay}/cloud.jpg)`
            btn.style.background = timeOfDay == "night" ? "#181e27" : "#fa6d1b";
        }
        else if( code == 1063 ||
                  code == 1069 ||
                  code == 1072 ||
                  code == 1150 ||
                  code == 1153 ||
                  code == 1180 ||
                  code == 1183 ||
                  code == 1186 ||
                  code == 1189 ||
                  code == 1192 ||
                  code == 1195 ||
                  code == 1204 ||
                  code == 1207 ||
                  code == 1240 ||
                  code == 1243 ||
                  code == 1246 ||
                  code == 1249 ||
                  code == 1249 
        ){
            app.style.backgroundImage = `url(../images/location/${timeOfDay}/rain.jpg)`;
       
            btn.style.background = timeOfDay == "night" ? "#325c80" : "#647d75";
        }
        else{
            app.style.backgroundImage = `url(../images/location/${timeOfDay}/snow.jpg)`;
            btn.style.background = timeOfDay == "night" ? "#1b1b1b" : "#4d82aa";
        }
        app.style.opacity = "1";
            
    })
    .catch(err => {alert("City no found, please try again")
    app.style.opacity = "1"})

}