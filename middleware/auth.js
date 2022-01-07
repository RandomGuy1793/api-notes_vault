const jwt=require('jsonwebtoken')
const config=require('config')

const authenticate=(req, res, next)=>{
    const token=req.header('x-auth-token')
    if(!token) return res.status(401).send('Access denied, no token provided')
    try{
        const jwtKey=config.get('jwtKey')
        const verified=jwt.verify(token, jwtKey)
        req.user=verified
        next()
    }
    catch(ex){
        res.status(400).send("Token invalid");
    }
}

exports.auth=authenticate