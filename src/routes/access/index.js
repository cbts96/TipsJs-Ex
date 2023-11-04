"use strict"

const express= require("express")
const accessController = require("../../controller/access.controller")
const router=express.Router()
const {catchAsync}= require("../../auth/checkAuth")

// router.get("/",(req,res,next)=>{
//     return res.status(200).json({
//         message:"hellop thang"
//     })
// })
router.post("/shop/signup",catchAsync(accessController.signUp))
router.post("/shop/login",catchAsync(accessController.login))
module.exports=router