const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const userroute = require('./routes/user')
const projectroute = require('./routes/project')
const path = require('path');
var cors = require('cors');

app.get("/", (req,res,next)=>{
    res.send("Hello From KANBAN")
})
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'/public')));
app.use('/api/user/',userroute)
app.use('/api/project/',projectroute)

mongoose.connect('mongodb://localhost:27017/Kanban');
mongoose.connect('connected',  ()=>{
    console.log('connected to mongodb')
})
app.listen(3700);
console.log('Server is started on localhost:3700')