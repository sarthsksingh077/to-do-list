let n = new Date();
let y = n.getFullYear();
let m = n.getMonth() + 1;
let d = n.getDate();
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let x = days[n.getDay()];
document.getElementById("date").innerHTML = d + "/" + m + "/" + y + " (" + x + ")";


const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todolist");
const completed = document.querySelector(".completed");
const deleteAllbtn = document.querySelector(".footer button");

inputBox.onkeyup = () => {
    let userData = inputBox.value;
    if (userData.trim() != 0) {
        addBtn.classList.add("active");
    } else {
        addBtn.classList.remove("active");
    }
}

addBtn.onclick = () => {
        let userData = inputBox.value;
        let getLocalStorage = localStorage.getItem("New Todo");
        if (getLocalStorage == null) {
            listArr = [];
        } else {
            listArr = JSON.parse(getLocalStorage);
        }
        listArr.push(userData);
        localStorage.setItem("New Todo", JSON.stringify(listArr));
        showTask();
    }
    //function to add task list inside ul
function showTask() {
    let xyz = localStorage.getItem("completed");
    if (xyz == null) {
        listArr1 = [];
    } else {
        listArr1 = JSON.parse(xyz);
    }
    let getLocalStorage = localStorage.getItem("New Todo");
    if (getLocalStorage == null) {
        listArr = [];
    } else {
        listArr = JSON.parse(getLocalStorage);
    }
    const pendingTasksNumb = document.querySelector(".pendingTasks");
    pendingTasksNumb.textContent = listArr.length;
    if (listArr.length > 0 || listArr1.length > 0) {
        deleteAllbtn.classList.add("active");
    } else {
        deleteAllbtn.classList.remove("active");
    }
    let newLiTag = "";
    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element}<button onclick="deleteTask(${index})"><i class="fas fa-trash"></i></button> 
                                    <button onclick="Task(${index})"><i class="fas fa-check"></i></button></li>`;
    });
    let newLi = "";
    listArr1.forEach((element, index) => {
        newLi += `<li>${element}<button onclick="deleteTask1(${index})"><i class="fas fa-trash"></i></button></li>`
    });
    completed.innerHTML = newLi;
    todoList.innerHTML = newLiTag;
    inputBox.value = "";
}

function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1);
    //after remove the li again update the localstorage
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTask();
}

function deleteTask1(index) {
    let xyz = localStorage.getItem("completed");
    listArr1 = JSON.parse(xyz);
    listArr1.splice(index, 1);
    localStorage.setItem("completed", JSON.stringify(listArr1));
    showTask();
}

function Task(index) {
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr1.push(listArr[index]);
    listArr.splice(index, 1);
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    localStorage.setItem("completed", JSON.stringify(listArr1));
    showTask();
}

deleteAllbtn.onclick = () => {
    listArr = [];
    listArr1 = [];
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    localStorage.setItem("completed", JSON.stringify(listArr1));
    showTask();
}