const todo_input = document.querySelector(".todo-input");
const todo_button = document.querySelector(".todo-button")
const todo_list = document.querySelector(".todo-list")
const filter_todo = document.querySelector(".filter-todo")

todo_button.addEventListener("click" , addToDo)
todo_list.addEventListener("click" , trashcheck)
filter_todo.addEventListener("click", filtertodo);
document.addEventListener("DOMContentLoaded", getTodos);

function addToDo (event) {
    event.preventDefault()

    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo")

    const newtodo =document.createElement("li")
    newtodo.innerText = todo_input.value
    newtodo.classList.add("todo-item");

    savelocal(todo_input.value);

    todoDiv.appendChild(newtodo)
    todo_input.value = ""

    const completedButton = document.createElement("button")
    completedButton.innerHTML ="<i class='fas fa-check'></i>"
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button")
    trashButton.innerHTML ="<i class='fas fa-trash'></i>"
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todo_list.appendChild(todoDiv);

}

function trashcheck (event) {
    const item = event.target; 
    if (item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        removeLocalTodo(todo)     
        todo.remove()
    }
    if (item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function savelocal (todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos))
}

function removeLocalTodo (todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoindex = todo.children[0].innerText
    todos.splice(todos.indexOf(todoindex) , 1 )
    localStorage.setItem("todos", JSON.stringify(todos))
}

function filtertodo (event) { 
    const todos = todo_list.childNodes
    todos.forEach(function (todo) {
        switch (event.target.value) {
            case "all" :
                todo.style.display = "flex";
                break
            case "completed" :
                if (todo.classList.contains("completed")){
                todo.style.display = "flex";
                } else {
                todo.style.display = "none";
                } 
                break
            case "uncompleted" : 
            if (todo.classList.contains("completed")){
                todo.style.display = "none";
                } else {
                todo.style.display = "flex";
                } 
                break
        }
    });
    
}    

function getTodos () {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    };
    todos.forEach(function (todo){
        const todoDiv = document.createElement("div")
        todoDiv.classList.add("todo")
    
        const newtodo =document.createElement("li")
        newtodo.innerText = todo    
    
        todoDiv.appendChild(newtodo)
        todo_input.value = ""
    
        const completedButton = document.createElement("button")
        completedButton.innerHTML ="<i class='fas fa-check'></i>"
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
    
        const trashButton = document.createElement("button")
        trashButton.innerHTML ="<i class='fas fa-trash'></i>"
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
    
        todo_list.appendChild(todoDiv);
    })
}