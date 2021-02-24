const jwt = require('jsonwebtoken');
const { ObjectID } = require('mongodb');
const User = require('../models/user');

const auth = async (req, res, next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ','');        
        const decoded = jwt.verify(token,'thisismynewcourse');
        console.log(token);
        console.log(decoded._id);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token':token });
        console.log(user);
       
        if(!user){
            throw new Error();
        }

        req.token = token;
        req.user = user;
        next();           
    }
    catch(e){
        res.status(401).send({error:"Please authenticate"});
    }
    
};

module.exports = auth;