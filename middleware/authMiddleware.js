const JWT = require('jsonwebtoken')

module.exports  = async (req,res,next) =>{
    try {
        const token = req.headers["authorization"].split(" ")[1]
        JWT.verify(token, process.env.JWT_SECRET, (err,decode) => {
            if(err){
                return res.status(404).send({
                    success:false,
                    message:'Un-Authorized User',
                })
            }else{
                req.body.email = decode.email;
                next();
            }
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:'Error in User-API',
            error
        })
    }
}