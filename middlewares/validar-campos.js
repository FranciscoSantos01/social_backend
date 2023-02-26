const{response} = require('express')

const{validationResult}= require('express-validator')



 const validarCampos =  async(req, res=response, next)=>{
    const validation = validationResult(req)
     

    if(!validation.isEmpty()){
        return res.status(400).json({
            ok:false,
            msg: validation.mapped()
        })
    }

    next()
 }

 module.exports ={
    validarCampos
 }