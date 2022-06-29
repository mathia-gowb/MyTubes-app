function jsonResponse(responseStatus,responseMessage){
   return {
    status:responseStatus,
    message:responseMessage,
    
    }
}
module.exports = jsonResponse