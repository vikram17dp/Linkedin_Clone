import cloudinary from "../lib/cloudniary.js";
import Post from "../models/post.model.js";


export const getFeedPosts = async(req,res)=>{
    try {
        const posts = await Post.find({author:{$in:req.user.connections}})
        .populate("author","name username profilePicture headline")
        .populate("comments:user","name profilePicture")
        .sort({createdAt:-1})
        res.status(200).json(posts)
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Internal Sever error"})
    }
}

export const createPosts = async (req,res)=>{
    try {
        const {content,image} = req.body;
        if(image){
            const imgResult = await cloudinary.uploader.upload(image);
            let newPosts = new Post({
                author:req.user._id,
                content,
                image:imgResult.secure_url
            })
        }else{
            let newPosts = new Post({
                author:req.user._id,
                content
            })
        }
        await newPosts.save();
        res.status(201).json(newPosts);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Internal server error"})
    }
}

