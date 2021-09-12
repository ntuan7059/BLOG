const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function(req, res, next){
    const token = req.header('auth-token')

    if(!token){
        return res.status(401).json({msg: 'access denied'})
    }

    //verify token
    try{ const decoded = jwt.verify(token, config.get('jwtToken'))
            req.user = decoded.user;
            next();
}catch (err){
    res.status(404).json({ msg: 'token not valid'})
}
}