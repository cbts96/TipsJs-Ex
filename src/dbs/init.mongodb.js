"use strict"
const mongoose=require("mongoose")
const {db:{host,name,port}} = require("../configs/config.mongodb")
const connectionString=`mongodb+srv://lexuanthang123:cbts96@cluster0.ma3jtmk.mongodb.net/`

class Database{
    constructor(){
        this.connect()
    }
    connect(type="mongodb"){
        if(1===1){
            mongoose.set("debug",true)
            mongoose.set("debug",{color:true})
        }
        mongoose.connect(connectionString,{
            maxPoolSize:50
        }).then(_=>console.log("Connect DB Successfully")).catch(err=>console.log("Err while connecting this DB"))
    }
    static getInstance(){
        if(!Database.instance){
            Database.instance=new Database()
        }
        return Database.instance
    }}
    const instanceMongoDb=Database.getInstance()
    module.exports=instanceMongoDb
