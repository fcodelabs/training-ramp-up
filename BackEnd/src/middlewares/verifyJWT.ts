const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req: any, res: any, next: any) => {
    const authHeader = req.headers['authorization'];
    console.log('line 6 middleware ', req.headers)
    if(!authHeader) return res.status(401).send('No token provided');
    const token = authHeader.split(' ')[1];  // Bearer <token>
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET, 
        (err: any, decoded: any) => {
        if(err) return res.status(403).send('Invalid token');
        req.user = decoded.email;
        next();
    }) 
}

module.exports = verifyJWT;