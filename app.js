const form = document.querySelector("form");
const taskInput = document.getElementById("task");
const heading = document.querySelector('h5');
const list = document.querySelector('ul.collection');
window.addEventListener("load",reload)
form.addEventListener('submit', runEvent);
// -------------------------------
// ----------TIME-----------------
// -------------------------------

// function updateClock() {
//     var now = new Date(), // current date
//         time = now.getHours() + ':' + now.getMinutes() // again, you get the idea

//     // set the content of the element with the ID time to the formatted string
//     const heading5 = document.querySelector("h5");
//     heading5.innerHTML =`Current time: ${time}`;
//     // call this function again in 1000ms
//     setTimeout(updateClock, 1000);
// }
// updateClock();

// ----------------------------------
// --------------ADD TASK------------
// ----------------------------------
function runEvent(e) {
    if(taskInput.value === ""){
        alert("No task!!!");
    }else{
       
        const li = document.createElement('li');
        li.setAttribute("class", "collection-item");

        li.innerHTML = `${taskInput.value}<a href="#" class="delete-item secondary-content"><i class="fa fa-times"></i></a>`
        list.appendChild(li);
        console.log(e.type);
        storedTasks.push(taskInput.value)
        stringObject = JSON.stringify(storedTasks);
        localStorage.setItem('taskList',stringObject);
        

        e.preventDefault();
        }
}

let taskListLocal=[];
// ----------------------------------
// --------------DELETE TASK------------
// ----------------------------------
const bodyNode = document.body;

bodyNode.addEventListener("click",eventHandler)
function eventHandler(e){
    if(e.target.className === "fa fa-times"){
        e.target.parentElement.parentElement.remove();
        let f = storedTasks.indexOf(e.target.parentElement.parentElement.innerText)
        storedTasks.splice(f,1);
        let stringObject = JSON.stringify(storedTasks);
        localStorage.setItem("taskList",stringObject);
        e.preventDefault();
    }
};

// --------------------------------------
// ---------BOTON CLEAR TAKS-------------
// --------------------------------------
const target = document.querySelector(".clear-tasks");
target.addEventListener("click", eventHandler_clear);

function eventHandler_clear(e) {
  e.preventDefault();
  let lis = document.querySelectorAll("li");
  lis.forEach(function(element) {
    element.remove();
    storedTasks = [];
    let stringObject = JSON.stringify(storedTasks);
    localStorage.setItem("taskList",stringObject);
  });
    e.preventDefault();
}

// --------------------------------------
// ---------FILTERING TASKS--------------
// --------------------------------------
function eventHandler_filter(){
    let input = document.getElementById("filter");
    let filter = input.value.toUpperCase()
    let elements = document.getElementsByClassName("collection-item");
    elements=[].slice.call(elements)
    console.log(elements)
    elements.forEach(function(element){
        if(element.innerText.toUpperCase().indexOf(filter)>-1){
            console.log(element.innerText.indexOf(filter))
            element.style.display="";
        }else{
            element.style.display="none"
        }
    })
}
let storedTasks = [];

// --------------------------------------
// ------------RELOAD PAGE---------------
// --------------------------------------
function reload(e){
    let prevTasks = localStorage.getItem("taskList");
    prevTasks = JSON.parse(prevTasks);
    prevTasks.forEach(element =>{
        let li = document.createElement("li");
        li.setAttribute("class","collection-item");
        li.innerHTML = `${element}<a href="#" class="delete-item secondary-content"><i class="fa fa-times"></i></a>`;
        list.appendChild(li);
        storedTasks.push(element);
        
    })
}
