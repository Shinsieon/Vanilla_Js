const form = document.querySelector(".js-form"),     //name form 객체 
    input = form.querySelector("input"),               //form 안에 이름을 적는 input [type = text]객체
    greeting = document.querySelector(".js-greetings"); //인사 코멘트 객체
const User_LS = "currentUser",
SHOWING_CN = "showing";                 //이름을 입력했을 때 greeting에 classList.add(), 입력폼은 classList.remove();
function savaName(text){                //localstorage에 이름 저장
    localStorage.setItem(User_LS, text);
}
function handleSubmit(event) {
    event.preventDefault();                 //submit했을 때 화면이 깜빡거리는 event 제거
    const currentValue = input.value;
    paintGreeting(currentValue);            //입력한 이름 색칠
    savaName(currentValue);     
}
function askForName(){
    form.classList.add(SHOWING_CN);         //form 보여주기
    form.addEventListener("submit", handleSubmit);
}
function paintGreeting(text){                   //form은 지우고 greeting을 보여주기
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}
function loadName() {                       //localstorage에 저장된 데이터가 있는지 없는지 확인
    const currentUser = localStorage.getItem(User_LS);
    if(currentUser === null){
        askForName();                       //없으면 form 보여주기
    }else{
        paintGreeting(currentUser);         //있으면 greeting 보여주기
    }
}
function init() {
    loadName();
}
init();
//로컬 스토리지
