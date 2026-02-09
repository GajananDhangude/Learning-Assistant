const UserModel = require("../models/User.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


async function RegisterUser(req , res) {

    const {firstname , lastname , email , password} = req.body;

    const isUserExists = await UserModel.findOne({email})

    if(isUserExists){
        return res.status(400).json({message: "User Already exists"});
    }

    const HashedPassword = await bcrypt.hash(password , 10);

    const newUser = await UserModel.create({
        firstname:firstname,
        lastname:lastname,
        email:email,
        password:HashedPassword
    })

    const token = jwt.sign({
        id:newUser._id,
    } , process.env.JWT_SECRET)

    res.cookie("token" , token);

    res.status(201).json({
        message:"User registered successfully",
        user:{
            id:newUser._id,
            firstname:newUser.firstname,
            lastname:newUser.lastname,
            email:newUser.email,
        }
    })
}


async function LoginUser(req , res){
    const {email , password} = req.body;

    const user = await UserModel.findOne({email:email});

    if(!user){
        return res.status(400).json({message:"Invalid email or password"});
    }

    const isPasswordvalid = await bcrypt.compare(password , user.password);

    if(!isPasswordvalid){
        return res.status(400).json({
            message:"Invalid email or password",
        })
    }

    const token = jwt.sign({
        id:user._id,
    } , process.env.JWT_SECRET)

    res.cookie("token" , token)

    res.status(201).json({
        message:"User Logged in Successfully",
        user:{
            id:user._id,
            FirstName:user.firstname,
            LastName:user.lastname,
            Email:user.email,

        }
    })
}

async function getCurrentUser(req , res){
    try{
        const userId = req.user._id

        if(!userId){
            res.status(400).json({
                message:"Invalid UserId Please Login First"
            })
        }
        const user = await UserModel.findById(userId);

        res.status(201).json({
            message:"fetched successful.",
            user:{
                id:user._id,
                FirstName:user.firstname,
                LastName:user.lastname,
                Email:user.email,
        }
        })

    } catch(error) {
        res.status(401).json({error:error.message})
    }
}


function LogoutUser(req , res){
    res.clearCookie("token");
    res.status(201).json({message:"User logged out Succcessfully."})
}


module.exports = {
    RegisterUser,
    LoginUser,
    getCurrentUser,
    LogoutUser
}