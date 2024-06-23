//--------------------select element--------------------------------------//
const inputLocation = document.getElementById('inputLocation');

inputLocation.addEventListener('input',function(e){
    let inputValue = e.target.value;
    getData(inputValue);
})
//-----------------get information about current position user------------------------------------------------//
if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(posInfo){
       const lat = posInfo.coords.latitude;
       const long = posInfo.coords.longitude;
       console.log(lat,long)                       //required string
       getData(`${lat},${long}`)  
                     //transform to string
    })
}
else{
    console.log('geolocation is not supported')
}
//---------------get data------------------------------------------------------------//
async function getData(region){
  try{
    let response = await fetch(  `https://api.weatherapi.com/v1/forecast.json?q=${region}&days=3&key=5b0245270536413aac7211435241806%20` 
,{cach:'default'})

let data = await response.json();
console.log(data)
displayData(data)
    }
    catch (error) {
      console.log('Error fetching data:', error);
    }
}

//---------------------------------------Display Today Data--------------------------------------------------
function  displayData(data){
let date = new Date(data.current.last_updated);
let todayName = date.toLocaleString('en-us',{weekday:'long'});
let todayDate = date.getDate();
let monthName = date.toLocaleString('en-us',{month:'long'})
localtime = date.toLocaleTimeString('en-US', {hour12:true,hour: '2-digit', minute:'2-digit'});

let value;
switch(data.current.wind_dir){
    case "N":value='North'
    break;
    case "NNE":value='North-Northeast'
    break;
    case "ENE":value='East-Northeast'
    break;
    case "E":value='East'
    break;
    case "ESE":value='East-Southeast'
    break;
    case "SE":value='Southeast'
    break;
    case "SSE":value='South-Southeast'
    break;
    case "S":value='South'
    break;
    case "SSW":value='South-Southwest'
    break;
    case "SW":value='Southwest'
    break;
    case "WSW":value='West-Southwest'
    break;
    case "W":value='West'
    break;
    case "WNW":value='West-Northwest'
    break;
    case "NW":value='Northwest'
    break;
    case "NNW":value='North-Northwest'
    break;
}
let todayContent=`<div class="d-flex align-items-center justify-content-between px-4 mb-3">
                  <h4 class="fw-600">${data.location.name}</h4>
                  <img src='https:${data.current.condition.icon}'>
              </div>
              <h5 class="fw-500">Today , ${todayDate} ${monthName}</h5>
              <h2 class="fw-600">${data.current.temp_c} °</h2>
              <p class="fw-600">${data.current.condition.text}</p>
              <div class="d-flex align-items-center justify-content-center mb-3">
                  <span class="fw-600 mx-3">${data.current.wind_kph} km/h</span>|<span class="fw-600 mx-3">Wind</span>
              </div>
              <div class="d-flex align-items-center justify-content-center mb-3">
                  <span class="fw-600 mx-3">Hum</span>|<span class="fw-600 mx-3">${data.current.humidity} %</span>
              </div>
              <div class="d-flex align-items-center justify-content-center mb-3">
                  <span class="fw-600 mx-3">Dir</span>|<span class="fw-600 mx-3">${value}</span>
              </div>
              <div class="d-flex align-items-center justify-content-center">
                 <span class="fw-600 mx-3">${todayName}</span>|<span class="fw-600 mx-3">${localtime}</span>
              </div>
              `
document.getElementById('today-content').innerHTML=todayContent;
//----------------------------------------------------------tommrow data ------------------------------------
let fullTomorrowDate =new Date(data.forecast.forecastday[1].date);
let tomorrowName = fullTomorrowDate.toLocaleString('en-us',{weekday:'long'});
let tomorrowDate = fullTomorrowDate.getDate();
let tomorrowMonth = fullTomorrowDate.toLocaleString('en-us',{month:'long'});
let tomorrowContent =`<div class="d-flex align-items-center justify-content-between  mb-3">
              <h4 class="fw-600 day">${tomorrowName},${tomorrowDate}-${tomorrowMonth}</h4>
              <img src='https:${data.forecast.forecastday[1].day.condition.icon}'>
          </div>
          <h2 class="fw-600 fs-1">${data.forecast.forecastday[1].day.maxtemp_c} °</h2>
          <h3 class="fw-400 fs-4">${data.forecast.forecastday[1].day.mintemp_c} °</h3>
          <p class="fw-600 fs-4">${data.forecast.forecastday[1].day.condition.text}</p>
          <div class="d-flex align-items-center justify-content-center mb-3">
            <span class="fw-600 mx-3 fs-5">
              <i class="fas fa-tint me-1"></i>${data.forecast.forecastday[1].day.avghumidity} %
            </span>|<span class="fw-600 mx-3 fs-5"><i class="fa-solid fa-wind me-1"></i>${data.forecast.forecastday[1].day.maxwind_kph} km/h</span>
          </div>`


         document.getElementById('tomorrow-content').innerHTML= tomorrowContent;

//-------------------------------------------------- after tomorrow----------------------------

let afterTomorrow =new Date(data.forecast.forecastday[2].date);
let afterTomorrowName = afterTomorrow.toLocaleString('en-us',{weekday:'long'});
let afterTomorrowDate = afterTomorrow.getDate();
let afterTomorrowMonth = afterTomorrow.toLocaleString('en-us',{month:'long'})
      let afterTomorrowContent =`<div class="d-flex align-items-center justify-content-between mb-3">
              <h4 class="fw-600 day">${afterTomorrowName},${afterTomorrowDate}-${afterTomorrowMonth}</h4>
              <img src='https:${data.forecast.forecastday[2].day.condition.icon}'>
          </div>
          <h2 class="fw-600 fs-1">${data.forecast.forecastday[2].day.maxtemp_c} °</h2>
          <h3 class="fw-400 fs-4">${data.forecast.forecastday[2].day.mintemp_c} °</h3>
          <p class="fw-600 fs-4">${data.forecast.forecastday[2].day.condition.text}</p>
          <div class="d-flex align-items-center justify-content-center mb-3">
            <span class="fw-600 mx-3 fs-5">
              <i class="fas fa-tint me-1"></i>${data.forecast.forecastday[2].day.avghumidity} %
            </span>|<span class="fw-600 mx-3 fs-5"><i class="fa-solid fa-wind me-1"></i>${data.forecast.forecastday[2].day.maxwind_kph} km/h</span>
          </div>`

         document.getElementById('afterTomorrow-content').innerHTML= afterTomorrowContent;

//------------------------------------------------- today weather in details-----------------------------------
let sunrisetTime = data.forecast.forecastday[0].astro.sunrise;
let sunriseTime_Hour = Number(sunrisetTime.split(' ')[0].split(":")[0]);
let sunsetTime = data.forecast.forecastday[0].astro.sunset;
console.log(sunrisetTime,sunsetTime)
let sunsetTime_Hour = Number(convertTo24HourFormat(sunsetTime));
let day_hours = sunsetTime_Hour-sunriseTime_Hour;
const yValues = [day_hours,(24-day_hours)];
const barColors = [
  "#ffa033",
  "#fff"
];
new Chart("myChart", {
  type: "pie",
  data: {
    labels: ['Day hours','Night hours'],
    datasets: [{
      backgroundColor: barColors,
      data: yValues,
      borderColor: '#ffa033',
    borderWidth: 1
    }],
    

  },
 
  options: {
              rotation: 1 * Math.PI,
              circumference: 1 * Math.PI,
              legend: {
                display: false 
              },
              responsive: true,
                          plugins: {
                            tooltip: {
                              display: false 
                            }
                          }
             
    
            }
  
});
document.getElementById('wind').innerHTML = `${data.current.wind_kph} km/h`
document.getElementById('dir').innerHTML =`${value}`
document.getElementById('vis').innerHTML =`${data.current.vis_km} km`
document.getElementById('humidity').innerHTML =`${data.current.humidity} %`
document.getElementById('sunrise').innerHTML = sunrisetTime;
document.getElementById('sunset').innerHTML = sunsetTime;


}


function convertTo24HourFormat(timeString) {
    const [time, term] = timeString.split(' ');
    const [hour, minute] = time.split(':');
    let formattedHour = parseInt(hour);

    if (term === 'PM') {
        formattedHour += 12;
    }

    return `${formattedHour}`;
}
