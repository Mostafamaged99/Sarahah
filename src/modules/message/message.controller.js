import { Message } from "../../../database/models/message.model.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utilties/appError.js";

const addMessage = catchError(async (req, res) => {
  let message = await Message.insertMany(req.body);
  message[0].receiverId = undefined;
  res.status(201).json({ message: "success", message });
});

const getMessages = catchError(async (req, res, next) => {
  let isExist = await Message.find({ receiverId: req.userId });
  if (!isExist.length) {
    return next(new AppError("Messages not found", 404))
  }
  let messages = await Message.find({ receiverId: req.userId });
  return res.status(200).json({ message: "success", messages });
});

const deleteMessage = catchError(async (req, res, next) => {
  let message = await Message.findByIdAndDelete(req.params.id);
  if(!message) return next(new AppError("Message not found", 404))
  res.status(200).json({ message: "deleted successfully", message });
});

export { addMessage, getMessages, deleteMessage };
