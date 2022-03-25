
const jwt = require('jsonwebtoken');


const registerToken = (user)=>{
    
    return jwt.sign(
        {
            id:user.id,
            email:user.email,
            role:user.role
        },
        process.env.SECRET_KEY,
        {
            expiresIn:'24h'
        }
        )
}


const verifyToken = (token)=>{
    return jwt.verify(token, process.env.SECRET_KEY)
}


module.exports = { verifyToken,registerToken }