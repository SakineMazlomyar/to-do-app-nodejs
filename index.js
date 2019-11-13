let express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
let app = express();
app.use(bodyParser.json());

//hello world
app.get('/', (req,res)=>{ 
  res.send('Hello World!')

})

//static files
app.use('/static', express.static('public'));
//post handler 
require('./handlers/post')(app, fs);
//get all handler 
require('./handlers/getAll')(app,fs);
//delete handler
require('./handlers/delete')(app,fs);

let server = app.listen(8080, ()=>{
  console.log(server.address().port)
})

