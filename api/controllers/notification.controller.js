import Notification from "../models/notification.model.js"

export const getUserNotifications = async(req,res)=>{
    try {
        const notifications = await Notification.find({recipent:req.user._id})
        .sort({createdAt:-1})
        .populate("relatedUser","name username profilePicture")
        .populate("relatedPost","content image")
        if (!notifications) {
            return res.status(404).json({ message: "No notifications found." });
        }
        res.status(200).json(notifications)
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Internal server error!"})
    }
}
export const markNotificationAsread = async(req,res)=>{
    try {
        const notificationId = req.params.id;

        await Notification.findByIdAndUpdate({
            _id:notificationId,
            recipent:req.user._id
        },{new:true})

        res.json(notificationId)
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Internal server error!"});
    }
}

export const deleteNotification = async(req,res)=>{
    try {
        const notificationId = req.params.id;
        await Notification.findByIdAndDelete({
            _id:notificationId,
            recipent:req.user._id
        })
        res.status(200).json({message:"Notification deleted successfully!"})
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Internal server error!"});
    }

}