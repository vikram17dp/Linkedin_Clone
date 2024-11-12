import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { sendEmail } from "../Emails/emailHandlers.js";

export const signup = async (req, res, next) => {
    try {
        const { name, email, password, username } = req.body;
        if (!name || !username || !email || !password) {
            return res.status(400).json({ message: "All Fields are required" });
        }

        const existinguserName = await User.findOne({ username });
        if (existinguserName) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const existingemail = await User.findOne({ email });
        if (existingemail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        if (password.length < 4) {
            return res.status(400).json({ message: "Password must contain at least 4 characters" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);
        const user = new User({ name, email, username, password: hashedpassword });

        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" });

        res.cookie("jwt-linkdein", token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 *60* 1000,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        });

        res.status(201).json({ message: "User registered successfully!" });

        const profileUrl = `${process.env.CLIENT_URL}/profile/${user.username}`;

        try {
            await sendEmail(user.email, user.name, profileUrl);
        } catch (error) {
            console.error("Error Sending Welcome Email", error);
        }

    } catch (error) {
        console.error("Error during signup process:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


export const login = async (req, res)  => {
    try {
        const {username,password} = req.body;
    const user = await User.findOne({username});
    if(!user){
        return res.status(400).json({message:"Invalid credentials"})
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({message:"Invalid credentials"})
    }
    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"3d"});
    await res.cookie("jwt-linkdein",token,{
        httpOnly:true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
			sameSite: "strict",
			secure: process.env.NODE_ENV === "production",
    })
    res.status(200).json({message:"LoggedIn in SuccessFully!"})

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"server error!"})
        
    }


};




export const logout = async (req, res) => {
  try {
    const token = req.cookies["jwt-linkdein"];
    if (!token) {
      return res.status(400).json({ message: "No token found" });
    }
    
    res.clearCookie("jwt-linkdein", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({ message: "Logged Out Successfully!" });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ message: "Server error!" });
  }
};



export const getCurrentuser = async (req,res)=>{
    try {
       res.json(req.user); 
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"server error!"});
    }
}