const apiKey = "YOUR_API_KEY";

const cityInput =
document.getElementById("city");

cityInput.addEventListener(
"keypress",
function(e){

if(e.key==="Enter"){
getWeather();
}

});

async function getWeather(){

const city =
document.getElementById("city").value;

if(city==="") return;

const loader =
document.getElementById("loader");

loader.style.display="block";

try{

const response =
await fetch(
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
);

const data =
await response.json();

loader.style.display="none";

if(data.cod != 200){

alert(data.message);
return;

}

document.getElementById(
"cityName"
).innerText=data.name;

document.getElementById(
"temp"
).innerText=
`${Math.round(data.main.temp)}°C`;

document.getElementById(
"description"
).innerText=
data.weather[0].description;

document.getElementById(
"humidity"
).innerText=
`${data.main.humidity}%`;

document.getElementById(
"wind"
).innerText=
`${data.wind.speed} m/s`;

document.getElementById(
"pressure"
).innerText=
`${data.main.pressure} hPa`;

document.getElementById(
"visibility"
).innerText=
`${data.visibility/1000} km`;

document.getElementById(
"feelsLike"
).innerText=
`${Math.round(data.main.feels_like)}°C`;

document.getElementById(
"icon"
).src=
`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

const sunrise =
new Date(
data.sys.sunrise*1000
);

const sunset =
new Date(
data.sys.sunset*1000
);

document.getElementById(
"sunrise"
).innerText=
sunrise.toLocaleTimeString();

document.getElementById(
"sunset"
).innerText=
sunset.toLocaleTimeString();

changeBackground(
data.weather[0].main
);

}catch(error){

loader.style.display="none";

alert("Error loading weather");

}

}

function changeBackground(weather){

if(weather==="Clear"){

document.body.style.background=
"linear-gradient(135deg,#f59e0b,#f97316)";

}

else if(weather==="Clouds"){

document.body.style.background=
"linear-gradient(135deg,#64748b,#94a3b8)";

}

else if(weather==="Rain"){

document.body.style.background=
"linear-gradient(135deg,#0f172a,#2563eb)";

}

else if(weather==="Thunderstorm"){

document.body.style.background=
"linear-gradient(135deg,#111827,#000000)";

}

else{

document.body.style.background=
"linear-gradient(135deg,#0f172a,#1e293b)";
}

}
