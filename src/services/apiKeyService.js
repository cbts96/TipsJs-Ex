const apikeyModel = require("../models/apikey.model")
const crypto=require("crypto")
const findById=async(key)=>{
    // const newKeyExample=await apikeyModel.create({key:crypto.randomBytes(64).toString("hex"),permissions:["0000"]})
    // console.log(newKeyExample)
    const res= await apikeyModel.findOne({key,status:true}).lean()

    return res
}

module.exports=findById