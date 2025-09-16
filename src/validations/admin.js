const { request, response } = require('express')
const joi = require ('joi')

module.exports=(request , response , next)=>{

const admin = {...request.body}

const validation = joi.object({

name:joi.string().min(3).max(20).pattern(/^[a-zA-Z\ ]{3,20}$/).required(),
email:joi.string().email().min(7).max(40).required(),
password:joi.string().min(8).max(20).required(),
}).validate(admin)

if(validation.error){

return response.status(400).json({
    status:"error",
    msg:validation.error,
})

}
  next()

}