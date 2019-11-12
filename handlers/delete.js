module.exports = (app, fs)=>{
  app.delete('/handlers/delete/:_url', (req,res)=>{
    try {
      fs.readFile('./handlers/databas.json',(error, data)=>{
        let allsaved = JSON.parse(data);
        for(let [index, value] of allsaved.entries()) {
  
          
          if(value.listname === req.url.substr(17)) {
            allsaved.splice(index,1)
      
          } 
        }
         fs.writeFile("./handlers/databas.json", JSON.stringify(allsaved), (err)=> {
          if (err) throw err;
          console.log('Succed to remove!');
          res.json(allsaved)
      
        });

     })
    } catch(error) {
  
    }
  })
}