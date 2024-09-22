import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    recipent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    type:{
        type:String,
        required:true,
        enum:["like","comment","connectionAccepted"]
    },
    relatedUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    realtedPost:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    },
    read:{
        type:Boolean,
        default:false
    },

},{timestamps:true})


export const Notification = mongoose.model("Notification",notificationSchema);
export default Notification;