
const express = require('express');
const fs = require("fs");
const path = require('path');
const bodyParser = require('body-parser')
const { v4: uuidv4 } = require('uuid');

const app = express()

const PORT = process.env.PORT || 8080;
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

//let notesData = []
   // {
   // title: "note 4",
   // text: "this is another test"
   // }//

app.get('/api/notes', (req,res) => {
    const dbBuffer = fs.readFileSync("./db/db.json") 
    console.log(JSON.parse(dbBuffer))
    res.send(dbBuffer)
})
app.post('/api/notes', (req,res) => {
    //req.body = {..., id: uuidv4()}
    console.log("this is the req body " + JSON.stringify(req.body))
    const dbBuffer = fs.readFileSync("./db/db.json")
    const db = JSON.parse(dbBuffer)
    db.push({...req.body, id: uuidv4()})

    fs.writeFileSync("./db/db.json", JSON.stringify(db))
    res.send(db)
    //const postNote = req.body; 
    
    //dbNotes.push({ ...postNote, id: uuidv4()});
    //res.send(`Note with the title ${dbNotes.title} added to the JSON`)
    res.send(JSON.stringify(dbBuffer))
})

app.get('/api/notes/:id', (req, res) => {
    const dbBuffer = fs.readFileSync("./db/db.json") 
    const db = JSON.parse(dbBuffer)
    const {id} = req.params
    const foundNote = db.find((finder) => finder.id === id)

    res.send(foundNote)
})

app.delete('/api/notes/:id', (req, res) => {
    const dbBuffer = fs.readFileSync("./db/db.json") 
    let db = JSON.parse(dbBuffer)
    const {id} = req.params;
    db = db.filter((destructor) => destructor.id !== id)
    fs.writeFileSync("./db/db.json", JSON.stringify(db))
    res.send(`User with the id ${id} has been yeeted`)
})
     
 app.get('/notes', (req, res) => {
     res.sendFile(path.join(__dirname, "/public/notes.html"))
 });

 app.get("*", (req, res) => {
     res.sendFile(path.join(__dirname, "/public/index.html"))
 });

 app.get("/api/notes/", (req, res) => {
     res.sendFile(path.json(__dirname, "/db/db.json"))
 });


//require('./routes/apiRoutes')(app);
//require('./routes/htmlRoutes')(app);  

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  