import Connection from "../models/connectionRequest.model.js";
import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";
import { sendConnectionAcceptedEmail } from "../Emails/emailHandlers.js";

export const sendConnectionRequest = async (req, res) => {
  const { userId } = req.params; 
  const senderId = req.user.id; 
  // console.log(`Received connection request from user: ${req.user.id} to user: ${userId}`);



  if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
  }

  try {
      const connectionRequest = new Connection({
          sender: senderId,
          recipient: userId, 
      });

      await connectionRequest.save(); 
      return res.status(201).json({ message: "Connection request sent successfully!" });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
  }
};


export const acceptConnectionRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const userId = req.user._id;
    const request = await Connection
      .findById(requestId)
      .populate("sender", "name email username")
      .populate("recipient", "name username");
    if (!request) {
      return res.status(404).json({ message: "Connection request not found" });
    }
    if (request.recipient._id.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to accept this request" });
    }
    if (request.status !== "pending") {
      return res
        .status(400)
        .json({ message: "This request has already been processed" });
    }
    request.status = "pending";
    await request.save();
    await User.findByIdAndUpdate(request.sender._id, {
      $addToSet: { connections: userId },
    });
    await User.findByIdAndUpdate(userId, {
      $addToSet: { connections: request.sender._id },
    });
    const notification = new Notification({
      recipient: request.sender._id,
      type: "connectionAccepted",
      relatedUser: userId,
    });
    await notification.save();
    const senderEmail = request.sender.email;
    const senderName = request.sender.name;
    const recipientName = request.recipient.name;
    const profileUrl =
      process.env.CLIENT_URL + "/profile/" + request.recipient.username;
    try {
      await sendConnectionAcceptedEmail(
        senderEmail,
        senderName,
        recipientName,
        profileUrl
      );
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const rejectConnectionRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const userId = req.user._id;

    const request = await Connection.findById(requestId);
    if (request.recipient.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to reject this request" });
    }

    if (request.status !== "pending") {
      return res
        .status(400)
        .json({ message: "This request has already been processed" });
    }
    request.status = "rejected";
    await request.save();
    res.json({ message: "Connection request rejected" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getConnectionRequests = async (req, res) => {
  try {
    const userId = req.user._id;
    const requests = await Connection.find({ recipient: userId, status: "pending" })
      .populate("sender", "name username profilePicture headline connections");
    res.json(requests);
    

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserConnections = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate(
      "connections",
      "name username profilePicture connections"
    );
    res.json(user.connections);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const removeConnection = async (req, res) => {
  try {
    const myId = req.user._id;
    const { userId } = req.params;
    await User.findByIdAndUpdate(myId, { $pull: { connections: userId } });
    await User.findByIdAndUpdate(userId, { $pull: { connections: myId } });
    res.json({ message: "Connection Removed Successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const getConnectionStatus = async (req, res) => {
  try {
    const targetUserId = req.params.userId;
    const currentUserId = req.user._id;

    const currentUser = req.user;
    if (currentUser.connections.includes(targetUserId)) {
      return res.json({ status: "connected" });
    }

    const pendingRequest = await Connection.findOne({
      $or: [
        { sender: currentUserId, recipient: targetUserId },
        { sender: targetUserId, recipient: currentUserId },
      ],
      status: "pending",
    });

    if (pendingRequest) {
      if (pendingRequest.sender.toString() === currentUserId.toString()) {
        return res.json({ status: "pending" });
      } else {
        return res.json({ status: "received", requestId: pendingRequest._id });
      }
    }

    // if no connection or pending req found
    res.json({ status: "not_connected" });
  } catch (error) {
    console.error("Error in getConnectionStatus controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};
