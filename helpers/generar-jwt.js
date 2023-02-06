const jwt = require('jsonwebtoken');


const generarJWT = (uid='')=>{
    return new Promise((resolve, reject) => {
        const payload = {uid};
        const privateKey = process.env.SECRETORPRIVATEKEY;
        jwt.sign(payload,privateKey, {
            expiresIn: '4h'
        }, (err, token)=>{
            if(err){
                console.log(err);
                reject(err);
            }else{
                resolve(token);
            }
        })
    })
}

module.exports = generarJWT;