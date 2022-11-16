const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const User = require('../models/user');

async function login(req, res) {

    const user = await User.findOne({
        email: req.body.email
    });

    if( user == null ){
        res.status(403).send({ message: "Invalid credentials"});    
        return;
    }else{

        const validPassword = await bcrypt.compare( req.body.password, user.password);
        
        if ( !validPassword ) {
            res.status(400).json({ message: "Invalid Password" });
            return;
        }

        let token = await new Promise( (resolve, reject) => {
        
            jwt.sign(user.toJSON(), 'secretKey', { expiresIn: '1800s' }, (err, token) => {
                if (err){
                    reject(err);
                } else{
                    resolve(token);
                }
            });
        });
        
        res.status(200).send({ message:"Authentication successful", token: token });    
        return;
    }
}

function verify(req, res) {
    res.status(200).send({
        message: req.payload
    });
}


function verifyToken(req, res, next) {

    const requestHeader = req.headers['authorization'];

    if (typeof requestHeader !== 'undefined') {
        const token = requestHeader.split(" ")[1];

        jwt.verify( token , 'secretKey', (err, payload) => {

            if (err) {
                res.status(403).send({
                    error: "Token not valid"
                });
            } else {
                req.payload = payload;
                next();
            }
        });

    } else {
        res.status(403).send({
            error: "Token missing"
        });
    }

}

module.exports = {
    login,
    verify,
    verifyToken
}