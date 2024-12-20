import cloudinary from "../lib/cloudniary.js";
import User from "../models/user.model.js";

export const getSuggestedConnections = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id).select("connections");
    const suggestedUser = await User.find({
      _id: {
        $ne: req.user_id,
        $nin: currentUser.connections,
      },
    })
      .select("name username profilepicture headline")
      .limit(3);
    res.json(suggestedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error!" });
  }
};

export const getPublicProfile = async (req, res) => {
  try {
    const { username } = req.params;
    
    const userProfile = await User.findOne({ username });
    
    if (!userProfile) {
      console.log(`User not found for username: ${username}`);
      return res.status(404).json({ message: "User not found" });
    }
    
    return res.json(userProfile);
  } catch (error) {
    console.error("Error in getPublicProfile:", error);
    return res.status(500).json({ message: "Internal server error!" });
  }
};


export const getprofileupdate = async (req, res) => {
  try {
    const allowedFileds = [
      "name",
      "username",
      "profilepicture",
      "headline",
      "about",
      "location",
      "bannerImg",
      "skills",
      "experience",
      "education",
      "hobbies"
    ];
    const updatedData = {};
    for (const field of allowedFileds) {
      if (req.body[field]) {
        updatedData[field] = req.body[field];
      }
    }

    if (req.body.profilepicture) {
      const result = await cloudinary.uploader.upload(req.body.profilepicture);
      console.log("Profile picture uploaded:", result.secure_url);
      updatedData.profilepicture = result.secure_url;
    }
    if (req.body.experience && Array.isArray(req.body.experience)) {
      updatedData.experience = req.body.experience.map(exp => ({
        _id: exp._id ? exp._id : undefined,  
        title: exp.title,
        company: exp.company,
        startDate: new Date(exp.startDate),  
        endDate: exp.endDate ? new Date(exp.endDate) : null,
        description: exp.description,
      }));
    }
    

    if (req.body.bannerImg) {
      const result = await cloudinary.uploader.upload(req.body.bannerImg);
      updatedData.bannerImg = result.secure_url;
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updatedData },
      { new: true }
    ).select("-password");
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error!" });
  }
};
