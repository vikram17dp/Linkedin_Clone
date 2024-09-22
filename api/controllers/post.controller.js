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

