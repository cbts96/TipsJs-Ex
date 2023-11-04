const shopModel = require("../models/shop.model")

const findShop=async({email,options={email:1,password:2,name:1,status:1,roles:1}})=>{
    return await shopModel.findOne({email}).select(options).lean()
}

module.exports=findShop