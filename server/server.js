const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/incomelens");

const UserSchema = new mongoose.Schema({
    email: String,
    password: String
});

const User = mongoose.model("User", UserSchema);

app.post("/register", async (req, res) => {

    const hashedPassword = await bcrypt.hash(req.body.password,10);

    const user = new User({
        email:req.body.email,
        password:hashedPassword
    });

    await user.save();

    res.json({message:"User created"});
});

app.post("/login", async (req,res)=>{

    const user = await User.findOne({email:req.body.email});

    if(!user) return res.status(400).json("User not found");

    const validPassword = await bcrypt.compare(req.body.password,user.password);

    if(!validPassword) return res.status(400).json("Invalid password");

    const token = jwt.sign({id:user._id},"secretkey");

    res.json({token});
});

app.listen(5000,()=>console.log("Server running"));
