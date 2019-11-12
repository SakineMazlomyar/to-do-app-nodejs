module.exports = (app,fs)=>{
  app.get('/handlers/getAll', (req,res)=>{
    try {
      fs.readFile('./handlers/databas.json',(error, data)=>{
      res.json(JSON.parse(data))
    })
  
    } catch (error){
      console.log(error)
    }
  })
}