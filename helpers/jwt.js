const jwt = require('jsonwebtoken')

const generateToken = (uid, name)=>{
    return new Promise((resolve,reject)=>{
        const payload ={uid,name}
        jwt.sign(payload,process.env.JWT_KEY,{expiresIn: '2hr'},
        (err, token)=>{
            if(err){
                console.log(err)
                reject('Token failed production')
            }
            resolve(token)
        }
        )
    })
}


module.exports = {
    generateToken
}