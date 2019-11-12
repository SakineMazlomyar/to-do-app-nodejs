module.exports = function(app,fs){
  app.post('/handlers/save', (req, res)=>{
    try {
    
      let data = await  = req.body;
      fs.readFile('./handlers/databas.json',(error, dat)=>{
        var json = JSON.parse(dat)
        json.push(data);
        fs.writeFile('./handlers/databas.json', JSON.stringify(json), (err)=> {
          if (err) throw err;
          console.log('Succed to save!');
        
        });
  
        res.json(json)
  
      })
    } catch( error ) {
      res.send(error)
    }
  
  })
}