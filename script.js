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
const deleteAllbtn = document.querySelector(".footer button");

inputBox.onkeyup = () => {
    let userData = inputBox.value;
    if (userData.trim() != 0) {
        addBtn.classList.add("active");
    } else {
        addBtn.classList.remove("active");
    }
}

showTask();

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
    let getLocalStorage = localStorage.getItem("New Todo");
    if (getLocalStorage == null) {
        listArr = [];
    } else {
        listArr = JSON.parse(getLocalStorage);
    }
    const pendingNum = document.querySelector(".pendingTasks");
    pendingNum.textContent = listArr.length;
    if (listArr.length > 0) {
        deleteAllbtn.classList.add("active");
    } else {
        deleteAllbtn.classList.remove("active");
    }
    let newLiTag = "";
    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element} <span onclick="deleteTask(${index})";><i class ="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag;
    inputBox.value = "";
}

//delete task fucntion
function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1);
    //after remove the li again update the localstorage
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTask();
}

//delete all task function
deleteAllbtn.onclick = () => {
    listArr = [];
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTask();
}