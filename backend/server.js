const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')


const app = express()
app.use(cors())
app.use(express.json())

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

//  Add user route
app.post('/adduser', (req, res) => {
    const { name, age, city } = req.body
    const newUser = new userModel({ name, age, city })
    newUser.save()
        .then(() => res.json({ message: "User added successfully" }))
        .catch(err => res.json(err))
})

// Update user by ID
app.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete user by ID
app.delete('/users/:id', async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.listen(8080,()=>{
    console.log("The listening port is ",8080)
})