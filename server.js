const express = require('express')
const mongoose = require('mongoose')


const app = express()

mongoose.connect('mongodb://localhost:27017/company')
const userSchema  = new  mongoose.Schema({
    name:String,
    age:Number,
    city:String
}) 
const userModel = mongoose.model('users',userSchema)

app.get('/',(req,res)=>{
    res.json("From backend side")
})

app.get('/users',(req,res)=>{
userModel.find({})
.then(function(users){
res.json(users)
})
.catch(function(err){
    res.json(err)
})
})

app.listen(8080,()=>{
    console.log("The listening port is ",8080)
})