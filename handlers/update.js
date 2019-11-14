module.exports = function(app,fs){
    app.put('/handlers/update', (req, res)=>{
      try {
      
        let data = await  = req.body;
        fs.readFile('./handlers/databas.json',(error, dat)=>{
          var json = JSON.parse(dat)

         for(let [index, value] of json.entries()) {
             if(data[0].id === value.listid){
              console.log(json, 'hh')
              console.log(data, 'obj')
              console.log(value, 'here is value')
              let test = value.todolist.filter((item)=>{
                return data[0].data.indexOf(item)<0
              })
              value.todolist= test

              fs.writeFile('./handlers/databas.json', JSON.stringify(json), (err)=> {
                if (err) throw err;
                console.log('Succed to save!');
              
                res.json(json)
              })
             }
         }
        
    
        })
        
      } catch( error ) {
        res.send(error)
      }
    
    })
  }