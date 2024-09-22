import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/user.model.js';

export const protectRoute = async(req,res,next)=>{
    try {
        const token = req.cookie["jwt-linkedin"];

        if(!token){
            return res.status(201).json({message:"Unauthorized - No Token Provided"})
        }

        const decoded =  jwt.verify(token,process.env.JWT_SECRET);

        if(!verify){
            return res.status(201).json({message:"Unauthorized - Invalid Token"})
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(401).json({ message: "User not found" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:"Internal server error"})
    }
}