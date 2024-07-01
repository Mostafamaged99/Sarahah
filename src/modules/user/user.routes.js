import { Router } from "express";
import {  signin, signup } from "./user.controller.js";
import { checkSignup } from "../../middleware/checksignup.js";
import { validate } from "../../middleware/validate.js";
import { signinVal, signupVal } from "./user.validation.js";

const userRouter = Router();

userRouter.post("/signup", validate(signupVal), checkSignup , signup); 
userRouter.post("/signin" ,validate(signinVal),  signin); 

export default userRouter;
