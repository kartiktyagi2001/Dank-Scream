const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const User = require('../models/userModel');

router.post('/signin', signin);
router.post('/signup', signup);
router.get('/verify', Verify)


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

async function Verify(req, res){
    const authHeader = req.headers.authorization; //sent from FE

    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.json({
            success: false,
            message: "No token provided, please Signin!"
        });
    }

    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token, secret);
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({
        success: true,
        message: "Success",
        user
        });
    } catch(err){
        return res.json({
            success: false,
            message: "Invalid or expired token, Signin again!"
        });
    }
}

module.exports = router;