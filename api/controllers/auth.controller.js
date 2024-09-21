import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
  try {
    const { name, email, password, username } = req.body;
    if(!name|| !username || !email|| !password){
        return res.status(400).json({message:"All Fields are required"})
    }
    const existinguserName = await User.findOne({ username });
    if (existinguserName) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const existingemail= await User.findOne({email});
    if(existingemail){
        return res.status(400).json({message:"Email laready exists"})
    }
    if(password.length < 4){
        return res.status(400).json({message:"Password must be conatin at least 4 characters"})
    }
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password,salt);
    const user = new User({
        name,
        email,
        username,
        password:hashedpassword
    })

    await user.save();
    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"3d"});

    res.cookie("jwt-linkdein",token,{
        httpOnly:true,
        maxAge:3*24*60*1000,
        sameSite:"strict",
        secure:process.env.NODE_ENV === "production"
    })
res.status(201).json({message:"User registred succesfully!"})

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
    
  }
};

export const login = async (req, res, next) => {
    


};
export const logout = async (req, res, next) => {
  res.send("logout");
};
