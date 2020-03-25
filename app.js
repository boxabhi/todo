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
    addToStorage(todo)
  
taskTitleInputTextbox.value='';
taskDescriptionlist.value='';
deadlinelist.value='';
}
);

function addToStorage(todo){
    let items = []
    if(localStorage.getItem('todo') === null){ 
        localStorage.setItem('todo' , JSON.stringify(items));
    }
    console.log(JSON.stringify(localStorage.getItem('todo')))
    items = JSON.parse(localStorage.getItem('todo'))
    console.log(items);
    items.push(todo);
    (localStorage.setItem('todo', JSON.stringify(items)))
    renderList();
}

function deleteTodo(index){
   let items = JSON.parse(localStorage.getItem('todo'));
   items.pop(index)
   localStorage.setItem('todo',JSON.stringify(items))
   renderList();
}

function editTodo(event,index){
    event.preventDefault();
    console.log(index)
    var todos = JSON.parse(localStorage.getItem('todo'))
    console.log(todos[index]);
    taskTitleInputTextbox.value=todos[index].title
    taskDescriptionlist.value= todos[index].description;
    deadlinelist.value= todos[index].deadline;
    renderList();
}


function markasComplete(index){
    var done = document.getElementById('done_'+index);
    var btn = document.getElementById('button_'+index)
    btn.innerHTML = 'Undone';
    done.setAttribute('class','done');
    console.log(done)
    //renderList();
}

function renderList(){
    let items = []
    items = JSON.parse(localStorage.getItem('todo'))
    var html = ''
    for(var i=0; i<items.length; i++){
    html  +=   `<li><div class="todo-item"> 
                <div id="all" class="todo-details"> 
                <div id="titl" class="todo-title">
                <p id="done_${i}">${items[i].title}</p></div> 
                <div class="todo-description">${items[i].description}</div> 
                <div class="todo-deadline">${items[i].deadline}</div></div> 
                <div class="todo-tools"> 
                <a href="#" id="button_${i}" onclick="markasComplete(${i})">Mark As Complete</a> | 
                <a href="#" onclick="editTodo(event,${i})">Edit</a> | 
                <a href="#" onclick="deleteTodo(${i})">Delete</a> 
            </div> 
        </div> 
    </li>`;
    }
    taskListElement.innerHTML = html;
   

}
renderList();