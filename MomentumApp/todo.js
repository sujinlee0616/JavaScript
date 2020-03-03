const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos'; // LS: Local Storage

const toDos = []; // 할 일 목록을 array로 만들자

function saveToDos(){
    // localStorage.setItem(TODOS_LS, toDos);  // <== (X)!!
    // - 현상: 위와 같이 하면 key:toDos, value: [object Object], [object Object]... 이런식으로 저장됨 
    // - 원인: localStorage에는 오직 String만 저장 가능. 
    // - 해결: 그러므로, object가 string이 되도록 만들어야. ==> JSON.stringify 사용할 것임.
    //   (JSON.stringify는 js object를 string으로 바꿔준다.)
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));  
    // - [참고] 형식: localStorage.setItem(key, value)
}

function paintToDo(userInputText){
    //console.log(text);
    // li, delBtn, span 생성 
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText = "❌";
    const span = document.createElement("span");
    const newId = toDos.length + 1;

    // 만들어진 li, delBtn, span을 toDoList에 추가한다.
    toDoList.appendChild(li); 
    li.appendChild(delBtn);
    li.appendChild(span);
    // 추가된 li의 id값 지정, 추가된 span의 innerText 지정 
    li.id=newId;
    span.innerText = userInputText;  

    // toDo obj 를  toDos에 데이터 집어넣음 
    const toDoObj = {
        text: userInputText, 
        id: newId
    };
    toDos.push(toDoObj);
    
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = ""; // input에 값 입력 후 엔터치면 입력한 값 사라지게

}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        //...
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit);
}

init();