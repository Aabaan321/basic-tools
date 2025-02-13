// Calculator Functions
let calcScreen = document.getElementById('calc-screen');

function addToCalc(value) {
    calcScreen.value += value;
}

function clearCalc() {
    calcScreen.value = '';
}

function calculate() {
    try {
        calcScreen.value = eval(calcScreen.value);
    } catch (e) {
        calcScreen.value = 'Error';
    }
}

// To-Do List Functions
let todoInput = document.getElementById('todo-input');
let todoList = document.getElementById('todo-list');

function addToDo() {
    if (todoInput.value.trim() !== '') {
        let li = document.createElement('li');
        li.textContent = todoInput.value;
        todoList.appendChild(li);
        todoInput.value = ''; // clear input after adding task
    }
}
