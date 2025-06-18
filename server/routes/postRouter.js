const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const authMiddleware = require('../middlewares/authMiddleware');

const Post = require('../models/postModel');

router.get('/', posts);
router.post('/new', authMiddleware, create);

//fetch all posts
async function posts(req, res){
    try{
        const posts = await Post.find()
        .populate('author', 'username')
        .sort({createdAt: -1}); // Sort by createdAt in descending order

        return res.json({
            posts: posts    //sends array in obj format
        })

    } catch(err){
        console.log(err);
        return res.json({message: "Error fetching posts"});
    }
}

//create post logic
async function create(req, res){
    const body = req.body;

    if(!body.content || body.content.trim() === ''){
        return res.json({message: "message cannot be empty"});
    }

    try{
        const post = await Post.create({
            content: body.content,
            author: req.user.id,
        });
        return res.json({
            message: "Post created successfully",
            post: post
        });
    } catch(err){
        console.log(err);
        return res.json({message: "Error posting, try again!"});
    }
}

module.exports = router;