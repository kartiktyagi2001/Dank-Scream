const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const User = require('../models/userModel');

router.post('/signin', signin);
router.post('/signup', signup);


//signin logic
async function signin(req, res){
    const body = req.body;

    const user = await User.findOne({
        email: body.email
    })
    
    //user doesn't exist
    if(!user){
        return res.status(404).json({
            success: false,
            message: "User doesn't exist. Please Signup!"
        })
    }

    //pwd incorrect
    if(user.password !== body.password){
        return res.status(401).json({
            success: false,
            message: "Incorrect Password"
        })
    }

    //token generation
    const token = jwt.sign({id: user._id}, secret, { expiresIn: '1h' });

    console.log(token);

    return res.json({
        success: true,   //fe relies on this
        message: "Signed In",
        token,
        user
    })

}

//signup logic
async function signup(req, res){
    const body = req.body;

    const existingUser = await User.findOne({
        email: body.email
    })

    if(existingUser){
        console.log("user exists!")
        return res.json({
            success: false,
            message: "User already exists. Please Signin!"            
        })
    }

    //creating user
    const user = await User.create({
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        password: body.password
    })
    const id = user._id;

    const token = jwt.sign({id},secret, { expiresIn: '1h' });

    console.log(token);

    return res.json({
        success: true,   //fe relies on this
        message: "User Created Successfully",
        token,
        user
    })
}

module.exports = router;