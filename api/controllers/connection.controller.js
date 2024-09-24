import connectionRequestSchema from "../models/connectionRequest.model.js";

export const sendConnectionRequest = async (req,res)=>{
    try {
        const {userId } = req.params;
        const senderId = req.user._id;
        if(senderId.toString() === userId){
            return res.status(400).json({message:"You can't send a request to youerself"})
        }
        if( req.user.connections.includes(userId)){
            return res.status(400).json({message:"You are already connected"})
        }
        const existingRequest = await connectionRequestSchema.findOne({
            sender:senderId,
            recipent:userId,
            status:"pending"
        })
        if(existingRequest){
            return res.status(400).json({message:"A connection request already exists"})
        }
        const newRequest = new connectionRequestSchema({
            sender:senderId,
            recipent:userId
        })
        await newRequest.save();
        res.status(201).json({message:"Connection request sent successfully"})
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server error"})
    }
}