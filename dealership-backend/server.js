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

mongoose.connect('mongodb://localhost:27017/cars')
mongoose.connection.once('open', () =>{
    console.log("You're connected to Mongod!")
})

//middleware
app.use(express.json());
app.use(cors());

/////
//ROUTES
//////

//CREATE
app.post('/cars', (req,res)=>{
    cars.create(req.body, (err, createdCars)=>{
        res.json(createdCars)
    })
})
//INDEX
app.get('/cars', (req,res)=>{
    cars.find({}, (err,foundCars)=>{
        res.json(foundCars)
    })
});
//DELETE
app.delete('/cars/:id', (req,res)=>{
cars.findByIdAndRemove(req.params.id, (err, deletedCars)=>{
    res.json(deletedCars);
})
});

//UPDATE
app.put('/cars/:id', (req,res)=>{
cars.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err,updatedCars)=>{
    res.json(updatedCars)
})
})
