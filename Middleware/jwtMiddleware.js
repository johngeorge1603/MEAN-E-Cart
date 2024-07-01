const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next) => {
    try{
        const token = req.headers['authorization'].split(" ")[1]
        if(token){
            const jwtResponse = jwt.verify(token, process.env.SECRET_KEY)
            req.payload= jwtResponse.userId
            next() 
        } else{
            res.status(406).json("invalid token")
        }
    }catch{
        res.status(401).json('please login')
    }
}

module.exports = jwtMiddleware