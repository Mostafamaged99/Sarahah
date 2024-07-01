import { User } from "../../database/models/user.model.js";
import bcrypt from "bcrypt";

export const checkSignup = async (req, res, next) => {
    let isExist = await User.findOne({ email: req.body.email });
    if (isExist) {
      return res.status(409).json({ message: "Email already exist" });
    }
    let isFound = await User.findOne({ userName: req.body.userName });
    if (isFound) {
      return res.status(409).json({ message: "User name already exist" });
    }
    req.body.password =  bcrypt.hashSync(req.body.password,8)
    next();
}