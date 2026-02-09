const jwt = require("jsonwebtoken");
const UserModel = require("../models/User.model.js")


async function authMiddleware(req , res , next){

    try{
        const token = req.cookies.token
    
        if (!token) {
        return res.status(401).json({ error: 'No authentication token provided' });
        }
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded.id);

        req.user = user;
        next();

    } catch (error){
        return res.status(401).json({message:"Invalid token"});

    }

}

module.exports = authMiddleware