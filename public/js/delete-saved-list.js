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
      //deleteButton.innerHTML = 'Remove'
      ul.appendChild(itemTagg)
      ul.appendChild(deleteButton)
      deleteButton.onclick = ()=>{
        //list.splice(index,1);
       
        itemTagg.style.color = 'red';
        itemTagg.setAttribute('delete','yes')
        
        checkForDelete(index,value, listid)
      
      }

    }
    
  ul.setAttribute('idd',listid)


    document.getElementById('saved-list').appendChild(listname);
    document.getElementById('saved-list').appendChild(ul)
    let removeButton = document.createElement('button');
    removeButton.innerHTML = 'Remove list';
    removeButton.onclick = ()=>{
      removeOneList(listid, list)
    } 
    let updateButton = document.createElement('button');
    updateButton.innerHTML = 'Save My Changes';
    updateButton.onclick = ()=>{
      updateOnelist()
    } 
    document.getElementById('saved-list').appendChild(removeButton);
    document.getElementById('saved-list').appendChild(updateButton);


}
let choosenDataToUpdate = []
function checkForDelete(index,values, listid) {
  
  if(choosenDataToUpdate.length<= 0){
    let testt = {};
    testt.id = listid;
    testt.data = []
    testt.data.push(values)
    choosenDataToUpdate.push(testt)
  } else {

    for(let value of choosenDataToUpdate) {
      if(value.id === listid) {
        value.data.push(values)

      } else {
        choosenDataToUpdate = []
        let testtt = {};
        testtt.id = listid;
        testtt.data = []
        testtt.data.push(index)
        choosenDataToUpdate.push(testtt)

      }
    }

  }
    console.log(choosenDataToUpdate)
  
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

function updateOnelist() {
  const data = choosenDataToUpdate
  fetch('/handlers/update', {

    method:'PUT',
    body: JSON.stringify(data),
    headers:{
    'Content-Type':'application/json'
  }
  })
  .then((result)=>{
    result.json().then((res)=>{
      console.log(res, "here is response");
      location.reload();

      
    })
  }).catch((error)=>{
    console.log(error)
  })

  
}
