const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
    name: String,
    manufacturer: String, 
    year: Number,
    mpg: String,
    transmission: String,
    style: String,
    price: Number
})

const Cars = mongoose.model('Cars', carSchema)

module.exports = Cars 

