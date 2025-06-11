const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const User = require('../models/userModel');

router.post('/signin', signin);
router.post('/signup', signup);


//signin logic
function signin(req, res){
    const body = req.body;

    const user = User.findOne({
        email: body.email
    })
    
    //user doesn't exist
    if(!user._id){
        res.json({
            message: "User doesn't exist. Please Signup!"
        })
    }

    //pwd incorrect
    if(user.password !== body.password){
        res.json({
            message: "Incorrect Password"
        })
    }

    //token generation
    const token = jwt.sign({id: user._id}, secret);

    return res.json({
        message: "Signed In",
        token: token
    })

}

//signup logic
async function signup(req, res){
    const body = req.body;

    const existingUser = User.findOne({
        email: body.email
    })

    if(existingUser._id){
        res.json({
            message: "User already exists. Please Signin!"
        })
    }

    //creating user
    const user = await User.create({
        email: body.email,
        firstName: body.FirstName,
        lastName: body.lastName,
        password: body.password
    })
    const id = user._id;

    const token = jwt.sign({id},secret);

    console.log(token);

    return res.json({
        message: "User Created Successfully",
        token: token
    })
}

module.exports = router;