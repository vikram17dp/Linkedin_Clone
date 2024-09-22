import Notification from "../models/notification.model.js"

export const getUserNotifications = async(req,res)=>{
    try {
        const notifications = await Notification.find({recipent:req.user._id})
        .sort({createdAt:-1})
        .populate("relatedUser","name username profilePicture")
        .populate("relatedPost","content image")
        res.status(200).json(notifications)
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Internal server error!"})
    }
}
export const markNotificationAsread = async(req,res)=>{

}

export const deleteNotification = async(req,res)=>{

}