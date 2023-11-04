"use strict"

const findById = require("../services/apiKeyService")

const HEADER={
    API_KEY : "x-api-key",
    AUTHORIZATION : "authorization"
}

const apiKey=async(req,res,next)=>{
    try{
        const key= req.headers[HEADER.API_KEY]?.toString()
        if(!key){
            return res.status(403).json({
                message:"Forbiden Err"
            })
        }
        const objKey=await findById(key)
        if(!objKey){
            return res.status(403).json({
                message: "Forbiden Err"
            })
        }
        req.objKey=objKey
        return next()

    } catch(error){
        console.log(error)
    }
}

const checkPermission=(permission)=>{
    return (req,res,next)=>{
        console.log("permission:=>>>",req.objKey)
        if(!req.objKey.permissions){
            return res.status(403).json({message:"permission denied!"})
        }
        
    
    if(!req.objKey.permissions.includes(permission)){
        return res.status(400).json({
            message:"permission denied"
        })
    }
    return next()
}}
const catchAsync=fn=>{
    return (req,res,next)=>{
        fn(req,res,next).catch(next)
    }
}
module.exports={apiKey,checkPermission,catchAsync}