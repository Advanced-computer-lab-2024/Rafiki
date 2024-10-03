// External variables
const express = require("express");
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
require("dotenv").config();
const MongoURI = "mongodb+srv://yahiahanafi:Rafiki1234@rafiki.mz5h4.mongodb.net/?retryWrites=true&w=majority&appName=Rafiki";

//App variables
const app = express();
const port = process.env.PORT || "8000";
// #Importing the userController

// configurations
// Mongo DB
mongoose.connect(MongoURI)
.then(()=>{
  console.log("MongoDB is now connected!")
// Starting server
 app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  })
})
.catch(err => console.log(err));
/*
                                                    Start of your code
*/
app.get("/home", (req, res) => {
    res.status(200).send("You have everything installed!");
  });

// #Routing to userController here

app.use(express.json())