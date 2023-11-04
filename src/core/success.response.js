"use strict"

// const StatusCode={
//     OK:200,
//     CREATED:201

// }
// const ReasonCode={
//     OK:"Successfully",
//     CREATED:"Created"

// }

const {StatusCodes,ReasonPhrases}=require("../utils/httpStatusCode")


class SuccessResponse{
    constructor({message,statusCode=StatusCodes.OK,reasonCode=ReasonPhrases.OK,metaData={}}){
        this.message=!message? reasonCode: message
        this.status=statusCode
        this.metaData=metaData
    }
    send(res,headers={}){
        return res.status(this.status).json(this)
    }
}

class OK extends SuccessResponse{
    constructor({message,metaData}){
        super({message,metaData})
    }
}
class CREATED extends SuccessResponse{
    constructor({options={},message,statusCode=StatusCodes.CREATED,reasonCode=ReasonPhrases.CREATED,metaData={}}){
        super({message,statusCode,reasonCode,metaData})
        this.options=options
    }
}
module.exports={
    OK,CREATED,SuccessResponse
}