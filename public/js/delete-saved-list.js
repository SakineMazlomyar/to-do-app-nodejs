//show the todo list based on name
async function showMySavedToDoList() {
  await fetch('/handlers/getAll',{method: 'GET'})
 .then((result)=>{
   
   result.json().then((dat)=>{
     showAllSavedList(dat)
   }) 
 })
 .catch((error)=>{
   console.log(error)
 })

}


function showAllSavedList(lists){
  for(let list of lists) {

   showSingleList(list.todolist, list.listname, list.listid)
  }
 
} 
function showSingleList(list, listnamesaved, listid) {

let listname = document.createElement('h4');
listname.innerHTML = 'List name: '+listnamesaved;

let ul = document.createElement('ul');
   
    for(let [index, value] of list.entries()) {
      let itemTagg = document.createElement('li');
      let deleteButton = document.createElement('button');
      itemTagg.innerHTML = value
      deleteButton.innerHTML = 'Remove'
      ul.appendChild(itemTagg)
      ul.appendChild(deleteButton)
      deleteButton.onclick = ()=>{
        //list.splice(index,1);
        console.log(index, "here is the index")
        console.log(listid, 'id')
      
        
      }

    }
    console.log(list, "here is data 3")
  ul.setAttribute('idd',listid)
  console.log(ul.getAttribute('idd'));

    document.getElementById('saved-list').appendChild(listname);
    document.getElementById('saved-list').appendChild(ul)
    let removeButton = document.createElement('button');
    removeButton.innerHTML = 'Remove list';
    removeButton.onclick = ()=>{
      removeOneList(listid, list)
    } 
    document.getElementById('saved-list').appendChild(removeButton);


}

function removeOneList(listid) {
  fetch('/handlers/delete/'+listid, {method:'DELETE'})
  .then((result)=>{
    result.json().then((res)=>{
      console.log(res);
      location.reload();
    })
  }).catch((error)=>{
    console.log(error)
  })
  
  
} 
