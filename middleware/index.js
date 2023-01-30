const jsonwebtoken = require('jsonwebtoken');

class middleware{
    static isAuthenticated(req, res, next){
        let token=req.headers.authorization.split(' ')[1]
        const expiresIn = '1d';
        try {
            jsonwebtoken.verify(token,process.env.PUB_KEY,{ expiresIn: expiresIn, algorithm: 'RS256' })
        } catch (error) {
            res.status(403).json({
                error:error,
            })
        }
        next()
    }
}

module.exports=middleware;