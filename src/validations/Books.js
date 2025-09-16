const { request, response } = require("express");
const Joi = require("joi");



module.exports=(request,response,next)=>{

const book = {...request.body}


    
    
    const validation = Joi.object({
     
     name: Joi.string().min(5).max(50).pattern(/^[a-zA-Z\ ]{5,50}$/).required(),
     description: Joi.string().min(10).max(100).required(),
     authors: Joi.array().items(Joi.string().min(5).max(50).pattern(/^[a-zA-Z\ ]{5,50}$/)).required(),
    
    }).validate(book)
    
    if(validation.error){
        return response.status(400).json({
    
       status:"error",
       code:"400",
       msg:validation.error.details,
     })
    };

     next()

}

 

