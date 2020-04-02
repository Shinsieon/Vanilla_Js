const COORDS = "coords";
const API_KEY = "f88a0867c2309698017d37158bb3f9aa";                     //openweathermap의 내 계정의 API_KEY

const weather = document.querySelector(".js-weather");

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));                //저장된 경도 위도 정보를 JSON형태로 저장
}
function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,                       //원래는 latitude : latitude 인데 latitude로만 쓸수 있음.
        longitude
    };
    saveCoords(coordsObj);              //경도 위도 저장
    getWeather(latitude, longitude);            //날짜정보 불러옴
}
function getWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric` //api fetch
    ).then(function(response){
        return response.json();
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `temp: ${temperature} , you are in ${place}`
    });
}
function handelGeoError(){
    console.log("error");
}
function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handelGeoError);         //현재 위치 수집을 허용하면 success 아니면 error
}
function loadedCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else{
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude,parseCoords.longitude);
    }
}

function init(){
    loadedCoords();
    }
init();
