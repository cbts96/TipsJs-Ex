const app=require("./src/app")
const PORT=process.env.PORT || 3001
const server=app.listen(PORT,()=>{
    console.log(`App listenning on port ${PORT}`);
})

process.on("SIGINT", ()=>{server.close(()=>console.log("SERVER CLOSE"))})