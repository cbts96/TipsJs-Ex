const express= require("express")
const app=express();
const morgan= require("morgan");
const {default:helmet}=require("helmet");
const compression = require("compression");
const { checkOverload } = require("./helpers/connection.utils");

app.use(morgan("dev"))
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use("/",require("./routes"))
app.use(express.urlencoded({
    extended:true
}))
require("./dbs/init.mongodb")
app.use((error,req,res,next)=>{
    const statusCode=error.status || 500
    return res.status(statusCode).json({
        status:"err",
        code:statusCode,
        message:error.message || "internal err"
    })
})
checkOverload()
module.exports=app;