//show the todo list based on name
async function showMySavedToDoList() {
  await fetch('/handlers/getAll',{method: 'GET'})
 .then((result)=>{
   
   result.json().then((dat)=>{
     console.log(dat, "data")
     showAllSavedList(dat)
   }) 
 })
 .catch((error)=>{
   console.log(error)
 })

}


function showAllSavedList(lists){
  for(let list of lists) {

   showSingleList(list.todolist, list.listname)
  }
 
} 
function showSingleList(list, listnamesaved) {

let listname = document.createElement('h4');
listname.innerHTML = listnamesaved;

let ul = document.createElement('ul');
    for(let item of list) {
      let itemTagg = document.createElement('li');
      itemTagg.innerHTML = item
      ul.appendChild(itemTagg)
    }

    document.getElementById('saved-list').appendChild(listname);
    document.getElementById('saved-list').appendChild(ul)
    let removeButton = document.createElement('button');
    removeButton.innerHTML = 'Remove';
    removeButton.onclick = ()=>{
      removeOneList(listnamesaved, list)
    } 
    document.getElementById('saved-list').appendChild(removeButton);


}

function removeOneList(listname) {
  
  fetch('/handlers/delete/'+listname, {method:'DELETE'})
  .then((result)=>{
    result.json().then((res)=>{
      console.log(res)
    })
  })
  
  
} 
