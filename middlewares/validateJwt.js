const{response}= require('express')
const jwt = require('jsonwebtoken')


const validateJwt = async(req, res=response, next)=>{
        const token = req.header('x-token')

        if(!token){
            return res.status(401).json({
                ok:false,
                msg:"There's no token in the request"
            })
        }

        try {
            const payload = jwt.verify(token,process.env.JWT_KEY)
            req.uid = payload.uid
            req.name  = payload.name

        } catch (error) {
            console.log(error)
            res.status(401).json({
                ok:false,
                msg:"token expired or not valid"
            })
        }

        next()
}
module.exports = {
    validateJwt
}