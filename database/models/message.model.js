import mongoose, { Schema, model } from "mongoose";

const schema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    receiverId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: { updatedAt: false },
    versionKey: false,
  }
);

export const Message = model("Message", schema);
