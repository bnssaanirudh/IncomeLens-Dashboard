const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/incomelens");

const UserSchema = new mongoose.Schema({
email:String,
password:String
});

const User = mongoose.model("User",UserSchema);

app.post("/register", async (req,res)=>{

const hashedPassword = await bcrypt.hash(req.body.password,10);

const user = new User({
email:req.body.email,
password:hashedPassword
});

await user.save();

res.json({message:"User registered"});

});

app.post("/login", async (req,res)=>{

const user = await User.findOne({email:req.body.email});

if(!user){
return res.json({message:"User not found"});
}

const validPassword = await bcrypt.compare(req.body.password,user.password);

if(!validPassword){
return res.json({message:"Invalid password"});
}

res.json({message:"Login successful"});

});

app.listen(5000,()=>{
console.log("Server running on port 5000");
});
