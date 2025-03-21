import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Notification must have a recipient"],
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Notification must have a sender"],
    },
    type: {
      type: String,
      enum: [
        "follow",
        "like",
        "comment",
        "reply",
        "save",
        "board_invite",
        "mention",
      ],
      required: [true, "Notification type is required"],
    },
    read: {
      type: Boolean,
      default: false,
    },
    pin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pin",
    },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
    },
    message: {
      type: String,
      required: [true, "Notification message is required"],
      trim: true,
      maxlength: [200, "Message cannot exceed 200 characters"],
    },
    status: {
      type: String,
      enum: ["active", "archived", "deleted"],
      default: "active",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for efficient querying
notificationSchema.index({ recipient: 1, createdAt: -1 }); // For retrieving user's notifications
notificationSchema.index({ recipient: 1, read: 1 }); // For querying unread notifications
notificationSchema.index({ type: 1, createdAt: -1 }); // For filtering by notification type

// Static method to mark notifications as read
notificationSchema.statics.markAsRead = async function (
  recipientId,
  notificationIds = []
) {
  const query = { recipient: recipientId, read: false };
  if (notificationIds.length > 0) {
    query._id = { $in: notificationIds };
  }

  return await this.updateMany(query, { read: true });
};

// Static method to get unread count
notificationSchema.statics.getUnreadCount = async function (recipientId) {
  return await this.countDocuments({
    recipient: recipientId,
    read: false,
    status: "active",
  });
};

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
