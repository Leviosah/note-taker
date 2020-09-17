const express = require('express');
const fs = require("fs");
const path = require('path');

const app = express()

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api/notes', (req,res) => {
    const dbBuffer = fs.readFileSync("./db/db.json") //fs function to read file db.json
    console.log(dbBuffer) 
    console.log(dbBuffer.toString()) //stringify the dbbuff
    console.log(JSON.parse(dbBuffer)) // parse buffer into object
    res.json(JSON.parse(dbBuffer))
    console.log("we made it this far")
})
app.post('/api/notes', (req,res) => {
    console.log("this is the req body " + req.body)
   const dbBuffer = fs.readFileSync("./db/db.json") 
   const db = JSON.parse(dbBuffer)
   db.push(req.body)
   fs.writeFileSync("./db/db.json", JSON.stringify(db))
   res.json(db)
   res.send("hello")
});



//require('./routes/apiRoutes')(app);
//require('./routes/htmlRoutes')(app);  

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  