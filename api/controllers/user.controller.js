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
    res.json(currentUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error!" });
  }
};


export const getPublicProfile = async (req,res)=>{
    try {
        const user = await User.findOne({username:req.params.username}).select("-password");
        if(!user){
            res.status(404).json({message:"Usre not found"})
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Internal server error!"});
    }
}