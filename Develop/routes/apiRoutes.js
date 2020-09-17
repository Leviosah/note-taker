const fs = require("fs");
//const tableData = require('../data/noteData.js ');


module.exports = function (app) {
    
  
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
            //const dbBuffer = fs.readFileSync("./db/db.json") 
           // const db = JSON.parse(dbBuffer)
           // db.push(req.body)
            //fs.writeFileSync("./db/db.json", JSON.stringify(db))
           // res.json(db)
           res.send("hello")
        });

   //app
     //   .get((req,res) => {
    //        res.send("get note" + req.params.id)
    //   })
    //    .delete((req,res) => {
    //        res.send("delete note" + req.params.id)
   //    });

    //app.listen(port, err => {
        //if (err) {
           // return console.log("error", err);
       // }
    //})
}
    


