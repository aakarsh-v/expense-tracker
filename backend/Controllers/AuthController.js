const UserModel = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { name, email, password} = req.body;
        const user = await UserModel.findOne({ email});
        if(user) {
            return res.status(409).json({
                message: "User already exists",
                sucess: false
            })
        }
        const userModel = new UserModel({
            name,
            email,
            password
        })
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201).json({
            message: "User created successfully",
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

const login = async (req, res) => {
    try {
        const { email, password} = req.body;
        const user = await UserModel.findOne({ email});
        const errorMsg = "Invalid email or password";
        if(!user) {
            return res.status(403).json({
                message: errorMsg,
                sucess: false
            })
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if(!isPassEqual){
            return res.status(403).json({
                message: errorMsg,
                sucess: false
            })
        }
        const jwtToken = jwt.sign({
            email: user.email,
            _id: user._id
        }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        })
        res.status(200).json({
            message: "Login successful",
            success: true,
            jwtToken,
            email,
            name: user.name
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
        
    }
}

module.exports = {
    signup,
    login
}