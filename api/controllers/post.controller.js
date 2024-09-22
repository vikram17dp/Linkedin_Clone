import cloudinary from "../lib/cloudniary.js";
import Notification from "../models/notification.model.js";
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


export const deletePost = async(req,res)=>{
    try {
        const postId = req.params.id;
        const userId = req.user._id;

        const post = await Post.findById(postId);

        if(!post){
            return res.status(404).json({message:"Post not Found!"})
        }

        if(post.author.toString() !== userId.toString()){
            return res.status(403).json({message:"You are not authorized to delete this post"})
        }
        if(post.image){
            // deleting the image as well in the cloudniary also
            await cloudinary.uploader.destroy(post.image.split("/").pop().split(".")[0])
        }

        await Post.findByIdAndUpdate(postId);
        res.status(200).json({message:"Post deleted succesfully!"})


    } catch (error) {
       console.error(error);
       res.status(500).json({message:"Internal Server Error"}) 
    }
}


export const getPostById = async(req,res)=>{
   try {
    const post = await Post.findById(req.params.id)
    .populate("author","name username profilePicture headline")
    .populate("comments.user","name profilePicture username headline")

    res.status(200).json(post)
   } catch (error) {
        console.error(error);
        res.status(500).json({message:"Internal sever error!"})
   }
}

export const CommentPost = async(req,res)=>{
    try {
        const postId = req.params.id;
        const {content} = req.body;
        const post = await Post.findByIdAndUpdate(postId,{
            $push:{comments:{user:req.user._id,content}}
        },{new:true})
        .populate("author","name email username headline profilePiccture")

        if(post.author.toString() !== post.user._id.toString()){
            const newNotification = new Notification({
                recipent:post.author,
                type:"comment",
                relatedUser:req.user._id,
                realtedPost:postId
            })
            await newNotification.save()
            try {
                const  postUrl = process.env.CLIENT_URL + "/post/" + postId;
                await sendcommentNotificationEmail(
                    post.author.email,
                    post.author.name,
                    req.user.name,
                    postUrl,
                    comment
                );
            } catch (error) {
                console.error(error)
            }
        }
        res.status(200).json(post)
    } catch (error) {
     console.error(error);
     res.status(500).json({message:"Internal server error!"});   
    }
}