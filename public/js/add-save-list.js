let toDoList = []

function addItem() {
  let text = document.getElementById('item-info');
  toDoList.push(text.value)
  showAddedItems()


}

function showAddedItems() {
  let item
  for(let oneToDo of toDoList) {
    
    item = document.createElement('li');
    item.innerHTML = oneToDo
    item.setAttribute('class', 'item')
  }

  document.getElementById('to-do').appendChild(item)
}
//save the todo list
async function saveMyList() {
  let listname = document.getElementById('list-item-name');
    const data = { listname: listname.value, todolist:toDoList};
    const response = await fetch('/handlers/save', 
      {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
      'Content-Type':'application/json'
    },
    }).then((res)=>{
      
        return res.json().then((savedlist)=>{
          console.log(savedlist)
        })
  

    }).catch((err)=>{
      console.log(err)
    })

}
