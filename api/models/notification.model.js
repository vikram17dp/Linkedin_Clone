import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    type: {
      type: String,
      required: true,
      enum: ["like", "comment", "connectionAccepted"],
    },
    relatedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    relatedPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    read: {
      type: Boolean,
      default: false,
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
