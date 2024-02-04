let apiKey = "44dc6f1fc8dcb30f5c9714a2cf4b624b";
const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const searchForm= document.querySelector("[data-searchForm]");
const userInformation= document.querySelector(".showinfo");
const grantAccsess= document.querySelector(".grantLocation");
const loadingScreen = document.querySelector(".loadingContainer");
let currTab = userTab;
getFromSessionStorage();
currTab.classList.add("currentTab");
function switchTab(clickedTab){
if(clickedTab!=currTab){
  currTab.classList.remove("currentTab");
  currTab = clickedTab;
  currTab.classList.add("currentTab");


if(!searchForm.classList.contains("active")){
         userInformation.classList.remove("active");
         grantAccsess.classList.remove("active");
         searchForm.classList.add("active");


}
else{
searchForm.classList.remove("active");
userInformation.classList.remove("active");
getFromSessionStorage();




}
}

}
function getFromSessionStorage(){
const localcoordinates = sessionStorage.getItem("user-coordinates");
if(!localcoordinates){
        grantAccsess.classList.add("active");

}
else{
const coordinates = JSON.parse(localcoordinates);
fetchUserWeatherInfo(coordinates);

}


}
async function fetchUserWeatherInfo(coordinates){
const {lat,lon} = coordinates;
grantAccsess.classList.remove("active");
loadingScreen.classList.add("active");

try{
const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units==metrics`);

const data = await response.json();
loadingScreen.classList.remove("active");
userInformation.classList.add("active");
updateUserInfo(data);

}
catch(err){
loadingScreen.classList.remove("active");

}



}
function updateUserInfo(weatherInfo){
    const cityName = document.querySelector("[data-cityname]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-desc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windSpeed]");
    const humidity = document.querySelector("[data-humidity");
    const cloudiness = document.querySelector("[data-clouds]");

    //fetch values from weatherINfo object and put it UI elements
    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    let t = weatherInfo?.main?.temp;
    t = t-272.15; 
    
    let x = t.toFixed(1);
    console.log(typeof(x));
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText =`${weatherInfo?.main?.humidity} %`;
    cloudiness.innerText = weatherInfo?.clouds?.all;
    temp.innerText = x +" "+"°C";
}

function getLocation(){
if(navigator.geolocation){
navigator.geolocation.getCurrentPosition(showPosition);
}
else{

}

}

function showPosition(position){

    const userCoordinates = {
        lat :  position.coords.latitude,
        lon  :  position.coords.longitude,
    }
sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates));
fetchUserWeatherInfo(userCoordinates);


}
const k = document.getElementById("error");
k.addEventListener("click",()=>{
   document.querySelector(".search").style.backgroundColor=`#c0c2c2`;

});
const searchCity = document.querySelector("[data-searchinput]");
searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
let cityName = searchCity.value;
if(cityName==="")return ;
else{
    searchWeatherinfo(cityName);
}

})
function updateUserInfo1(weatherInfo){
    const cityName = document.querySelector("[data-cityname]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-desc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windSpeed]");
    const humidity = document.querySelector("[data-humidity");
    const cloudiness = document.querySelector("[data-clouds]");

    //fetch values from weatherINfo object and put it UI elements
    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    let t = weatherInfo?.main?.temp;
 
    
    let x = t.toFixed(1);
    console.log(typeof(x));
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText =`${weatherInfo?.main?.humidity} %`;
    cloudiness.innerText = weatherInfo?.clouds?.all;
    temp.innerText = x +" "+"°C";
}

function getLocation(){
if(navigator.geolocation){
navigator.geolocation.getCurrentPosition(showPosition);
}
else{

}

}

async function searchWeatherinfo(City){

loadingScreen.classList.add("active");
grantAccsess.classList.remove("active");
userInformation.classList.remove("active");
try{
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${apiKey}&units=metric`
      );

      const resdata = await response.json();
      loadingScreen.classList.remove("active");
      userInformation.classList.add("active");
      updateUserInfo1(resdata);
}
catch(e){
}


}





const grantButton = document.querySelector("[data-grantbtn]");
grantButton.addEventListener("click",getLocation);

userTab.addEventListener("click",()=>{
switchTab(userTab);

});
searchTab.addEventListener("click",()=>{
    switchTab(searchTab);
    
    });