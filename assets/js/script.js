let APIkey = "0567c58d180a1ea91a9259428ed0776e";
let cityInputEl = document.getElementById("city-input-el");
let fetchButtonEl = document.getElementById("fetch-button");
let currentDayEL = document.getElementById("current-day-el");
let fiveDayEl = document.getElementById("five-day-el");
let recentEl = document.getElementById("recent-el");
let cityNameArray = [];


let geoQuery = function (event) {
    event.preventDefault();
    let city = cityInputEl.value.trim();
    localStorageOperation(city);
    let geoUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=" + APIkey;
    fetch(geoUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            latEl = data[0].lat;
            lonEl = data[0].lon;
            console.log(data);
            if (data) {
              getCityWeather(latEl, lonEl);
            }
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to OpenWeather');
      });
    };
    
function localStorageOperation(cityname) {
  cityNameArray.push(cityname);
      localStorage.setItem("cityName", cityNameArray)
      recentEl.textContent = localStorage.getItem("cityName");
}


let getCityWeather = function (latEl, lonEl) {
    let requestUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + latEl + "&units=metric&lon=" + lonEl + "&appid=" + APIkey
    let requestfiveUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latEl + "&units=metric&lon=" + lonEl + "&appid=" + APIkey
    fetch(requestUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            displayWeather(data);
            console.log(data);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to OpenWeather');
      });

      fetch(requestfiveUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            displayfiveWeather(data);
            console.log(data);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to OpenWeather');
      });  

};

let displayWeather = function (data) {
   
    let tempInfo = data.main.temp;
    let windInfo = data.wind.speed;
    let humidityInfo = data.main.humidity;
    let weatherInfo = "Temp: " + tempInfo + "°C, " + "Wind: " + windInfo + "km/h, " + "Humidity: " + humidityInfo + "%";
    let finalWeather = document.createElement("p");
    let iconEl = document.createElement("img");

    iconEl.src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
    finalWeather.textContent = weatherInfo;
    currentDayEL.textContent = data.name + " (Current Day)";
    currentDayEL.appendChild(iconEl);
    currentDayEL.appendChild(finalWeather);
    currentDayEL.style.border = "2px solid black";
    currentDayEL.style.margin = "10px";
    currentDayEL.style.padding = "10px";
};

let displayfiveWeather = function (data) {
   console.log(data);
  for (let i = 0; i < data.list.length; i+=8) {
    let div = document.createElement("div");
    div.style.border = "2px solid black";
    div.style.margin = "10px";
    div.style.padding = "10px";
    let dateEl = document.createElement("p");
    let tempEl = document.createElement("p");
    let windEl = document.createElement("p");
    let humidityEl = document.createElement("p");
    let cityEl = document.createElement("p");
    let iconEl = document.createElement("img");

    iconEl.src = "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png";
    dateEl.innerHTML = data.list[i].dt_txt;
    tempEl.innerHTML = "Temp: " + data.list[i].main.temp + "°C";
    windEl.innerHTML = "Wind: " + data.list[i].wind.speed + "km/h";
    humidityEl.innerHTML = "Humidity: " + data.list[i].main.humidity + "%";
    cityEl.innerHTML = data.city.name;
    

    div.append(iconEl, cityEl, dateEl, tempEl, windEl, humidityEl);
    fiveDayEl.appendChild(div);
    

  }

};

fetchButtonEl.addEventListener('click', geoQuery)
