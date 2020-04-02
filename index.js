const clockContainer = document.querySelector(".js-clock");         //시간 보여줄 객체div
const clockTitle = clockContainer.querySelector("h1");

function getTime() {
    const date = new Date();
    const minutes = date.getMinutes();      //현재 분
    const hours = date.getHours();          //현재 시간
    const seconds = date.getSeconds();      //현재 초
    clockTitle.innerText = `${hours<10 ? `0${hours}` : hours}:${minutes<10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
//? : 은 조건문을 한줄에 쓸 수 있는 삼중 뭐시기다. 조건 ? true일때 : false 일때
}
function init() {
    getTime();
    setInterval(getTime, 1000);         //1000 = 1초마다 gettime 함수 실행
}
init();
