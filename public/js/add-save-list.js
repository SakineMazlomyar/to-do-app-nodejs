let toDoList = []

function addItem() {
  let text = document.getElementById('item-info');
  toDoList.push(text.value)
  let item = document.createElement('li');
  item.innerText = text.value;
  document.getElementById('to-do').appendChild(item);
  
  deleteItem(toDoList.indexOf(text.value));
  text.value ='';
  text.focus();
  
}

function deleteItem(index) {
  var deleteButton = document.createElement('button');
  deleteButton.innerHTML = 'remove item'
  document.getElementById('to-do').appendChild(deleteButton);
  deleteButton.onclick = ()=> {

  toDoList.splice(index, 1);
  document.getElementById('to-do').innerHTML = '';
  rebuildItems()
  }
 
}
  
function rebuildItems(){
  for(let value of toDoList) {
    let itemtagg = document.createElement('li');
    itemtagg.innerText = value;
    document.getElementById('to-do').appendChild(itemtagg);
    deleteItem()
  }
  
}




//save the todo list
async function saveMyList() {
  let listname = document.getElementById('list-item-name');
  const data = {listid:Math.floor(Math.random()*100000), listname: listname.value, todolist:toDoList};
   let response =  await fetch('/handlers/save', 
      {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
      'Content-Type':'application/json'
    },
    })
    console.log(response, "here is the res");
    if(response.status !== 200) {
      console.error(response.statusText)
      alert('Coult not save your list!')
    } else {
      let responseToJson = await response.json();
      addNewList(responseToJson )

    }
}

function addNewList(newList) { 
  console.log(newList); 
  location.reload()
}
