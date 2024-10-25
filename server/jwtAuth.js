const jwt = require('jsonwebtoken');

    const jwtAuthentication = (req, res, next) => {
    const token = req.headers.token;
    console.log(req.headers.token);
    if(!token){
        return res.joson({success : false, message : "로그인 후"})
    }
    jwt.verify(token, "secret_key", (err, user) => {
        if(err){
            return res.json({success  : false, message : "토큰이 유효한지"})
        }
        next();
    });

    
}

module.exports = jwtAuthentication;