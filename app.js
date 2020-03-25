var addTaskbutton=document.getElementById('submitBtn');
var taskListElement=document.getElementById('list');
var taskDescriptionlist=document.getElementById('query');
var taskTitleInputTextbox=document.getElementById('taskTitleInputbox');
var addmoredetailsbutton=document.getElementById('addmoredetailsBtn');
var deadlinelist=document.getElementById('deadline');
var tasks=[];

addTaskbutton.addEventListener('click',function() {
  var taskTitle=taskTitleInputTextbox.value;
  var taskDescription=taskDescriptionlist.value;
  var dead=deadlinelist.value;
  var todo = {
    title:taskTitle,
    description:taskDescription ,
    deadline:dead
  }
    tasks.push(todo);
addToStorage(todo)
  

taskTitleInputTextbox.value='';
taskDescriptionlist.value='';
deadlinelist.value='';
}
);

function addToStorage(todo){
    let items = []
    items = JSON.parse(localStorage.getItem('todo'))
    console.log(items);
    items.push(todo);
    (localStorage.setItem('todo', JSON.stringify(items)))
    renderList();
}

function deleteTodo(index){
    var newtask=[];
    for(var i=0;i<tasks.length;i++)
    {
        var singleitem=tasks[i];
        if(i!==index)
        {
            newtask.push(singleitem);
        }
    }
    tasks=newtask;
    renderList();
}
function editTodo(index){
    console.log(taskTitleInputTextbox);
    var taskTitle=taskTitleInputTextbox.value;
    var taskDescription=taskDescriptionlist.value;
    var dead=deadlinelist.value;
    i=index
    taskTitleInputTextbox.value=tasks[i].title;
    taskDescriptionlist.value=tasks[i].description;
    //deadlinelist.value=index.dead;
    var newtask=[];
    for(var i=0;i<tasks.length;i++)
    {
        var singleitem=tasks[i];
        if(i!==index)
        {
            newtask.push(singleitem);
        }
    }
    tasks=newtask;
    renderList();
}


function markasComplete(index){
    i=index;
    tasks[index].title=tasks[index].title.strike();
    tasks[index].description=tasks[index].description + " is completed";
    //taskDescriptionlist.value=task[index].description;
    renderList();

 //document.getElementById('all').style.background=color;
 //renderList();
}

function renderList(){
    let items = []
    items = JSON.parse(localStorage.getItem('todo'))
    var html = ''
    for(var i=0; i<items.length; i++){
    html  +=   `<li><div class="todo-item"> 
                <div id="all" class="todo-details"> 
                <div id="titl" class="todo-title">${items[i].title}</div> 
                <div class="todo-description">${items[i].description}</div> 
                <div class="todo-deadline">${items[i].deadline}</div></div> 
                <div class="todo-tools"> 
                <a href="#" onclick="markasComplete('+index+')">Mark As Complete</a> | 
                <a href="#" onclick="editTodo('+index+')">Edit</a> | 
                <a href="#" onclick="deleteTodo('+index+')">Delete</a> 
            </div> 
        </div> 
    </li>`;
    }

    taskListElement.innerHTML = html
   console.log(html)
   

}
renderList();