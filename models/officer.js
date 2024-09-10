// models/student.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const officerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    designation: {
        type: String,  
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    batch: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    birthday:{
        type:Date,
        required: false,
    },
    officerImage:{
        type:String,
        required:false,
    }
    
});

const Officer = mongoose.model("officer", officerSchema);

module.exports = Officer;