const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const mongoose = require('mongoose');

app.get("/", (req,res,next)=>{
    res.send("Hello From KANBAN")
})

mongoose.connect('mongodb://localhost:27017/kanban');
mongoose.connect('connected', ()=>{
    console.log('connected to mongodb')
})
app.listen(3700);
console.log('Server is started on localhost:3700')