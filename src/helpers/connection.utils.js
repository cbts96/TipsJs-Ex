const { default: mongoose } = require("mongoose")
const os= require("os")
const SECOND= 4000
const numConnection=()=>{
    const count= mongoose.connections.length
    console.log(`The current connection is: ${count} connections!`)

}

const checkOverload=()=>{
    setInterval(()=>{
        const count= mongoose.connections.length
        const numCPU= os.cpus().length
        const memoryUsage=process.memoryUsage().rss
    
        const maxConnectionPerCores= numCPU * 5
        console.log(`Memory usaged is ${memoryUsage/1024/1024} MB`)
        console.log(`The current connection is: ${count} connections!`)

        if(maxConnectionPerCores<count){
            console.log("The number of connection is excedded")
        }
    }, SECOND)


}


module.exports={checkOverload,numConnection}