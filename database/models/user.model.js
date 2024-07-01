import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    // age:{
    //   type: Number,
    //   min:2
    // },
    comfirmedEmail: {
      type: Boolean,
      default: false,
    },
    role:{
      type: String,
      enum: ["user", "admin"],
      default: "user"
    }
  },
  {
    timestamps: { updatedAt: false },
    versionKey: false,
  }
);

export const User = model("User", schema);
