const routers=require('express').Router();
const User=require('../models/UserSchema');
const bcrypt=require('bcryptjs');
const jwt = require("jsonwebtoken");
const { tokenverify, verifyAdmin 

} = require("../middleware/Tokengen");
routers.post('/register',async(req,res)=>{
    const {name,email,password}=req.body;
    console.log({name,email,password})
    try{
        const userExist=await User.findOne({email})
        if(userExist){
            return res.status(400).json({message:"User already exists"})
        }
        if(!name || !email || !password){
            return res.status(400).json({message:"Please fill all the fields"})
        }
        if(password.length<6){
            return res.status(400).json({message:"Password must be at least 6 characters"})
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const NewUser=await User.create({
            name,
            email,
            password:hashedPassword
        })
        await NewUser.save()
        return res.status(201).json({message:"User created successfully"})

    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
})
 routers.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"User not found"})
        }
        if(!email || !password){
            return res.status(400).json({message:"Please fill all the fields"})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"})
        }
        const Tokengen = jwt.sign(
          {
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
          },
          process.env.JWT_SECRET,
          { expiresIn: "30d" }
        );
        if(!Tokengen){
            return res.status(400).json({message:"Token generation failed"})
        }
        return res.status(200).json({message:"Login successful",user,Tokengen})
 }
 catch(err){
        return res.status(500).json({message:err.message})
    }
 
})


routers.get('/getuser', tokenverify, async(req,res)=>{
    try{
        const user=await User.findById(req.user.id)
        if(!user){
            return res.status(400).json({message:"User not found"})
        }
        return res.status(200).json({user})
    }
    catch(err){
        return res.status(500).json({message:err.message})
    }

})





module.exports=routers;