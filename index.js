import express from "express";
import mongoose from 'mongoose';
import bodyParser from "body-parser";
import dataRoutes from './routes/dataRoutes.js'
const app = express();

const port = 5000;

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.listen(port, () =>{
    console.log(`example app listening on port ${port}`)
})

mongoose.connect('mongodb://127.0.0.1:27017/Credence') 
.then(()=>{
    console.log("Database successfully connnected!");
})
.catch((err)=>{
    console.log("Error: ",err)
})

app.use('/credence',dataRoutes)