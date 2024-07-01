import { Router } from "express";
import { addMessage, deleteMessage, getMessages } from "./message.controller.js";
import { verifyToken } from "../../middleware/verifyToken.js";

const messageRouter = Router();

messageRouter.use(verifyToken)
messageRouter.post('/', addMessage)
messageRouter.get('/', getMessages)
messageRouter.delete('/:id', deleteMessage)

export default messageRouter;