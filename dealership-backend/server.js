//requirements
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors =require('cors')

const Cars = require('./models/cars.js')

//listeners
app.listen(3000, ()=>{
    console.log("What do you have for me?")
});

mongoose.connect('mongodb://localhost:27017/animal')
mongoose.connection.once('open', () =>{
    console.log("You're connected to Mongod!")
})

//middleware
app.use(express.json());
app.use(cors());

