const todoForm = document.querySelector(".js-todoForm"),
    todoInput = todoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

    const TODO_LS = "toDos";
    let toDos = [];
function saveToDos() {
    localStorage.setItem(TODO_LS, JSON.stringify(toDos));           //TODO LIST를 DATA에서 JSON형식으로 localstorage에 저장
}
function paintTodo(text){
    const li = document.createElement("li");                        //li 태그 삽입
    const delBtn = document.createElement("button");                //button 태그 삽입
    delBtn.value="X";       
    const span = document.createElement("span");                       //span 태그 삽입
    const newId = toDos.length + 1;                                    //배열의 길이 +1 에서 id값 지정
    delBtn.addEventListener("click", deleteTodo);                   //delbtn을 눌렀을때 deleteTodo 함수 실행
    span.innerHTML=text;
    li.appendChild(span);                                       //li에 span을 삽입
    li.appendChild(delBtn);
    li.id = newId;                                               //li의 id값을 배열의 길이+1값 대입
    toDoList.appendChild(li);                               
    const todoObj = {
        text : text,
        id : newId
    };
    toDos.push(todoObj);                                    //toDos배열에 todoObj push
    saveToDos(); 
}
function deleteTodo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanTodo = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
        toDos = cleanTodo;
        saveToDos();
    });
}
function handleSubmit(event){
    event.preventDefault();
    const currentValue = todoInput.value;
    paintTodo(currentValue);
    todoInput.value = "";

}
function loadToDos(){
    const loadedtoDos = localStorage.getItem(TODO_LS);              //localstorage에서 TODO_LS 호출
    if(loadedtoDos !== null) {
        const parsedTodos = JSON.parse(loadedtoDos);                        //null이 아니면 json형태로 저장
        parsedTodos.forEach(function(toDo){
            paintTodo(toDo.text);

        });
    }
}
function init() {
    loadToDos();
    todoForm.addEventListener("submit", handleSubmit)
}
init();