"use strict"
// const StatusCode={
//     FORBIDEN:403,
//     CONFLICT:409
// }
// const ReasonCode={
//     FORBIDEN:"Bad request Err",
//     CONFLICT:"Conflict Err"
// }

class ErrorResponse extends Error{
    constructor(message,status){
        super(message)
        this.status=status
    }
}
const {StatusCodes,ReasonPhrases} =require("../utils/httpStatusCode")


class ConflictRequestError extends ErrorResponse{
    constructor(message=ReasonPhrases.CONFLICT,statusCode=StatusCodes.FORBIDEN){
        super(message,statusCode)
    }
}
class BadRequestError extends ErrorResponse{
    constructor(message=ReasonPhrases.CONFLICT,statusCode=StatusCodes.FORBIDEN){
        super(message,statusCode)
    }
}
class FailureAuthError extends ErrorResponse{
    constructor(message=ReasonPhrases.UNAUTHORIZED,statusCode=StatusCodes.UNAUTHORIZED){
        super(message,statusCode)
    }
}
module.exports={
    ConflictRequestError,BadRequestError,FailureAuthError
}