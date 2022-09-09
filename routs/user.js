const express = require('express')
const app = express()
const encrypt=require("bcrypt")
const mongoose = require('mongoose');
const user=require("../model/usermodel")
const router = express.Router()
router.post("/add",async(req,res,next)=>{
    try {
        let data=new user(req.body)
        let token=await data.generatetoken()
        res.cookie("jwt",token,{
            expires: new Date(Date.now()+(1000*60*60*24*7)),
            httpOnly: true
        })
        let useradd=await data.save()
        res.status(201).json({message:"Registration successful"})
    } catch (error) {
        res.status(500).json(error)
        
    }

})
router.get("/all",async(req,res,next)=>{
    try {
        let userlist=await user.find()
    res.status(200).json(userlist)
    } catch (error) {
        res.status(500).json({message:"No data"})
        
    }

})
router.patch("/update/:id",async(req,res,next)=>{
   try {
    const _id=req.params.id
    let userupdate=await user.findByIdAndUpdate(_id,req.body,{
        new:true
    })
    res.status(200).json({message:"User Updated success"})
   } catch (error) {
    res.status(500).json(error)
    
   }


})
router.delete("/delete/:id",async(req,res,next)=>{
    try {
        const _id=req.params.id
      let userdelete=await user.findByIdAndDelete(_id)
      if(!_id){
        res.status(500).json({message:"user doesnot exist"})
      }else{
        res.status(200).json({message:"Successfuly deleted"})
      }
    } catch (error) {
        res.status(500).json(error)
        
    }


})
router.post("/login",async(req,res)=>{
    try {
        let email = req.body.email
        let password = req.body.password
        const userdata= await user.findOne({ email: email})
        const ismatch= await encrypt.compare(password,userdata.password)
         const token=await userdata.generatetoken()
         res.cookie("jwt",token,{
            expires: new Date(Date.now()+(1000*60*60*24*7)),
            httpOnly: true
        })
         console.log("the token",token)
         if(ismatch){
            res.status(200).json({message:"The token is correct"})
        }else{
            res.status(401).json({message:"The token is incorrect"})
        }
    } catch (error) {
        res.status(400).json({message:"Invalid login"})
        
    }
})
module.exports=router