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
            firstname:newUser.firstname,
            lastname:newUser.lastname,
            email:newUser.email,
        }
    })
}