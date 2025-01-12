const express = require("express");
const zod = require("zod");
const { User } = require("../db");
const jwt = require('jsonwebtoken');
const JWT_SECRET  = require("../config");
const router = express.Router();
 
//signUp route
const signupSchema = zod.object({
    username : zod.string(),
    password : zod.string(),
    firstName : zod.string(),
    lastName : zod.string()
})

router.post("/signup", async (req, res)=>{
    const body = req.body;
    const { success } = signupSchema.safeParse(req.body);

    if(!success){
        return res.status(411).json({
            message : "Incorrect inputs"
        })
    }

    const user = User.findOne({
        username : body.username
    })

    if(user._id){
        return res.status(411).json({
            message : "Email already registerd"
        })
    }

    const dbUser = await User.create(body);

    const token = jwt.sign({
        userId : dbUser._id
    },JWT_SECRET);

    res.json({
        message : "User Created Successfully",
        token : token
    })
})

//SignIn route
const signinSchema = zod.object({
    username : zod.string().email(),
    password : zod.string()
})

router.post("/signin", async (req, res)=>{
    const body = req.body;
    const { success } = signinSchema.safeParse(body);

    if(!success){
        return res.status(411).json({
            message : "Invalid Input"
        })
    }

    const user =  await User.findOne({
        username : req.body.username,
        password : req.body.password
    })
    if(user){
        const token = jwt.sign({
            userId : user._id
        }, JWT_SECRET);
        return;
    }
    else {
        return res.status(411).json({
            message : "User aldready exist"
        })
    }
})

module.exports = router; 