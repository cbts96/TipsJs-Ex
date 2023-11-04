"use strict"

const shopModel = require("../models/shop.model");
const bcrypt= require("bcrypt")
const crypto= require("crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/auth.Util");
const { getInfoData } = require("../utils");
const { BadRequestError, FailureAuthError } = require("../core/error.response");
const findShop = require("./shop.service");
const RolesShop={
    SHOP:"SHOP",
    WRITER:"WRITER",
    EDITOR:"EDITOR",
    ADMIN:"ADMIN",
}
class AccessService{
    static login=async({email,password,refreshToken=null})=>{
        
        const existShop= await findShop({email})
        if(!existShop){
            throw new BadRequestError("ERR: this shop is not found!")
        }
        const matchPass= bcrypt.compare(password,existShop.password)
        if(!matchPass) throw new FailureAuthError("Authentication Error")

        const privateKey=crypto.randomBytes(64).toString("hex")
        const publicKey=crypto.randomBytes(64).toString("hex")
        const {_id:userId}=existShop
        const tokens= await createTokenPair({userId:existShop._id,email},publicKey,privateKey)
        console.log("refresh token========",tokens)
        await KeyTokenService.createKeyToken({
            refreshToken:tokens.refreshToken,
            privateKey,publicKey,userId
        })

        return {
            shop:getInfoData({fileds:["_id","name","email"],object:existShop}),
            tokens
        }
    }
    static signUp= async ({name,email,password})=>{
        try{
            const holderShop= await shopModel.findOne({email}).lean()

            if(holderShop){
               throw new BadRequestError("Error:Shop already Registered")
            }
            const hashPassword=await bcrypt.hash(password,10)
            const newShop=await shopModel.create({name,email,password:hashPassword,roles:[RolesShop.SHOP]})
            // if(newShop){
            //     const { privateKey,publicKey } = crypto.generateKeyPairSync("rsa",{
            //         modulusLength:4096,
            //         publicKeyEncoding:{
            //             type: "pkcs1",
            //             format:"pem"
            //         },
            //         privateKeyEncoding:{
            //             type:"pkcs1",
            //             format:"pem"
            //         }
            //     })
            const privateKey=crypto.randomBytes(64).toString('hex')
            const publicKey=crypto.randomBytes(64).toString('hex')
            
                console.log(publicKey,privateKey)
                const keyStore=await KeyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey,
                    privateKey
                })
                if(!keyStore){
                    return{
                        code: 200,
                        message:" keyStore issues"
                    }
                }
            
       
            // const publicKeyObject=crypto.createPublicKey(publicKeyString)
            const tokens= await createTokenPair({userId:newShop._id,email},publicKey,privateKey)

            console.log("token created: ",tokens)

            return {
                code: 201,
                metadata:{
                    shop:getInfoData({fileds:["_id","name","email"],object:newShop}),
                    tokens
                }
            }
        
        }catch(err){
            return{
                code:200,
                message:err.message,
                status: "error"
            }
        }
    }
    
}
module.exports=AccessService