import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilepicture:{
        type:String,
        default:""
    },
    bannerImg:{
        type:String,
        default:""
    },
    headline:{
        type:String,
        default:"Linkdein User"
    },
    location:{
        type:String,
        default:"Earth"
    },
    about:{
        type:String,
        default:""
    },
    skills:[String],
    experience:[
        { _id: { type: String, required: true },
            title:String,
            company:String,
            startDate:Date,
            endDate: { type: Date, default: null },
            description:String,
            
        }
    ],
    education:[
        {
            school:String,
            fieldofstudy:String,
            startYear:Number,
            endYear:Number
        }
    ],
    connections:[ {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }]

},{timestamps:true})

export const User = mongoose.model("User",userSchema);

export default User;